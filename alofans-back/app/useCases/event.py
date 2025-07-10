from datetime import (
    datetime, 
    timedelta,
    timezone
)
from decouple import config
from fastapi import UploadFile
from fastapi.exceptions import HTTPException
from json import dumps
from sqlalchemy.orm import Session


from constants.event import (
    ERROR_CONFLICT_CPF_CNPJ_WITH_PHONE,
    ERROR_EVENT_ALREADY_EXISTS,
    ERROR_EVENT_NOT_FOUND,
    ERROR_EVENTS_NOT_FOUND,
    ERROR_NOT_FOUND_INTERLOCUTOR_PHONE,
    ERROR_EVENT_NO_ID,
    MESSAGE_EVENT_ADD_SUCCESS, 
    MESSAGE_EVENT_DELETE_SUCCESS, 
    MESSAGE_EVENT_UPDATE_SUCCESS
)
from constants.sse import (
    SSE_ADD_EVENT,
    SSE_DELETE_EVENT,
    SSE_UPDATE_EVENT
)
from useCases.payment import PaymentUseCases
from db.models import (
    Client as ClientModel,
    Event as EventModel,
    EventsFromProducer,
    EventsFromInterlocutor
)
from enums.event import EventType
from enums.user import UserLevel
from schemas.base import BaseMessage
from schemas.event import (
    EventRequest,
    EventResponse,
    EventUpDate,
    EventInDB,
)
from services.ids import id_generate
from services.image import (
    delete_image,
    upload_image,
    get_path_image
)
from services.sse import (
    SSE,
    Event as SSEEvent
)
from utils.messages.error import (
    BadRequest,
    Conflict,
    NotFound,
    Server
)
from utils.messages.success import Success
from utils.format import (
    str_to_date
)
from utils.timezone import (
    get_current_time,
    sao_paulo_ymd_to_utc,
    utc_to_sao_paulo_ymd
)


DAYS_TO_CLEAN_EVENT = int(config("DAYS_TO_CLEAN_EVENT"))
VALID_EVENT_DAYS = int(config("VALID_EVENT_DAYS"))


class EventUseCases:

    def __init__(self, db_session: Session):
        self.db_session = db_session

    # Criar client(s)
    def add(self, event: EventRequest, image: UploadFile) -> BaseMessage:

        try:
            event.date = sao_paulo_ymd_to_utc(event.date)
            
            self._check_existence(event)

            now = get_current_time()
            
            if str_to_date(event.date, True) < now: # TODO: Converter as horas direito para timestamp para converter direito
                raise BadRequest("Data do evento não pode ser no passado")
            
            event_id = id_generate()
            
            upload_image("event", image, event_id)

            event_data = event.dict()
            
            if "interlocutor_phone" in event_data:
                
                del event_data["interlocutor_phone"]
            
            event_db: EventInDB = EventInDB(**event_data, id=event_id, image_path=f'/image?path={get_path_image("event", event_id)}')

            #event_db.date = sao_paulo_ymd_to_utc(event_db.date)
            
            self._resolve_interlocutor(event_db, event)
                        
            new_event = EventModel(**event_db.dict())
            
            self.db_session.add(new_event)

            self._add_history(event_db, new_event)
            
            self.db_session.commit()

            self._sse_notify(SSE_ADD_EVENT, MESSAGE_EVENT_ADD_SUCCESS)

            return Success(MESSAGE_EVENT_ADD_SUCCESS)

        
        except HTTPException:
            raise
            
        except Exception as e:
            raise Server(e)

    def get(self, event_id: str) -> EventResponse:
        """
        Retorna um Evento com base em seu id

        - Args:
            - event_id:: str: ID do evento
            
        - Returns:
            - EventResponse: Evento encontrado no banco de dados
            
        - Raises:
            - HTTPException: 400 - ID do evento não informado
            - HTTPException: 404 - Evento não encontrado
            - HTTPException: 500 - Erro no servidor
            
        """

        try:
           
            event = self._get(event_id)
            
            return self._Model_to_Response(event)
        
        except HTTPException:

            raise

        except Exception as e:

            raise Server(e)
        
    def get_all(self) -> list[EventResponse]:
        """"
        Lista todos os Eventos validos (Que estão acontecendo ou que irão acontecer) no Banco de Dados
        
        - Args:
            
        - Returns:
            - List[EventModel]: Lista contendo registros do banco de dados não formatados referentes aos eventos
            
        - Raises:
            - HTTPException: 404 - Eventos não encontrados
            - HTTPException: 500 - Erro no servidor
        """
        try:
            
            events = self._get_all()

            events = self._Models_to_Responses(events)
        
            if not events:
                raise NotFound(ERROR_EVENTS_NOT_FOUND)
            
            return events
            
        except HTTPException as e:
        
            raise
        
        except Exception as e:

            raise Server(e)
        
    def get_all_db(self) -> list[EventResponse]:
        """"
        Lista todos os Eventos Salvos no Banco de Dados
        
        - Args:
            
        - Returns:
            - List[EventModel]: Lista contendo registros do banco de dados não formatados referentes aos eventos
            
        - Raises:
            - HTTPException: 404 - Eventos não encontrados
            - HTTPException: 500 - Erro no servidor
        """
        try:
            events = self._get_all()

            events = [self._Model_to_Response(e) for e in events]
            
            return events
        
        except HTTPException:
            raise

        except Exception as e:
            
            raise Server(e)
        
    def delete(self, event_id: str) -> BaseMessage:
        """
        Deleta um cliente com base no id passado, caso o cliente exista
        
        - Args:
            - id:: str: ID do evento a ser deletado
            
        - Returns:
            - dict[detail]: Mensagem de confirmação sobre deletar o evento
            
        - Raises:
            - HTTPException: 404 - Evento não encontrado
            - HTTPException: 500 - Erro no servidor
        """
        try:

            event = self._get(event_id)

            self._delete(event)

            self.db_session.commit()

            return Success(MESSAGE_EVENT_DELETE_SUCCESS)
            
        except HTTPException:

            raise

        except Exception as e:

            raise Server(e)

    def update(self, event_id: str, event_update: EventUpDate, image: UploadFile = None) -> BaseMessage:
        """
        Atualiza os dados de um cliente com base nos dados passados se o cliente existir
        
        - Args:
            - event_id:: str: ID do evento a ser atualizado
            - event_update:: EventUpDate: Dados a serem atualizados
            
        - Returns:
            - dict[detail]: Mensagem de confirmação sobre atualizar o evento
            
        - Raises:
            - HTTPException: 404 - Evento não encontrado
            - HTTPException: 500 - Erro no servidor
        """
        try:
            event = self._get(event_id)
            
            for field, value in event_update.dict().items():
                if value is not None:
                    
                    if field == "date":
                        value = sao_paulo_ymd_to_utc(value)

                    setattr(event, field, value)

            if image:

                upload_image("event", image, event_id)

                setattr(event, "image_path", f'/image?path={get_path_image("event", event_id)}')
                

            self.db_session.commit()

            self.db_session.refresh(event)

            self._sse_notify(SSE_UPDATE_EVENT, MESSAGE_EVENT_UPDATE_SUCCESS)
            
            return Success(MESSAGE_EVENT_UPDATE_SUCCESS)
        
        except HTTPException:
            raise      
          
        except Exception as e:
            raise Server(e)
        

    def _get(self, id: str) -> EventModel:

        if not id:

            raise BadRequest(ERROR_EVENT_NO_ID)
        
        event = self.db_session.query(EventModel).filter_by(id=id).first()

        if not event:

            raise NotFound(ERROR_EVENT_NOT_FOUND)
        
        return event
    
    def _get_all(self) -> list[EventModel]:
        
        events = self.db_session.query(EventModel).all()
        
        if not events:
            
            raise NotFound(ERROR_EVENTS_NOT_FOUND)
        
        return events
    

    def _delete(self, event: EventModel):

        if event.interlocutor_cpf_cnpj:
                    
                    try:
                        uc = PaymentUseCases(self.db_session)

                        pixkey = event.interlocutor_pixkey

                        response = uc.withdraw_from_subaccount(pixkey)

                        print(f"\n\nResposta do saque na chave: {pixkey}\n\n", response)
                    
                    except Exception as e:
                        print(e)

        delete_image("event", event.id)

        self.db_session.delete(event)

        self._sse_notify(SSE_DELETE_EVENT, MESSAGE_EVENT_DELETE_SUCCESS)


        
    def _Model_to_Response(self,event_model: EventModel) -> EventResponse:
    
        keys = event_model.dict()
        
        type_event = EventType.online.value if keys["is_online"] else EventType.offline.value
        date = utc_to_sao_paulo_ymd(keys["date"])
        
        del keys["is_online"]
        del keys["date"]
        
        producer = self.db_session.query(ClientModel).filter_by(cpf_cnpj=event_model.producer_cpf_cnpj).first()
        
        producer_pixkey = ""
        producer_name = ""
        if producer:
            producer_name = producer.name
            producer_pixkey = producer.pixkey
        
            
        interlocutor = self.db_session.query(ClientModel).filter_by(cpf_cnpj=event_model.interlocutor_cpf_cnpj).first()
        
        interlocutor_name = ""
        if interlocutor:
            interlocutor_name = interlocutor.name
        
        return EventResponse(
            **keys,
            date=date,
            type=type_event,
            name_producer=producer_name,
            producer_pixkey=producer_pixkey,
            name_interlocutor=interlocutor_name,
        )
        
    def _Models_to_Responses(self, events: list[EventModel]) -> list[EventResponse]:
        response = []
        invalid = []
        for event in events:
            if self._valid_event_date(event.date):
                response.append(self._Model_to_Response(event)) 
            else:
                invalid.append(event)

        
        self._clean_old_events_on_db(invalid)

        return response
            
    
    
    def _valid_event_date(self, date: datetime) -> bool:
        # Verifica se a data do evento é superior à data atual mais um dia (para considerar eventos que irão acontecer)
        
        # Certifique-se de que a data do evento está no formato UTC (offset-aware)
        if date.tzinfo is None:
            date = date.replace(tzinfo=timezone.utc)
        
        # Obter a data e hora atual em UTC
        now_utc = datetime.now(timezone.utc)
        
        if date >= now_utc - timedelta(days=VALID_EVENT_DAYS):
            return True
        
        return False
        
    def _sse_notify(self, tag: str, message: str):
        
        SSE.add_event(
            SSEEvent(
                type=tag,
                message=dumps(
                    {
                    "detail": message
                    }
                )
            )
        )


    def _check_existence(self, event: EventRequest):
        """
        Checa se um evento já existe no banco de dados e lança um erro caso exista
        """

        query = self.db_session.query(EventModel)

        # Adiciona filtros para cada campo que não é None e não é o ID

        for field, value in event.dict(exclude=["date"]).items():

            if field not in ["id", "interlocutor_phone"] and value is not None:

                query = query.filter(getattr(EventModel, field) == value)

        # Executa a consulta e verifica se existem eventos correspondentes
        event_exist = self.db_session.query(query.exists()).scalar()

        if event_exist:
            
            raise Conflict(ERROR_EVENT_ALREADY_EXISTS)
        

    def _resolve_interlocutor(self, event_db: EventInDB, event: EventRequest):
        """
        Trata os casos que envolvem o interlocutor do evento
        """
        if event_db.interlocutor_cpf_cnpj:
                
                interlocutor = self.db_session.query(ClientModel).filter_by(cpf_cnpj=event_db.interlocutor_cpf_cnpj).first()
                
                if not interlocutor:
                    
                    if event.interlocutor_phone:
                    
                        interlocutor = self.db_session.query(ClientModel).filter_by(phone=event.interlocutor_phone).first()
                    
                        if not interlocutor:
                
                            raise NotFound(ERROR_NOT_FOUND_INTERLOCUTOR_PHONE)
                        
                        if interlocutor.cpf_cnpj is None:
                    
                            interlocutor.cpf_cnpj = event_db.interlocutor_cpf_cnpj
                            interlocutor.level = UserLevel.interlocutor.value
                            self.db_session.commit()
                            self.db_session.refresh(interlocutor) 
                        else:
                            raise Conflict(ERROR_CONFLICT_CPF_CNPJ_WITH_PHONE)
        

    def _add_history(self, event_db: EventInDB, new_event: EventModel):
        """
        Injeção de dados nos históricos de produtor e interlocutor
        """
        producer = self.db_session.query(ClientModel).filter_by(cpf_cnpj=event_db.producer_cpf_cnpj).first()
        interlocutor = self.db_session.query(ClientModel).filter_by(cpf_cnpj=event_db.interlocutor_cpf_cnpj).first()
        
        if producer: # Se o produtor existir, adiciona o evento a ele (Blindagem de teste)
        
            self.db_session.add(EventsFromProducer(
                id=id_generate(),
                event_id=new_event.id,
                producer_id=producer.id
            )) 
            
        if interlocutor: # se o interlocutor existir, adiciona o evento a ele (blindagem de teste)
        
            self.db_session.add(EventsFromInterlocutor(
                id=id_generate(),
                event_id=new_event.id,
                interlocutor_id=interlocutor.id
            ))

    def _clean_old_events_on_db(self, events: list[EventModel]) -> None:
        """
        Limpa os eventos antigos do banco de dados
        """
        for event in events:

            if event.date.tzinfo is None:

                event.date = event.date.replace(tzinfo=timezone.utc)

            if event.date <= datetime.now(timezone.utc) - timedelta(days=DAYS_TO_CLEAN_EVENT):

                self._delete(event)
        
        self.db_session.commit()
import json
from fastapi import HTTPException
from sqlalchemy.orm import Session


from constants.sse import UPDATE_ALO
from constants.alo import (
    ERROR_ALO_INVALID_STATUS,
    ERROR_ALO_NOT_FOUND,
    ERROR_ALO_NOT_ID,
    ERROR_ALO_NOT_STATUS,
    ERROR_ALOS_NOT_FOUND,
    ERROR_ALOS_OUT_OF_STOCK,
    MESSAGE_ALO_ADD_SUCCESS,
    MESSAGE_ALO_DELETE_SUCCESS,
    MESSAGE_ALO_UPDATE_SUCCESS,
    ERROR_CLIENT_NOT_FOUND
)
from constants.event import ERROR_EVENT_NOT_FOUND
from db.models import (
    Client as ClientModel,
    Event as EventModel,
    Alo as AloModel,
    AlosFromClient,
    AlosFromProducer,
    AlosFromInterlocutor
)
from enums.alo import AloStatus
from hooks.alo_notify import (
    waiting_aprove_notify,
    approved_notify,
    finished_notify,
    rejected_notify
)
from schemas.base import BaseMessage
from schemas.alo import (
    AloResponse,
    AloRequest,
    AloInDB
)
from services.ids import id_generate
from services.sse import (
    SSE,
    Event as AloEvent
)
from utils.messages.error import (
    BadRequest,
    NotFound,
    Server
)


class AloUseCases:

    def __init__(self, db_session: Session):
        self.db_session = db_session

    def add_alo(self, alo: AloRequest) -> dict:
        """
        Cria um registro de alo no banco de dados

        - Args:
            - alo:: AloRequest: Objeto contendo as informações do alo a ser cadastrado

        - Returns:
            - dict[detail]: Mensagem de sucesso

        - Raises:
            - HTTPException: 404 - Cliente não encontrado
            - HTTPException: 404 - Evento não encontrado
            - HTTPException: 500 - Erro no servidor
        """
        try:

            client = self.db_session.query(ClientModel).filter_by(id=alo.client_id).first()

            if not client:
                raise NotFound(ERROR_CLIENT_NOT_FOUND)

            event = self.db_session.query(EventModel).filter_by(id=alo.event_id).first()

            if not event:
                raise NotFound(ERROR_EVENT_NOT_FOUND)

            if event.alo_quantity == 0:
                raise BadRequest(ERROR_ALOS_OUT_OF_STOCK)

            event.alo_quantity -= 1  # Cada alo feito reduz a quantidade de alôs disponíveis

            payload = alo.dict(exclude=["payment_value"])

            new_alo: AloInDB = AloInDB(
                **payload,
                value=alo.payment_value
            )

            model = AloModel(**new_alo.dict())

            self.db_session.add(model)
            self.db_session.commit()

            self.db_session.add(AlosFromClient(
                id=id_generate(),
                alo_id=new_alo.id,
                client_id=alo.client_id,
                event_id=event.id
            ))

            producer = self.db_session.query(ClientModel).filter_by(
                cpf_cnpj=event.producer_cpf_cnpj).first()

            if producer:  # Se o produtor do evento for um cliente cadastrado, adiciona na tabela auxiliar
                self.db_session.add(AlosFromProducer(
                    id=id_generate(),
                    alo_id=new_alo.id,
                    event_id=alo.event_id,
                    producer_id=producer.id

                ))

            interlocutor = self.db_session.query(ClientModel).filter_by(
                cpf_cnpj=event.interlocutor_cpf_cnpj).first()

            if interlocutor:  # Se o interlocutor do evento for um cliente cadastrado, adiciona na tabela auxiliar

                self.db_session.add(AlosFromInterlocutor(
                    id=id_generate(),
                    alo_id=new_alo.id,
                    interlocutor_id=interlocutor.id,
                    event_id=event.id
                ))

            self.db_session.commit()
            self.db_session.refresh(model)

            return {
                "detail": MESSAGE_ALO_ADD_SUCCESS, 
                "alo_id": model.id,
                "pushToken": client.pushToken
            }

        except HTTPException as e:
            raise e

        except Exception as e:
            raise Server(e)


    def get_alo(self, id: str) -> AloResponse:
        """
        Busca um alo no banco de dados com base no seu ID

        - Args:
            - id:: str: ID do alo a ser buscado

        - Returns:
            - AloResponse: Objeto contendo as informações do alo buscado

        - Raises:
            - HTTPException: 400 - ID não informado
            - HTTPException: 404 - Alo não encontrado
            - HTTPException: 500 - Erro no servidor
        """
        try:
            if not id:
                raise BadRequest(ERROR_ALO_NOT_ID)

            alo: AloModel = self.db_session.query(
                AloModel).filter_by(id=id).first()

            if not alo:
                raise HTTPException(
                    status_code=404, detail=ERROR_ALO_NOT_FOUND)

            return self._Model_to_Response(alo)

        except HTTPException as e:
            raise e

        except Exception as e:
            raise 

    def list_all_alo(self) -> list[AloResponse]:
        """
        Retorna todos os alos salvos no banco de dados

        - Args:
            - None

        - Returns:
            - List[AloResponse]: Lista contendo todos os alos salvos no banco de dados

        - Raises:
            - HTTPException: 404 - Alos não encontrados
            - HTTPException: 500 - Erro no servidor
        """
        try:

            alos = self.db_session.query(AloModel).all()

            if len(alos) == 0:
                raise NotFound(ERROR_ALOS_NOT_FOUND)

            alo_list = self._Models_to_Responses(alos)

            return alo_list

        except HTTPException as e:
            raise e

        except Exception as e:
            raise Server(e)

    def list_all_user_alo(self, client_id: str) -> list[AloResponse]:
        """
        Retorna todos os alos salvos no banco de dados de um determinado usuário

        - Args:
            - client_id:: str: ID do usuário a ser buscado

        - Returns:
            - List[AloResponse]: Lista contendo todos os alos salvos no banco de dados do usuário buscado

        - Raises:
            - HTTPException: 400 - ID não informado
            - HTTPException: 404 - Alos não encontrados
            - HTTPException: 500 - Erro no servidor
        """
        try:

            if not client_id:
                raise BadRequest(ERROR_ALO_NOT_ID)

            alos = self.db_session.query(AloModel).filter_by(
                client_id=client_id).all()

            if len(alos) == 0:
                raise NotFound(ERROR_ALOS_NOT_FOUND)

            alo_list = self._Models_to_Responses(alos)

            return alo_list

        except HTTPException as e:
            raise e

        except Exception as e:
            raise Server(e)

    def list_all_event_alo(self, event_id: str) -> list[AloResponse]:
        """
        Retorna todos os alos salvos no banco de dados de um determinado Evento

        - Args:
            - event_id:: str: ID do evento a ser buscado

        - Returns:
            - List[AloResponse]: Lista contendo todos os alos salvos no banco de dados do evento buscado

        - Raises:
            - HTTPException: 400 - ID não informado
            - HTTPException: 404 - Alos não encontrados
            - HTTPException: 500 - Erro no servidor

        """
        try:

            if not event_id:
                raise BadRequest(ERROR_ALO_NOT_ID)

            alos = self.db_session.query(
                AloModel).filter_by(event_id=event_id).all()

            if len(alos) == 0:
                raise NotFound(ERROR_ALOS_NOT_FOUND)

            alo_list = self._Models_to_Responses(alos)

            return alo_list

        except HTTPException as e:
            raise e

        except Exception as e:
            raise Server(e)

    async def update_alo(self, alo_id: str, status:str) -> BaseMessage:
        """
        Altera o status de um alo, com base no id passado, sendo validos:


        - Args:
            - alo_id:: str: ID do alo a ser alterado
            - status:: Literal["APROVADO","FINALIZADO","REJEITADO"]: Novo status do alo

        - Returns:
            - dict[detail]: Mensagem de sucesso

        - Raises:
            - HTTPException: 400 - ID não informado
            - HTTPException: 400 - Status não informado
            - HTTPException: 400 - Status inválido
            - HTTPException: 404 - Alo não encontrado
            - HTTPException: 500 - Erro no servidor
        """
        try:
            if not alo_id:
                raise BadRequest(ERROR_ALO_NOT_ID)

            if not status:
                raise BadRequest(ERROR_ALO_NOT_STATUS)

            if status not in AloStatus.__dict__.values():
                raise BadRequest(ERROR_ALO_INVALID_STATUS)

            alo = self.db_session.query(AloModel).filter_by(id=alo_id).first()

            if not alo:
                raise NotFound(ERROR_ALO_NOT_FOUND)
                
            if alo.status == AloStatus.payment.value:

                if status == AloStatus.waiting.value:

                    alo.status = status

                    await self._waiting_aprove_notify(alo)

                else:

                    raise BadRequest(ERROR_ALO_INVALID_STATUS)

            elif alo.status == AloStatus.waiting.value:

                if status == AloStatus.approved.value:

                    alo.status = status

                    await self._aprove_notify(alo)

                elif status == AloStatus.rejected.value:

                    alo.status = status

                    await self._rejected_notify(alo)
                
                else:

                    raise BadRequest(ERROR_ALO_INVALID_STATUS)
                
            elif alo.status == AloStatus.approved.value:

                if status == AloStatus.finished.value:

                    alo.status = status

                    await self._finished_notify(alo)

                else:

                    raise BadRequest(ERROR_ALO_INVALID_STATUS)


            if alo.status == AloStatus.rejected.value:
                event = self.db_session.query(
                    EventModel).filter_by(id=alo.event_id).first()

                if event:
                    event.alo_quantity += 1

                else:
                    raise NotFound(ERROR_EVENT_NOT_FOUND)
            
            self._alo_SSE(alo)

            self.db_session.commit()
            self.db_session.refresh(alo)

            return BaseMessage(detail=MESSAGE_ALO_UPDATE_SUCCESS)
        

        except HTTPException as e:
            raise e

        except Exception as e:
            raise Server(e)

    def delete_alo(self, alo_id: str) -> BaseMessage:
        """
        Deleta um alo do banco de dados

        - Args:
            - alo_id:: str: ID do alo a ser deletado

        - Returns:
            - dict[detail]: Mensagem de sucesso

        - Raises:
            - HTTPException: 400 - ID não informado
            - HTTPException: 404 - Alo não encontrado
            - HTTPException: 500 - Erro no servidor
        """

        try:
            if not alo_id:

                raise BadRequest(ERROR_ALO_NOT_ID)

            alo = self.db_session.query(AloModel).filter_by(id=alo_id).first()

            if not alo:

                raise NotFound(ERROR_ALO_NOT_FOUND)
            
            event = self.db_session.query(EventModel).filter_by(id=alo.event_id).first()

            if not event:

                raise NotFound(ERROR_EVENT_NOT_FOUND)
            
            event.alo_quantity += 1

            self.db_session.delete(alo)
            self.db_session.commit()
            self.db_session.refresh(event)


            return BaseMessage(detail=MESSAGE_ALO_DELETE_SUCCESS)

        except HTTPException as e:
            raise e

        except Exception as e:
            raise Server(e)

    def _Model_to_Response(self, alo: AloModel) -> AloResponse:
        return AloResponse(
            **alo.dict(),
            event_name=self.db_session.query(EventModel).filter_by(id=alo.event_id).first().name
        )

    def _Models_to_Responses(self, alos: list[AloModel]) -> list[AloResponse]:

        response = []

        for alo in alos:
            if alo.status != AloStatus.payment.value:
                response.append(
                    self._Model_to_Response(alo)
                )

        return response

    def _alo_SSE(self,alo: AloModel) -> None:

        event = self.db_session.query(EventModel).filter_by(id=alo.event_id).first()

        producer = self.db_session.query(ClientModel).filter_by(cpf_cnpj=event.producer_cpf_cnpj).first()

        producer_id = producer.id

        interlocutor_id = producer.id
        
        if event.interlocutor_cpf_cnpj:
            interlocutor = self.db_session.query(ClientModel).filter_by(cpf_cnpj=event.interlocutor_cpf_cnpj).first()
            interlocutor_id = interlocutor.id

        SSE.add_event(
            AloEvent(
                type=UPDATE_ALO,
                message=json.dumps(
                    {   "alo_status": alo.status,
                        "alo_id": alo.id,
                        "client_id": alo.client_id,
                        "producer_id": producer_id,
                        "interlocutor_id": interlocutor_id
                    }
                )
            )
        )


    def _get_actors_notify(self, alo: AloModel) -> tuple[str | None, str | None, str | None]:
        """
        Envia a notificação de aprovação de um alo para todos os envolvidos
        """

        client = self.db_session.query(ClientModel).filter_by(id=alo.client_id).first()

        event = self.db_session.query(EventModel).filter_by(id=alo.event_id).first()

        if event.interlocutor_cpf_cnpj:

            interlocutor = self.db_session.query(ClientModel).filter_by(cpf_cnpj=event.interlocutor_cpf_cnpj).first()

            interlocutor = interlocutor.pushToken

        else :

            interlocutor = None

        producer = self.db_session.query(ClientModel).filter_by(cpf_cnpj=event.producer_cpf_cnpj).first()


        return client.pushToken, interlocutor, producer.pushToken

    async def _waiting_aprove_notify(self, alo: AloModel):
        """
        Envia a notificação de aguardando aprovação de um alo para o portador
        """

        client, interlocutor, producer = self._get_actors_notify(alo)

        await waiting_aprove_notify(
            client_pushToken=client,
            interlocutor_pushToken=interlocutor,
            producer_pushToken=producer
        )

    async def _aprove_notify(self, alo: AloModel):
        """
        Envia a notificação de aprovação de um alo para todos os envolvidos
        """

        client, interlocutor, producer = self._get_actors_notify(alo)

        await approved_notify(
            client_pushToken=client,
            interlocutor_pushToken=interlocutor,
            producer_pushToken=producer
        )


    async def _finished_notify(self, alo: AloModel):
        """
        Envia a notificação de finalização de um alo para todos os envolvidos
        """
            
        client, interlocutor, producer = self._get_actors_notify(alo)

        await finished_notify(
            client_pushToken=client,
            interlocutor_pushToken=interlocutor,
            producer_pushToken=producer
        )

    
    async def _rejected_notify(self, alo: AloModel):
        """
        Envia a notificação de rejeição de um alo para todos os envolvidos
        """
            
        client, interlocutor, producer = self._get_actors_notify(alo)

        await rejected_notify(
            client_pushToken=client,
            interlocutor_pushToken=interlocutor,
            producer_pushToken=producer
        )
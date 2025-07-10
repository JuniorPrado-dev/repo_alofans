from typing import Literal
from fastapi.exceptions import HTTPException
import httpx
from sqlalchemy.orm import Session


from schemas.tokens import TokenData
from constants.alo import (
    ERROR_ALO_NOT_FOUND,
    ERROR_ALO_NOT_ID, 
    ERROR_ALOS_NOT_FOUND, 
    MESSAGE_ALO_DELETE_SUCCESS
)
from constants.person import (
    ERROR_CLIENT_ADD_EMAIL_ALREADY_EXISTS,
    ERROR_CLIENT_ADD_GOOGLE_ACC_ALREADY_EXISTS,
    ERROR_CLIENT_ADD_PHONE_ALREADY_EXISTS,
    ERROR_CLIENT_ALOS_FROM_INTERLOCUTOR,
    ERROR_CLIENT_ALOS_FROM_PRODUCER,
    ERROR_CLIENT_ADD_CPF_CNPJ_ALREADY_EXISTS,
    ERROR_CLIENT_EVENTS_FROM_INTERLOCUTOR,
    ERROR_CLIENT_EVENTS_FROM_PRODUCER,
    ERROR_CLIENT_INVALID_ACCESS_LEVEL,
    ERROR_CLIENT_LOGIN_INVALID_PASSWORD,
    ERROR_CLIENT_LOGIN_NEGATE_ACCESS,
    ERROR_CLIENT_LOGIN_NOT_CREDENTIALS,
    ERROR_CLIENT_LOGIN_NOT_FOUND_EMAIL,
    ERROR_CLIENT_NO_ID,
    ERROR_CLIENT_NOT_FOUND,
    ERROR_CLIENT_NOT_UPDATED,
    ERROR_CLIENTS_NOT_FOUND,
    MESSAGE_CLIENT_ADD_SUCCESS,
    MESSAGE_CLIENT_DELETE_SUCCESS,
    MESSAGE_CLIENT_UPDATE_SUCCESS
)
from constants.event import(
    ERROR_EVENT_NOT_FOUND, 
    ERROR_EVENTS_NOT_FOUND, 
    MESSAGE_EVENT_DELETE_SUCCESS
)
from constants.openpix import ERROR_PIX_KEY_TYPE_INVALID
from db.models import (
    Alo as AloModel,
    AlosFromClient,
    AlosFromInterlocutor,
    AlosFromProducer, 
    Client as ClientModel, 
    Event as EventModel,
    EventsFromInterlocutor,
    EventsFromProducer
)
from enums.alo import AloStatus
from enums.openpix import PixKeyType
from enums.event import EventType
from enums.user import UserLevel
from schemas.alo import AloResponse
from schemas.base import BaseMessage
from schemas.client import (
    ClientInDB, 
    ClientRequest, 
    ClientResponse, 
    ClientLogin, 
    ClientUpDate
)
from schemas.event import EventResponse
from schemas.payment import SubAccountRequest
from schemas.tokens import TokenResponse
from services.ids import id_generate
from services.email.generate import (
    generate_email,
    generate_email_body_with_password
)
from services.email.send import send_email
from services.generator.password import generate_random_password
from services.security.password import (
    protect,
    verify
)
from services.tokens import (
    generate_token,
    encode_token, 
    decode_token
)
from useCases.payment import PaymentUseCases
from utils.format import date_to_str
from utils.messages.error import (
    BadRequest,
    Conflict,
    NotFound,
    Server
)


class ClientUseCases:
    
    def __init__(self, db_session: Session):
        self.db_session = db_session

    # Criar client(s)
    def add(self, client: ClientRequest) -> BaseMessage: #, image: UploadFile = None
        """
        Adiciona um cliente ao banco de dados
        
        - Args:
            - client:: ClientRequest: Dados do cliente que serão adicionados
            
        - Returns:
            - BaseMessage: Resposta com uma mensagem de sucesso caso o cliente seja adicionado
            
        - Raises:
            - HTTPException: 400 - Número de telefone já cadastrado
            - HTTPException: 400 - E-mail já cadastrado
            - HTTPException: 400 - Conta Google já cadastrada
            - HTTPException: 500 - Erro no servidor
        """
        
        try:

            self._check_client_existence(
                client.email, 
                client.phone, 
                client.google_id
            )
            
            client.password = protect(client.password)            
            
            client_db: ClientInDB = ClientInDB(**client.dict(), id=id_generate(), level=UserLevel.client.value)

            new_client = ClientModel(**client_db.dict())
            
            self.db_session.add(new_client)

            self.db_session.commit()

            return BaseMessage(detail=MESSAGE_CLIENT_ADD_SUCCESS)
        
        except HTTPException:
            raise

        except Exception as e:
            raise Server(e)


    def get(self, id: str) -> ClientResponse:
        """
        Busca um cliente com base em seu id
        
        - Args:
            - id:: str: ID do cliente
            
        - Returns:
            - ClientResponse: Dados do cliente conforme o ID fornecido
            
        - Raises:
            - HTTPException: 404 - Cliente não encontrado
            - HTTPException: 500 - Erro no servidor
        """
        try:
            client = self._get(id)
            
            return self._Model_to_Response(client)

        except HTTPException:
            raise
        except Exception as e:
            raise Server(e)


    def get_all(self) -> list[ClientResponse]:
        """
        Lista todos os clientes salvos no banco de dados
        
        - Returns:
            - List[ClientResponse]: Lista de clientes conforme os dados salvos no banco de dados
            
        - Raises:
            - HTTPException: 404 - Clientes não encontrados
            - HTTPException: 500 - Erro no servidor
        """
        try:
            
            clients = self._get_all()

            return self._Models_to_Responses(clients)
        
        except HTTPException:
            raise

        except Exception as e:
            raise Server(e)
        

    def update(self, client_id: str, client_update: ClientUpDate) -> BaseMessage:
        """
        Atualiza os dados de um cliente com base nos dados passados se o cliente existir
        
        - Args:
            - client_id:: str: ID do cliente
            - client_update:: ClientUpDate: Dados que serão atualizados
            
        - Returns:
            - dict: Mensagem de sucesso
        
        - Raises:
            - HTTPException: 400 - ID do cliente não informado
            - HTTPException: 400 - Nenhum campo informado para atualizar
            - HTTPException: 400 - Nível de acesso inválido
            - HTTPException: 400 - Tipo de chave PIX inválida
            - HTTPException: 404 - Cliente não encontrado
            - HTTPException: 409 - CPF/CNPJ já cadastrado
            - HTTPException: 500 - Erro no servidor
        """
        try:
            client = self._get(client_id)
            
            if client_update.cpf_cnpj and client_update.cpf_cnpj == client.cpf_cnpj:
                raise BadRequest(ERROR_CLIENT_ADD_CPF_CNPJ_ALREADY_EXISTS)
            

            another_client = self.db_session.query(ClientModel).filter_by(cpf_cnpj=client_update.cpf_cnpj).first()

            if another_client and (another_client.level.upper =="PRODUTOR" or another_client.level.upper == "INTERLOCUTOR") and another_client.id!= client_id:
                raise Conflict(ERROR_CLIENT_ADD_CPF_CNPJ_ALREADY_EXISTS)
                
            total_updates = 0
            
            for field, value in client_update.dict().items():
                
                if value is not None:

                    if field == "level":
                        if value not in UserLevel.__dict__.values():
                            raise BadRequest( ERROR_CLIENT_INVALID_ACCESS_LEVEL)
                        
                    elif field == "pixkey_type":
                        value = value.upper()
                        if value not in PixKeyType.__dict__.values():
                            print(value)
                            raise BadRequest( ERROR_PIX_KEY_TYPE_INVALID)
                    
                    elif field == "password":
                        
                        value = protect(value)

                    
                    setattr(client, field, value)
                    total_updates += 1
                    
            if total_updates == 0:
                
                raise BadRequest( ERROR_CLIENT_NOT_UPDATED)
            
            if client_update.level == UserLevel.producer.value:
                uc = PaymentUseCases(self.db_session)
                uc.create_subaccount(
                    account=SubAccountRequest(
                        name=client.cpf_cnpj,
                        pixKey=client.pixkey
                )
            )   

            self.db_session.commit()
            self.db_session.refresh(client)
            
            return BaseMessage(detail=MESSAGE_CLIENT_UPDATE_SUCCESS)
        
        except HTTPException as e:
            print(e)
            raise e

        except Exception as e:
            raise Server(e)


    def delete(self, id: str) -> BaseMessage:
        """
        Deleta um cliente com base no id passado, caso o cliente exista
        
        - Args:
            - id:: str: ID do cliente
            
        - Returns:
            - dict[str, str]: Mensagem de sucesso
            
        - Raises:
            - HTTPException: 400 - ID do cliente não informado
            - HTTPException: 404 - Cliente não encontrado
            - HTTPException: 500 - Erro no servidor
        """
        try:
            client = self._get(id)

            self.db_session.delete(client)
            self.db_session.commit()
            
            return BaseMessage(detail=MESSAGE_CLIENT_DELETE_SUCCESS)

        except HTTPException:
            raise

        except Exception as e:
            raise Server(e)
        

    def login(self, client_login: ClientLogin) -> TokenResponse:
        """
        Primeiro passo, checar google id, em seguida login e senha

        - Args:
            - client_login (ClientLogin): Objeto contendo os seguintes atributos
                - google_id: Optional[str] = None
                - email: Optional[str] = None
                - password: Optional[str] = None

        - Process:
            - Checa cada campo recebido do login e tenta autenticar com base nas possibilidades:
                - se o google_id for passado
                    - se o google_id existir no banco de dados
                        - True
                - se o email for passado e a senha também
                    - se o email existir no banco de dados
                        - se a senha após a criptografia estiver correta para aquele cliente
                            - True
        
        - Returns:

            - dict["token": str] : Token JWT de autenticação
            
        - Raises:
            - HTTPException: 400 - E-mail não encontrado
            - HTTPException: 400 - Senha incorreta
            - HTTPException: 400 - Passe todas as suas credenciais de acesso
            - HTTPException: 500 - Erro no servidor
            
        """

        try:
            if client_login.google_id:  # Conferindo se google_id existe
                client = self.db_session.query(ClientModel).filter_by(google_id=client_login.google_id).first()
                if client:
                    token = generate_token(client)

                    if client_login.pushToken:
                        client.pushToken = client_login.pushToken
                        self.db_session.commit()

                    return TokenResponse(token=encode_token(token))
                
                if client_login.email:  # Conferindo se o email e senha foram passados
                    client = self.db_session.query(ClientModel).filter_by(email=client_login.email).first()  # Conferindo se o email existe no bd
                    
                    if client:
                        self.update(
                            client.id,
                            ClientUpDate(google_id=client_login.google_id)
                        )
                        
                        token = generate_token(client)

                        if client_login.pushToken:
                            client.pushToken = client_login.pushToken
                            self.db_session.commit()

                        return TokenResponse(token=encode_token(token))
                raise BadRequest( ERROR_CLIENT_LOGIN_NOT_FOUND_EMAIL)
                   
            if client_login.email and client_login.password:
                client = self.db_session.query(ClientModel).filter_by(email=client_login.email).first()
                if client:
                    if client_login.password:
                        if verify(client_login.password, client.password):  # Conferindo se a senha bate com a salva no bd
                            token = generate_token(client)

                            if client_login.pushToken:
                                client.pushToken = client_login.pushToken
                                self.db_session.commit()

                            return TokenResponse(token=encode_token(token))
            
                        raise BadRequest(ERROR_CLIENT_LOGIN_INVALID_PASSWORD)
                raise BadRequest( ERROR_CLIENT_LOGIN_NOT_FOUND_EMAIL)
            raise BadRequest( ERROR_CLIENT_LOGIN_NOT_CREDENTIALS)
        
        except HTTPException:
            raise
        
        except Exception as e:
            raise Server(e)
        

    def verify_access_token(self, token:str) -> TokenData:
        try:
           return decode_token(token)   
        except HTTPException as e:
            raise e
        

    def verify_access_token_client(self, token):
        try:
           data=decode_token(token)
           if data["level"] != UserLevel.client.value:
               raise HTTPException(401, ERROR_CLIENT_LOGIN_NEGATE_ACCESS)
               
        except HTTPException as e:
            raise e
    

    def verify_access_token_interlocutor(self, token):
        try:
           data=decode_token(token)
           if data["level"] != UserLevel.interlocutor.value:
               raise HTTPException(401, ERROR_CLIENT_LOGIN_NEGATE_ACCESS)
               
        except HTTPException as e:
            raise e
    

    def verify_access_token_producer(self, token):
        try:
           data=decode_token(token)
           if data["level"] != UserLevel.producer.value:
               raise HTTPException(401, ERROR_CLIENT_LOGIN_NEGATE_ACCESS)
               
        except HTTPException as e:
            raise e

    
    async def google_auth(self, access_token: str) -> dict:
        try:
            if not access_token:
                raise HTTPException(status_code=400, detail="Access Token is missing")
            
            url = "https://www.googleapis.com/oauth2/v3/userinfo"
            headers = {"Authorization": f"Bearer {access_token}"}
            
            async with httpx.AsyncClient() as client:
                response = await client.get(url, headers=headers)
                
            if response.status_code != 200:
                raise HTTPException(response.status_code,"Authentication required")
            return response.json()

        except HTTPException as e:
            return {"error": f"Authentication failed: {e}"}


    def recover_password(self, email: str) -> TokenResponse:
        """
        Recuperação de senha do usuário via Email

        - Args:
            - email (str): Email do usuário

        - Returns:
            - BaseMessage: Mensagem de sucesso
        """

        try:

            user = self.db_session.query(ClientModel).filter_by(email=email).first()

            if user is None:
                raise NotFound(ERROR_CLIENT_LOGIN_NOT_FOUND_EMAIL)

            new_password = generate_random_password()

            user.password = protect(new_password)

            self.db_session.commit()

            
            _ = send_email(
                email,
                generate_email(
                    email,
                    "Recuperação de Senha",
                    generate_email_body_with_password(new_password),
                )
            )

            token = generate_token(user)
            return TokenResponse(token=encode_token(token))
        
        except HTTPException:

            raise 
        
        except Exception as e:
            raise Server(e)
    
    
    def get_all_alos_from_client(self, client_id: str) -> list[AloResponse]:
        """
        Retorna todos os alos realizados pelo cliente com base no id passado
        
        - Args:
          - client_id:: str: ID do cliente
          
        - Returns:
          - List[AlosFromClient]: Lista de alos realizados pelo cliente
          
        - Raises:
            - HTTPException: 404 - Alos não encontrados
            - HTTPException: 500 - Erro no servidor
        """
        try:
            alos_from_client = self._get_alos(client_id,"client")
            
            return self._Models_to_AlosFromClients(alos_from_client)
        
        except HTTPException:
            raise

        except Exception as e:
            raise Server(e)
        

    def delete_alo_from_client(self, alo_id: str) -> BaseMessage:
        """
        Deleta do histórico do cliente, o alo que ele realizou caso não queira mais visualizar
        
        - Args:
          - id_alo_from_client (str): ID do alo que o cliente deseja excluir
          
        - Returns:
          - dict[str, str]: Mensagem de sucesso
          
        - Raises:
            - HTTPException: 404 - Alo não encontrado
            - HTTPException: 500 - Erro no servidor
        """
        try:
            afc = self._get_alo(alo_id, "client")

            self.db_session.delete(afc)
            self.db_session.commit()
            
            return BaseMessage(detail= MESSAGE_ALO_DELETE_SUCCESS)
        except HTTPException:
            raise

        except Exception as e:
            raise Server(e)
        

    def get_all_alos_from_interlocutor(self, client_id) -> list[AloResponse]:
        """
        Retorna todos os alos realizados pelo interlocutor com base no cpf/cnpj passado
        
        - Args:
          - client_id::str str: ID de um cliente que é interlocutor (level= INTERLOCUTOR)
          
        - Returns:
          - List[AlosFromInterlocutor]: Lista de alos realizados pelo interlocutor
          
        - Raises:
            - HTTPException: 404 - Alos não encontrados
            - HTTPException: 500 - Erro no servidor
        """
        try:
            client = self._get(client_id)
            
            if client.level != UserLevel.interlocutor.value and client.level != UserLevel.producer.value:
                
                raise NotFound(ERROR_CLIENT_ALOS_FROM_INTERLOCUTOR)
                                           
            alos_from_interlocutor = self.db_session.query(AlosFromInterlocutor).filter_by(interlocutor_id=client.id).all()
            
            if not alos_from_interlocutor:
                raise NotFound(ERROR_ALOS_NOT_FOUND)
            
            return self._models_to_AlosFromInterlocutor(alos_from_interlocutor)
        
        except HTTPException:
            raise
        
        except Exception as e:
            raise Server(e)
    

    def delete_alo_from_interlocutor(self, alo_id: str) -> BaseMessage:
        """
        Deleta do histórico do interlocutor, o alo que ele realizou caso não queira mais visualizar
        
        - Args:
          - id_alo_from_interlocutor (str): ID do alo que o interlocutor deseja excluir
          
        - Returns:
          - dict[str, str]: Mensagem de sucesso
          
        - Raises:
            - HTTPException: 404 - Alo não encontrado
            - HTTPException: 500 - Erro no servidor
        """
        try:
            afi = self.db_session.query(AlosFromInterlocutor).filter_by(alo_id=alo_id).first()
            
            if not afi:
                raise NotFound(ERROR_ALO_NOT_FOUND)
            
            self.db_session.delete(afi)
            self.db_session.commit()
            
            return BaseMessage(detail= MESSAGE_ALO_DELETE_SUCCESS)

        except HTTPException:
            raise

        except Exception as e:
            raise Server(e)
        

    def get_all_alos_from_producer(self, client_id) -> list[AloResponse]:
        """
        Retorna todos os alos realizados pelo interlocutor com base no cpf/cnpj passado
        
        - Args:
          - client_id::str str: ID de um cliente que é interlocutor (level= INTERLOCUTOR)
          
        - Returns:
          - List[AlosFromInterlocutor]: Lista de alos realizados pelo interlocutor
          
        - Raises:
            - HTTPException: 404 - Alos não encontrados
            - HTTPException: 500 - Erro no servidor
        """
        try:
            client = self.db_session.query(ClientModel).filter_by(id=client_id).first()
            
            if not client:
                raise NotFound(ERROR_CLIENT_NOT_FOUND)
            
            if  client.level != UserLevel.producer.value:
                raise NotFound(ERROR_CLIENT_ALOS_FROM_PRODUCER)
                                           
            alos_from_interlocutor = self.db_session.query(AlosFromProducer).filter_by(producer_id=client_id).all()
            
            if not alos_from_interlocutor or len(alos_from_interlocutor) == 0:
                raise NotFound(ERROR_ALOS_NOT_FOUND)
            
            return self._models_to_AlosFromInterlocutor(alos_from_interlocutor)
        
        except HTTPException:
            raise
        
        except Exception as e:
            raise Server(e)
    

    def delete_alo_from_producer(self, alo_id: str) -> BaseMessage:
        """
        Deleta do histórico do interlocutor, o alo que ele realizou caso não queira mais visualizar
        
        - Args:
          - id_alo_from_interlocutor (str): ID do alo que o interlocutor deseja excluir
          
        - Returns:
          - dict[str, str]: Mensagem de sucesso
          
        - Raises:
            - HTTPException: 404 - Alo não encontrado
            - HTTPException: 500 - Erro no servidor
        """
        try:
            afi = self.db_session.query(AlosFromProducer).filter_by(alo_id=alo_id).first()
            
            if not afi:
                raise NotFound(ERROR_ALO_NOT_FOUND)
            
            self.db_session.delete(afi)
            self.db_session.commit()
            
            return BaseMessage(detail= MESSAGE_ALO_DELETE_SUCCESS)
        
        except HTTPException:
            raise

        except Exception as e:
            raise Server(e)
        

    def get_all_events_from_interlocutor(self, client_id:str) -> list[EventResponse]:
        """
        Retorna todos os eventos realizados pelo interlocutor com base no cpf/cnpj passado
        
        - Args:
          - interlocutor_id::str str: ID do cliente que é interlocutor
          
        - Returns:
          - List[EventResponse]: Lista de eventos realizados pelo interlocutor
          
        - Raises:
            - HTTPException: 404 - Eventos não encontrados
            - HTTPException: 500 - Erro no servidor
        """
        try:
            interlocutor = self.db_session.query(ClientModel).filter_by(id=client_id).first()
            
            if not interlocutor:
                raise NotFound(ERROR_CLIENT_NOT_FOUND)
            
            if interlocutor.level != UserLevel.producer.value and interlocutor.level != UserLevel.interlocutor.value:
                raise NotFound(ERROR_CLIENT_EVENTS_FROM_INTERLOCUTOR)
            
            events = self.db_session.query(EventsFromInterlocutor).filter_by(interlocutor_id=client_id).all()
            
            if not events or len(events) == 0:
                raise NotFound(ERROR_EVENTS_NOT_FOUND)
            
            return self._EventsFromInterlocutor_to_EventResponse(events)
        except HTTPException:
            raise

        except Exception as e:
            raise Server(e)
        

    def delete_event_from_interlocutor(self, event_id: str) -> dict[str, str]:
        """
        Deleta do histórico do produtor, o evento que ele realizou caso não queira mais visualizar
        
        - Args:
          - event_from_producer_id (str): ID do evento que o produtor deseja excluir
          
        - Returns:
          - dict[str, str]: Mensagem de sucesso
          
        - Raises:
            - HTTPException: 404 - Evento não encontrado
            - HTTPException: 500 - Erro no servidor
        """
        try:
            event = self.db_session.query(EventsFromInterlocutor).filter_by(id=event_id).first()
            
            if not event:
                raise NotFound(ERROR_EVENT_NOT_FOUND)
            
            self.db_session.delete(event)
            self.db_session.commit()
            
            return BaseMessage(detail= MESSAGE_EVENT_DELETE_SUCCESS)
        except HTTPException:
            raise

        except Exception as e:
            raise Server(e)
        

    def get_all_events_from_producer(self, client_id:str) -> list[EventResponse]:
        """
        Retorna todos os eventos realizados pelo interlocutor com base no cpf/cnpj passado
        
        - Args:
          - producer_id::str str: ID do cliente que é produtor
          
        - Returns:
          - List[EventResponse]: Lista de eventos realizados pelo produtor
          
        - Raises:
            - HTTPException: 404 - Eventos não encontrados
            - HTTPException: 500 - Erro no servidor
        """
        try:
            producer = self.db_session.query(ClientModel).filter_by(id=client_id).first()
            
            if not producer:
                raise NotFound(ERROR_CLIENT_NOT_FOUND)
            
            if producer.level != UserLevel.producer.value:
                raise NotFound(ERROR_CLIENT_EVENTS_FROM_PRODUCER)
            
            events = self.db_session.query(EventsFromProducer).filter_by(producer_id=client_id).all()
            
            if not events or len(events) == 0:
                raise NotFound(ERROR_EVENTS_NOT_FOUND)
            
            return self._EventsFromProducer_to_EventResponse(events)
        except HTTPException:
            raise
        
        except Exception as e:
            raise Server(e)
        

    def delete_event_from_producer(self, event_id: str) -> BaseMessage:
        """
        Deleta do histórico do produtor, o evento que ele realizou caso não queira mais visualizar
        
        - Args:
          - event_from_producer_id (str): ID do evento que o produtor deseja excluir
          
        - Returns:
          - dict[str, str]: Mensagem de sucesso
          
        - Raises:
            - HTTPException: 404 - Evento não encontrado
            - HTTPException: 500 - Erro no servidor
        """
        try:
            event = self.db_session.query(EventsFromProducer).filter_by(event_id=event_id).first()
            
            if not event:
                raise NotFound(ERROR_EVENT_NOT_FOUND)
            
            self.db_session.delete(event)
            self.db_session.commit()
            
            return BaseMessage(detail= MESSAGE_EVENT_DELETE_SUCCESS)
        except HTTPException:
            raise

        except Exception as e:
            raise Server(e)
    

    def _get(self, id: str) -> ClientModel:
            
            if not id:
                raise BadRequest( ERROR_CLIENT_NO_ID)

            client = self.db_session.query(ClientModel).filter_by(id=id).first()

            if not client:

                raise NotFound(ERROR_CLIENT_NOT_FOUND)
            
            return client
    

    def _get_all(self) -> list[ClientModel]:

        clients = self.db_session.query(ClientModel).all()

        if not clients or len(clients) == 0:

            raise NotFound(ERROR_CLIENTS_NOT_FOUND)
        
        return clients

    
    def _get_alo(self, id: str, level: Literal["client", "interlocutor", "producer"]) -> AlosFromClient | AlosFromInterlocutor | AlosFromProducer:
        """
        Retorna um alo com base no seu id
        
        - Args:
            - id:: str: ID do portador do alo
            - level:: Literal["client", "interlocutor", "producer"]: Nível de acesso do cliente
            
        - Returns:
            - AloModel: Objeto do tipo AloModel
            
        - Raises:
            - HTTPException: 404 - Alo não encontrado
        """
        if not id:
            raise BadRequest( ERROR_ALO_NOT_ID)
        
        if level == "client":
            alo = self.db_session.query(AlosFromClient).filter_by(alo_id=id).first()

        elif level == "interlocutor":
            alo = self.db_session.query(AlosFromInterlocutor).filter_by(alo_id=id).first()

        elif level == "producer":
            alo = self.db_session.query(AlosFromProducer).filter_by(alo_id=id).first()

        if not alo:
            raise NotFound(ERROR_ALO_NOT_FOUND)
        
        return alo
    
    
    def _get_alos(self, id: str, level: Literal["client", "interlocutor", "producer"]) -> list[AlosFromClient | AlosFromInterlocutor | AlosFromProducer]:
        """
        Retorna todos os alos com base no nível de acesso passado
        
        - Args:
            - level:: Literal["client", "interlocutor", "producer"]: Nível de acesso do cliente
            
        - Returns:
            - List[AlosFromClient | AlosFromInterlocutor | AlosFromProducer]: Lista de alos
        """
        if level == "client":
            alos = self.db_session.query(AlosFromClient).filter_by(client_id=id).all()

        elif level == "interlocutor":
            alos = self.db_session.query(AlosFromInterlocutor).filter_by(interlocutor_id=id).all()

        elif level == "producer":
            alos = self.db_session.query(AlosFromProducer).filter_by(producer_id=id).all()
        
        if not alos or len(alos) == 0:
            raise NotFound(ERROR_ALOS_NOT_FOUND)

        return alos

    def _Model_to_Response(self, model: ClientModel) -> ClientResponse:
        """
        Mapeia um Client Model para um ClientResponse
        
        - Args:
            - model (ClientModel): Objeto do tipo ClientModel
            
        - Returns:
        - ClientResponse: Objeto do tipo ClientResponse com os dados do ClienteModel
        """
        return ClientResponse(
            id=model.id,
            name=model.name,
            email=model.email,
            phone=model.phone,
            level=model.level,
            cpf_cnpj=model.cpf_cnpj,
            pixkey_type=model.pixkey_type,
            pixkey=model.pixkey,
            pushToken=model.pushToken
        )
        

    def _Models_to_Responses(self, models: list[ClientModel]) -> list[ClientResponse]:
        """
        Mapeia uma lita de models para uma lista de responses
        
        - Args:
            - models (list[ClientModel]): Lista de objetos do tipo ClientModel
            
        - Returns:
            - list[ClientResponse]: Lista de objetos do tipo ClientResponse com os dados dos ClientModel
        """
        return [self._Model_to_Response(model) for model in models]
    

    def _Models_to_AlosFromClients(self, models: list[AlosFromClient]) -> list[AloResponse]:
        """
        Mapeia uma lista de models de AlosFromClient para uma lista de AloResponse
        
        - Args:
            - models (list[AlosFromClient]): Lista de objetos do tipo AlosFromClient
            
        - Returns:
            - list[AloResponse]: Lista de objetos do tipo AloResponse com os dados dos AlosFromClient
        """
        result = []
        for model in models:
            alo = self.db_session.query(AloModel).filter_by(id=model.alo_id).first()
            if alo.status != AloStatus.payment.value:
                event = self.db_session.query(EventModel).filter_by(id=model.event_id).first()
                result.append(
                    AloResponse(
                    **alo.dict(),
                    event_name=event.name
                )
                ) 
            
        return result
    

    def _models_to_AlosFromInterlocutor(self, models: list[AlosFromInterlocutor]) -> list[AloResponse]:
        """
        Mapeia uma lista de models de AlosFromInterlocutor para uma lista de AloResponse
        
        - Args:
            - models (list[AlosFromInterlocutor]): Lista de objetos do tipo AlosFromInterlocutor
            
        - Returns:
            - list[AloResponse]: Lista de objetos do tipo AloResponse com os dados dos AlosFromInterlocutor
        """
        result = []
        for model in models:
            alo = self.db_session.query(AloModel).filter_by(id=model.alo_id).first()
            if alo.status != AloStatus.payment.value:
                event = self.db_session.query(EventModel).filter_by(id=model.event_id).first()
                result.append(
                    AloResponse(
                    **alo.dict(),
                    event_name=event.name
                )
                ) 
            
        return result
    

    def _models_to_AlosFromProducer(self, models: list[AlosFromProducer]) -> list[AloResponse]:
        """
        Mapeia uma lista de models de AlosFromProducer para uma lista de AloResponse
        
        - Args:
            - models (list[AlosFromProducer]): Lista de objetos do tipo AlosFromProducer
            
        - Returns:
            - list[AloResponse]: Lista de objetos do tipo AloResponse com os dados dos AlosFromProducer
        """
        result = []
        for model in models:
            alo = self.db_session.query(AloModel).filter_by(id=model.alo_id).first()
            if alo.status != AloStatus.payment.value:
                event = self.db_session.query(EventModel).filter_by(id=model.event_id).first()
                result.append(
                    AloResponse(
                    **alo.dict(),
                    event_name=event.name
                )
                ) 
            
        return result
    

    def _Model_to_EventResponse(self,event_model: EventModel) -> EventResponse:
    
        keys = event_model.dict()
        
        type_event = EventType.online.value if keys["is_online"] else EventType.offline.value
        date = date_to_str(keys["date"])
        
        del keys["is_online"]
        del keys["date"]

        producer = self.db_session.query(ClientModel).filter_by(cpf_cnpj=event_model.producer_cpf_cnpj).first()

        interlocutor = self.db_session.query(ClientModel).filter_by(cpf_cnpj=event_model.interlocutor_cpf_cnpj).first()

        interlocutor_name = ""

        if interlocutor:
            interlocutor_name = interlocutor.name
        
        return EventResponse(
            **keys,
            date=date,
            type=type_event,
            name_producer= producer.name,
            producer_pixkey= producer.pixkey,
            name_interlocutor= interlocutor_name
        )
    

    def _EventFromProducer_to_EventResponse(self, event: EventsFromProducer) -> EventResponse:
        event_model = self.db_session.query(EventModel).filter_by(id=event.event_id).first()
        return self._Model_to_EventResponse(event_model)


    def _EventFromInterlocutor_to_EventResponse(self, event: EventsFromInterlocutor) -> EventResponse:
        event_model = self.db_session.query(EventModel).filter_by(id=event.event_id).first()
        return self._Model_to_EventResponse(event_model)
        

    def _EventsFromProducer_to_EventResponse(self, events: list[EventsFromProducer]) -> list[EventResponse]:
        return [self._EventFromProducer_to_EventResponse(event) for event in events]
    

    def _EventsFromInterlocutor_to_EventResponse(self, events: list[EventsFromInterlocutor]) -> list[EventResponse]:
        return [self._EventFromProducer_to_EventResponse(event) for event in events]
    

    def _check_client_existence(
            self,
            email: str | None,
            phone: str | None,
            google_id: str | None
        ):
        """
        Função Interna para verificar a existência de um cliente no banco de dados
        
        - Args:
            - email:: str | None: E-mail do cliente
            - phone:: str | None: Número de telefone do cliente
            - google_id:: str | None: ID do cliente no Google
            
        - Returns:
            - None
            
        - Raises:
            - HTTPException: 400 - Número de telefone já cadastrado
            - HTTPException: 400 - E-mail já cadastrado
            - HTTPException: 400 - Conta Google já cadastrada
        """
        # Verificar duplicação de email
        if email and self.db_session.query(ClientModel).filter(ClientModel.email == email).first():
            raise HTTPException(
                400, ERROR_CLIENT_ADD_EMAIL_ALREADY_EXISTS)
            
        # Verificar duplicação de numero de telefone
        if phone and self.db_session.query(ClientModel).filter(ClientModel.phone == phone).first():
            raise HTTPException(
                400, ERROR_CLIENT_ADD_PHONE_ALREADY_EXISTS)
            
        if google_id and self.db_session.query(ClientModel).filter(ClientModel.google_id == google_id).first():
            raise HTTPException(
                400, ERROR_CLIENT_ADD_GOOGLE_ACC_ALREADY_EXISTS) #
            
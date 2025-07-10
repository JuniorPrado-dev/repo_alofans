from fastapi import (
    HTTPException, 
    UploadFile
)
from sqlalchemy.orm import Session


from constants.marketing import (
    ERROR_MARKETING_GET_NOT_FOUND,
    ERROR_MARKETING_LIST_EMPTY,
    ERROR_MARKETING_REQUIRED_FIELD_IS_GLOBAL,
    ERROR_MARKETING_REQUIRED_FIELD_STATE,
    ERROR_MARKETING_REQUIRED_FIELD_CITY,
    SUCCESS_MARKETING_ADD,
    SUCCESS_MARKETING_DELETE
)
from db.models import Marketing as MarketingModel
from schemas.base import BaseMessage
from schemas.marketing import (
    MarketingRequest,
    MarketingResponse,
    map_MarketingModel_to_MarketingOutput
)
from services.ids import id_generate
from services.image import (
    upload_image, 
    image_path_on_db, 
    delete_image
)
from utils.messages.error import(
    BadRequest,
    NotFound,
    Server
)
from utils.messages.success import Success

class MarketingUseCases:
    def __init__(self, db_session: Session):
        self.db_session = db_session
        
    def add_marketing(self, marketing: MarketingRequest, image: UploadFile) -> BaseMessage:
        """
        Cadastra um novo marketing no banco de dados

        - Args:
            - marketing:: MarketingRequest: Dados do marketing a ser cadastrado
            - image:: UploadFile: Imagem do marketing a ser cadastrado

        - Returns:
            - BaseMessage: Resposta com uma mensagem de sucesso caso o marketing seja cadastrado com sucesso

        - Raises:
            - HTTPException: 400 - Campos obrigatórios não preenchidos
            - HTTPException: 500 - Erro no servidor
        """
        try:
            
            marketing_id = id_generate()
            
            upload_image("marketing", image, marketing_id)
            
            model = MarketingModel(
                id=marketing_id,   
                image_path=image_path_on_db("marketing", marketing_id),
                **marketing.dict()
                )
            
            self.db_session.add(model)
            self.db_session.commit()
            
            return Success(SUCCESS_MARKETING_ADD)
        except HTTPException:
            raise
        
        except Exception as e:
            raise Server(e)
    
    def list_all_marketing(self) -> list[MarketingResponse]:
        """
        Listar todos os marketings salvos no banco de dados

        - Args:
            - None
        
        - Returns:
            - List[MarketingResponse]: Lista de marketings conforme os dados salvos no banco de dados
        """
        try:
            marketings = self.db_session.query(MarketingModel).all()
            
            if len(marketings) == 0:
                raise NotFound(ERROR_MARKETING_LIST_EMPTY)
            
            result = [
                map_MarketingModel_to_MarketingOutput(marketing)
                for marketing in marketings
            ]
        
            return result
        
        except HTTPException:
            raise 
        
        except Exception as e:
            raise Server(e)
        
    def get_marketing_by_id(self,id:str) -> MarketingResponse:
        """
        Busca um marketing no banco de dados com base no seu respectivo ID

        - Args:
            - id:: str: ID do marketing a ser buscado

        - Returns:
            - MarketingResponse: Dados do marketing conforme o ID informado
        """
        try:
            marketing = self.db_session.query(MarketingModel).filter_by(id=id).first()
            
            if not marketing:
                raise NotFound(ERROR_MARKETING_GET_NOT_FOUND)
            
            return map_MarketingModel_to_MarketingOutput(marketing)
        
        except HTTPException:
            raise 
        
        except Exception as e:
            raise Server(e)
        
    def get_marketing_by_address(self, state: str, city: str = None) -> list[MarketingResponse]:
        try:
            
            if not state:
                raise BadRequest("Informe o estado")
            
            if city:
                marketings = self.db_session.query(MarketingModel).filter_by(state=state, city=city).all()
            else:
                marketings = self.db_session.query(MarketingModel).filter_by(state=state).all()
            
            if len(marketings) == 0:
                raise NotFound(ERROR_MARKETING_GET_NOT_FOUND)
            
            result = [
                map_MarketingModel_to_MarketingOutput(marketing)
                for marketing in marketings
            ]
        
            return result
        
        except HTTPException:
            raise 
        
        except Exception as e:
            raise Server(e)
        
    def delete_marketing(self, id: str) -> BaseMessage:
        """
        Deleta um evento do banco de dados com base no seu respectivo ID.
        """
        try:
            marketing = self.db_session.query(MarketingModel).filter_by(id=id).first()
            
            if not marketing:
                raise NotFound(ERROR_MARKETING_GET_NOT_FOUND)
            
            self.db_session.delete(marketing)
            self.db_session.commit()
            
            delete_image("marketing",id)
            
            return Success(SUCCESS_MARKETING_DELETE)
        
        except HTTPException:
            raise 
        
        except Exception as e:
            raise Server(e)
            
        
        
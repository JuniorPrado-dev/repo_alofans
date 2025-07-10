from datetime import datetime
from fastapi import HTTPException
from pydantic import (
    Field,
    field_validator
)


from constants.alo import (
    ERROR_ALO_REQUIRED_FIELD_CLIENT_ID,
    ERROR_ALO_REQUIRED_FIELD_EVENT_ID,
    ERROR_ALO_REQUIRED_FIELD_PAYMENT_VALUE,
    ERROR_ALO_REQUIRED_FIELD_TEXT_MESSAGE
)
from enums.alo import AloStatus
from schemas.base import CustomBaseModel
from services.ids import id_generate
from utils.messages.error import UnprocessableEntity


class AloRequest(CustomBaseModel):
    """
    - text_message: str
    - payment_value: float
    - client_id: str
    - event_id: str
    """
    
    text_message: str | None = Field(
        title="Mensagem do Alô",
        description="Mensagem que será enviada no Alô",
        examples=["Manda um salve pro zé"],
        default=None,
        validate_default=True
    )
    payment_value: float | None = Field(
        title="Valor do Alô",
        description="Valor que será enviado no Alô",
        examples=[100.00],
        default=None,
        validate_default=True
    )
    client_id: str | None = Field(
        title="ID do Cliente",
        description="ID do cliente que está pedindo um Alô",
        examples=["019373b2-3e26-7e7f-98a8-4d13818337b2"],
        default=None,
        validate_default=True
    )
    event_id: str | None = Field(
        title="ID do Evento",
        description="ID do evento que será enviado o Alô",
        examples=["123"],
        default=None,
        validate_default=True
    )
    
    @field_validator("text_message")
    def validate_text_message(cls, v):
        if not v:
            raise UnprocessableEntity(ERROR_ALO_REQUIRED_FIELD_TEXT_MESSAGE)
        return v
    
    @field_validator("payment_value")
    def validate_payment_value(cls, v):
        if not v:
            raise UnprocessableEntity(ERROR_ALO_REQUIRED_FIELD_PAYMENT_VALUE)
        return v
    
    @field_validator("client_id")
    def validate_client_id(cls, v):
        if not v:
            raise UnprocessableEntity(ERROR_ALO_REQUIRED_FIELD_CLIENT_ID)
        return v
    
    @field_validator("event_id")
    def validate_event_id(cls, v):
        if not v:
            raise UnprocessableEntity(ERROR_ALO_REQUIRED_FIELD_EVENT_ID)
        return v
    
class AloInDB(CustomBaseModel):
    """
    - id: str
    - created_at: datetime
    - status: str
    - text_message: str
    - value: float
    - client_id: str
    - event_id: str
    
    """

    id: str = Field(
        title="ID do Alô",
        description="ID do Alô gerado automaticamente",
        examples=["1234567890"],
        default_factory=id_generate,
    )
    created_at: datetime = Field(
        title="Data de Criação",
        description="Data de criação do Alô",
        example=datetime.now(),
        default_factory=datetime.now,
    )
    status: AloStatus = Field(
        title="Status do Alô",
        description="Status atual do Alô",
        examples=[
            AloStatus.payment.value,
            AloStatus.waiting.value,
            AloStatus.approved.value,
            AloStatus.finished.value,
            AloStatus.rejected.value,
        ],
        default=AloStatus.payment.value
    )
    text_message: str 
    value: float 
    client_id: str 
    event_id: str 
    class ConfigDict:
        from_attributes = True
        

class AloResponse(CustomBaseModel):
    """
    - id: str
    - text_message: str
    - status: str
    - value: float
    - client_id: str
    - event_id: str
    - event_name: str
    
    """

    id: str
    text_message: str
    status: AloStatus
    value: float
    client_id: str 
    event_id: str 
    event_name: str 

    
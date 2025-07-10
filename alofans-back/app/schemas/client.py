from fastapi import HTTPException
from pydantic import (
    Field,
    field_validator, 
    model_validator
)


from constants.person import (
    ERROR_CLIENT_INVALID_CREDENTIALS,
    ERROR_CLIENT_REQUIRED_FIELD_NAME,
    ERROR_CLIENT_REQUIRED_FIELD_PASSWORD,
    ERROR_CLIENT_REQUIRED_FIELD_PHONE,
    ERROR_CLIENT_REQUIRED_FIELD_EMAIL
)
from schemas.base import CustomBaseModel
from utils.format import validate_email
from utils.messages.error import UnprocessableEntity

class ClientRequest(CustomBaseModel):
    """
    - google_id: str | None = None
    - name: str
    - phone: str
    - email: str
    - password: str
    """
    google_id: str | None = Field(
        None,
        title="Google ID",
        description="ID do usuário no Google",
        examples=["google_id"],
        validate_default=True
    )
    name: str  = Field(
        None,
        title="Nome",
        description="Nome do cliente",
        examples=["Jose, ET Bigu"],
        validate_default=True
    )
    email: str = Field(
        None,
        title="E-mail",
        description="E-mail do cliente",
        examples=["email@gmail.com"],
        validate_default=True
    )
    phone: str = Field(
        None,
        title="Telefone",
        description="Telefone do cliente",
        examples=["(11) 99999-9999"],
        validate_default=True
    )
    password: str = Field(
        None,
        title="Senha",
        description="Senha do cliente",
        examples=["password1234"],
        validate_default=True
    )
    @field_validator("name",mode="before")
    def validate_name(cls, v):
        if not v:
            raise UnprocessableEntity(ERROR_CLIENT_REQUIRED_FIELD_NAME)
        return v
    @field_validator('email',mode="before")
    def validate_e_mail(cls, v):
        if not v:
           raise UnprocessableEntity(ERROR_CLIENT_REQUIRED_FIELD_EMAIL)
        validate_email(v)
        return v
    
    @field_validator('phone',mode="before")
    def validate_phone(cls, v):
        if not v:
            raise UnprocessableEntity(ERROR_CLIENT_REQUIRED_FIELD_PHONE)
        return v
    @field_validator('password',mode="before")
    def validate_password(cls, v):
        if not v:
            raise UnprocessableEntity(ERROR_CLIENT_REQUIRED_FIELD_PASSWORD)
        return v


class ClientUpDate(CustomBaseModel):
    """
    - google_id: str | None = None
    - name: str | None = None 
    - password: str | None = None
    - phone: str | None = None
    - email: str | None = None
    - level: str | None = None
    - cpf_cnpj: str | None = None
    - pixkey_type: str | None = None
    - pixkey: str | None = None
    -pushToken: str | None = None
    """
    google_id: str | None = None
    name: str | None = None 
    password: str | None = None
    phone: str | None = None
    email: str | None = None
    level: str | None = None
    cpf_cnpj: str | None = None
    pixkey_type: str | None = None
    pixkey: str | None = None
    pushToken: str | None = None

    
    @field_validator("google_id", mode="before")
    def validate_google_id(cls, v):
        if isinstance(v, str) and len(v) == 0:
            v =  None

        return v

    @field_validator("name", mode="before")
    def validate_name(cls, v):
        if isinstance(v, str) and len(v) == 0:
            v =  None

        return v

    @field_validator("password", mode="before")
    def validate_password(cls, v):
        if isinstance(v, str) and len(v) == 0:
            v =  None

        return v

    @field_validator("phone", mode="before")
    def validate_phone(cls, v):
        if isinstance(v, str) and len(v) == 0:
            v =  None

        return v
    @field_validator("email", mode="before")
    def validate_email(cls, v):
        if isinstance(v, str) and len(v) == 0:
            v =  None

        return v

    @field_validator("level", mode="before")
    def validate_level(cls, v):
        if isinstance(v, str) and len(v) == 0:
            v =  None

        return v
    
    @field_validator("cpf_cnpj", mode="before")
    def validate_cpf_cnpj(cls, v):
        if isinstance(v, str) and len(v) == 0:
            v =  None

        return v
        
    @field_validator("pixkey_type", mode="before")
    def validate_pixkey_type(cls, v):
        if isinstance(v, str) and len(v) == 0:
            v =  None

        return v

    @field_validator("pixkey", mode="before")
    def validate_pixkey(cls, v):
        if isinstance(v, str) and len(v) == 0:
            v =  None

        return v
    
    @field_validator("pushToken", mode="before")
    def validate_pushToken(cls, v):
        if isinstance(v, str) and len(v) == 0:
            v =  None

        return v
            

    
class ClientLogin(CustomBaseModel):
    """
    Atributes:
        - google_id: str | None = None
        - email: str | None = None
        - password: str | None = None
        - pushToken: str | None = None
    
    Methods:

    """
    google_id: str | None = None
    email: str | None = None
    password: str | None = None
    pushToken: str | None = None # Token de notificação para enviar para o usuário

    @model_validator(mode="before")
    def any_param(cls, values):
        if not values.get('google_id') and not values.get('email') and not values.get('password'):
            raise UnprocessableEntity(ERROR_CLIENT_INVALID_CREDENTIALS)
        return values
    
    @field_validator("email", mode="before")
    def valide_email_field(cls, v):
        if not v:
            v =  None
        else:
            validate_email(v)
        return v


class ClientResponse(CustomBaseModel):
    """
    - id: str
    - name: str
    - phone: str
    - email: str
    - level: str
    - cpf_cnpj: str | None = None
    - pixkey_type: str | None = None
    - pixkey: str | None = None
    - pushToken: str | None = None
    """
    id: str 
    name: str 
    phone: str 
    email: str
    level: str
    cpf_cnpj: str | None = None
    pixkey_type: str | None = None
    pixkey: str | None = None
    pushToken: str | None = None

class ClientInDB(ClientRequest):
    """
    - id: str
    - level: str
    - google_id: str | None = None
    - name: str
    - phone: str
    - email: str
    - password: str
    - cpf_cnpj: str | None = None
    - pixkey_type: str | None = None
    - pixkey: str | None = None
    - pushToken: str | None = None
    """
    id: str
    level: str
    cpf_cnpj: str | None = None
    pixkey_type: str | None = None
    pixkey: str | None = None
    pushToken: str | None = None
    class ConfigDict:
        from_attributes = True

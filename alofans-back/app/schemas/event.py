"""
Contem todas as classes referentes ao Schema Event

Classes:
    - EventRequest
    - EventUpDate
    - EventInDB
    - EventList
    - EventSearch
"""

from fastapi import HTTPException
from pydantic import (
    Field,
    field_validator,
    model_validator
)


from constants.event import (
    ERROR_EVENT_INVALID_FIELD_CPF_CNPJ,
    ERROR_EVENT_INVALID_INTERLOCUTOR_PERCENT_GREATER_THAN_100,
    ERROR_EVENT_INVALID_INTERLOCUTOR_PERCENT_NEGATIVE_VALUE,
    ERROR_EVENT_REQUIRED_FIELD_ADDRESS_NUMBER,
    ERROR_EVENT_REQUIRED_FIELD_ALO_COST,
    ERROR_EVENT_REQUIRED_FIELD_ALO_QUANTITY,
    ERROR_EVENT_REQUIRED_FIELD_CITY,
    ERROR_EVENT_REQUIRED_FIELD_COMPLEMENT,
    ERROR_EVENT_REQUIRED_FIELD_DATE,
    ERROR_EVENT_REQUIRED_FIELD_DESCRIPTION,
    ERROR_EVENT_REQUIRED_FIELD_INTERLOCUTOR_PERCENT,
    ERROR_EVENT_REQUIRED_FIELD_INTERLOCUTOR_PIX_KEY,
    ERROR_EVENT_REQUIRED_FIELD_IS_ONLINE,
    ERROR_EVENT_REQUIRED_FIELD_LINK,
    ERROR_EVENT_REQUIRED_FIELD_NAME,
    ERROR_EVENT_REQUIRED_FIELD_NEIGHBORHOOD,
    ERROR_EVENT_REQUIRED_FIELD_PRODUCER_CPF_CNPJ,
    ERROR_EVENT_REQUIRED_FIELD_STATE,
    ERROR_EVENT_REQUIRED_FIELD_STREET
)
from enums.user import UserIdentity
from schemas.base import CustomBaseModel
from utils.format import validate_cpf_cnpj
from utils.messages.error import UnprocessableEntity


class EventRequest(CustomBaseModel):
    """
    Dados necessários para criar um evento

    ### Attributes:

    - name: str
    - description: str
    - date: str
    - alo_cost: float
    - alo_quantity: int
    - is_online: bool
    - link: str | None = None
    - state: str
    - city: str
    - neighborhood: str | None = None
    - street: str  | None = None
    - address_number: str | None = None
    - complement: str | None = None
    - producer_cpf_cnpj: str 
    - interlocutor_cpf_cnpj: str | None = None
    - interlocutor_pixkeytype: str | None = None
    - interlocutor_pixkey: str | None = None
    - interlocutor_percent: float | None = None
    - interlocutor_phone: str | None = None
    """

    name: str
    description: str 
    date: str
    alo_cost: float
    alo_quantity: int
    is_online: bool
    link: str | None = None
    state: str 
    city: str
    neighborhood: str | None = None
    street: str | None = None
    address_number: str | None = None
    complement: str | None = None
    producer_cpf_cnpj: str | None = None
    interlocutor_cpf_cnpj: str | None = None
    interlocutor_pixkeytype: str | None = None
    interlocutor_pixkey: str | None = None
    interlocutor_percent: float | str | None = None
    interlocutor_phone: str | None = None

    @field_validator(
        "name",
        "description",
        "date",
        "alo_cost",
        "alo_quantity",
        "is_online",
        "link",
        "state",
        "city",
        "neighborhood",
        "street",
        "address_number",
        "complement",
        "producer_cpf_cnpj",
        "interlocutor_cpf_cnpj",
        "interlocutor_pixkeytype",
        "interlocutor_pixkey",
        "interlocutor_percent",
        "interlocutor_phone",
        mode="before"
    )
    def test_if_empty(cls, v):
        if isinstance(v, str) and (v.strip() == "" or len(v.strip()) == 0):
            return None
        return v

    @field_validator('name', mode="before")
    def validate_name(cls, value):
        if not value:
            raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_NAME)
        return value

    @field_validator('description', mode="before")
    def validate_description(cls, value):
        if not value:
            raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_DESCRIPTION)
        return value

    @field_validator('date', mode="before")
    def validate_date(cls, value):
        if not value:
            raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_DATE)
        return value

    @field_validator('alo_cost', mode="before")
    def validate_alo_cost(cls, value):
        if not value:
            raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_ALO_COST)
        return value

    @field_validator('alo_quantity', mode="before")
    def validate_alo_quantity(cls, value):
        if not value:
            raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_ALO_QUANTITY)
        return value

    @field_validator('is_online', mode="before")
    def validate_is_online(cls, value):
        if value is None:
            raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_IS_ONLINE)
        return value

    @model_validator(mode="before")
    def validate_link(cls, values):
        is_online = values.get("is_online")
        link = values.get("link")

        if is_online and not link:
            raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_LINK)
        return values

    @field_validator('state', mode="before")
    def validate_state(cls, value):
        if not value:
            raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_STATE)
        return value

    @field_validator('city', mode="before")
    def validate_city(cls, value):
        if not value:
            raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_CITY)
        return value

    @model_validator(mode="before")
    def validate_address(cls, values):
        is_online = values.get("is_online")
        neighborhood = values.get("neighborhood")
        street = values.get("street")
        address_number = values.get("address_number")
        complement = values.get("complement")

        if not is_online:

            if not neighborhood:
                raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_NEIGHBORHOOD)

            if not street:
                raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_STREET)

            if not address_number:
                raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_ADDRESS_NUMBER)

            if not complement:
                raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_COMPLEMENT)

        return values

    @field_validator('producer_cpf_cnpj')
    def validate_producer_cpf_cnpj(cls, value):
        if not value:
            raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_PRODUCER_CPF_CNPJ)

        result = validate_cpf_cnpj(value)
        if result["identity"] not in UserIdentity.__dict__.values():
            raise UnprocessableEntity(ERROR_EVENT_INVALID_FIELD_CPF_CNPJ)

        return value

    @model_validator(mode="before")
    def validate_pixkey(cls, values):
        interlocutor_cpf_cnpj = values.get("interlocutor_cpf_cnpj")
        interlocutor_pixkey = values.get("interlocutor_pixkey")
        interlocutor_percent = values.get("interlocutor_percent")

        if isinstance(interlocutor_percent, str):
            if not interlocutor_percent:
                interlocutor_percent = None
        # interlocutor_phone = values.get("interlocutor_phone")

        # if not interlocutor_phone:
        #    raise HTTPException(status_code=400, detail="Telefone do interlocutor é obrigatório")

        if not interlocutor_cpf_cnpj:
            values["interlocutor_cpf_cnpj"] = None
            values["interlocutor_pixkey"] = None
            values["interlocutor_percent"] = None
            values["interlocutor_phone"] = None
            values["interlocutor_pixkeytype"] = None

        # Caso o interlocutor não seja o produtor, precisa ter a chave pix
        elif interlocutor_cpf_cnpj:
            if not interlocutor_pixkey:
                raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_INTERLOCUTOR_PIX_KEY)

            if not interlocutor_percent:
                raise UnprocessableEntity(ERROR_EVENT_REQUIRED_FIELD_INTERLOCUTOR_PERCENT)

            if interlocutor_percent < 0:
                raise UnprocessableEntity(ERROR_EVENT_INVALID_INTERLOCUTOR_PERCENT_NEGATIVE_VALUE)
            if interlocutor_percent > 1:
                raise UnprocessableEntity(ERROR_EVENT_INVALID_INTERLOCUTOR_PERCENT_GREATER_THAN_100)

        return values


class EventUpDate(CustomBaseModel):
    """
    Dados que podem ser atualizados de um evento

    ### Attributes:

        - name: str | None
        - description: str | None
        - date: str | None
        - alo_cost: float | None
        - alo_quantity: int | None
        - interlocutor_cpf_cnpj: str | None = None
        - interlocutor_pixkeytype: str | None = None
        - interlocutor_pixkey: str | None = None
    """

    name: str | None = None
    description: str | None = None
    date: str | None = None
    alo_cost: float | None = None
    alo_quantity: int | None = None
    interlocutor_cpf_cnpj: str | None = None
    interlocutor_pixkeytype: str | None = None
    interlocutor_pixkey: str | None = None
    interlocutor_percent: float | None = None

    @model_validator(mode="before")
    def validate_pixkey(cls, values):
        interlocutor_pixkeytype = values.get("interlocutor_pixkeytype")
        interlocutor_pixkey = values.get("interlocutor_pixkey")

        if interlocutor_pixkeytype and not interlocutor_pixkey:
            raise UnprocessableEntity("Chave pix é obrigatória para o tipo de chave especificado")

        if not interlocutor_pixkeytype and interlocutor_pixkey:
            raise UnprocessableEntity("Chave pix não pode ser preenchida para o tipo de chave especificado")

        return values


class EventInDB(EventRequest):

    id: str
    image_path: str | None = None

    class ConfigDict:
        from_attributes = True


class EventResponse(CustomBaseModel):
    """
    - id: str NOT NULL
    - name: str NOT NULL
    - description: str NOT NULL
    - date: datetime  NOT NULL
    - alo_cost: float NOT NULL
    - alo_quantity: int  NOT NULL
    - type: str NOT NULL
    - link: str | None = None 
    - state: str 
    - city: str 
    - neighborhood: str 
    - street: str 
    - address_number: str | None
    - complement: str | None = None
    - image_path: str | None = None
    - producer_cpf_cnpj: str 
    - name_producer: str
    - producer_pixkey: str
    - interlocutor_cpf_cnpj: str | None = None
    - name_interlocutor: str | None = None
    - interlocutor_pixkey: str | None = None
    - interlocutor_percent: float | None = None
    """

    id: str = Field(
        title="ID do evento",
        description="ID do evento gerado automaticamente",
        examples=["6287738d-0756-4904-9759-b900914a0541"]
    )
    name: str= Field(
        title="Nome do evento",
        description="Nome do evento",
        examples=["Semana Acadêmica 2022"]
    )
    description: str = Field(
        title="Descrição do evento",
        description="Descrição do evento",
        examples=["Semana Acadêmica 2022 - Encontro de estudantes sobre a temática da tecnologia"]
    )
    date: str = Field(
        title="Data do evento",
        description="Data do evento",
        examples=["2022-09-15"]
    )
    alo_cost: float = Field(
        title="Custo do Alo",
        description="Custo do Alo",
        examples=[20.0]
    )
    alo_quantity: int = Field(
        title="Quantidade de Alo",
        description="Quantidade de Alo",
        examples=[100]
    )
    type: str = Field(
        title="Tipo do evento",
        description="Tipo do evento",
        examples=["ONLINE", "PRESENCIAL"]
    )
    link: str | None = Field(
        title="Link do evento",
        description="Caso online, recebe o link da live",
        examples=["https://eventos.ufabc.edu.br/semana-academica-2022"],
        default=None
    )
    state: str = Field(
        title="UF",
        description="Unidade Federativa",
        examples=["BA"],
    )
    city: str = Field(
        title="Cidade",
        description="Cidade",
        examples=["Salvador"],
    )
    neighborhood: str | None = Field(
        title="Bairro",
        description="Bairro",
        examples=["Pituba"],
        default=None
    )
    street: str | None = Field(
        title="Rua",
        description="Rua",
        examples=["Avenida Getúlio Vargas"],
        default=None
    )
    address_number: str | None = Field(
        
    )
    complement: str | None = None
    image_path: str | None = None
    producer_cpf_cnpj: str 
    name_producer: str
    producer_pixkey: str
    interlocutor_cpf_cnpj: str | None = None
    name_interlocutor: str | None = None
    interlocutor_pixkey: str | None = None
    interlocutor_percent: float | None = None


class EventSearch(CustomBaseModel):
    """
    Representa uma pesquisa para eventos no banco de dados, onde todos os atributos são chaves validas para busca

        - name: str | None
        - description: str | None
        - state: str | None
        - city: str | None
        - type: str | None # [ONLINE | PRESENCIAL]
    """

    name: str | None = None
    description: str | None = None
    state: str | None = None
    city: str | None = None
    type: str | None = None

from pydantic import (
    Field,
    field_validator,
    model_validator
)


from constants.marketing import (
    ERROR_MARKETING_REQUIRED_FIELD_IS_GLOBAL,
    ERROR_MARKETING_REQUIRED_FIELD_STATE,
    ERROR_MARKETING_REQUIRED_FIELD_CITY
)
from schemas.base import CustomBaseModel
from utils.messages.error import UnprocessableEntity


class MarketingRequest(CustomBaseModel):
    """
    - is_global: bool NOT NULL # Caso seja falso, deve definir o estado que este anuncio irá aparecer. Caso seja global, ele aparece em todos os estados cadastrados
    - state: str  # Estado onde este anúncio aparecerá
    - city: str # Cidade que será atrelado a este anúncio
    """
    is_global: bool = Field(
        title="Is Global",
        description="Indica se o anúncio será global ou não",
        examples=[True, False],
        default=None,
        validate_default=True
    )
    state: str | None = Field(
        title="Estado",
        description="Estado onde o anúncio aparecerá",
        examples=["SP"],
        default=None
    )
    city: str | None = Field(
        title="Cidade",
        description="Cidade que será atrelado a este anúncio",
        examples=["São Paulo"],
        default=None
    )

    @field_validator("is_global", mode="before")
    def validate_is_global(cls, v):

        if v is None:

            raise UnprocessableEntity(ERROR_MARKETING_REQUIRED_FIELD_IS_GLOBAL)
        
        return v


    @model_validator(mode="before")
    def check_type_marketing(cls, values):
        if not values.get("is_global"):
            if not values.get("state"):
                raise UnprocessableEntity(ERROR_MARKETING_REQUIRED_FIELD_STATE)
            if not values.get("city"):
                raise UnprocessableEntity(ERROR_MARKETING_REQUIRED_FIELD_CITY)
        return values
    
class MarketingResponse(CustomBaseModel):
    """
    - id: str
    - image_path: str
    - is_global: bool
    - state: str | None = None
    - city: str | None = None
    """

    id: str = Field(
        title="ID",
        description="ID do anúncio",
        examples=["019373b2-3e26-7e7f-98a8-4d13818337b2"]
    )
    image_path: str = Field(
        title="Caminho da imagem",
        description="Caminho da imagem do anúncio",
        examples=["https://example.com/image.jpg"]
    )
    is_global: bool = Field(
        title="Is Global",
        description="Indica se o anúncio é global ou não",
        examples=[True, False]
    )
    state: str | None = Field(
        title="Estado",
        description="Estado onde o anúncio aparecerá",
        examples=["SP"],
        default=None
    )
    city: str | None = Field(
        title="Cidade",
        description="Cidade onde o anúncio aparecerá",
        examples=["São Paulo"],
        default=None
    )
    
    
def map_MarketingModel_to_MarketingOutput(model) -> MarketingResponse:
    return MarketingResponse(
        id=model.id,
        image_path=model.image_path,
        is_global=model.is_global,
        state=model.state,
        city=model.city
    )
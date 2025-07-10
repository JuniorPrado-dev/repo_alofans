from pydantic import (
    Field,
    field_validator
)


from schemas.base import CustomBaseModel


class NotifyRequest(CustomBaseModel):
    """
    - to: str
    - title: str
    - body: str
    """
    to:str = Field(
        title="To",
        description="Token do usuário que irá receber a notificação",
        examples=["ExponentPushToken[jw24ITB0IzeP42Yluh3pD2]"]
    )
    title: str = Field(
        title="Title",
        description="Título da notificação",
        examples=["Novo pedido", "Pagamento realizado com sucesso"]
    )
    body: str = Field(
        title="Body",
        description="Corpo da notificação",
        examples=["Seu pedido foi realizado com sucesso", "Seu pagamento foi realizado com sucesso"]
    )

    @field_validator("to", mode="before")
    def validate_to(cls, v):
        if "ExponentPushToken[" not in v:
            v = f"ExponentPushToken[{v}]"

        return v
        

class DataSuccess(CustomBaseModel):
    """
    - status: Status da notificação
    - id: ID da notificação
    """
    status: str = Field(
        title="Status",
        description="Status da notificação",
        examples=["ok", "error"]
    )
    id: str = Field(
        title="ID",
        description="ID da notificação",
        examples=["019373b2-3e26-7e7f-98a8-4d13818337b2"]
    )

class Details(CustomBaseModel):
    """
    - error: Erro
    - exponentPushToken: Token do usuário
    """
    error: str = Field(
        title="Error",
        description="Erro",
        examples=["DeviceNotRegistered"]
    )
    exponentPushToken: str = Field(
        title="ExponentPushToken",
        description="Token do usuário",
        examples=["ExponentPushToken[jw24ITB0IzeP42Yluh3pD1]"]
    )

class DataError(CustomBaseModel):
    """
    - status: Status da notificação
    - message: Mensagem de erro
    - details: Detalhes do erro
    """
    status: str = Field(
        title="Status",
        description="Status da notificação",
        examples=["ok", "error"]
    )
    message: str = Field(
        title="Message",
        description="Mensagem de erro",
        examples=["\"ExponentPushToken[jw24ITB0IzeP42Yluh3pD1]\" is not a registered push notification recipient"]
    )
    details: Details = Field(
        title="Details",
        description="Detalhes do erro",
    )


class NotifyResponse(CustomBaseModel):
    """
    - data: DataSuccess
    """
    data: DataSuccess



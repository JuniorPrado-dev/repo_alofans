from pydantic import Field


from schemas.base import CustomBaseModel


class TokenData(CustomBaseModel):
    """
    - id: str
    - name: str
    - email: str
    - phone: str
    - level: str
    - cpf_cnpj: str = ""
    - pixkey_type: str = ""
    - pixkey: str=""
    """
    id: str = Field(
        title="ID",
        description="ID do usuário",
        examples=["1234567890"]
    )
    name: str = Field(
        title="Nome",
        description="Nome do usuário",
        examples=["Fulano da Silva"]
    )
    email: str = Field(
        title="E-mail",
        description="E-mail do usuário",
        examples=["email@example.com"]
    )
    phone: str = Field(
        title="Telefone",
        description="Telefone do usuário",
    )
    level: str = Field(
        title="Nível",
        description="Nível de acesso do usuário",
        examples=["admin"]
    )
    cpf_cnpj: str = Field(
        title="CPF/CNPJ",
        description="CPF ou CNPJ do usuário",
        examples=["12345678901"],
        default=""
    )
    pixkey_type:str= Field(
        title="Tipo de chave pix",
        description="Tipo de chave pix do usuário",
        examples=["CPF"],
        default=""
    )
    pixkey:str= Field(
        title="Chave pix",
        description="Chave pix do usuário",
        examples=["12345678901"],
        default=""
    )
    pushToken:str= Field(
        title="Token de push",
        description="Token de push do usuário",
        examples=["12345678901"],
        default=""
    )


class TokenResponse(CustomBaseModel):
    """
    - token: str
    """
    token: str = Field(
        title="Token",
        description="Token de acesso ao sistema",
        examples=["1234567890abcdefg"]
    )
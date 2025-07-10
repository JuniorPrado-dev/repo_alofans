from decouple import config
from fastapi.exceptions import HTTPException
from jose import jwt, JWTError


from schemas.tokens import TokenData

SECRET_KEY = config("SECRET_KEY")
ALGORITHM = config("ALGORITHM")

def generate_token(client) -> TokenData:
    """
    Gera um token de acesso usando os dados de um cliente
    """
    return TokenData(
        id=client.id,
        name=client.name,
        email=client.email,
        phone=client.phone,
        level=client.level,
        cpf_cnpj=client.cpf_cnpj if client.cpf_cnpj else "",
        pixkey_type=client.pixkey_type if client.cpf_cnpj else "",
        pixkey=client.pixkey if client.cpf_cnpj else "",
        pushToken=client.pushToken if client.pushToken else ""
    )

def encode_token(data_token: TokenData) -> str:
    """
    Codifica um dicionário em um token jwt

    - id: str
    - name: str
    - email: str
    - phone: str
    - level: str
    - cpf_cnpj: str = ""
    - pixkey_type: str = ""
    - pixkey: str=""
    """
    return jwt.encode(data_token.dict(), SECRET_KEY, algorithm=ALGORITHM)

    # Funções abaixo foram usadas para teste. Não sei se iremos precisar decodificar o token ainda no backend, mas caso precisemos, teremos a função a baixo
def decode_token(token: str) -> TokenData:
    """
    Decodifica um token jwt em um dicionário com seu conteúdo
    
    Chaves do Token:
        - id: str
        - name: str
        - email: str
        - level: str
        - pixkey_type: str
        - pixkey: str
    """
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return TokenData(**data)
    
    except JWTError:

        raise HTTPException(401, "Invalid token")
    

import pytest
from decouple import config
from passlib.context import CryptContext
from fastapi.exceptions import HTTPException
from fastapi import status


from services.tokens import decode_token
from schemas.client import ClientLogin
from useCases.client import ClientUseCases


crypt_context = CryptContext(schemes=['sha256_crypt'])

SECRET_KEY = config('SECRET_KEY')
ALGORITHM = config('ALGORITHM')

def test_authorization_success_with_google_id(db_session, mock_client_on_db):
    """
    Realizando Login com Google ID e obtendo sucesso
    """
    uc = ClientUseCases(db_session)

    client_login = ClientLogin(
        google_id=mock_client_on_db.google_id,
        email='',
        password=''
    )
    token = uc.login(client_login=client_login)
    
    decoded_token = uc.verify_access_token(token.token)
    
    assert type(decoded_token.id) == str
    assert decoded_token.id== mock_client_on_db.id
    assert decoded_token.name == mock_client_on_db.name
    assert decoded_token.level == mock_client_on_db.level
    assert decoded_token.email == mock_client_on_db.email
    assert decoded_token.phone == mock_client_on_db.phone
    assert bool(decoded_token.cpf_cnpj) == bool(mock_client_on_db.cpf_cnpj)

def test_authorization_success_with_email_password(db_session, mock_client_on_db, mock_ClientRequest):
    """
    Realizando Login com email e senha e obtendo sucesso
    """
    uc = ClientUseCases(db_session)

    client_login = ClientLogin(
        google_id="",
        email=mock_client_on_db.email,
        password=mock_ClientRequest.password
    )
    token = uc.login(client_login=client_login)
    
    decoded_token = uc.verify_access_token(token.token)
    assert type(decoded_token.id) == str
    assert decoded_token.id== mock_client_on_db.id
    assert decoded_token.name == mock_client_on_db.name
    assert decoded_token.level == mock_client_on_db.level
    assert decoded_token.email == mock_client_on_db.email
    assert decoded_token.phone == mock_client_on_db.phone
    assert bool(decoded_token.cpf_cnpj) == bool(mock_client_on_db.cpf_cnpj)

def test_authorization_fail(db_session):
    """
    Realizando Login com Google ID e obtendo sucesso
    """
    uc = ClientUseCases(db_session)
    token = "invalidtoken"
    
    with  pytest.raises(HTTPException) as e:
        uc.verify_access_token(token)
    assert(e.value.status_code) == status.HTTP_401_UNAUTHORIZED
    assert(e.value.detail) == "Invalid token"
    

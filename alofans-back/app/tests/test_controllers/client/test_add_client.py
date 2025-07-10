from decouple import config
from fastapi.exceptions import HTTPException
from passlib.context import CryptContext
from pytest import raises

from constants.person import (
    ERROR_CLIENT_ADD_EMAIL_ALREADY_EXISTS,
    ERROR_CLIENT_ADD_GOOGLE_ACC_ALREADY_EXISTS,
    ERROR_CLIENT_ADD_PHONE_ALREADY_EXISTS,
    MESSAGE_CLIENT_ADD_SUCCESS
)
from db.models import Client as ClientModel
from useCases.client import ClientUseCases
from schemas.client import ClientRequest

crypt_context = CryptContext(schemes=['sha256_crypt'])

SECRET_KEY = config('SECRET_KEY')
ALGORITHM = config('ALGORITHM')


def test_add_client_success(db_session, mock_ClientRequest):
    plain_password = mock_ClientRequest.password  # Senha em texto simples
    
    uc = ClientUseCases(db_session)
    
    result = uc.add(mock_ClientRequest)
    assert result.detail == MESSAGE_CLIENT_ADD_SUCCESS
    
    client = db_session.query(ClientModel).filter(ClientModel.email == mock_ClientRequest.email).first()
    
    assert client.google_id == mock_ClientRequest.google_id
    assert client.name == mock_ClientRequest.name
    assert client.phone == mock_ClientRequest.phone
    assert client.email == mock_ClientRequest.email   
    assert crypt_context.verify(plain_password, client.password)  # Verifica a senha em texto simples contra o hash armazenado
    
def test_add_client_fail_email_exists(db_session, mock_ClientRequest):
    
    uc = ClientUseCases(db_session)
    
    result = uc.add(mock_ClientRequest)
    assert result.detail == MESSAGE_CLIENT_ADD_SUCCESS
    
    client = ClientRequest(**mock_ClientRequest.dict())
    
    with raises(HTTPException) as e:
        uc.add(client)
    
    assert e.value.status_code == 400
    assert e.value.detail == ERROR_CLIENT_ADD_EMAIL_ALREADY_EXISTS
    
def test_add_client_fail_phone_exists(db_session, mock_ClientRequest):
    
    uc = ClientUseCases(db_session)
    
    result = uc.add(mock_ClientRequest)
    assert result.detail == MESSAGE_CLIENT_ADD_SUCCESS
    
    client = ClientRequest(**mock_ClientRequest.dict())
    
    client.email = "new2@gmail.com"
    
    with raises(HTTPException) as e:
        uc.add(client)
    
    assert e.value.status_code == 400
    assert e.value.detail == ERROR_CLIENT_ADD_PHONE_ALREADY_EXISTS
    
def test_add_client_fail_google_id_exists(db_session, mock_ClientRequest):
    
    uc = ClientUseCases(db_session)
    
    result = uc.add(mock_ClientRequest)
    assert result.detail == MESSAGE_CLIENT_ADD_SUCCESS
    
    client = ClientRequest(**mock_ClientRequest.dict())
    
    client.email = "new2@gmail.com"
    client.phone = "12312312312"
    
    with raises(HTTPException) as e:
        uc.add(client)
    
    assert e.value.status_code == 400
    assert e.value.detail == ERROR_CLIENT_ADD_GOOGLE_ACC_ALREADY_EXISTS
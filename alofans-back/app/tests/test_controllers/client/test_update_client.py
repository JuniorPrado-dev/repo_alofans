from fastapi.exceptions import HTTPException
from passlib.context import CryptContext
from pytest import raises


from constants.person import (
    ERROR_CLIENT_ADD_CPF_CNPJ_ALREADY_EXISTS,
    ERROR_CLIENT_NOT_FOUND,
    ERROR_CLIENT_NOT_UPDATED,
    MESSAGE_CLIENT_UPDATE_SUCCESS
)
from db.models import Client as ClientModel
from useCases.client import ClientUseCases
from schemas.client import ClientUpDate
from services.security.password import verify

def test_update_client(db_session,mock_client_on_db, mock_ClientUpDate):
    plain_password = mock_ClientUpDate.password
    uc = ClientUseCases(db_session)
    
    response = uc.update(mock_client_on_db.id, mock_ClientUpDate)
    
    assert response is not None
    assert response.detail == MESSAGE_CLIENT_UPDATE_SUCCESS
    
    client = db_session.query(ClientModel).filter_by(id=mock_client_on_db.id).first()
    
    assert client.google_id == mock_ClientUpDate.google_id
    assert client.name == mock_ClientUpDate.name
    assert verify(plain_password, client.password)
    assert client.phone == mock_ClientUpDate.phone
    assert client.email == mock_ClientUpDate.email
    assert client.level == mock_ClientUpDate.level
    assert client.cpf_cnpj == mock_ClientUpDate.cpf_cnpj
    assert client.pixkey_type == mock_ClientUpDate.pixkey_type
    assert client.pixkey == mock_ClientUpDate.pixkey
    

def test_update_client_fail_not_found(db_session, mock_client_on_db, mock_ClientUpDate):
    uc = ClientUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.update("999", mock_ClientUpDate)
        
    assert e.value.status_code == 404
    assert e.value.detail == ERROR_CLIENT_NOT_FOUND
    
def test_test_update_client_fail_not_field_to_update(db_session, mock_client_on_db):
    uc = ClientUseCases(db_session)
    
    update = ClientUpDate()
    
    with raises(HTTPException) as e:
        uc.update(mock_client_on_db.id, update)
        
    assert e.value.status_code == 400
    assert e.value.detail == ERROR_CLIENT_NOT_UPDATED


def test_update_client_cpf_exists(db_session, mock_client_on_db, mock_ClientUpDate):
    uc = ClientUseCases(db_session)
    
    update = ClientUpDate(**mock_ClientUpDate.dict())

    update.cpf_cnpj = "123.123.123.29"

    with raises(HTTPException) as e:
        uc.update(mock_client_on_db.id, update)
        uc.update(mock_client_on_db.id, update)

    assert e.value.status_code == 400
    assert e.value.detail == ERROR_CLIENT_ADD_CPF_CNPJ_ALREADY_EXISTS


def test_update_client_pushToken(db_session,mock_client_on_db, mock_ClientUpDate):
    plain_password = mock_ClientUpDate.password
    uc = ClientUseCases(db_session)

    update = ClientUpDate(**mock_ClientUpDate.dict())
    update.pushToken = "0GVzrFKsfAwR591QYHzzBv"
    
    response = uc.update(mock_client_on_db.id, update)
    
    assert response is not None
    assert response.detail == MESSAGE_CLIENT_UPDATE_SUCCESS
    
    client = db_session.query(ClientModel).filter_by(id=mock_client_on_db.id).first()
    
    assert client.google_id == mock_ClientUpDate.google_id
    assert client.name == mock_ClientUpDate.name
    assert verify(plain_password, client.password)
    assert client.phone == mock_ClientUpDate.phone
    assert client.email == mock_ClientUpDate.email
    assert client.level == mock_ClientUpDate.level
    assert client.cpf_cnpj == mock_ClientUpDate.cpf_cnpj
    assert client.pixkey_type == mock_ClientUpDate.pixkey_type
    assert client.pixkey == mock_ClientUpDate.pixkey
    assert client.pushToken == update.pushToken
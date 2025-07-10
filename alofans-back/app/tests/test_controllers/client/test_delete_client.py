from fastapi.exceptions import HTTPException
from pytest import raises


from constants.person import (
    ERROR_CLIENT_NOT_FOUND,
    MESSAGE_CLIENT_DELETE_SUCCESS
)
from db.models import Client as ClientModel
from useCases.client import ClientUseCases

def test_delete_client(db_session, mock_client_on_db):
    uc = ClientUseCases(db_session)
    
    result = uc.delete(mock_client_on_db.id)
    
    assert result.detail == MESSAGE_CLIENT_DELETE_SUCCESS
    
    client = db_session.query(ClientModel).filter_by(id=mock_client_on_db.id).first()
    
    assert client is None
    
def test_delete_client_not_found(db_session, mock_client_on_db):
    uc = ClientUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.delete("999")
        
    assert e.value.status_code == 404
    assert e.value.detail == ERROR_CLIENT_NOT_FOUND
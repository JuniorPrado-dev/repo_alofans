from fastapi.exceptions import HTTPException
from pytest import raises


from useCases.client import ClientUseCases


def test_get_client_by_id(db_session, mock_client_on_db):
    uc = ClientUseCases(db_session)
    
    client = uc.get(mock_client_on_db.id)
    
    assert client is not None
    assert client.id == mock_client_on_db.id
    assert client.name == mock_client_on_db.name
    assert client.email == mock_client_on_db.email
    assert client.phone == mock_client_on_db.phone
    assert client.level == mock_client_on_db.level
    

def test_get_client_by_id_fail(db_session):
    uc = ClientUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.get("999")
    
    assert e.value.status_code == 404
    assert e.value.detail == "Cliente não encontrado"
    
def test_get_client_list(db_session, mock_client_on_db):
    uc = ClientUseCases(db_session)
    
    clients = uc.get_all()
    
    assert clients is not None
    assert len(clients) > 0
    assert clients[0].id == mock_client_on_db.id
    assert clients[0].name == mock_client_on_db.name
    assert clients[0].email == mock_client_on_db.email
    assert clients[0].phone == mock_client_on_db.phone
    assert clients[0].level == mock_client_on_db.level
    
def test_get_client_list_with_3(db_session, mock_client_list_on_db):
    uc = ClientUseCases(db_session)
    
    clients = uc.get_all()
    
    assert len(clients) == 3
    for idx in range(0, len(clients)):
        #assert clients[idx].id == mock_client_list_on_db[idx].id
        assert clients[idx].name == mock_client_list_on_db[idx].name
        assert clients[idx].email == mock_client_list_on_db[idx].email
        assert clients[idx].phone == mock_client_list_on_db[idx].phone
        assert clients[idx].level == mock_client_list_on_db[idx].level
        
def test_get_client_list_fail(db_session):
    uc = ClientUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.get_all()
    
    assert e.value.status_code == 404
    assert e.value.detail == "Clientes não encontrados"
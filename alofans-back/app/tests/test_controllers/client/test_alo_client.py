from fastapi.exceptions import HTTPException
from pytest import raises



from db.models import AlosFromClient, AlosFromInterlocutor, AlosFromProducer
from useCases.client import ClientUseCases


def test_get_all_alos_from_client(db_session, mock_AlosFromClient, mock_client_on_db):
    
    uc = ClientUseCases(db_session)
    
    alos = uc.get_all_alos_from_client(mock_client_on_db.id)
    
    assert alos is not None
    assert len(alos) == 1
    assert alos[0].client_id == mock_client_on_db.id
    
def test_get_all_alos_from_client_with_no_alos(db_session, mock_client_on_db):
    
    uc = ClientUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.get_all_alos_from_client(mock_client_on_db.id)
        
    assert e.value.status_code == 404
    assert e.value.detail == "Alos não encontrados"
    
def test_delete_alo_from_client(db_session, mock_AlosFromClient, mock_client_on_db):
    
    uc = ClientUseCases(db_session)
    
    response = uc.delete_alo_from_client(mock_AlosFromClient.alo_id)
    
    assert response is not None
    assert response.detail == "Alo removido com sucesso"
    
    alo = db_session.query(AlosFromClient).filter(AlosFromClient.id == mock_AlosFromClient.id).first()
    
    assert alo is None
    
def test_delete_alo_from_client_with_no_alo(db_session):
    
    uc = ClientUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.delete_alo_from_client("999")
        
    assert e.value.status_code == 404
    assert e.value.detail == "Alo não encontrado"
    
############################### INTERLOCUTOR ############################
    
def test_get_all_alos_from_interlocutor(db_session, mock_AlosFromInterlocutor):
    
    uc = ClientUseCases(db_session)
    print(mock_AlosFromInterlocutor)
    alos = uc.get_all_alos_from_interlocutor(mock_AlosFromInterlocutor.interlocutor_id)
    
    assert alos is not None
    assert len(alos) == 1
    
def test_get_all_alos_from_interlocutor_no_client(db_session):
    
    uc = ClientUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.get_all_alos_from_interlocutor("aaa")
    
    assert e.value.status_code == 404
    assert e.value.detail == "Cliente não encontrado"
    
def test_get_all_alos_from_interlocutor_no_valid_client(db_session, mock_client_on_db):
    
    uc = ClientUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.get_all_alos_from_interlocutor(mock_client_on_db.id)
    
    assert e.value.status_code == 404
    assert e.value.detail == "Cliente não é um interlocutor valido"
    
def test_get_all_alos_from_interlocutor_no_alos(db_session, mock_interlocutor_on_db):
    
    uc = ClientUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.get_all_alos_from_interlocutor(mock_interlocutor_on_db.id)
    
    assert e.value.status_code == 404
    assert e.value.detail == "Alos não encontrados"
    
def test_delete_alo_from_interlocutor(db_session, mock_AlosFromInterlocutor):
    
    uc = ClientUseCases(db_session)
    
    response = uc.delete_alo_from_interlocutor(mock_AlosFromInterlocutor.alo_id)
    
    assert response is not None
    assert response.detail == "Alo removido com sucesso"
    
    alo = db_session.query(AlosFromInterlocutor).filter(AlosFromInterlocutor.id == mock_AlosFromInterlocutor.id).first()
    
    assert alo is None
    
def test_g_delete_alo_from_interlocutor_no_alos(db_session):
    
    uc = ClientUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.delete_alo_from_interlocutor("abacaxi")
    
    assert e.value.status_code == 404
    assert e.value.detail == "Alo não encontrado"
    
########################### PRODUTOR #######################

def test_get_all_alos_from_producer(db_session, mock_AlosFromProducer):
    
    uc = ClientUseCases(db_session)
    
    alos = uc.get_all_alos_from_producer(mock_AlosFromProducer.producer_id)
    
    assert alos is not None
    assert len(alos) == 1
    
def test_get_all_alos_from_producer_no_client(db_session):
    
    uc = ClientUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.get_all_alos_from_producer("aaa")
    
    assert e.value.status_code == 404
    assert e.value.detail == "Cliente não encontrado"
    
def test_get_all_alos_from_producer_no_valid_client(db_session, mock_client_on_db):
    
    uc = ClientUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.get_all_alos_from_producer(mock_client_on_db.id)
    
    assert e.value.status_code == 404
    assert e.value.detail == "Cliente não é um produtor valido"
    
def test_get_all_alos_from_producer_no_alos(db_session, mock_producer_on_db):
    
    uc = ClientUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.get_all_alos_from_producer(mock_producer_on_db.id)
    
    assert e.value.status_code == 404
    assert e.value.detail == "Alos não encontrados"
    
def test_delete_alo_from_producer(db_session, mock_AlosFromProducer):
    
    uc = ClientUseCases(db_session)
    
    response = uc.delete_alo_from_producer(mock_AlosFromProducer.alo_id)
    
    assert response is not None
    assert response.detail == "Alo removido com sucesso"
    
    alo = db_session.query(AlosFromProducer).filter(AlosFromProducer.id == mock_AlosFromProducer.id).first()
    
    assert alo is None
    
def test_g_delete_alo_from_producer_no_alos(db_session):
    
    uc = ClientUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.delete_alo_from_producer("abacaxi")
    
    assert e.value.status_code == 404
    assert e.value.detail == "Alo não encontrado"
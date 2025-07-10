from fastapi import HTTPException
from pytest import raises

from useCases.alo import AloUseCases

def test_get_alo(db_session, mock_alo_on_db):
    
    uc = AloUseCases(db_session)
    
    alo = uc.get_alo(mock_alo_on_db.id)
    
    assert alo.id == mock_alo_on_db.id
    assert alo.text_message == mock_alo_on_db.text_message
    assert alo.value == mock_alo_on_db.value
    assert alo.status == mock_alo_on_db.status
    assert alo.client_id == mock_alo_on_db.client_id
    assert alo.event_id == mock_alo_on_db.event_id
    
def test_get_alo_with_no_id(db_session):
    
    uc = AloUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.get_alo(None)
    
    assert e.value.status_code == 400
    assert e.value.detail == 'Informe o ID'
    
def test_get_alo_with_invalid_id(db_session, mock_alo_on_db):
    
    uc = AloUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.get_alo("abacate")
    
    assert e.value.status_code == 404
    assert e.value.detail == "Alo não encontrado"
    

def test_list_all_alo(db_session, mock_alo_list_on_db):
    
    uc = AloUseCases(db_session)
    
    alos = uc.list_all_alo()
    
    assert len(alos) == 2
    assert alos[0].id == mock_alo_list_on_db[0].id
    assert alos[0].text_message == mock_alo_list_on_db[0].text_message
    assert alos[0].value == mock_alo_list_on_db[0].value
    assert alos[0].status == mock_alo_list_on_db[0].status
    assert alos[0].client_id == mock_alo_list_on_db[0].client_id
    assert alos[0].event_id == mock_alo_list_on_db[0].event_id
    assert alos[1].id == mock_alo_list_on_db[1].id
    assert alos[1].text_message == mock_alo_list_on_db[1].text_message
    assert alos[1].value == mock_alo_list_on_db[1].value
    assert alos[1].status == mock_alo_list_on_db[1].status
    assert alos[1].client_id == mock_alo_list_on_db[1].client_id
    assert alos[1].event_id == mock_alo_list_on_db[1].event_id
    
    
def test_list_all_alo_with_no_alo(db_session):
    
    uc = AloUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.list_all_alo()
    
    assert e.value.status_code == 404
    assert e.value.detail == "Alos não encontrados"
    
def test_list_all_user_alo(db_session, mock_alo_list_on_db):
    
    uc = AloUseCases(db_session)
    
    alos = uc.list_all_user_alo(mock_alo_list_on_db[0].client_id)
    
    assert len(alos) == 2
    assert alos[0].id == mock_alo_list_on_db[0].id
    assert alos[0].text_message == mock_alo_list_on_db[0].text_message
    assert alos[0].value == mock_alo_list_on_db[0].value
    assert alos[0].status == mock_alo_list_on_db[0].status
    assert alos[0].client_id == mock_alo_list_on_db[0].client_id
    assert alos[0].event_id == mock_alo_list_on_db[0].event_id
    
    assert alos[1].id == mock_alo_list_on_db[1].id
    assert alos[1].text_message == mock_alo_list_on_db[1].text_message
    assert alos[1].value == mock_alo_list_on_db[1].value
    assert alos[1].status == mock_alo_list_on_db[1].status
    assert alos[1].client_id == mock_alo_list_on_db[1].client_id
    assert alos[1].event_id == mock_alo_list_on_db[1].event_id
    
def test_list_all_user_alo_with_no_invalid(db_session, mock_client_on_db):
    
    uc = AloUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.list_all_user_alo(None)
    
    assert e.value.status_code == 400
    assert e.value.detail == "Informe o ID"
def test_list_all_user_alo_with_no_alo(db_session, mock_client_on_db):
    
    uc = AloUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.list_all_user_alo(mock_client_on_db.id)
    
    assert e.value.status_code == 404
    assert e.value.detail == "Alos não encontrados"
    
def test_list_all_event_alo(db_session, mock_alo_list_on_db):
    
    uc = AloUseCases(db_session)
    
    alos = uc.list_all_event_alo(mock_alo_list_on_db[0].event_id)
    
    assert len(alos) == 2
    assert alos[0].id == mock_alo_list_on_db[0].id
    assert alos[0].text_message == mock_alo_list_on_db[0].text_message
    assert alos[0].value == mock_alo_list_on_db[0].value
    assert alos[0].status == mock_alo_list_on_db[0].status
    assert alos[0].client_id == mock_alo_list_on_db[0].client_id
    assert alos[0].event_id == mock_alo_list_on_db[0].event_id
    
    assert alos[1].id == mock_alo_list_on_db[1].id
    assert alos[1].text_message == mock_alo_list_on_db[1].text_message
    assert alos[1].value == mock_alo_list_on_db[1].value
    assert alos[1].status == mock_alo_list_on_db[1].status
    assert alos[1].client_id == mock_alo_list_on_db[1].client_id
    assert alos[1].event_id == mock_alo_list_on_db[1].event_id
    
def test_list_all_event_alo_with_invalid_alo(db_session, mock_client_on_db):
    
    uc = AloUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.list_all_event_alo(None)
    
    assert e.value.status_code == 400
    assert e.value.detail == "Informe o ID"
    
def test_list_all_event_alo_with_no_alo(db_session):
    
    uc = AloUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.list_all_event_alo("abacate")
    
    assert e.value.status_code == 404
    assert e.value.detail == "Alos não encontrados"
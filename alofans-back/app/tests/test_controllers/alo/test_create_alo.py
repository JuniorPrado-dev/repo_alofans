from copy import copy
from fastapi import HTTPException
from pytest import raises


from enums.alo import AloStatus
from db.models import (
    Alo as AloModel,
    Event as EventModel
)
from useCases.alo import AloUseCases
def test_add_alo(db_session, mock_AloRequest):
    uc = AloUseCases(db_session)

    result = uc.add_alo(mock_AloRequest)
    assert result["detail"] == "Alo cadastrado com sucesso"
    
    alo_on_db = db_session.query(AloModel).filter_by(text_message=mock_AloRequest.text_message).first()
    
    assert alo_on_db is not None
    
    assert alo_on_db.value == mock_AloRequest.payment_value
    assert alo_on_db.client_id == mock_AloRequest.client_id
    assert alo_on_db.event_id == mock_AloRequest.event_id
    assert alo_on_db.status == AloStatus.payment.value
    

    #db_session.delete(alo_on_db)
    #db_session.commit()

    

def test_add_alo_with_invalid_client_id(db_session, mock_AloRequest):
    alo = copy(mock_AloRequest)
    alo.client_id = "abacate"
    
    uc = AloUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.add_alo(alo)
        
    assert e.value.detail == "Cliente não encontrado"
    assert e.value.status_code == 404
    
def test_add_alo_with_invalid_event_id(db_session, mock_AloRequest):
    alo = copy(mock_AloRequest)
    alo.event_id = "abacate"
    
    uc = AloUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.add_alo(alo)
        
    assert e.value.detail == "Evento não encontrado"
    assert e.value.status_code == 404

def test_reduce_num_alos_when_add_alo(db_session, mock_AloRequest):
    uc = AloUseCases(db_session)

    event = db_session.query(EventModel).filter_by(id=mock_AloRequest.event_id).first()

    alos = event.alo_quantity
    
    uc.add_alo(mock_AloRequest)
    
    event = db_session.query(EventModel).filter_by(id=mock_AloRequest.event_id).first()
    
    assert alos - 1 == event.alo_quantity
    
    #db_session.delete(alo)
    #db_session.commit()
from fastapi import HTTPException
from pytest import raises

from db.models import Alo as AloModel
from useCases.alo import AloUseCases

def test_delete_alo(db_session, mock_alo_on_db):
    
    uc = AloUseCases(db_session)
    
    result = uc.delete_alo(mock_alo_on_db.id)
    
    assert result.detail == "Alo removido com sucesso"
    
    alo = db_session.query(AloModel).filter_by(id=mock_alo_on_db.id).first()
    
    assert alo is None

def test_delete_alo_with_invalid_alo_id(db_session):
    
    uc = AloUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.delete_alo("Abacaxi")
        
    assert e.value.status_code == 404
    assert e.value.detail == "Alo não encontrado"
    
def test_delete_alo_with_no_alo_id(db_session):
    
    uc = AloUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.delete_alo(None)
        
    assert e.value.status_code == 400
    assert e.value.detail == "Informe o ID"
from fastapi import HTTPException
from pytest import raises


from constants.marketing import (
    ERROR_MARKETING_GET_NOT_FOUND,
    SUCCESS_MARKETING_DELETE
)
from db.models import Marketing as MarketingModel
from useCases.marketing import MarketingUseCases


def test_delete_marketing(db_session, mock_MarketingRequest, mock_UploadFile):
    
    uc = MarketingUseCases(db_session)
    
    uc.add_marketing(mock_MarketingRequest, mock_UploadFile) # Só assim pra dar certo, sem isso ele não tava salvando a imagem no BD
    
    marketing = db_session.query(MarketingModel).filter_by(state=mock_MarketingRequest.state, city=mock_MarketingRequest.city).first()
    
    assert marketing is not None
    
    response = uc.delete_marketing(marketing.id)
    
    assert response is not None
    assert response.detail == SUCCESS_MARKETING_DELETE
    
    marketing = db_session.query(MarketingModel).filter_by(id=marketing.id).first()
    
    assert marketing is None
    
def test_delete_marketing_not_found_id(db_session):
    
    uc = MarketingUseCases(db_session)
    
    with raises(HTTPException) as e:

        uc.delete_marketing("abcde")
        
    assert e.value.status_code == 404
    assert e.value.detail == ERROR_MARKETING_GET_NOT_FOUND
    
    

    
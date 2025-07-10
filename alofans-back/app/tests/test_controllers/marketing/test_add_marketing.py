from fastapi import HTTPException
from pytest import raises


from db.models import Marketing as MarketingModel
from schemas.marketing import(
    MarketingRequest
)
from services.image import delete_image
from useCases.marketing import MarketingUseCases

def test_add_marketing(db_session, mock_MarketingRequest, mock_UploadFile):
    
    new_marketing: MarketingRequest = MarketingRequest(**mock_MarketingRequest.dict())
    
    uc = MarketingUseCases(db_session)

    response = uc.add_marketing(new_marketing, mock_UploadFile)
    
    assert response is not None
    assert response.detail == "Marketing cadastrado com sucesso"
    
    marketing = db_session.query(MarketingModel).filter_by(state="CE", city="Fortaleza").first()
    
    assert marketing is not None
    assert marketing.state == new_marketing.state
    assert marketing.city == new_marketing.city
    
    delete_image("marketing", marketing.id)
    
    db_session.delete(marketing)
    db_session.commit()
    

def test_add_marketing_with_no_global_info(db_session, mock_MarketingRequest, mock_UploadFile):
    new_marketing: MarketingRequest = MarketingRequest(**mock_MarketingRequest.dict())
    new_marketing.is_global = None
    uc = MarketingUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.add_marketing(new_marketing, mock_UploadFile)
        
    assert e.value.status_code == 400
    assert e.value.detail == "Informe se o marketing é global ou local"
    

def test_add_marketing_with_missing_address_info(db_session, mock_MarketingRequest, mock_UploadFile):
    new_marketing: MarketingRequest = MarketingRequest(**mock_MarketingRequest.dict())
    new_marketing.state = None
    uc = MarketingUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.add_marketing(new_marketing, mock_UploadFile)
        
    assert e.value.status_code == 400
    assert e.value.detail == "Informe o estado"
    
def test_add_marketing_with_missing_city_info(db_session, mock_MarketingRequest, mock_UploadFile):
    new_marketing: MarketingRequest = MarketingRequest(**mock_MarketingRequest.dict())
    new_marketing.city = None
    uc = MarketingUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.add_marketing(new_marketing, mock_UploadFile)
        
    assert e.value.status_code == 400
    assert e.value.detail == "Informe a cidade"
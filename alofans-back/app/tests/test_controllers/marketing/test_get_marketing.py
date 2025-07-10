from fastapi import HTTPException
from pytest import raises


from constants.marketing import(
    ERROR_MARKETING_GET_NOT_FOUND,
    ERROR_MARKETING_LIST_EMPTY,
    ERROR_MARKETING_REQUIRED_FIELD_STATE
)
from schemas.marketing import(
    MarketingResponse,
)
from useCases.marketing import MarketingUseCases

def test_list_all_marketing(db_session, mock_marketing_list_on_db):
    
    uc = MarketingUseCases(db_session)
    marketings = uc.list_all_marketing()
    
    assert len(marketings) == 3
    for m in marketings:
        assert isinstance(m, MarketingResponse)
        
    for idx in range(0, len(marketings),1):
        assert marketings[idx].id == mock_marketing_list_on_db[idx].id
        assert marketings[idx].image_path == mock_marketing_list_on_db[idx].image_path
        assert marketings[idx].is_global == mock_marketing_list_on_db[idx].is_global
        assert marketings[idx].state == mock_marketing_list_on_db[idx].state
        assert marketings[idx].city == mock_marketing_list_on_db[idx].city
    
def test_list_all_marketing_with_no_data(db_session):
    
    uc = MarketingUseCases(db_session)
    
    with raises(HTTPException) as e:

        uc.list_all_marketing()
        
    assert e.value.status_code == 404
    assert e.value.detail == ERROR_MARKETING_LIST_EMPTY


def test_get_marketing_by_id(db_session, mock_marketing_on_db):
    
    uc = MarketingUseCases(db_session)
    marketing = uc.get_marketing_by_id(mock_marketing_on_db.id)
    
    assert isinstance(marketing, MarketingResponse)
    assert marketing.id == mock_marketing_on_db.id
    assert marketing.image_path == mock_marketing_on_db.image_path
    assert marketing.is_global == mock_marketing_on_db.is_global
    assert marketing.state == mock_marketing_on_db.state
    assert marketing.city == mock_marketing_on_db.city
    

def test_get_marketing_by_id_not_found(db_session):
    
    uc = MarketingUseCases(db_session)
    
    with raises(HTTPException) as e:

        uc.get_marketing_by_id("abacate")
        
    assert e.value.status_code == 404
    assert e.value.detail == ERROR_MARKETING_GET_NOT_FOUND


def test_get_marketing_by_address(db_session, mock_marketing_on_db):
    
    uc = MarketingUseCases(db_session)
    marketings = uc.get_marketing_by_address(mock_marketing_on_db.state, mock_marketing_on_db.city)
    
    assert len(marketings) == 1
    assert isinstance(marketings[0], MarketingResponse)
    assert marketings[0].id == mock_marketing_on_db.id
    assert marketings[0].image_path == mock_marketing_on_db.image_path
    assert marketings[0].is_global == mock_marketing_on_db.is_global
    assert marketings[0].state == mock_marketing_on_db.state
    assert marketings[0].city == mock_marketing_on_db.city

def test_get_marketing_by_state(db_session, mock_marketing_on_db):
    
    uc = MarketingUseCases(db_session)
    marketings = uc.get_marketing_by_address(mock_marketing_on_db.state)
    
    assert len(marketings) == 1
    assert isinstance(marketings[0], MarketingResponse)
    assert marketings[0].id == mock_marketing_on_db.id
    assert marketings[0].image_path == mock_marketing_on_db.image_path
    assert marketings[0].is_global == mock_marketing_on_db.is_global
    assert marketings[0].state == mock_marketing_on_db.state
    assert marketings[0].city == mock_marketing_on_db.city
    


def test_get_marketing_by_address_not_found(db_session):
    
    uc = MarketingUseCases(db_session)
    
    with raises(HTTPException) as e:

        uc.get_marketing_by_address("mock_state", "mock_city")
        
    assert e.value.status_code == 404
    assert e.value.detail == ERROR_MARKETING_GET_NOT_FOUND
    

def test_get_marketing_by_address_not_state(db_session):
    
    uc = MarketingUseCases(db_session)
    
    with raises(HTTPException) as e:

        uc.get_marketing_by_address(None, "mock_city")
        
    assert e.value.status_code == 400
    assert e.value.detail == ERROR_MARKETING_REQUIRED_FIELD_STATE

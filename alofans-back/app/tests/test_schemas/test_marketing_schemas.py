from fastapi import HTTPException
from pytest import raises


from constants.marketing import (
    ERROR_MARKETING_REQUIRED_FIELD_CITY,
    ERROR_MARKETING_REQUIRED_FIELD_IS_GLOBAL, 
    ERROR_MARKETING_REQUIRED_FIELD_STATE
)
from schemas.marketing import MarketingRequest


def test_MarketingRequest_global_success(mock_MarketingRequest_data_global):
    data = mock_MarketingRequest_data_global.copy()

    request = MarketingRequest(**data)

    assert request.is_global == data["is_global"]
    assert request.state == None
    assert request.city == None


def test_MarketingRequest_local_success(mock_MarketingRequest_data_local):
    data = mock_MarketingRequest_data_local.copy()

    request = MarketingRequest(**data)

    assert request.is_global == data["is_global"]
    assert request.state == data["state"]
    assert request.city == data["city"]


def test_MarketingRequest_is_global_required_is_global_error(mock_MarketingRequest_data_global):
    data = mock_MarketingRequest_data_global.copy()
    del data["is_global"]

    with raises(HTTPException) as e:
        MarketingRequest(**data)

    assert e.value.status_code == 422
    assert e.value.detail == ERROR_MARKETING_REQUIRED_FIELD_IS_GLOBAL


def test_MarketingRequest_is_global_required_address_if_not_is_global(mock_MarketingRequest_data_global):

    data = mock_MarketingRequest_data_global.copy()
    data["is_global"] = False

    with raises(HTTPException) as e:
        MarketingRequest(**data)

    assert e.value.status_code == 422
    assert e.value.detail == ERROR_MARKETING_REQUIRED_FIELD_STATE


def test_MarketingRequest_is_global_required_address_if_not_is_global_but_with_city(mock_MarketingRequest_data_local):
    
    data = mock_MarketingRequest_data_local.copy()
    del data["state"]

    with raises(HTTPException) as e:
        MarketingRequest(**data)

    assert e.value.status_code == 422
    assert e.value.detail == ERROR_MARKETING_REQUIRED_FIELD_STATE


def test_MarketingRequest_is_global_required_address_if_not_is_global_but_with_state(mock_MarketingRequest_data_local):
    
    data = mock_MarketingRequest_data_local.copy()
    del data["city"]

    with raises(HTTPException) as e:
        MarketingRequest(**data)

    assert e.value.status_code == 422
    assert e.value.detail == ERROR_MARKETING_REQUIRED_FIELD_CITY
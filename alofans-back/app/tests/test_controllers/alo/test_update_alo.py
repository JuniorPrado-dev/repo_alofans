from fastapi import HTTPException
from pytest import raises
import pytest


from db.models import (
    Alo as AloModel,
    Event as EventModel
)
from enums.alo import AloStatus
from services.sse import SSE
from useCases.alo import AloUseCases


@pytest.mark.asyncio
async def test_update_alo(db_session, mock_alo_on_db):
    
    uc = AloUseCases(db_session)
    
    response = await uc.update_alo(mock_alo_on_db.id, AloStatus.approved.value)
    
    assert response is not None
    assert response.detail == "Status do Alo atualizado com sucesso"
    
    alo = db_session.query(AloModel).filter_by(id=mock_alo_on_db.id).first()
    
    assert alo is not None
    assert alo.status == AloStatus.approved.value
    

@pytest.mark.asyncio
async def test_update_alo_with_no_alo_id(db_session, mock_alo_on_db):
    
    uc = AloUseCases(db_session)
    
    with raises(HTTPException) as e:
        await uc.update_alo(None, "FINALIZADO")
    
    assert e.value.status_code == 400
    assert e.value.detail == "Informe o ID"

@pytest.mark.asyncio 
async def test_update_alo_with_no_status(db_session, mock_alo_on_db):
    
    uc = AloUseCases(db_session)
    
    with raises(HTTPException) as e:
        await uc.update_alo(mock_alo_on_db.id, None)
    
    assert e.value.status_code == 400
    assert e.value.detail == "Informe o status"


@pytest.mark.asyncio  
async def test_update_alo_with_invalid_status(db_session, mock_alo_on_db):
    
    uc = AloUseCases(db_session)
    
    with raises(HTTPException) as e:
        await uc.update_alo(mock_alo_on_db.id, "Abacaxi")
    
    assert e.value.status_code == 400
    assert e.value.detail == "Status inválido"


@pytest.mark.asyncio
async def test_update_alo_with_invalid_alo_id(db_session, mock_alo_on_db):
    
    uc = AloUseCases(db_session)
    
    with raises(HTTPException) as e:
        await uc.update_alo("Abacaxi", "FINALIZADO")
    
    assert e.value.status_code == 404
    assert e.value.detail == "Alo não encontrado"


@pytest.mark.asyncio
async def test_update_alo_to_reject_and_add_new_alo_to_sale(db_session, mock_alo_on_db):
    
    uc = AloUseCases(db_session)

    event = db_session.query(EventModel).filter_by(id=mock_alo_on_db.event_id).first()

    alos = event.alo_quantity
    
    response = await uc.update_alo(mock_alo_on_db.id, AloStatus.rejected.value)
    
    assert response is not None
    assert response.detail == "Status do Alo atualizado com sucesso"

    
    alo = db_session.query(AloModel).filter_by(id=mock_alo_on_db.id).first()
    
    assert alo is not None
    assert alo.status == AloStatus.rejected.value

    event = db_session.query(EventModel).filter_by(id=mock_alo_on_db.event_id).first()

    assert alos + 1 == event.alo_quantity


@pytest.mark.asyncio
async def test_update_alo_to_finished(db_session, mock_alo_on_db):

    
    uc = AloUseCases(db_session)
    
    response = await uc.update_alo(mock_alo_on_db.id, AloStatus.approved.value)

    alo = db_session.query(AloModel).filter_by(id=mock_alo_on_db.id).first()
    assert response is not None
    assert response.detail == "Status do Alo atualizado com sucesso"
    assert alo.status == AloStatus.approved.value
    

    response = await uc.update_alo(mock_alo_on_db.id, AloStatus.finished.value)

    alo = db_session.query(AloModel).filter_by(id=mock_alo_on_db.id).first()
    assert response is not None
    assert response.detail == "Status do Alo atualizado com sucesso"
    assert alo.status == AloStatus.finished.value


@pytest.mark.asyncio
async def test_SSE_when_pay_alo(db_session, mock_alo_on_db):
    
    uc = AloUseCases(db_session)

    while SSE.count() > 0:
        SSE.get_event()

    sse_list = SSE.count()

    assert sse_list == 0
    
    response = await uc.update_alo(mock_alo_on_db.id, AloStatus.approved.value)
    
    assert response is not None
    assert response.detail == "Status do Alo atualizado com sucesso"
    
    alo = db_session.query(AloModel).filter_by(id=mock_alo_on_db.id).first()
    
    assert alo is not None
    assert alo.status == AloStatus.approved.value

    sse_list = SSE.count()

    assert sse_list == 1
    
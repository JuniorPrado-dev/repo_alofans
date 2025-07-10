from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


from enums.alo import AloStatus
from hooks.alo_notify import waiting_payment_notify
from routes.configs.deps import get_db_session
from routes.docs.payment import (
    PAYMENT_ADD,
    PAYMENT_CONFIRM, 
    PAYMENT_DELETE,
    PAYMENT_EXPIRED, 
    PAYMENT_GET,
    PAYMENT_SUBACCOUNT, 
    PAYMENT_WITHDRAW
)
from schemas.base import BaseMessage
from schemas.openpix_webhook import PixCallback
from schemas.payment import(
    PaymentRequest,
    PaymentResponse,
    SubAccountResponse,
    WithDrawTransaction
)
from useCases.payment import PaymentUseCases
from useCases.alo import AloUseCases


router = APIRouter(prefix='/payment', tags=['Payment'])


@router.post("/add", description=PAYMENT_ADD)
async def add_alo_payment(
    request: PaymentRequest,
    db_session: Session = Depends(get_db_session)
) -> PaymentResponse:
    
    uc = PaymentUseCases(db_session)
    alo_uc = AloUseCases(db_session)

    alo_data = request.alo_data

    response = alo_uc.add_alo(alo_data)

    alo_id = response["alo_id"]
    client_pushToken = response["pushToken"]
    
    payment = uc.generate_payment_to_gateway(request, alo_id)
    
    response = uc.send_payment_to_gateway(payment)

    if client_pushToken:
        await waiting_payment_notify(client_pushToken)
    
    return response

@router.get("/get", description=PAYMENT_GET)
async def get_payment(
    id: str,
    db_session: Session = Depends(get_db_session)
) -> PaymentResponse:
    
    uc = PaymentUseCases(db_session)
    
    id = id.strip() # Removendo qualquer espaço adicional para garantir
    
    response = uc.get_payment_in_gateway(id)

    return response

@router.delete("/delete", description=PAYMENT_DELETE)
async def delete_payment(
    id: str,
    db_session: Session = Depends(get_db_session)
) -> str:
    
    uc = PaymentUseCases(db_session)

    response = uc.delete_payment_request_in_gateway(id)
    
    return response

@router.get("/withdraw", description=PAYMENT_WITHDRAW)
async def withdraw_payment(
    pix_key: str,
    pix_key_type: str,
    db_session: Session = Depends(get_db_session)
) -> WithDrawTransaction:
    
    uc = PaymentUseCases(db_session)
    
    response = uc.withdraw_from_subaccount(pix_key, pix_key_type)
    
    # TODO: Implementar notificação para o recebedor do dinheiro avisando
    
    # if client_pushToken:
    #     await waiting_payment_notify(client_pushToken)
    
    return response

@router.post("/confirm", description=PAYMENT_CONFIRM)
async def confirm_payment(
    callback: PixCallback,
    db_session: Session = Depends(get_db_session)
) -> BaseMessage:
    
    uc = AloUseCases(db_session)

    alo_id = callback.charge.correlationID
    

    response = await uc.update_alo(alo_id, status=AloStatus.awaiting.value)

    return response


@router.post("/expired", description=PAYMENT_EXPIRED)
async def expired_payment(
    callback: PixCallback,
    db_session: Session = Depends(get_db_session)
) -> dict:
    
    uc = AloUseCases(db_session)

    alo_id = callback.charge.correlationID

    response = uc.delete_alo(alo_id)

    return response


@router.get("/subaccount", description=PAYMENT_SUBACCOUNT)
async def get_subaccount_data(
    pix_key: str,
    pix_key_type: str,
    db_session: Session = Depends(get_db_session)
) -> SubAccountResponse:
        
    uc = PaymentUseCases(db_session)
    
    response = uc.get_subaccount(pix_key, pix_key_type)
    
    return response

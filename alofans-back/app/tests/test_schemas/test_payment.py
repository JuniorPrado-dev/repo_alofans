from fastapi import HTTPException
from pytest import raises

from schemas.alo import AloRequest
from services.ids import id_generate
from utils.format import datetime_to_isoformat
from schemas.payment import (
    Customer,
    Split,
    PaymentRequest,
    PaymentRequestGateway,
    SubAccountRequest,
    SubAccountResponse,
    TransferSubAccountRequest,
    WithDrawTransaction
)

def test_success_customer():
    customer = Customer(name="John Doe", email="john.doe@example.com")
    assert customer.name == "John Doe"
    assert customer.email == "john.doe@example.com"
    
def test_fail_customer_email():
    with raises(HTTPException) as e:
        Customer(name="John Doe", email=None)
    
    assert e.value.detail == "E-mail é obrigatório"
    assert e.value.status_code == 422
    
def test_fail_customer_name():
    with raises(HTTPException) as e:
        Customer(name=None, email="john.doe@example.com")
    
    assert e.value.detail == "Nome é obrigatório"
    assert e.value.status_code == 422
    
def test_fail_customer():
    with raises(HTTPException) as e:
        Customer(name=None, email=None)
    
    assert e.value.detail == "Nome é obrigatório"
    assert e.value.status_code == 422
    
    
    
def test_SubAccountRequest():
    
    subaccount = SubAccountRequest(
        name = "123.123.123-12",
        pixKey="123.123.123-12"
    )
    
    assert subaccount.name == "123.123.123-12"
    assert subaccount.pixKey == "123.123.123-12"
    
def test_SubAccountRequest_fail_name():
    
    with raises(HTTPException) as e:
        SubAccountRequest(
            name = None,
            pixKey="123.123.123-12"
        )
    
    assert e.value.status_code == 422
    assert e.value.detail == "CPF/CNPJ do Cliente é obrigatório"
    
def test_SubAccountRequest_fail_pixKey():
    
    with raises(HTTPException) as e:
        SubAccountRequest(
            name = "123.123.123-12",
            pixKey=None
        )
    
    assert e.value.status_code == 422
    assert e.value.detail == "Chave Pix do Cliente é obrigatória"
    
    
def test_SubAccountResponse():
    
    subaccount = SubAccountResponse(
        name = "123.123.123-12",
        pixKey="123.123.123-12",
        balance=100000
    )
    
    assert subaccount.name == "123.123.123-12"
    assert subaccount.pixKey == "123.123.123-12"
    assert subaccount.balance == 100000/100
    
def test_SubAccountResponse_fail_name():
    
    with raises(HTTPException) as e:
        SubAccountResponse(
            name = None,
            pixKey="123.123.123-12",
            balance=100000
        )
    
    assert e.value.status_code == 422
    assert e.value.detail == "CPF/CNPJ do Cliente é obrigatório"
    
def test_SubAccountResponse_fail_pixKey():
    
    with raises(HTTPException) as e:
        SubAccountResponse(
            name = "123.123.123-12",
            pixKey=None,
            balance=100000
        )
    
    assert e.value.status_code == 422
    assert e.value.detail == "Chave Pix do Cliente é obrigatória"
    
def test_SubAccountResponse_fail_balance():
    
    with raises(HTTPException) as e:
        SubAccountResponse(
            name = "123.123.123-12",
            pixKey="123.123.123-12",
            balance=None
        )
    
    assert e.value.status_code == 422
    assert e.value.detail == "Saldo da Conta é inválido"
    
    
def test_WithDrawTransaction():
    
    status = "CREATED"
    value = 1000
    correlationID = "123456"
    destinationAlias = "rec_123456"
    comment = "Saque da Conta"
    
    withdraw = WithDrawTransaction(
        status=status,
        value=value,
        correlationID=correlationID,
        destinationAlias=destinationAlias,
        comment=comment
    )
    
    assert status == status
    assert withdraw.value == value
    assert withdraw.correlationID == correlationID
    assert withdraw.destinationAlias == destinationAlias
    assert withdraw.comment == comment
    
    
def test_WithDrawTransaction_fail_status():
    
    status = None
    value = 1000
    correlationID = "123456"
    destinationAlias = "rec_123456"
    comment = "Saque da Conta"
    
    with raises(HTTPException) as e:
        WithDrawTransaction(
            status=status,
            value=value,
            correlationID=correlationID,
            destinationAlias=destinationAlias,
            comment=comment
        )
    
    assert e.value.detail == "Status da Transação é obrigatório"
    assert e.value.status_code == 422
    
def test_WithDrawTransaction_fail_value():
    
    value = -1000
    correlationID = "123456"
    destinationAlias = "rec_123456"
    comment = "Saque da Conta"
    
    with raises(HTTPException) as e:
        WithDrawTransaction(
            status="CREATED",
            value=value,
            correlationID=correlationID,
            destinationAlias=destinationAlias,
            comment=comment
        )
    
    assert e.value.detail == "Valor da Transação é inválido"
    assert e.value.status_code == 422


def test_WithDrawTransaction_fail_correlationID():
    
    correlationID = None
    destinationAlias = "rec_123456"
    comment = "Saque da Conta"
    
    with raises(HTTPException) as e:
        WithDrawTransaction(
            status="CREATED",
            value=1000,
            correlationID=correlationID,
            destinationAlias=destinationAlias,
            comment=comment
        )
    
    assert e.value.detail == "Identificação da Transação é obrigatória"
    assert e.value.status_code == 422
    

def test_WithDrawTransaction_fail_destinationAlias():
    
    destinationAlias = None
    comment = "Saque da Conta"
    
    with raises(HTTPException) as e:
        WithDrawTransaction(
            status="CREATED",
            value=1000,
            correlationID="123456",
            destinationAlias=destinationAlias,
            comment=comment
        )
    
    assert e.value.detail == "Chave Pix do Destinatário é obrigatória"
    assert e.value.status_code == 422
    

def test_WithDrawTransaction_fail_comment():
    
    comment = None
    
    with raises(HTTPException) as e:
        WithDrawTransaction(
            status="CREATED",
            value=1000,
            correlationID="123456",
            destinationAlias="rec_123456",
            comment=comment
        )
    
    assert e.value.detail == "Comentário da Transação é obrigatório"
    assert e.value.status_code == 422


def test_TransferSubAccountRequest():
    
    value = 1000
    correlationID = "123456"
    
    transfer = TransferSubAccountRequest(
        value=value,
        fromPixKey="123.123.123-12",
        fromPixKeyType="CPF",
        toPixKey="987.654.321-00",
        toPixKeyType="CPF",
        correlationID=correlationID
    )
    
    assert transfer.value == value
    assert transfer.fromPixKey == "123.123.123-12"
    assert transfer.fromPixKeyType == "CPF"
    assert transfer.toPixKey == "987.654.321-00"
    assert transfer.toPixKeyType == "CPF"
    assert transfer.correlationID == correlationID
    
def test_TransferSubAccountRequest_fail_value():
    
    value = -1000
    correlationID = "123456"
    
    with raises(HTTPException) as e:
        TransferSubAccountRequest(
            value=value,
            fromPixKey="123.123.123-12",
            fromPixKeyType="CPF",
            toPixKey="987.654.321-00",
            toPixKeyType="CPF",
            correlationID=correlationID
        )
    
    assert e.value.detail == "Valor da Transação é inválido"
    assert e.value.status_code == 422
    


def test_TransferSubAccountRequest_fail_fromPixKey():
    
    fromPixKey = None
    correlationID = "123456"
    
    with raises(HTTPException) as e:
        TransferSubAccountRequest(
            value=1000,
            fromPixKey=fromPixKey,
            fromPixKeyType="CPF",
            toPixKey="987.654.321-00",
            toPixKeyType="CPF",
            correlationID=correlationID
        )
    
    assert e.value.detail == "Chave Pix do Remetente é obrigatória"
    assert e.value.status_code == 422







    
    
    
    
    
    
    
    
    
    
def test_success_split():
    
    value = 1000
    pix = "rec_123456"
    
    split = Split(value=value, pixKey=pix)
    assert split.value == value
    assert split.pixKey == pix
    
def test_success_split():
    
    value = 1000
    pix = "rec_123456"
    
    split = Split(value=value, pixKey=pix)
    assert split.value == value
    assert split.pixKey == pix
    
def test_fail_split_none_value():
    with raises(HTTPException) as e:
        Split(value=None, pixKey="rec_123456")
    
    assert e.value.detail == "Valor é obrigatório"
    assert e.value.status_code == 422
    
def test_fail_split_invalid_value():
    with raises(HTTPException) as e:
        value = -1
        Split(value=value, pixKey="rec_123456")
    
    assert e.value.detail == "Valor não pode ser negativo"
    assert e.value.status_code == 422
    
def test_fail_split_invalid_pixKey():
    value = 10
    pixKey = None
    
    with raises(HTTPException) as e:

        Split(value=value, pixKey=pixKey)
    
    assert e.value.detail == "Chave pix é obrigatória"
    assert e.value.status_code == 422
    
def test_fail_split_invalid_splitType():
    value = 10
    pixKey = "12312312313123"
    splitType="abacate"
    
    with raises(HTTPException) as e:

        Split(value=value, pixKey=pixKey, splitType=splitType)
    
    assert e.value.detail == "Tipo de split de pagamento invalido"
    assert e.value.status_code == 422
    
def test_success_billing():
    value = 30
    customer = Customer(name="John Doe", email="john Doe@example.com")
    producer_cpf_cnpj = "123.123.123-70"
    producer_pixkey= "123.123.123-70"
    alo_data = AloRequest(
        text_message="Aloooo",
        payment_value=value,
        client_id="123456",
        event_id="123456"
    )
    
    billing = PaymentRequest(
        value=value,
        customer=customer,
        alo_data=alo_data,
        producer_cpf_cnpj=producer_cpf_cnpj,
        producer_pixkey=producer_pixkey
    )
    
    assert billing.value == value
    assert billing.customer.name == "John Doe"
    assert billing.customer.email == "john Doe@example.com"
    assert billing.producer_cpf_cnpj == producer_cpf_cnpj
    assert billing.producer_pixkey == producer_pixkey
    assert billing.alo_data.text_message == "Aloooo"
    assert billing.alo_data.payment_value == value
    assert billing.alo_data.client_id == "123456"
    assert billing.alo_data.event_id == "123456"


def test_fail_billing_none_value():
    
    with raises(HTTPException) as e:
        value = 30
        customer = Customer(name="John Doe", email="john Doe@example.com")
        producer_cpf_cnpj = "123.123.123-70"
        producer_pixkey= "123.123.123-70"
        alo_data = AloRequest(
            text_message="Aloooo",
            payment_value=value,
            client_id="123456",
            event_id="123456"
        )
        
        PaymentRequest(
            value=None,
            customer=customer,
            producer_cpf_cnpj=producer_cpf_cnpj,
            producer_pixkey=producer_pixkey,
            alo_data=alo_data
        )
    assert e.value.detail == "Valor é obrigatório"
    assert e.value.status_code == 422
    

def test_fail_billing_invalid_value():
    
    with raises(HTTPException) as e:
        value = 30
        customer = Customer(name="John Doe", email="john Doe@example.com")
        producer_cpf_cnpj = "123.123.123-70"
        producer_pixkey= "123.123.123-70"
        alo_data = AloRequest(
            text_message="Aloooo",
            payment_value=value,
            client_id="123456",
            event_id="123456"
        )
        
        PaymentRequest(
            value= -1,
            customer=customer,
            producer_cpf_cnpj=producer_cpf_cnpj,
            producer_pixkey=producer_pixkey,
            alo_data=alo_data
        )
        
    assert e.value.detail == "Valor não pode ser negativo"
    assert e.value.status_code == 422
    

def test_fail_billing_invalid_value():
    
    with raises(HTTPException) as e:
        value = 30
        customer = Customer(name="John Doe", email="john Doe@example.com")
        producer_cpf_cnpj = "123.123.123-70"
        producer_pixkey= "123.123.123-70"
        alo_data = AloRequest(
            text_message="Aloooo",
            payment_value=value,
            client_id="123456",
            event_id="123456"
        )
        
        PaymentRequest(
            value=0,
            customer=customer,
            producer_cpf_cnpj=producer_cpf_cnpj,
            producer_pixkey=producer_pixkey,
            alo_data=alo_data
        )
        
    assert e.value.detail == "Valor não pode ser zero"
    assert e.value.status_code == 422

def test_fail_billing_invalid_customer():
    
    with raises(HTTPException) as e:
        value = 30
        customer = Customer(name="John Doe", email="john Doe@example.com")
        producer_cpf_cnpj = "123.123.123-70"
        producer_pixkey= "123.123.123-70"
        alo_data = AloRequest(
            text_message="Aloooo",
            payment_value=value,
            client_id="123456",
            event_id="123456"
        )
        
        PaymentRequest(
            value=value,
            customer=None,
            producer_cpf_cnpj=producer_cpf_cnpj,
            producer_pixkey=producer_pixkey,
            alo_data=alo_data
        )
        
    assert e.value.detail == "Cliente é obrigatório"
    assert e.value.status_code == 422
    

def test_fail_billing_invalid_producer_cpf_cnpj():

    
    with raises(HTTPException) as e:
        value = 30
        customer = Customer(name="John Doe", email="john Doe@example.com")
        producer_cpf_cnpj = None
        producer_pixkey= "123.123.123-70"
        alo_data = AloRequest(
            text_message="Aloooo",
            payment_value=value,
            client_id="123456",
            event_id="123456"
        )
        
        PaymentRequest(
            value=value,
            customer=customer,
            producer_cpf_cnpj=producer_cpf_cnpj,
            producer_pixkey=producer_pixkey,
            alo_data=alo_data
        )
        
    assert e.value.detail == "CPF/CNPJ do produtor é obrigatório"
    assert e.value.status_code == 422

def test_fail_billing_wrong_producer_cpf_cnpj():

    
    with raises(HTTPException) as e:
        value = 30
        customer = Customer(name="John Doe", email="john Doe@example.com")
        producer_cpf_cnpj = "123"
        producer_pixkey= "123.123.123-70"
        alo_data = AloRequest(
            text_message="Aloooo",
            payment_value=value,
            client_id="123456",
            event_id="123456"
        )
        
        PaymentRequest(
            value=value,
            customer=customer,
            producer_cpf_cnpj=producer_cpf_cnpj,
            producer_pixkey=producer_pixkey,
            alo_data=alo_data
        )
        
    assert e.value.detail == "CPF/CNPJ invalido"
    assert e.value.status_code == 422


def test_fail_billing_invalid_producer_pixkey():

    
    with raises(HTTPException) as e:
        value = 30
        customer = Customer(name="John Doe", email="john Doe@example.com")
        producer_cpf_cnpj = "123.123.123-70"
        producer_pixkey= None
        alo_data = AloRequest(
            text_message="Aloooo",
            payment_value=value,
            client_id="123456",
            event_id="123456"
        )
        
        PaymentRequest(
            value=value,
            customer=customer,
            producer_cpf_cnpj=producer_cpf_cnpj,
            producer_pixkey=producer_pixkey,
            alo_data=alo_data
        )
        
    assert e.value.detail == "Chave Pix do produtor é obrigatória"
    assert e.value.status_code == 422


def test_validate_interlocutor_wrong_cpf_cnpj():
    with raises(HTTPException) as e:
        value = 30
        customer = Customer(name="John Doe", email="john Doe@example.com")
        producer_cpf_cnpj = "123.123.123-70"
        producer_pixkey= "123.123.123-70"
        interlocutor_cpf_cnpj = "123.123.123"
        interlocutor_pixkey = "123.123.123-71"
        alo_data = AloRequest(
            text_message="Aloooo",
            payment_value=value,
            client_id="123456",
            event_id="123456"
        )
        
        PaymentRequest(
            value=value,
            customer=customer,
            producer_cpf_cnpj=producer_cpf_cnpj,
            producer_pixkey=producer_pixkey,
            alo_data=alo_data,
            interlocutor_cpf_cnpj=interlocutor_cpf_cnpj,
            interlocutor_pixkey=interlocutor_pixkey,
            interlocutor_percent=0.05
        )
        
    assert e.value.detail == "CPF/CNPJ invalido"
    assert e.value.status_code == 422

def test_validate_interlocutor_no_cpf_cnpj():
    with raises(HTTPException) as e:
        value = 30
        customer = Customer(name="John Doe", email="john Doe@example.com")
        producer_cpf_cnpj = "123.123.123-70"
        producer_pixkey= "123.123.123-70"
        interlocutor_cpf_cnpj = None
        interlocutor_pixkey = "123.123.123-71"
        alo_data = AloRequest(
            text_message="Aloooo",
            payment_value=value,
            client_id="123456",
            event_id="123456"
        )
        
        PaymentRequest(
            value=value,
            customer=customer,
            producer_cpf_cnpj=producer_cpf_cnpj,
            producer_pixkey=producer_pixkey,
            alo_data=alo_data,
            interlocutor_cpf_cnpj=interlocutor_cpf_cnpj,
            interlocutor_pixkey=interlocutor_pixkey,
            interlocutor_percent=0.05
        )
        
    assert e.value.detail == "CPF/CNPJ do interlocutor é obrigatório quando há interlocutor"
    assert e.value.status_code == 422

def test_validate_interlocutor_no_pixkey():
    with raises(HTTPException) as e:
        value = 30
        customer = Customer(name="John Doe", email="john Doe@example.com")
        producer_cpf_cnpj = "123.123.123-70"
        producer_pixkey= "123.123.123-70"
        interlocutor_cpf_cnpj = "123.123.123-71"
        alo_data = AloRequest(
            text_message="Aloooo",
            payment_value=value,
            client_id="123456",
            event_id="123456"
        )
        
        PaymentRequest(
            value=value,
            customer=customer,
            producer_cpf_cnpj=producer_cpf_cnpj,
            producer_pixkey=producer_pixkey,
            alo_data=alo_data,
            interlocutor_cpf_cnpj=interlocutor_cpf_cnpj
        )
        
    assert e.value.detail == "Chave Pix do interlocutor é obrigatória quando há interlocutor"
    assert e.value.status_code == 422
    

def test_validate_interlocutor_no_alo_data():
    with raises(HTTPException) as e:
        value = 30
        customer = Customer(name="John Doe", email="john Doe@example.com")
        producer_cpf_cnpj = "123.123.123-70"
        producer_pixkey= "123.123.123-70"
        interlocutor_cpf_cnpj = "123.123.123-71"
        interlocutor_pixkey = "123.123.123-71"
        interlocutor_percent = 0.05
        alo_data = AloRequest(
            text_message="Aloooo",
            payment_value=value,
            client_id="123456",
            event_id="123456"
        )
        
        PaymentRequest(
            value=value,
            customer=customer,
            producer_cpf_cnpj=producer_cpf_cnpj,
            producer_pixkey=producer_pixkey,
            alo_data=None,
            interlocutor_cpf_cnpj=interlocutor_cpf_cnpj,
            interlocutor_pixkey=interlocutor_pixkey,
            interlocutor_percent=interlocutor_percent
        )
        
    assert e.value.detail == "Dados do ALO são obrigatórios"
    assert e.value.status_code == 422

def test_success_payment_request():
    
    correlationID = id_generate()
    value = 10
    customer = Customer(name="John Doe", email="john")
    comment = "Pagamento de teste"
    expiresDate = datetime_to_isoformat("2024-12-01 23:59")
    
    payment = PaymentRequestGateway(
        correlationID=correlationID,
        value=value,
        customer=customer,
        comment=comment,
        expiresDate=expiresDate
    )
    
    assert payment.correlationID == correlationID
    assert payment.value == value
    assert payment.customer.name == "John Doe"
    assert payment.customer.email == "john"
    assert payment.comment == comment
    assert payment.expiresDate == expiresDate
    
def test_fail_payment_request_no_correlationID():
    
    correlationID = None
    value = 10
    customer = Customer(name="John Doe", email="john")
    comment = "Pagamento de teste"
    expiresDate = datetime_to_isoformat("2024-12-01 23:59")
    
    with raises(HTTPException) as e:
        PaymentRequestGateway(
            correlationID=correlationID,
            value=value,
            customer=customer,
            comment=comment,
            expiresDate=expiresDate
        )

    assert e.value.status_code == 422
    assert e.value.detail == "ID de correlação é obrigatório"
    
def test_fail_payment_request_no_correlationID():
    
    correlationID = None
    value = 10
    customer = Customer(name="John Doe", email="john")
    comment = "Pagamento de teste"
    expiresDate = datetime_to_isoformat("2024-12-01 23:59")
    
    with raises(HTTPException) as e:
        PaymentRequestGateway(
            correlationID=correlationID,
            value=value,
            customer=customer,
            comment=comment,
            expiresDate=expiresDate
        )

    assert e.value.status_code == 422
    assert e.value.detail == "ID de correlação é obrigatório"
    
def test_fail_payment_request_no_value():
    
    correlationID = id_generate()
    value = 0
    customer = Customer(name="John Doe", email="john")
    comment = "Pagamento de teste"
    expiresDate = datetime_to_isoformat("2024-12-01 23:59")
    
    with raises(HTTPException) as e:
        PaymentRequestGateway(
            correlationID=correlationID,
            value=value,
            customer=customer,
            comment=comment,
            expiresDate=expiresDate
        )

    assert e.value.status_code == 422
    assert e.value.detail == "Valor não pode ser zero"
    
def test_fail_payment_request_invalid_value():
    
    correlationID = id_generate()
    value = -100
    customer = Customer(name="John Doe", email="john")
    comment = "Pagamento de teste"
    expiresDate = datetime_to_isoformat("2024-12-01 23:59")
    
    with raises(HTTPException) as e:
        PaymentRequestGateway(
            correlationID=correlationID,
            value=value,
            customer=customer,
            comment=comment,
            expiresDate=expiresDate
        )

    assert e.value.status_code == 422
    assert e.value.detail == "Valor invalido"
    
def test_fail_payment_request_no_expiresDate():
    
    correlationID = id_generate()
    value = 100
    customer = Customer(name="John Doe", email="john")
    comment = "Pagamento de teste"
    expiresDate = None
    
    with raises(HTTPException) as e:
        PaymentRequestGateway(
            correlationID=correlationID,
            value=value,
            customer=customer,
            comment=comment,
            expiresDate=expiresDate
        )

    assert e.value.status_code == 422
    assert e.value.detail == "A data de expiração é obrigatória"
    


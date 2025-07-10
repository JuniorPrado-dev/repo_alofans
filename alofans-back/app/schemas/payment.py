"""
Schemas Responsáveis pelo Pagamento

Classes:
    - Customer
    - SubAccountRequest
    - SubAccountResponse
    - PaymentRequest
    - PaymentRequestGateway
    - PaymentResponse
    - Split
    - WithdrawTransaction
    - TransferSubAccountRequest
    - TransferSubAccountResponse
    - DirectPIXRequest
    - DirectPIXResponse
"""
#from pydantic import model_validator

from typing import Literal
from pydantic import (
    field_validator,
    model_validator , 
    Field
)

from schemas.alo import AloRequest
from schemas.base import CustomBaseModel
from utils.format import validate_cpf_cnpj
from utils.messages.error import UnprocessableEntity

class Customer(CustomBaseModel):
    """
    Classe referente a um cliente que realiza o pagamento
    
    Nome é obrigatório, seguido de pelo menos um dos seguintes dados: [email, telefone]
    
    - attributes:
        - name:: str: Nome Completo do Cliente
        - email:: str: Email do Cliente
        
    """
     
    name: str | None = Field(
        title="Nome Completo do Cliente",
        description="Nome Completo do Cliente",
        examples=["Fulano de Tal"],
        default=None,
        validate_default=True
    )
    email: str | None = Field(
        title="E-mail do Cliente",
        description="E-mail do Cliente",
        examples=["email@test.com"],
        default=None,
        validate_default=True
    )
    #phone: str | None = None
    
    @field_validator('name', mode="before")
    def validate_value(cls, name):
        if not name:
            raise UnprocessableEntity("Nome é obrigatório")
        return name
    
    @field_validator('email', mode='before')
    def validate_email(cls, v):
        if not v:
           raise UnprocessableEntity("E-mail é obrigatório")
        return v
    
    
class SubAccountRequest(CustomBaseModel):
    """
    - name: str # CPF/CNPJ do Cliente
    - pixKey: str # Chave Pix do Cliente
    """
    name: str = Field(
        title="CPF/CNPJ do Cliente",
        description="CPF ou CNPJ do Cliente",
        examples=["12345678901"]
    )
    pixKey: str = Field(
        title="Chave Pix do Cliente",
        description="Chave Pix do Cliente",
        examples=["pixKeyTest@test.com"]
    )
    
    @field_validator('name',mode="before")
    def validate_name(cls, value):
        if not value:
            raise UnprocessableEntity("CPF/CNPJ do Cliente é obrigatório")
        validate_cpf_cnpj(value)
        return value
    
    @field_validator('pixKey',mode="before")
    def validate_pixKey(cls, value):
        if not value:
            raise UnprocessableEntity("Chave Pix do Cliente é obrigatória")
        return value
    
    
    
class SubAccountResponse(CustomBaseModel):
    """
    - name: str # CPF/CNPJ do Cliente
    - pixKey: str
    - balance: float # Valor em Centavos convertido para Real (será float provavelmente)
    """
    name: str = Field(
        title="CPF/CNPJ do Cliente",
        description="CPF ou CNPJ do Cliente",
        examples=["12345678901"]
    )
    pixKey: str = Field(
        title="Chave Pix do Cliente",
        description="Chave Pix do Cliente",
        examples=["pixKeyTest@test.com"]
    )
    balance: float = Field(
        title="Saldo da Conta",
        description="Saldo da Conta em Centavos",
        examples=[10000000]
    ) # o valor vem Valor em Centavos e o convertermos para real
    
    @field_validator('name',mode="before")
    def validate_name(cls, value):
        if not value:
            raise UnprocessableEntity("CPF/CNPJ do Cliente é obrigatório")
        return value
    
    @field_validator('pixKey',mode="before")
    def validate_pixKey(cls, value):
        if not value:
            raise UnprocessableEntity("Chave Pix do Cliente é obrigatória")
        return value
    
    @field_validator('balance',mode="before")
    def validate_balance(cls, value):
        if not isinstance(value, (int, float)) or value < 0:
            raise UnprocessableEntity("Saldo da Conta é inválido")
        
        return value / 100
    
class WithDrawTransaction(CustomBaseModel):
    """
    - status: str # Situação da Transação
    - value: int # Valor em Centavos que foi removido da conta
    - correlationID: str
    - destinationAlias: str # Chave Pix onde o saque foi feito
    - comment: str # Descrição da Transação
    """
    status: str = Field(
        title="Situação da Transação",
        description="Situação da Transação",
        examples=["CREATED"]
    )
    value: int = Field(
        title="Valor da Transação",
        description="Valor da Transação em Centavos",
        examples=[100000]
    )
    correlationID: str = Field(
        title="Identificação da Transação",
        description="Identificação da Transação",
        examples=["1234567890"]
    )
    destinationAlias: str = Field(
        title="Chave Pix do Destinatário",
        description="Chave Pix do Destinatário",
        examples=["test@gmail.com"]
    )
    comment: str = Field(
        title="Comentário da Transação",
        description="Comentário da Transação",
        examples=["Saque em teste"]
    )
    

    @field_validator('status',mode="before")
    def validate_status(cls, value):
        if not value:
            raise UnprocessableEntity("Status da Transação é obrigatório")
        return value
    

    @field_validator('value',mode="before")
    def validate_value(cls, value):
        if not isinstance(value, int) or value < 0:
            raise UnprocessableEntity("Valor da Transação é inválido")
        return value
    

    @field_validator('correlationID',mode="before")
    def validate_correlationID(cls, value):
        if not value:
            raise UnprocessableEntity("Identificação da Transação é obrigatória")
        return value
    
    @field_validator('destinationAlias',mode="before")
    def validate_destinationAlias(cls, value):
        if not value:
            raise UnprocessableEntity("Chave Pix do Destinatário é obrigatória")
        return value
    
    
    @field_validator('comment',mode="before")
    def validate_comment(cls, value):
        if not value:
            raise UnprocessableEntity("Comentário da Transação é obrigatório")
        return value
    
    
class TransferSubAccountRequest(CustomBaseModel):
    """
    Classe Responsável por coletar os dados necessários para realizar uma transferência de dinheiro	entre subcontas
    
    - attributes:
        - value:: int: Valor em centavos que será transferido
        - fromPixKey:: str: Chave pix que será transferido o dinheiro
        - fromPixKeyType:: str: Tipo da chave pix do remetente
        - toPixKey:: str: Chave pix do destinatário
        - toPixKeyType:: str: Tipo da chave pix do destinatário
        - correlationID:: str: Identificação da transação
    """
    value: int
    fromPixKey: str
    fromPixKeyType: Literal["CPF", "CNPJ", "EMAIL", "PHONE", "RANDOM"]
    toPixKey: str
    toPixKeyType: Literal["CPF", "CNPJ", "EMAIL", "PHONE", "RANDOM"]
    correlationID: str
    
    @field_validator('value',mode="before")
    def validate_value(cls, value):
        if not isinstance(value, int) or value < 0:
            raise UnprocessableEntity("Valor da Transação é inválido")
        return value
    
    @field_validator('fromPixKey',mode="before")
    def validate_fromPixKey(cls, value):
        if not value:
            raise UnprocessableEntity("Chave Pix do Remetente é obrigatória")
        return value
    
    @field_validator('fromPixKeyType',mode="before")
    def validate_fromPixKeyType(cls, value):
        if value not in ["CPF", "CNPJ", "EMAIL", "PHONE", "RANDOM"]:
            raise UnprocessableEntity("Tipo da Chave Pix do Remetente é inválido")
        return value
    
    @field_validator('toPixKey',mode="before")
    def validate_toPixKey(cls, value):
        if not value:
            raise UnprocessableEntity("Chave Pix do Destinatário é obrigatória")
        return value
    
    @field_validator('toPixKeyType',mode="before")
    def validate_toPixKeyType(cls, value):
        if value not in ["CPF", "CNPJ", "EMAIL", "PHONE", "RANDOM"]:
            raise UnprocessableEntity("Tipo da Chave Pix do Destinatário é inválido")
        return value
    
    @field_validator('correlationID',mode="before")
    def validate_correlationID(cls, value):
        if not value:
            raise UnprocessableEntity("Identificação da Transação é obrigatória")
        return value
    
    
class DestinationSubaccount(CustomBaseModel):
    """
    - name: str
    - pixKey: str
    - balance: int # Valor em Centavos
    """
    name: str
    pixKey: str
    balance: int
    
    @field_validator('name',mode="before")
    def validate_name(cls, value):
        if not value:
            raise UnprocessableEntity("CPF/CNPJ é obrigatório")
        return value
    
    @field_validator('pixKey',mode="before")
    def validate_pixKey(cls, value):
        if not value:
            raise UnprocessableEntity("Chave Pix do Cliente é obrigatória")
        return value
    
    @field_validator('balance',mode="before")
    def validate_balance(cls, value):
        if not isinstance(value, int) or value < 0:
            raise UnprocessableEntity("Saldo da Conta é inválido")
        return value
    

class OriginSubaccount(CustomBaseModel):
    """
    - name: str
    - pixKey: str
    - balance: int # Valor em Centavos
    """
    name: str
    pixKey: str
    balance:int   
    
    @field_validator('name',mode="before")
    def validate_name(cls, value):
        if value is None:
            raise UnprocessableEntity("CPF/CNPJ é obrigatório")
        return value
    
    @field_validator('pixKey',mode="before")
    def validate_pixKey(cls, value):
        if not value:
            raise UnprocessableEntity("Chave Pix do Cliente é obrigatória")
        return value
    
    @field_validator('balance',mode="before")
    def validate_balance(cls, value):
        if not isinstance(value, int) or value < 0:
            raise UnprocessableEntity("Saldo da Conta é inválido")
        return value
    
    
class TransferSubAccountResponse(CustomBaseModel):
    """
    Classe responsável por retornar os dados de uma transferência de dinheiro entre subcontas
    
    - value: int # Valor em Centavos
    - destinationSubaccount: DestinationSubaccount
    - originSubaccount: OriginSubaccount
    """
    value: int
    destinationSubaccount: DestinationSubaccount
    originSubaccount: OriginSubaccount
    
    @field_validator('value',mode="before")
    def validate_value(cls, value):
        if not isinstance(value, int) or value < 0:
            raise UnprocessableEntity("Valor da Transação é inválido")
        return value
    
    @field_validator('destinationSubaccount', mode="before")
    def validate_destinationSubaccount(cls, value):
        if not value:
            raise UnprocessableEntity("Conta de Destino é obrigatória")
        return value
    
    @field_validator('originSubaccount', mode="before")
    def validate_originSubaccount(cls, value):
        if not value:
            raise UnprocessableEntity("Conta de Origem é obrigatória")
        return value
    
    
class DirectPIXRequest(CustomBaseModel):
    """
    Classe responsável por enviar um pix diretamente de uma conta para outra
    
    - Attributes:
        - value:: int: valor em centavos
        - fromPixKey:: str: Conta que será debitada o dinheiro
        - toPixKey:: str: Conta que receberá o dinheiro
    
    ### https://developers.openpix.com.br/en/api#tag/transfer-(request-access)/paths/~1api~1v1~1transfer/post
    """
    
    value: int
    fromPixKey: str
    toPixKey: str
    
    @field_validator('value',mode="before")
    def validate_value(cls, value):
        if not isinstance(value, int) or value < 0:
            raise UnprocessableEntity("Valor da Transação é inválido")
        return value
    
    @field_validator('fromPixKey',mode="before")
    def validate_fromPixKey(cls, value):
        if not value:
            raise UnprocessableEntity("Chave Pix do Remetente é obrigatória")
        return value
    
    @field_validator('toPixKey',mode="before")
    def validate_toPixKey(cls, value):
        if not value:
            raise UnprocessableEntity("Chave Pix do Destinatário é obrigatória")
        return value
    
    
class DirectPIXResponse(CustomBaseModel):
    """
    Classe responsável por retornar os dados de uma transferência de dinheiro entre subcontas
    
    - value: int
    - time: str
    - correlationID: str
    """
    value: int
    time: str
    correlationID: str
    
    @field_validator('value',mode="before")
    def validate_value(cls, value):
        if not isinstance(value, int) or value < 0:
            raise UnprocessableEntity("Valor da Transação é inválido")
        return value
    
    @field_validator('time',mode="before")
    def validate_time(cls, time):
        if not isinstance(time, str) or not time.isdigit():
            raise UnprocessableEntity("Hora da Transação é inválida")
        return time
    
    @field_validator('correlationID',mode="before")
    def validate_correlationID(cls, correlationID):
        if not isinstance(correlationID, str):
            raise UnprocessableEntity("Identificação da Transação é inválida")
        return correlationID
    
    
    
class Split(CustomBaseModel):
    """
    Classe referente a um split do pagamento
    
    Para entender melhor o tipo de split adequado, leia: https://developers.openpix.com.br/docs/splits/split-introduction
    
    - attributes:
        - value:: int: Valor em centavos que será retirado de uma transação
        - pixKey:: str: Chave pix que receberá o valor separado em centavos
        - splitType:: str: Tipo de método de divisão de pagamento, Padrão: "SPLIT_SUB_ACCOUNT"
        podendo ser ["SPLIT_INTERNAL_TRANSFER", "SPLIT_SUB_ACCOUNT", "SPLIT_PARTNER"] 
        
        ### https://developers.openpix.com.br/docs/splits/split-introduction
        
        ### https://ajuda.openpix.com.br/pt-br/article/como-funciona-o-split-pix-com-subcontas-na-openpix-1ib0j6j/
    """
    
    value: int
    pixKey: str
    splitType: Literal["SPLIT_INTERNAL_TRANSFER", "SPLIT_SUB_ACCOUNT", "SPLIT_PARTNER"] = "SPLIT_SUB_ACCOUNT" # Para o caso do alô, focamos em mandar diretamente para contas externas
    
    @field_validator('value',mode="before")
    def validate_value(cls, value):
        if value is None:
            raise UnprocessableEntity("Valor é obrigatório")
        if value < 0:
            raise UnprocessableEntity("Valor não pode ser negativo") 
        return value
    
    @field_validator('pixKey',mode="before")
    def validate_customer(cls, pixKey):
        if not pixKey:
            raise UnprocessableEntity("Chave pix é obrigatória")
        return pixKey
    
    @field_validator('splitType',mode="before")
    def validate_event_id(cls, splitType):
        if splitType not in ["SPLIT_INTERNAL_TRANSFER", "SPLIT_SUB_ACCOUNT", "SPLIT_PARTNER"]:
            raise UnprocessableEntity("Tipo de split de pagamento invalido")
        return splitType
    

class PaymentRequest(CustomBaseModel):
    """
    Classe com os dados para gerar uma cobrança de pagamento
    
    - Attributes:
        - value: float
        - customer: Customer
        - producer_cpf_cnpj: str
        - producer_pixkey: str
        - interlocutor_cpf_cnpj: str | None
        - interlocutor_pixkey:str | None
        - interlocutor_percent: float | None
        - alo_data: AloRequest
    """
    
    value: int | float
    customer: Customer
    producer_cpf_cnpj: str
    producer_pixkey: str
    interlocutor_cpf_cnpj: str | None = None
    interlocutor_pixkey: str | None = None
    interlocutor_percent: float | str | None = None
    alo_data: AloRequest
    
    @field_validator('value',mode="before")
    def validate_value(cls, value):
        if value is None:
            raise UnprocessableEntity("Valor é obrigatório")
        
        if value < 0:
            raise UnprocessableEntity("Valor não pode ser negativo")
        
        if value == 0:
            raise UnprocessableEntity("Valor não pode ser zero")
        return value
    
    @field_validator('customer',mode="before")
    def validate_customer(cls, customer):
        if not customer:
            raise UnprocessableEntity("Cliente é obrigatório")
        
        return customer
    
    @field_validator('producer_cpf_cnpj',mode="before")
    def validate_producer_cpf_cnpj(cls, v):
        if not v:
            raise UnprocessableEntity("CPF/CNPJ do produtor é obrigatório")
        
        validate_cpf_cnpj(v)

        return v
    
    @field_validator('producer_pixkey',mode="before")
    def validate_producer_pixkey(cls, v):
        if not v:
            raise UnprocessableEntity("Chave Pix do produtor é obrigatória")
        return v
    
    @model_validator(mode="before")
    def validate_interlocutor(cls, values):
        interlocutor_cpf_cnpj = values.get("interlocutor_cpf_cnpj")
        interlocutor_pixkey = values.get("interlocutor_pixkey")
        interlocutor_percent = values.get("interlocutor_percent")
        
        if interlocutor_cpf_cnpj:
            if interlocutor_pixkey:
                if interlocutor_percent:

                    if isinstance(interlocutor_percent,str):
                        if len(interlocutor_percent.strip()) == 0:
                            values["interlocutor_percent"] = None
                        else:
                            values["interlocutor_percent"] = float(interlocutor_percent)
            
                    validate_cpf_cnpj(interlocutor_cpf_cnpj)

                else:
                    raise UnprocessableEntity("Porcentagem do interlocutor é obrigatória quando há interlocutor")  
            else:
                raise UnprocessableEntity("Chave Pix do interlocutor é obrigatória quando há interlocutor")

        
        else:
            if interlocutor_pixkey or interlocutor_percent:
                raise UnprocessableEntity("CPF/CNPJ do interlocutor é obrigatório quando há interlocutor")
        
        
        
        return values


    @field_validator('alo_data',mode="before")
    def validate_alo_data(cls, alo_data) -> AloRequest:
        if not alo_data:
            raise UnprocessableEntity("Dados do ALO são obrigatórios")


        return alo_data
    
    # TODO: Implementar testes nesse esquema

class PaymentRequestGateway(CustomBaseModel):
    """
    Classe referente aos dados para criar uma requisição de pagamento no Gateway do OpenPix
    
    - attributes:
        - correlationID:: str: Identificação do Pagamento
        - value:: int: Valor em Centavos do pagamento
        - comment:: str: Descrição do pagamento
        - expiresDate:: str: Data de expiração em forma ISO 8601 format
        - splits:: list[Split]: Lista de splits de pagamento caso seja uma transação com split
    """
    
    #- subaccount:: str: Chave pix de uma subconta cadastrada na plataforma para receber o pagamento
    #- subaccount: str | None = None
    
    correlationID: str
    value: int
    customer: Customer
    comment:  str | None= None
    expiresDate: str
    splits: list[Split] | None = None
    
    @field_validator('correlationID',mode="before")
    def validate_value(cls, correlationID):
        if not correlationID:
            raise UnprocessableEntity("ID de correlação é obrigatório")
        return correlationID
    
    @field_validator('value',mode="before")
    def validate_customer(cls, value):
        if value is None:
            raise UnprocessableEntity("Valor é obrigatório")
        if value < 0:
            raise UnprocessableEntity("Valor invalido")
        if value == 0:
            raise UnprocessableEntity("Valor não pode ser zero")
        return value
    
    @field_validator('expiresDate',mode="before")
    def validate_event_id(cls, expiresDate):
        if not expiresDate:
            raise UnprocessableEntity("A data de expiração é obrigatória")
        return expiresDate
    

class PaymentResponse(CustomBaseModel):
    """
    Classe referente aos dados de resposta da requisição de pagamento gerada no Gateway de Pagamento

    
    - attributes:
        - correlationID:: str (ID do item a ser pago, atualmente ID do ALO SEMPRE)
        - transactionID:: str 
        - status: str # status da transação ["ACTIVE", PENDENTE, FINALIZADA]
        - value: int # Valor em centavos da transação
        - fee: int # Taxa em Centavos da transação
        - discount: int # Desconto em Centavos da transação
        - valueWithDiscount: int # Valor da transação apos aplicar o desconto
        - pixKey:: str: Chave Pix para receber o pagamento
        - brCode::str: Código de Pagamento
        - qrCodeImage:: str: QRCode de pagamento
        
        
    - request_data:
      - charge:
        - customer:
        - value:
        - comment:
        - identifier
        - correlationID
        - paymentLinkID
        - transactionID
        - status: "ACTIVE" # status da transação [PENDENTE, FINALIZADA]
        - additionalInfo
        - fee: 50 # Taxa Pela Transação
        - discount: 0 # Valor do desconto
        - valueWithDiscount: 3000 # Valor liquido
        - expiresDate: 2024-08-26T10:30:00.000Z : Data de expiração
        - type: DYNAMIC
        - createdAt: 2024-08-19T20:08:34.246Z # Data de criação da transação
        - updatedAt: 2024-08-19T20:08:34.246Z: # Data de modificação da transação
        - brCode: 00020101021226950014br.gov.bcb.pix2573api.openpix.com.br/api/testaccount/qr/v1/0617a01b4bfe42d7b4c9fb3013cb7764520400005303986540530.005802BR5918AND_ALL_TECHNOLOGY6009Sao_Paulo622905250617a01b4bfe42d7b4c9fb3016304BA55 # Código de pagamento
        - expiresIn: 570085
        - pixKey: 4ace2c7f-beea-4793-b4af-0dae5edeea84
        - paymentLinkUrl: https://openpix.com.br/pay/8f60299e-5132-46ab-9283-1ab5bc5487e6
        - qrCodeImage: https://api.openpix.com.br/openpix/charge/brcode/image/8f60299e-5132-46ab-9283-1ab5bc5487e6.png
        - globalID: Q2hhcmdlOjY2YzNhNjQyYzY0NDVhMWJhZjEwZmU5Yw==
        - paymentMethods:
            - pix:
                - method: PIX_COB
                - transactionID: 0617a01b4bfe42d7b4c9fb3013cb7764
                - identifier: 0617a01b4bfe42d7b4c9fb3013cb7764
                - fee: 50 # Imposto da transação
                - value: 3000
                - status: ACTIVE 
                - txId: 0617a01b4bfe42d7b4c9fb3013cb7764
                - brCode: 00020101021226950014br.gov.bcb.pix2573api.openpix.com.br/api/testaccount/qr/v1/0617a01b4bfe42d7b4c9fb3013cb7764520400005303986540530.005802BR5918AND_ALL_TECHNOLOGY6009Sao_Paulo622905250617a01b4bfe42d7b4c9fb3016304BA55
                - qrCodeImage: https://api.openpix.com.br/openpix/charge/brcode/image/8f60299e-5132-46ab-9283-1ab5bc5487e6.png
    - correlationID: bc725bdc-092e-403b-a785-1dddee710c88
    - brCode: 00020101021226950014br.gov.bcb.pix2573api.openpix.com.br/api/testaccount/qr/v1/0617a01b4bfe42d7b4c9fb3013cb7764520400005303986540530.005802BR5918AND_ALL_TECHNOLOGY6009Sao_Paulo622905250617a01b4bfe42d7b4c9fb3016304BA55
    """
    alo_id:str = Field(description="ID do alô") # alo_id salvo no openpix e no nosso BD
    transactionID: str  = Field(description="Id da transação",exclude=True) 
    status: str  = Field(description="Status do pagamento",exclude=True)
    value: int  = Field(description="Valor do pagamento",exclude=True) # Valor em centavos
    fee: int  = Field(description="Taxa da transação",exclude=True) # Taxa em Centavos da transação
    discount: int  = Field(description="Desconto da transação",exclude=True) # Desconto em Centavos da transação
    valueWithDiscount: int  = Field(description="Valor final",exclude=True) # Valor da transação apos aplicar o desconto
    pixKey: str  = Field(description="Chave pix",exclude=True)
    pix_code: str  = Field(description="Código do pix")
    pix_qr_code: str  = Field(description="URL da imagem do QR Code do pix")
    
    # @field_validator('alo_id',mode="before")
    # def alo_id(cls, alo_id):
    #     if not alo_id:
    #         raise UnprocessableEntity("ID de correlação é obrigatório")
    #     return alo_id
    
    # @field_validator('value',mode="before")
    # def validate_value(cls, value):
    #     if value is None:
    #         raise UnprocessableEntity("Valor é obrigatório")
    #     if value < 0:
    #         raise UnprocessableEntity("Valor invalido")
    #     return value
    
    # @field_validator('fee',mode="before")
    # def validate_fee(cls, fee):
    #     if fee is None:
    #         raise UnprocessableEntity("Taxa é obrigatória")
    #     if fee < 0:
    #         raise UnprocessableEntity("Taxa invalida")
    #     return fee
    
    # @field_validator('discount',mode="before")
    # def validate_discount(cls, discount):
    #     if discount is None:
    #         raise UnprocessableEntity("Desconto é obrigatório")
    #     if discount < 0:
    #         raise UnprocessableEntity("Desconto invalido")
    #     return discount
    
    # @field_validator('valueWithDiscount',mode="before")
    # def validate_valueWithDiscount(cls, valueWithDiscount):
    #     if not valueWithDiscount:
    #         raise UnprocessableEntity("Valor com desconto é obrigatório")
    #     if valueWithDiscount < 0:
    #         raise UnprocessableEntity("Valor com desconto invalido")
    #     return valueWithDiscount
    
    # @field_validator('pixKey',mode="before")
    # def validate_pixKey(cls, pixKey):
    #     if not pixKey:
    #         raise UnprocessableEntity("Chave Pix é obrigatória")
    #     return pixKey
    
    # @field_validator('pix_code',mode="before")
    # def validate_pix_code(cls, pix_code):
    #     if not pix_code:
    #         raise UnprocessableEntity("Código de pagamento é obrigatório")
    #     return pix_code
    
    # @field_validator('pix_qr_code',mode="before")
    # def validate_pix_qr_code(cls, pix_qr_code):
    #     if not pix_qr_code:
    #         raise UnprocessableEntity("QRCode de pagamento é obrigatório")
    #     return pix_qr_code
    
    # @field_validator('status',mode="before")
    # def validate_status(cls, status):
    #     if not status:
    #         raise UnprocessableEntity("Status é obrigatório")
    #     if status not in ['ACTIVE', 'FINALIZED']:
    #         raise UnprocessableEntity("Status inválido")
    #     return status
    
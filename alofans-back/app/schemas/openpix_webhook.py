from schemas.base import CustomBaseModel


# docs: https://developers.openpix.com.br/en/api#tag/webhook/paths/~1api~1v1~1webhook/post

class WebHookRequest(CustomBaseModel):
    """
    - name: str
    - event: str
    - url: str
    - authorization: str
    - isActive: bool
    """
    name: str
    event: str
    url: str
    authorization: str
    isActive: bool


class WebHookResponse(CustomBaseModel):
    """
    - id: str
    - name: str
    - event: str
    - url: str
    - authorization: str
    - isActive: bool
    - createdAt: str
    - updatedAt: str
    """
    id: str
    name: str
    event: str
    url: str
    authorization: str
    isActive: bool
    createdAt: str
    updatedAt: str


class TaxId(CustomBaseModel):
    """
    - taxID: str
    - type: str
    """
    taxID: str
    type: str

class Customer(CustomBaseModel):
    """
    - name : str
    - email : str
    """
    name:str
    email:str


class Charge(CustomBaseModel):
    """
    - customer: Customer(name, email)
    - value: int
    - comment: str # ID do Cliente
    - correlationID: str # IDO do alo
    
    """
    customer: Customer
    value: int
    comment: str | None
    correlationID: str
    transactionID: str
    fee: int | None
    brCode: str
    createdAt: str
    updatedAt: str

class Raw(CustomBaseModel):
    """
    - endToEndId: str
    - txid: str
    - valor: str
    - horario: str
    - infoPagador: str
    """
    endToEndId: str
    txid: str
    valor: str
    horario: str
    infoPagador: str


class PixQrCode(CustomBaseModel):
    """
    - value: int
    - comment: str
    - correlationID: str
    - identifier: str
    - paymentLinkID: str
    - paymentLinkUrl: str
    - qrCodeImage: str
    - createdAt: str
    - updatedAt: str
    - brCode: str
    """
    value: int
    comment: str
    correlationID: str
    identifier: str
    paymentLinkID: str
    paymentLinkUrl: str
    qrCodeImage:str
    createdAt:str
    updatedAt:str
    brCode:str

class PIX(CustomBaseModel):
    """
    - pixQrCode: str | None
    - charge: Charge
    - customer: Customer
    - payer: Customer | None
    - time: str
    - value: int
    - transactionID: str
    - infoPagador: str
    - raw: Raw
    """
    pixQrCode: str | None
    charge: Charge 
    customer: Customer
    payer: Customer | None
    time: str
    value: int
    transactionID: str
    infoPagador: str
    raw: Raw

class PixCallback(CustomBaseModel): # POST: (VULGO ITEM 1 DO DOC, vulgo pagamento de uma charge realizado com sucesso)
    """
    - charge: Charge
    """
    charge: Charge
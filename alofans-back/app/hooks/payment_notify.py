"""
Neste Modulo, ficarão todos os webhooks voltados para o pagamento

- Notificações
    - Quando um alo é preparado, deve-se realizar o pagamento do alô, de forma que o mesmo será salvo no banco de dados após realizar o pagamento
    - Caso não seja feito o pagamento, o aló deverá ser removido


https://developers.openpix.com.br/en/api#tag/webhook/paths/~1api~1v1~1webhook/get
 
"""
from http.client import HTTPSConnection
from json import loads
from decouple import config
from fastapi import HTTPException


from constants.webhooks import OPENPIX_CHARGE_EVENTS
from schemas.openpix_webhook import WebHookRequest, WebHookResponse



PAYMENT_GATEWAY=config("PAYMENT_GATEWAY")
PAYMENT_APP_ID=config("PAYMENT_APP_ID")



class PaymentNotify:
    def __init__(self):

        self.conn = HTTPSConnection(PAYMENT_GATEWAY)

    
    def create_webhook(self, request: WebHookRequest) -> WebHookResponse:

        try:
            data = request.dict()
            payload = request(data, indent=4)
            
            headers = {
                'content-type': "application/json",
                'Authorization': PAYMENT_APP_ID
            }

            self.conn.request("POST", "/api/v1/webhook", payload, headers)

            res = self.conn.getresponse()
            data = res.read().decode("utf-8")

            json_data =  loads(data)
            
            
            return self._json_data_to_WebHookResponse(json_data)
        
        except KeyError:
            raise HTTPException(400, json_data["error"])
        
    def create_alo_payment_notify(self) -> WebHookResponse:

        request = WebHookRequest(
            name="Alo Payment Notify",
            event=OPENPIX_CHARGE_EVENTS["paid"],
            url="https://api.alo.com.br/v1/alo/payment/notify",
            authorization=PAYMENT_APP_ID,
            isActive=True
        )

        return self.create_webhook(request)
    
        

    def _json_data_to_WebHookResponse(self, json_data) -> WebHookResponse:
        return WebHookResponse(**json_data)
        
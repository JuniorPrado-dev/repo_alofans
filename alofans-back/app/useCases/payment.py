from datetime import (
    datetime, 
    timedelta
)
from decouple import config
from fastapi import HTTPException
import http.client
from json import (
    JSONDecodeError,
    dumps, 
    loads
)
from sqlalchemy.orm import Session


from core.percent import (
    get_interlocutor_profit,
    get_producer_profit
)
from schemas.payment import (
    PaymentRequest,
    PaymentRequestGateway,
    PaymentResponse,
    SubAccountRequest,
    SubAccountResponse,
    Split,
    WithDrawTransaction,
    TransferSubAccountRequest,
    TransferSubAccountResponse,
    DirectPIXRequest,
    DirectPIXResponse
)
from utils.format import (
    datetime_to_isoformat, 
    format_piKey_to_openpix_format,
    get_pix_key_type
)
from utils.messages.error import (
    BadRequest,
    Server
)
"""
    Docs da API
    https://developers.openpix.com.br/en/api#tag/charge/paths/~1api~1v1~1charge/post
    https://developers.openpix.com.br/en/api#tag/sub-account-(request-access)/paths/~1api~1v1~1subaccount~1%7Bid%7D~1withdraw/post
"""

PAYMENT_GATEWAY=config("PAYMENT_GATEWAY")
PAYMENT_APP_ID=config("PAYMENT_APP_ID")

class PaymentUseCases:
    
    def __init__(self,  db_session: Session) -> None:
        
        self.db_session = db_session
        self.conn = http.client.HTTPSConnection(PAYMENT_GATEWAY)
        #conn = http.client.HTTPSConnection("api.openpix.com.br")
    

        
    def generate_payment_to_gateway(self, request: PaymentRequest, alo_id: str = "test") -> PaymentRequestGateway:
        """
        Gera uma requisição de pagamento para ser enviada ao gateway de pagamento
        
        - Args:
            - request:: PaymentRequest : Dados do pagamento a ser gerado
            
        - Return:
            - PaymentRequestGateway:: Requisição de Pagamento Pronta para ser enviada
            
        - Raises:
            - HTTPException: 404 - Evento não encontrado
            - HTTPException: 404 - Cliente não encontrado
            - HTTPException: 500 - Falha no servidor
        
        
        """
        try:     
            
            #expiresDate = datetime.now() + timedelta(hours=3) + timedelta(hours=1) # 1 hora a partir da data atual
            expiresDate = datetime.now() + timedelta(minutes=16)
            # Concertando para a data ficar correta no padrão brasileiro na API dos gateway (API deles tem diferença de 3 horas)
        
            
            splits = []
            
                
            self.create_subaccount(
                account=SubAccountRequest(
                    name=request.producer_cpf_cnpj,
                    pixKey=request.producer_pixkey
                )
            )           

            interlocutor_percent = request.interlocutor_percent

            if not request.interlocutor_percent: # Caso não tenha interlocutor, calcular a parte do produtor
                interlocutor_percent = 0
        
            # Parte do Produtor
            splits.append(
                Split(
                    value= self._value_to_cents(
                        get_producer_profit(
                            request.value, 
                            interlocutor_percent
                            )
                        ),
                    pixKey=format_piKey_to_openpix_format(
                        request.producer_pixkey,
                        pix_key_type=get_pix_key_type(request.producer_pixkey)
                    )
                )
            )
            
            if request.interlocutor_cpf_cnpj and request.producer_cpf_cnpj != request.interlocutor_cpf_cnpj: # Caso o produtor tenha contratado um interlocutor, calcular a parte do interlocutor
                
                # Criando a Subconta para receber o dinheiro do interlocutor
                
                self.create_subaccount(
                    account=SubAccountRequest(
                        name=request.interlocutor_cpf_cnpj,
                        pixKey=request.interlocutor_pixkey
                    )
                ) 
                
                splits.append(
                    Split(
                        value=self._value_to_cents(get_interlocutor_profit(request.value, request.interlocutor_percent)),
                        pixKey=format_piKey_to_openpix_format(
                            request.interlocutor_pixkey,
                            pix_key_type=get_pix_key_type(request.interlocutor_pixkey)
                            )
                    )
                )
            
            
            return PaymentRequestGateway(
                correlationID=alo_id, # Correlation ID não pode ter espaço, guardamos o id do alo
                value=self._value_to_cents(request.value),
                customer=request.customer,
                comment=request.alo_data.client_id, # Limite de 140chars # guardamento o id do cliente
                expiresDate=datetime_to_isoformat(expiresDate),
                splits=splits
            )
        
        except HTTPException:
            raise

            
        except Exception as e:
            raise Server(e)

    def send_payment_to_gateway(self, payment: PaymentRequestGateway) -> PaymentResponse:
        """
        Envia uma requisição de pagamento para o gateway e pagamento e retorno a transação gerada no gateway
        
        - Args:
          - payment:: PaymentRequestGateway : Requisição de pagamento a ser enviada
          
        - Return:
          - PaymentResponse:: Resposta da requisição de pagamento gerada no gateway
          
        - Raises:
          - HTTPException: 400 - Erro na requisição
          - HTTPException: 500 - Falha no servidor
        
        """
        try:
            data = payment.dict()
            payload = dumps(data, indent=4)
            
            headers = {
                'content-type': "application/json",
                'Authorization': PAYMENT_APP_ID
            }

            self.conn.request("POST", "/api/v1/charge?return_existing=true", payload, headers)
            #conn.request("POST", "/api/v1/charge?return_existing=SOME_BOOLEAN_VALUE", payload, headers)


            res = self.conn.getresponse()
            data = res.read().decode("utf-8")

            json_data =  loads(data)
            
            return self._json_data_to_PaymentResponse(json_data)
        
        except KeyError:
            raise BadRequest(json_data["error"])
        
    def get_payment_in_gateway(self,id: str) -> PaymentResponse:
        """	
        
        Consulta uma cobrança que está no gateway de pagamento
        
        - Args:
          - id:: correlationID | transactionID : ID da Transação
          
        - Return:
          - PaymentResponse:: Resposta da requisição de pagamento salva no gateway
          
        - Raises:
          - HTTPException: 400 - Erro na requisição
          - HTTPException: 500 - Falha no servidor
        
        string
        Example: fe7834b4060c488a9b0f89811be5f5cf
        charge ID or correlation ID. You will need URI encoding if your correlation ID has characters outside the ASCII set or reserved characters (%, #, /).
        """
        try:
            headers = {'Authorization': PAYMENT_APP_ID }

            self.conn.request("GET", f"/api/v1/charge/{id}", headers=headers)

            res = self.conn.getresponse()

            json_data = self._response_to_json(res)
            
            return self._json_data_to_PaymentResponse(json_data)
        
        except KeyError:
            raise BadRequest(json_data["error"])
        
        except Exception as e:
            raise Server(e)

    def delete_payment_request_in_gateway(self,id: str) -> str:
        """	
        Remove uma cobrança que está no gateway de pagamento
        
        Args:
            - id:: correlationID | transactionID :
        
        string
        Example: fe7834b4060c488a9b0f89811be5f5cf
        charge ID or correlation ID. You will need URI encoding if your correlation ID has characters outside the ASCII set or reserved characters (%, #, /).
        
        Returns:
            str: 'OK' | 'Error'
            
        """
        try:
            headers = {'Authorization': PAYMENT_APP_ID }
            self.conn.request("DELETE", f"/api/v1/charge/{id}", headers=headers)
            res = self.conn.getresponse()
            data = res.read()
            json_data = loads(data.decode("utf-8"))
            
            response = {}
        
        
            response["detail"] = json_data["status"]
            return response
        
        except KeyError:
            response["detail"] =  json_data["error"]
            return response
        
        except Exception as e:
            raise Server(e)
        
    def create_subaccount(self, account: SubAccountRequest) -> SubAccountResponse:
        """
        Cria uma sob conta no Gateway de Pagamento
        Subcontas são uma especie de carteira virtual para armazenar e movimentar dinheiro dinheiro 
        
        """
        try:
            payload = dumps(account.dict(),indent=4)

            headers = {
                'content-type': "application/json",
                'Authorization': PAYMENT_APP_ID
            }

            self.conn.request("POST", "/api/v1/subaccount", payload, headers)

            res = self.conn.getresponse()
            
            json_data = self._response_to_json(res)
            
            print(json_data)
            
            return self._json_data_to_SubAccountResponse(json_data)

        
        except KeyError as e:
            if 'error' in json_data:
                raise HTTPException(status_code=404, detail=json_data["error"])
            else:
                raise HTTPException(status_code=404, detail=f"Missing key: {e}")
        
        except Exception as e:
            raise HTTPException(500, f"Erro: {e}")
        
    def get_subaccount(self, pix_key: str, pix_key_type: str) -> SubAccountResponse:
        """
        Obtém uma subaccount como base no seu ID (Vulgo Chave PIX)
        
        - Args:
            - id:: str: Chave Pix da SubAccount
            
        - Returns:
            - SubAccountResponse:: Dados da SubAccount
        """
        try:
            headers = {
                'content-type': "application/json",
                'Authorization': PAYMENT_APP_ID
            }
            
            pixKey = format_piKey_to_openpix_format(pix_key, pix_key_type)
            
            self.conn.request("GET", f"/api/v1/subaccount/{pixKey}", headers=headers)
            res = self.conn.getresponse()
            
            json_data = self._response_to_json(res)
            
            return self._json_data_to_SubAccountResponse(json_data)
        
        except KeyError:
            raise HTTPException(404, json_data["error"])
        
        except HTTPException:
            raise
        
        except Exception as e:
            raise Server(e)
        
    def withdraw_from_subaccount(self, pix_key: str, pix_key_type:str) -> WithDrawTransaction:
        """
        Realiza o saque de todo o valor de uma subconta
        
        - Args:
            -  pix_key::str : Chave pix
            - pix_key_type:: str : Tipo da chave pix (CPF, CNPJ, ETC)
            
        - Return
            - WithDrawTransaction:: Resposta da transação de saque 
        
        """
        try:
            headers = {
                'content-type': "application/json",
                'Authorization': PAYMENT_APP_ID
            }

            #body = {"value": 0}
            body = {}
            pixKey = format_piKey_to_openpix_format(pix_key, pix_key_type)
            
            self.conn.request(
                "POST", 
                f"/api/v1/subaccount/{pixKey}/withdraw", 
                body=dumps(body).encode("utf-8"),
                headers=headers
            )
            res = self.conn.getresponse()
            
            json_data = self._response_to_json(res)
            
            return self._json_data_to_WithDrawTransaction(json_data)
        
        except KeyError:
            raise HTTPException(404, json_data["error"])
        
        except HTTPException:
            raise
        
        except Exception as e:
            raise Server(e)
        
    def transfer_between_subaccounts(self, data: TransferSubAccountRequest) -> TransferSubAccountResponse:
        """
        Transfere valores entre duas sub accounts no Gateway de Pagamento
        
        - Args:
            - data:: TransferSubAccountRequest: Dados da transferência
            
        - Returns:
            - TransferSubAccountResponse:: Resposta da transferência
            
        """
        try:
            headers = {
                'content-type': "application/json",
                'Authorization': PAYMENT_APP_ID
            }
            
            payload = dumps(data.dict(),indent=4)
            
            self.conn.request("POST", "/api/v1/subaccount/transfer", payload, headers)
            res = self.conn.getresponse()
            
            json_data = self._response_to_json(res)
            
            return self._json_data_to_DirectPIXResponse(json_data)
        
        except KeyError:
            raise HTTPException(404, json_data["error"])
        
        except Exception as e:
            raise Server(e)
    
    def transfer_direct(self, data: DirectPIXRequest) -> DirectPIXResponse:
        """
        Transfere um valor em centavos de uma conta para outra
        
        - Args:
            - data:: DirectPIXRequest: Dados da transferência
            
        - Return 
            - DirectPIXResponse:: Resposta da transferência
        """
        try:
            headers = {
                'content-type': "application/json",
                'Authorization': PAYMENT_APP_ID
            }
            
            payload = dumps(data.dict(),indent=4)
            
            self.conn.request("POST", "/api/v1/transfer", payload, headers)
            res = self.conn.getresponse()
            
            json_data = self._response_to_json(res)
            
            return self._json_data_to_DirectPIXResponse(json_data)
        
        except KeyError:
            raise HTTPException(404, json_data["error"])
        
        except Exception as e:
            raise Server(e)
        
        
        
    def _response_to_json(self, response: http.client.HTTPResponse) -> dict:
        """
        Mapeia uma resposta de requisição http para um objeto json (Vulgo Dicionário)
        
        - Args:
            - response: http.client.HTTPResponse : Resposta de uma requisição http
        
        - Returns:
            - dict: Dados da resposta em formato de dicionário
        """
        status = response.status
        print(response.info())
        content = response.read().decode("utf-8").strip()
        if status >= 400:
            raise HTTPException(response.status,f"{content}")
        #print(f"\n\n\n\n{response}\n\n\n")
        try:
            return loads(content)
        except JSONDecodeError as e:
            raise ValueError(f"Erro ao decodificar JSON: {e.msg}")
        
        except Exception as e:
            raise Server(e)

    def _value_to_cents(self,value: int | float) -> int:
        """
        Converte um valor financeiro em real para centavos
        
        Args:
            Value:: int | float  = Valor financeiro em real
            
        Return:
            int: Respectivo valor em centavos
        """
        
        if not isinstance(value, (int, float)):
            raise ValueError("Valor inválido. Informe um número inteiro ou decimal")
        
        if value < 0:
            raise ValueError("Valor inválido. Informe um número positivo")
    
        return int(round(value * 100,2))

    def _json_data_to_PaymentResponse(self, json_data) -> PaymentResponse:
        """
        mapeia um json de resposta do gateway de pagamento para um objeto PaymentResponse
        """
        return PaymentResponse(
            alo_id=json_data["charge"]["correlationID"],
            transactionID=json_data["charge"]["transactionID"],
            status=json_data["charge"]["status"],
            value=json_data["charge"]["value"],
            fee=json_data["charge"]["fee"],
            discount=json_data["charge"]["discount"],
            valueWithDiscount=json_data["charge"]["valueWithDiscount"],
            pixKey=json_data["charge"]["pixKey"],
            pix_code=json_data["charge"]["brCode"],
            pix_qr_code=json_data["charge"]["qrCodeImage"]
        )

    
    def _json_data_to_SubAccountResponse(self, json_data) -> SubAccountResponse:
        """
        Mapeia um json de resposta do gateway de pagamento para um objeto SubAccountResponse
        
        - Args:
            - json_data:: dict: Dados da SubAccount em Formato de Dicionário
        """
        try:
            sub =  SubAccountResponse(
                name=json_data["subAccount"]["name"],
                pixKey=json_data["subAccount"]["pixKey"],
                balance=json_data["subAccount"]["balance"]
            )
            
            return sub
        
        except KeyError:
            
            sub =  SubAccountResponse(
                name=json_data["subAccount"]["name"],
                pixKey=json_data["subAccount"]["pixKey"],
                balance=0
            )
            
            return sub
        except Exception as e:
            raise Server(e)
            
        
    def _json_data_to_WithDrawTransaction(self, json_data) -> WithDrawTransaction:
        """
        Mapeia um json de resposta do gateway de pagamento para um objeto SubAccountResponse
        
        - Args:
            - json_data:: dict: Dados da SubAccount em Formato de Dicionário
        """
        return WithDrawTransaction(
            status=json_data["transaction"]["status"],
            value=json_data["transaction"]["value"],
            correlationID=json_data["transaction"]["correlationID"],
            destinationAlias=json_data["transaction"]["destinationAlias"],
            comment=json_data["transaction"]["comment"],
        )
        
    def _json_data_to_DirectPIXResponse(self, json_data) -> DirectPIXResponse:
        """
        Mapeia um json de resposta do gateway de pagamento para um objeto DirectPIXResponse
        
        - Args:
            - json_data:: dict: Dados da SubAccount em Formato de Dicionário
        """
        return DirectPIXResponse(
            value=json_data["transaction"]["value"],
            time=json_data["transaction"]["time"],
            correlationID=json_data["transaction"]["correlationID"]
        )
    
    def _json_data_to_WithDrawTransaction(self, json_data) -> WithDrawTransaction:
        """
        Mapeia um json de resposta do gateway de pagamento para um objeto WithDrawTransaction
        
        - Args:
            - json_data:: dict: Dados da SubAccount em Formato de Dicionário
        """
        return WithDrawTransaction(
            status=json_data["transaction"]["status"],
            value=json_data["transaction"]["value"],
            correlationID=json_data["transaction"]["correlationID"],
            destinationAlias=json_data["transaction"]["destinationAlias"],
            comment=json_data["transaction"]["comment"],
        )
from fastapi import HTTPException
import httpx


from schemas.notify import (
    DataSuccess,
    NotifyRequest,
    NotifyResponse
)


class ExpoPushNotification():
    def __init__(self):
        
        self.url = "https://exp.host/--/api/v2/push/send"

    def generate(self, to: str, title: str, body: str) -> NotifyRequest: 
        return NotifyRequest(
            to=to,
            title=title,
            body=body
        )
        

    async def send(self, notify: NotifyRequest) -> NotifyResponse:
        try:
            
            body = notify.dict()
            
            async with httpx.AsyncClient() as client:
                response = await client.post(self.url, json=body)
                
            if response.status_code != 200:

                raise HTTPException(response.status_code, "Erro na Notificação")
            
            return self.map_response_to_NotifyResponse(response.json())

        except HTTPException as e:
            print({f"error: {e}": response.json()})

        except Exception as e:
            print({f"error: {e}"})
        

    async def send_all(self, notifies: list[NotifyRequest]) -> list[NotifyResponse]:
        """
        Envia notificações para todos os tokens de notificação
        """
        try:
            request = [notify.dict() for notify in notifies]
            
            async with httpx.AsyncClient() as client:
                response = await client.post(self.url, json=request)

            if response.status_code != 200:
                raise HTTPException(response.status_code, "Erro na Notificação")
                        
            responses = response.json()["data"]
            
            aux = [self.map_response_to_NotifyResponse(response) for response in responses]
                        
            return aux
        
        except HTTPException as e:
            print({f"error: {e}": response.json()})

        except Exception as e:
            print({f"error: {e}"})
        
    
    async def send_to_all(self, tokens: list[str], title: str, body: str) -> list[NotifyResponse]:
        """
        Envia notificações para todos os tokens de notificação
        """
        notifies = [self.generate(token, title, body) for token in tokens]
        return await self.send_all(notifies)
    
    
    def map_response_to_NotifyResponse(self, response: dict) -> NotifyResponse:
        data = DataSuccess(**response)
        return NotifyResponse(
            data=data
        )
"""
Neste Modulo, ficarão todos os webhooks voltados para o Alo

- Notificações
    - Quando um alo é criado, deve-se notificar no front do interlocutor que há um alô para ser cadastrado
    - Quando um alo é Aprovado, deve-se notificar no front do cliente que o alô foi aprovado e será apresentado durante o evento
    
"""
from enum import Enum


from constants.notify import (
    MESSAGE_ALO_APROVE_SUCCESS_CLIENT,
    MESSAGE_ALO_APROVE_SUCCESS_INTERLOCUTOR,
    MESSAGE_ALO_APROVE_SUCCESS_PRODUCER,
    MESSAGE_ALO_FINISH_REQUEST_CLIENT,
    MESSAGE_ALO_FINISH_REQUEST_INTERLOCUTOR,
    MESSAGE_ALO_FINISH_REQUEST_PRODUCER,
    MESSAGE_ALO_PAYMENT_REQUEST_CLIENT,
    MESSAGE_ALO_APROVE_REQUEST_CLIENT,
    MESSAGE_ALO_APROVE_REQUEST_INTERLOCUTOR,
    MESSAGE_ALO_APROVE_REQUEST_PRODUCER,
    MESSAGE_ALO_REJECT_REQUEST_CLIENT,
    MESSAGE_ALO_REJECT_REQUEST_INTERLOCUTOR,
    MESSAGE_ALO_REJECT_REQUEST_PRODUCER
)
from services.notify.expo import ExpoPushNotification


class AloNotifyEvents(str, Enum):
    """
    Enumerador com os eventos que podem ser notificados para o Alo
    """
    WAIT_PAYMENT = "Aguardando pagamento"
    WAITING = "Aguardando aprovação"
    APPROVED = "Alô Aprovado"
    FINISHED = "Alô Finalizado"
    REJECTED = "Alô Rejeitado"



expo = ExpoPushNotification()


async def waiting_payment_notify(client_pushToken: str):
    """
    Quando o usuário cria um Alo, ele deve realizar o pagamento do mesmo, portanto recebe uma notificação avisando para realizar o pagamento

    - Args:
        - client_pushToken:: str : Token de notificação do cliente

    - Returns:
        - None
    """
    await expo.send(
        expo.generate(
            client_pushToken, 
            AloNotifyEvents.WAIT_PAYMENT.value, 
            MESSAGE_ALO_PAYMENT_REQUEST_CLIENT
        )
    ) 


async def waiting_aprove_notify(
        client_pushToken: str | None = None, 
        interlocutor_pushToken: str | None = None, 
        producer_pushToken: str | None = None
    ):
    """
    Quando um pagamento é aprovado, o alô é cadastrado no sistema e deve ser visualizado tanto pelo produtor quando pelo interlocutor (caso haja interlocutor) e o cliente deve saber que seu alô está pronto e apenas aguardando ser validado.

    - Args:
        - client_pushToken:: str | None : Token de notificação do cliente
        - interlocutor_pushToken:: str | None : Token de notificação do interlocutor
        - producer_pushToken:: str | None : Token de notificação do produtor

    - Returns:
        - None
    """

    notifications = []

    if client_pushToken:

        notifications.append(expo.generate(
                client_pushToken, 
                AloNotifyEvents.WAITING.value,
                MESSAGE_ALO_APROVE_REQUEST_CLIENT
            )
        )
    if interlocutor_pushToken:
        notifications.append(expo.generate(
                interlocutor_pushToken, 
                AloNotifyEvents.WAITING.value, 
                MESSAGE_ALO_APROVE_REQUEST_INTERLOCUTOR
            )
        )

    if producer_pushToken:
        notifications.append(expo.generate(
                producer_pushToken, 
                AloNotifyEvents.WAITING.value, 
                MESSAGE_ALO_APROVE_REQUEST_PRODUCER
            )
        )

    await expo.send_all(notifications)


async def approved_notify(
    client_pushToken: str | None = None, 
    interlocutor_pushToken: str | None = None, 
    producer_pushToken: str | None = None      
):
    """
    Quando um alo é aprovado, o alô é cadastrado no sistema e deve ser visualizado tanto pelo produtor quando pelo interlocutor (caso haja interlocutor) e o cliente é avisado que seu alô foi aprovado e está pronto para ser realizado. 

    O produtor deve ser avisado para que realize o alo do cliente

    - Args:
        - client_pushToken:: str | None : Token de notificação do cliente
        - interlocutor_pushToken:: str | None : Token de notificação do interlocutor
        - producer_pushToken:: str | None : Token de notificação do produtor
    
    - Returns:
        - None

    """

    notifications = []

    if client_pushToken:

        notifications.append(expo.generate(
                client_pushToken, 
                AloNotifyEvents.APPROVED.value,
                MESSAGE_ALO_APROVE_SUCCESS_CLIENT
            )
        )
    if interlocutor_pushToken:
        notifications.append(expo.generate(
                interlocutor_pushToken, 
                AloNotifyEvents.APPROVED.value, 
                MESSAGE_ALO_APROVE_SUCCESS_INTERLOCUTOR
            )
        )

    if producer_pushToken:
        notifications.append(expo.generate(
                producer_pushToken, 
                AloNotifyEvents.APPROVED.value, 
                MESSAGE_ALO_APROVE_SUCCESS_PRODUCER
            )
        )

    await expo.send_all(notifications)


async def finished_notify(
    client_pushToken: str | None = None, 
    interlocutor_pushToken: str | None = None, 
    producer_pushToken: str | None = None      
):
    """
    Quando um alo é finalizado, o alô deve ser visualizado tanto pelo produtor quando pelo interlocutor (caso haja interlocutor) e o cliente é avisado que seu alô foi finalizado. 

    - Args:
        - client_pushToken:: str | None : Token de notificação do cliente
        - interlocutor_pushToken:: str | None : Token de notificação do interlocutor
        - producer_pushToken:: str | None : Token de notificação do produtor
    
    - Returns:
        - None

    """

    notifications = []

    if client_pushToken:

        notifications.append(expo.generate(
                client_pushToken, 
                AloNotifyEvents.FINISHED.value,
                MESSAGE_ALO_FINISH_REQUEST_CLIENT
            )
        )
    if interlocutor_pushToken:
        notifications.append(expo.generate(
                interlocutor_pushToken, 
                AloNotifyEvents.FINISHED.value, 
                MESSAGE_ALO_FINISH_REQUEST_INTERLOCUTOR
            )
        )

    if producer_pushToken:
        notifications.append(expo.generate(
                producer_pushToken, 
                AloNotifyEvents.FINISHED.value, 
                MESSAGE_ALO_FINISH_REQUEST_PRODUCER
            )
        )

    await expo.send_all(notifications)


async def rejected_notify(
    client_pushToken: str | None = None, 
    interlocutor_pushToken: str | None = None, 
    producer_pushToken: str | None = None      
):
    """
    Quando um alo é rejeitado, o alô deve ser visualizado tanto pelo produtor quando pelo interlocutor (caso haja interlocutor) e o cliente é avisado que seu alô foi rejeitado e não será realizado. 

    - Args:
        - client_pushToken:: str | None : Token de notificação do cliente
        - interlocutor_pushToken:: str | None : Token de notificação do interlocutor
        - producer_pushToken:: str | None : Token de notificação do produtor
    
    - Returns:
        - None

    """

    notifications = []

    if client_pushToken:

        notifications.append(expo.generate(
                client_pushToken, 
                AloNotifyEvents.REJECTED.value,
                MESSAGE_ALO_REJECT_REQUEST_CLIENT
            )
        )
    if interlocutor_pushToken:
        notifications.append(expo.generate(
                interlocutor_pushToken, 
                AloNotifyEvents.REJECTED.value, 
                MESSAGE_ALO_REJECT_REQUEST_INTERLOCUTOR
            )
        )

    if producer_pushToken:
        notifications.append(expo.generate(
                producer_pushToken, 
                AloNotifyEvents.REJECTED.value, 
                MESSAGE_ALO_REJECT_REQUEST_PRODUCER
            )
        )

    await expo.send_all(notifications
)
from enum import Enum

class AloStatus(str, Enum):
    """
    Enumerator com os status possíveis para um Alo

    - payment: Aguardando o pagamento
    - waiting: Aguardando aprovação
    - approved: Alô Aprovado
    - finished: Alô Finalizado
    - rejected: Alô Rejeitado
    """
    payment = "AGUARDANDO_PAGAMENTO"
    waiting = "AGUARDANDO"
    approved = "APROVADO"
    finished = "FINALIZADO"
    rejected = "REJEITADO"
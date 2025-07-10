"""
Modulo Responsável por calcular o valor financeiro destinado a cada membro de uma transação

Funcs:
    - openpix_fee
    - pv
    - get_startup_profit
    - interlocutor_profit
    - producer_profit
"""

L = 0.15 # Lucro em Porcentagem da STARTUP
TR = 1 # Taxa EM REAL de TRANSAÇÃO OPENPIX
def get_openpix_fee(total: float) -> float:
    """
    Calcula a taxa de transação OpenPix
    
    - Args:
        - alo_value: float: Valor total da transação
        
    - Returns:
        - float: Taxa de transação OpenPix
    """
    
    alo_value = total

    rate = 0
    
    if alo_value <= 62.5:
        rate = 0.5 
    elif alo_value > 62.5 and alo_value <= 625:
        rate =  alo_value * 0.008
    
    else:
        rate =  5.0
        
    return float(round(rate + TR,2))

""""
def pc():
    
    return (pv() * mkd) - TR 
"""

def get_startup_profit(total_value: float) -> float:
    """
    Calcula o dinheiro destinado a startup calculando com o percentual destinado à startup
    
    - Args:
        - alo_value: float: Valor total da transação
        
    - Return:
        - float: Valor destinado à startup
    """
    
    return float(round(total_value * L,2)) # Lucro da Startup em Real



def get_interlocutor_profit(total: float, interlocutor_percent: float) -> float:
    """
    Dinheiro destinado ao interlocutor
    
    - Args:
        - value: float: Valor total da transação
        - interlocutor_percent: float: Percentual destinado ao interlocutor
        
    - Returns:
        - float: Valor destinado ao interlocutor
    """
    if interlocutor_percent > 1 or interlocutor_percent < 0:
        raise ValueError("Interlocutor percent must be between 0 and 1")
    return float(round(total * interlocutor_percent,2))

def get_producer_profit(total: float, interlocutor_percent: float) -> float:
    """
    Dinheiro destinado ao do produtor após todas as taxas
    
    - Args:
        - total: float: Valor total da transação
        - interlocutor_percent: float: Percentual destinado ao interlocutor
    
    - Returns:
        - float: Lucro do produtor
    """
    startup = get_startup_profit(total)
    interlocutor = get_interlocutor_profit(total, interlocutor_percent)
    openpix = get_openpix_fee(total)
    
    return float(round(total - (startup + interlocutor + openpix),2))

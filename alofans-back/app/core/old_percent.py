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

def pv(alo_value: float, interlocutor_percent: float) -> float:
    """
    Calcula o Preço final de venda de um alo
    
    - Args:
        - alo_value:: float: Custo do alo
        - interlocutor_percent: float: Percentual destinado ao interlocutor (0.0 - 1.0)
    
    - Returns:
        - float: Preço de venda
    """
    pc =  alo_value# Preço de Custo
    
    inte = interlocutor_percent if interlocutor_percent is not None else 0 # Interlocutor em Porcentagem # 0.05 | 0
    
    if pc < 62.5: # alo_value = 50

        tx = 0.5 # Taxa da transação em Real pelo openpix
        mkd = 1 - (L + inte) # Marcação do Preço
        pv = (pc + TR + tx) / mkd # Preço de Venda
    
    elif pc >= 62.5  and pc <= 625:
        tx = 0.008 # Taxa percentual do openpix
        mkd = 1 - (L + tx + inte)
        pv = (pc + TR) / mkd # Preço de Venda
    
    else:
        tx = 5.0 # Taxa fixa em Real do openpix
        mkd = 1 - (L + inte)
        pv = (pc + TR + tx) / mkd # Preço de Venda
        
    return float(round(pv,2))

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

if __name__ == "__main__":
    ALO = 100
    INTERLOCUTOR = 0.05
    PV = pv(ALO, INTERLOCUTOR)
    #PV = 127.53
    print(f"Preço de Venda: R$ {PV}")
    print(f"Startup Receita: R$ {get_startup_profit(PV)}")
    print(f"Interlocutor Receita: R$ {get_interlocutor_profit(PV, INTERLOCUTOR)}")
    print(f"Producer Receita: R$ {get_producer_profit(PV, INTERLOCUTOR)}")
    print(f"OpenPix Fee: R$ {get_openpix_fee(PV)}")
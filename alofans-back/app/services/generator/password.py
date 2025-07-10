from random import choice
from string import (
    ascii_letters,
    digits
)

def generate_random_password(length: int = 10) -> str:
    """
    Gera uma senha aleatória de tamanho especificado.

    - Args:
        - length (int): Tamanho da senha (default=10)
    
    - Returns:
        - str: Senha aleatória
    """
    characters = ascii_letters + digits

    password = ''.join(choice(characters) for _ in range(length))
    
    return password


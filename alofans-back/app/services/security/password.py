from passlib.context import CryptContext


crypt_context = CryptContext(schemes=['sha256_crypt'])


def protect(password: str) -> str:
    """
    Utiliza o passlib para criptografar a senha

    - Args:
        - password (str): Senha a ser criptografada

    - Returns:
        - str: Senha criptografada
    """
    return crypt_context.hash(password)  


def verify(password: str, hash: str) -> bool:
    """
    Verifica se a senha é válida

    - Args:
        - password (str): Senha a ser verificada
        - hash (str): Hash da senha

    - Returns:
        - bool: True se a senha for válida, False caso contrário
    """
    return crypt_context.verify(password, hash)
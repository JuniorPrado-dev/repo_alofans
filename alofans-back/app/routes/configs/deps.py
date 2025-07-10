from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session as DB_Session
from db.connection import Session
from useCases.client import ClientUseCases

oauth_access=OAuth2PasswordBearer(tokenUrl='/client/authorization')
def get_db_session():
    try:
        session = Session()
        yield session
    finally:
        session.close()

def authAccess(
    db_session: DB_Session = Depends(get_db_session),
    token = Depends(oauth_access)
):
    uc = ClientUseCases(db_session=db_session)
    uc.verify_access_token(token=token)
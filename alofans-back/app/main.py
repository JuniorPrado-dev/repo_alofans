import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from decouple import config


from db.models import create_entities

from routes.client import router as client_router
from routes.interlocutor import router as interlocutor_router
from routes.producer import router as producer_router
from routes.event import router as event_router
from routes.alo import router as alo_router
from routes.configs.image import router as image_router
from routes.marketing import router as marketing_router
from routes.payment import router as payment_router
from routes.sse import router as sse_router


app = FastAPI()

# Configurando o middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Especificar a origem permitida
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Métodos permitidos
    allow_headers=["*"],  # Cabeçalhos permitidos
)

# Incluindo os roteadores
app.include_router(client_router)
app.include_router(interlocutor_router)
app.include_router(producer_router)
app.include_router(event_router)
app.include_router(alo_router)
app.include_router(image_router)
app.include_router(marketing_router)
app.include_router(payment_router)
app.include_router(sse_router)


# Endpoint de teste


@app.get('/')
def test_api():
    return {"mensage": "API Alô Fans rodando!"}

# Executando o servidor
if __name__ == "__main__":

    success = create_entities()
    print(f"Database setup {'succeeded' if success else 'failed'}")

    config = uvicorn.Config("main:app", port=5000,
                            host='0.0.0.0', log_level="info", reload=True)
    server = uvicorn.Server(config)
    server.run()

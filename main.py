from typing import Union

from fastapi import FastAPI

from fastapi.openapi.utils import get_openapi

app = FastAPI()

@app.get("/")
async def root():
    return "Servidor em execução."

@app.get("/openapi.json")
async def get_open_api_endpoint():
    return get_openapi(title="Documentação da API", version="1.0", routes=app.routes)

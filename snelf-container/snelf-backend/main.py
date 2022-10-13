from http.client import HTTPException
from fastapi import FastAPI, File, UploadFile
from starlette.middleware.cors import CORSMiddleware
from pre_processamento import inicia_pre_processamento
import fasttext 
from importar_csv_para_sql import insert_medicine, insert_transactions
import pdb
from testesJP import testagem


app = FastAPI()

#burlando cors
origins = [
    "http://localhost",
    "http://localhost:3001",
    "http://localhost:3001/importarMedicamento",
    "http://localhost:3001/importarTransacao"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

#rota de importação do csv. estudando como fazer para upload em csv maior
@app.post("/importarCsv")
async def importarCsv(csvFile: UploadFile = File(...)):
    if csvFile.filename.endswith('.csv'):
        #modifica o csv para formato que é aceito no treinamento
        # cleaned_dataset = clean_dataset(csvFile)
        #aqui seria a chamada para a api do modelo, iniciando o pré processamento
        await inicia_pre_processamento(csvFile)
        fasttext.supervised('dados/data.train.txt','modelo/modelo')
        return {"filename": csvFile.filename, "status":"Arquivo recebido na API de importação"}
    else:
        raise HTTPException(status_code=422, detail="Formato de arquivo não suportado")

@app.post("/treinarModelo")
async def treinamentoModelo():
    try:
        await inicia_pre_processamento()
        fasttext.supervised('dados/data.train.txt','modelo/modelo')
        return {"status":"Treinamento do modelo realizado com sucesso."}
    except:
        raise HTTPException(status_code=422, detail="Modelo não pôde ser treinado.")


# rota de importação do csv. estudando como fazer para upload em csv maior
@app.post("/importarMedicamentos")
async def importarMedicamentos(csvFile: UploadFile = File(...)):
    if csvFile.filename.endswith('.csv'):
        insert_medicine(csvFile)
        return {"filename": csvFile.filename, "status":"Arquivo importado com sucesso."}
    else:
        raise HTTPException(status_code=422, detail="Formato de arquivo não suportado")

@app.get("/teste")
async def root():
    return "Teste executado com sucesso."

@app.post("/importarTransacoes")
async def importarTransacoes(csvFile: UploadFile = File(...)):
    if csvFile.filename.endswith('.csv'):
        insert_transactions(csvFile)
        return {"filename": csvFile.filename, "status":"Arquivo importado com sucesso."}
    else:
        raise HTTPException(status_code=422, detail="Formato de arquivo não suportado")

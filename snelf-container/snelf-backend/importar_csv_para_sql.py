from pathlib import Path
import sqlite3
import pandas as pd
import psycopg2
import pdb
from datetime import datetime


def create_description_ean():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="localhost", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()
    sql_table_creation = '''CREATE TABLE medicines (Id SERIAL PRIMARY KEY, Description text, EAN text)'''
    cursor.execute(sql_table_creation)
    connection.commit()
    connection.close()

def create_medicine_transactions():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="localhost", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()
    sql_table_creation = '''CREATE TABLE medicine_transactions (Id SERIAL PRIMARY KEY, CodigoNFe int, DataEmissao date, MunicipioEmitente text, unidadecomercial text, quantidadecomercial real, valorunitariocomercial real, DescricaoProduto text, CLEAN text)'''
    cursor.execute(sql_table_creation)
    connection.commit()
    connection.close()


def import_description_ean():
    pdb.set_trace()
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="localhost", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()
    
    sql = '''COPY medicines
             FROM '//wsl$/Ubuntu-20.04/home/aboumrad/CEFET/pcs/snelf/medicamentos.csv'
             DELIMITER ','
             CSV HEADER;'''
    cursor.execute(sql)

    connection.commit()
    connection.close()

def insert_medicine(csvFile):
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="snelf-postgres", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()
    
    cols = ["description","ean"]
    df = pd.read_csv(csvFile.file, usecols=cols, dtype={0:str, 1:str}, sep=',')
    
    inputArray = []
    
    iterative_string=""

    for index, row in df.iloc[0:len(df)].iterrows():
        inputArray.append((row.ean, row.description))
        iterative_string = iterative_string + "%s"
        
    iterative_string = iterative_string.replace("s%","s,%")
    
    print(f"STRING ITERATIVA: {iterative_string}")
        
    
    args = ','.join(cursor.mogrify(f"({iterative_string})", i).decode('utf-8')
                for i in inputArray)
    
    
    sql = "INSERT INTO medicines(Description, EAN) VALUES "
    cursor.execute(sql + (args))
    
    connection.commit()
    connection.close()
    
def insert_transactions(csvFile):
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="snelf-postgres", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()
    
    cols = ["CodigoNFe","DataEmissao","MunicipioEmitente","unidadecomercial","quantidadecomercial","valorunitariocomercial","DescricaoProduto","CLEAN"]
    df = pd.read_csv(csvFile.file, usecols=cols, dtype={0:int, 1: str, 2:str, 3:str, 4:float, 5:float, 6:str, 7:str}, sep=',')
    # df = pd.read_csv(csvFile.file, usecols=cols, dtype={0:str, 1: str, 2:str, 3:str, 4:str, 5:str, 6:str, 7:str}, sep=',')
    
    inputArray = []
    
    iterative_string=""

    for index, row in df.iloc[0:len(df)].iterrows():
        inputArray.append((row.CodigoNFe, row.DataEmissao, row.MunicipioEmitente, row.unidadecomercial, row.quantidadecomercial, row.valorunitariocomercial, row.DescricaoProduto, row.CLEAN))
        iterative_string = iterative_string + "%s"
        
    iterative_string = iterative_string.replace("s%","s,%")
    
    print(f"STRING ITERATIVA: {iterative_string}")
    print(f"INPUT ARRAY: {inputArray}")
    
    # args = ','.join(cursor.mogrify(f"({iterative_string})", i).decode('utf-8')
    #             for i in inputArray)
    args = ','.join(f"{i}" for i in inputArray)
    
    print(f'ARGS: {args}')
        
    
    sql = "INSERT INTO medicine_transactions(CodigoNFe,DataEmissao,MunicipioEmitente,unidadecomercial,quantidadecomercial,valorunitariocomercial,DescricaoProduto,CLEAN) VALUES "
    cursor.execute(sql + (args))
    
    connection.commit()
    connection.close()




# Path('my_data.db').touch()

# produtos_farmaceuticos = pd.read_csv('produtos_farmaceuticos.csv')

# produtos_farmaceuticos.to_sql('produtos_farmaceuticos', connection, if_exists='append', index = False)

# conn = sqlite3.connect('my_data.db')
# c = conn.cursor()

# c.execute('''CREATE TABLE produtos_farmaceuticos (CodigoNFe int, DataEmissao date, MunicipioEmitente text, unidadecomercial text, quantidadecomercial real, valorunitariocomercial real, DescricaoProduto text, CLEAN text)''')


# c.execute('''SELECT * FROM produtos_farmaceuticos''').fetchall()


# create_description_ean()
# create_medicine_transactions()

# insert_description_ean()



# Checar para adicionar múltiplos, a partir de csv
# values = [(17, 'rachel', 67), (18, 'ross', 79), (19, 'nick', 95)]
 
# # executing the sql statement
# cursor.executemany("INSERT INTO classroom VALUES(%s,%s,%s)", values)



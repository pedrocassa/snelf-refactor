from pathlib import Path
import sqlite3
import pandas as pd
import psycopg2
import pdb
from datetime import datetime

    
def insert_transactions(csvFile):
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="snelf-postgres", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()
    
    cols = ["CodigoNFe","DataEmissao","MunicipioEmitente","unidadecomercial","quantidadecomercial","valorunitariocomercial","DescricaoProduto","CLEAN"]
    df = pd.read_csv(csvFile.file, usecols=cols, dtype={0:int, 1: str, 2:str, 3:str, 4:float, 5:float, 6:str, 7:str}, sep=',')
    
    inputArray = []
    
    iterative_string=""

    for index, row in df.iloc[0:len(df)].iterrows():
        inputArray.append((row.CodigoNFe, row.DataEmissao, row.MunicipioEmitente, row.unidadecomercial, row.quantidadecomercial, row.valorunitariocomercial, row.DescricaoProduto, row.CLEAN))
        iterative_string = iterative_string + "%s"
    
    iterative_string = iterative_string.replace("s%","s,%")
    
    args = ','.join(f"{i}" for i in inputArray)
    
    sql = "INSERT INTO transactions(CodigoNFe,DataEmissao,MunicipioEmitente,unidadecomercial,quantidadecomercial,valorunitariocomercial,DescricaoProduto,CLEAN) VALUES "
    cursor.execute(sql + (args))
    
    connection.commit()
    connection.close()

# Método para população da Tabela classes
def fill_classes_table():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="localhost", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()
    
    inputArray = []
    
    training_file = open('./dados/data.train.txt', 'r')
    training_lines = training_file.readlines()
        
    for line in training_lines:
        inputArray.append((str(line.split()[0])))
        
    inputArray = list(set(inputArray))
    
    args = ','.join(f"('{i}')" for i in inputArray)
    sql = "INSERT INTO classes(class_label) VALUES "    
    cursor.execute(sql + (args))
    
    connection.commit()
    connection.close()


def fill_products_classes_table():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="localhost", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()
    
    inputArray = []
    training_file = open('./dados/data.train.txt', 'r')
    training_lines = training_file.readlines()
    for line in training_lines:
        inputArray.append((str(line.split()[0]), str(line.replace(line.split()[0] + ' ', '').replace('\n',''))))
        
    inputArray = list(set(inputArray))
    
    pdb.set_trace()
    # sql = "select insert_in_products_classes_table"
    sql = "INSERT INTO "
    for input in inputArray:
        arg = str(input)
        print(sql + arg)
        cursor.execute(sql + arg)

    connection.commit()
    connection.close()


def get_all_medicine_expanded_df():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="snelf-postgres", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()
    sql_table_creation = "SELECT mt.DescricaoProduto, mt.CLEAN FROM transactions mt"
    cursor.execute(sql_table_creation)

    medicine_transactions_records = cursor.fetchall()
    medicine_transactions_dataframe = pd.DataFrame(medicine_transactions_records, columns=["DescricaoProduto","CLEAN"])

    connection.commit()
    connection.close()
    
    return medicine_transactions_dataframe

def getTransactionsFromClean(busca):
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="snelf-postgres", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()
    sql_table_creation = f"""select *
                             from transactions t 
                             where clean like '%{busca}%'"""

    cursor.execute(sql_table_creation)

    medicine_transactions_consulted = cursor.fetchall()
    
    medicines_object = []
    for transaction in medicine_transactions_consulted:
        medicines_object.append({
            'id': transaction[0],
            'CodigoNFe': transaction[1],
            'DataEmissao': transaction[2],
            'MunicipioEmitente': transaction[3],
            'unidadecomercial': transaction[4],
            'quantidadecomercial': transaction[5],
            'valorunitariocomercial': transaction[6],
            'DescricaoProduto': transaction[7],
            'CLEAN': transaction[8]
        })

    print('medicines_object')
    print(medicines_object)

    connection.commit()
    connection.close()
    
    return medicines_object


def get_medicines_from_label(label):
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="snelf-postgres", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()
    sql_table_creation = f"""select t.*
                            from products_classes pc
                            join classes c 
                                on c.id=pc.id_classe
                                and c.class_label like '%{label}%'
                            join products_transactions pt 
                                on pt.id_product=pc.id_produto
                            join transactions t
                                on t.id=pt.id_transaction"""

    cursor.execute(sql_table_creation)

    medicine_transactions_consulted = cursor.fetchall()
    
    medicines_object = []
    for transaction in medicine_transactions_consulted:
        medicines_object.append({
            'id': transaction[0],
            'CodigoNFe': transaction[1],
            'DataEmissao': transaction[2],
            'MunicipioEmitente': transaction[3],
            'unidadecomercial': transaction[4],
            'quantidadecomercial': transaction[5],
            'valorunitariocomercial': transaction[6],
            'DescricaoProduto': transaction[7],
            'CLEAN': transaction[8]
        })

    print('medicines_object')
    print(medicines_object)

    connection.commit()
    connection.close()
    
    return medicines_object

def get_limited_medicines_with_clean():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="snelf-postgres", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()
    sql_table_creation = f"""select distinct descricaoproduto, clean
                             from transactions
                             where clean NOT in ('', 'N/I', '-1', '0')
                             order by clean desc
                             limit 1000"""

    cursor.execute(sql_table_creation)

    medicine_transactions_with_clean = cursor.fetchall()
    
    medicine_transactions_dataframe = pd.DataFrame(medicine_transactions_with_clean, columns=["DescricaoProduto","CLEAN"])

    print(medicine_transactions_dataframe)
    
    connection.commit()
    connection.close()
    
    return medicine_transactions_dataframe

# get_limited_medicines_with_clean()
# fill_products_classes_table()
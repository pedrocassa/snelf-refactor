from pathlib import Path
import sqlite3
import pandas as pd
import psycopg2
import pdb
from datetime import datetime


# def create_description_ean():
#     connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="localhost", port="5432")
#     connection.autocommit=True
#     cursor = connection.cursor()
#     sql_table_creation = '''CREATE TABLE medicines (Id SERIAL PRIMARY KEY, Description text, EAN text)'''
#     cursor.execute(sql_table_creation)
#     connection.commit()
#     connection.close()

# def create_medicine_transactions():
#     connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="localhost", port="5432")
#     connection.autocommit=True
#     cursor = connection.cursor()
#     sql_table_creation = '''CREATE TABLE medicine_transactions (Id SERIAL PRIMARY KEY, CodigoNFe int, DataEmissao date, MunicipioEmitente text, unidadecomercial text, quantidadecomercial real, valorunitariocomercial real, DescricaoProduto text, CLEAN text)'''
#     cursor.execute(sql_table_creation)
#     connection.commit()
#     connection.close()


# def import_description_ean():
#     pdb.set_trace()
#     connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="localhost", port="5432")
#     connection.autocommit=True
#     cursor = connection.cursor()
    
#     sql = '''COPY medicines
#              FROM '//wsl$/Ubuntu-20.04/home/aboumrad/CEFET/pcs/snelf/medicamentos.csv'
#              DELIMITER ','
#              CSV HEADER;'''
#     cursor.execute(sql)

#     connection.commit()
#     connection.close()

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
    
    print(inputArray)
    print(f"STRING ITERATIVA: {iterative_string}")
        
    
    # args = ','.join(cursor.mogrify(f"({iterative_string})", i).decode('utf-8')
    #             for i in inputArray)
    
    args = ','.join(f"{i}" for i in inputArray)
    
    
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
    
    sql = "INSERT INTO transactions(CodigoNFe,DataEmissao,MunicipioEmitente,unidadecomercial,quantidadecomercial,valorunitariocomercial,DescricaoProduto,CLEAN) VALUES "
    cursor.execute(sql + (args))
    
    connection.commit()
    connection.close()


def get_all_medicine_df():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="snelf-postgres", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()
    sql_table_creation = "SELECT * FROM medicine"
    cursor.execute(sql_table_creation)

    medicine_records = cursor.fetchall()
    medicine_dataframe = pd.DataFrame(medicine_records, columns=["id","description", "ean"])

    connection.commit()
    connection.close()
    
    return medicine_dataframe

def fill_classes_table():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="localhost", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()
    
    inputArray = []
    
    class_label = ['class_label']
    class_data = []
    
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
    
    sql = "select insert_in_products_classes_table"
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
            'valornitariocomercial': transaction[6],
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
                             limit 22000"""

    cursor.execute(sql_table_creation)

    medicine_transactions_with_clean = cursor.fetchall()
    
    medicine_transactions_dataframe = pd.DataFrame(medicine_transactions_with_clean, columns=["DescricaoProduto","CLEAN"])

    print(medicine_transactions_dataframe)
    
    connection.commit()
    connection.close()
    
    return medicine_transactions_dataframe

get_limited_medicines_with_clean()
from pathlib import Path
import sqlite3
import pandas as pd
import psycopg2
import pdb
from datetime import datetime

def insert_produtos():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="localhost", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()

    sql_query = f"""select distinct descricaoproduto, clean
                    from transactions"""

    cursor.execute(sql_query)

    medicine_transactions_consulted = cursor.fetchall()

    medicines_object = []
    inputProductsArray = []
    for transaction in medicine_transactions_consulted:
        # print(transaction)
        transaction = list(transaction)
        transaction[0] = transaction[0].replace('\'','')
        transaction[1] = transaction[1].replace('\'','')
        transaction = tuple(transaction)
        inputProductsArray.append((str(transaction[1]), str(transaction[0])))
        # medicines_object.append({
        #     'descricaoproduto': transaction[0],
        #     'clean': transaction[1]
        # })

    # print(medicines_object)


    # for object in medicines_object:

    args_products = ','.join(f"{i}" for i in inputProductsArray)
    # pdb.set_trace()

    # print(args_products)


    sql_products = "INSERT INTO produtos(clean,description) VALUES "
    cursor.execute(sql_products + (args_products))


    connection.commit()
    connection.close()
    print('Sucesso!')


def insert_products_transactions():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="localhost", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()

    sql_query = f"""select distinct t.id transactionid, p.id as productid
                    from transactions t 
                    join produtos p on p.description = t.descricaoproduto"""

    cursor.execute(sql_query)

    transactions_products_consulted = cursor.fetchall()


    input_products_transactions_array = []
    for element in transactions_products_consulted:
        input_products_transactions_array.append(element)

    args_products_transactions = ','.join(f"{i}" for i in input_products_transactions_array)

    # print(args_products_transactions)


    sql_products = "INSERT INTO produtos(clean,description) VALUES "
    cursor.execute(sql_products + (args_products_transactions))


    connection.commit()
    connection.close()


def insert_classes():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="localhost", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()

    classes = []
    with open('classes.txt', 'r') as f:
        classes = f.readlines()
    print(classes)
    
    args_classes = ','.join(f"{i}" for i in classes)
    print(args_classes)

    sql_products = "INSERT INTO classes(class_label) VALUES "
    cursor.execute(sql_products + args_classes)

    connection.commit()
    connection.close()


def insert_products_classes():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="localhost", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()

    products_classes = []
    with open('products_classes.txt', 'r') as f:
        products_classes = f.readlines()
    print(products_classes)
    
    args_products_classes = ','.join(f"{i}" for i in products_classes)
    print(args_products_classes)

    sql_products_classes = "INSERT INTO products_classes(id_produto,id_classe,association_type) VALUES "
    cursor.execute(sql_products_classes + args_products_classes)

    connection.commit()
    connection.close()

    
# insert_produtos()
# insert_products_transactions()
# insert_classes()
# insert_products_classes()


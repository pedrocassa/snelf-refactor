from pathlib import Path
import sqlite3
import pandas as pd
import psycopg2
import pdb
from datetime import datetime
import random

def insert_produtos():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="snelf-postgres", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()

    sql_query = f"""select distinct descricaoproduto, clean
                    from transactions"""

    cursor.execute(sql_query)

    medicine_transactions_consulted = cursor.fetchall()

    medicines_object = []
    inputProductsArray = []
    for transaction in medicine_transactions_consulted:
        transaction = list(transaction)
        transaction[0] = transaction[0].replace('\'','')
        transaction[1] = transaction[1].replace('\'','')
        transaction = tuple(transaction)
        inputProductsArray.append((str(transaction[1]), str(transaction[0])))


    args_products = ','.join(f"{i}" for i in inputProductsArray)

    sql_products = "INSERT INTO produtos(clean,description) VALUES "
    cursor.execute(sql_products + (args_products))

    connection.commit()
    connection.close()
    print('Produtos inseridos com sucesso!')


def insert_products_transactions():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="snelf-postgres", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()

    sql_query = f"""select distinct p.id as productid, t.id transactionid
                    from transactions t 
                    join produtos p on p.description = t.descricaoproduto"""

    cursor.execute(sql_query)

    transactions_products_consulted = cursor.fetchall()

    print('Chegou em products_transactions')


    input_products_transactions_array = []
    for element in transactions_products_consulted:
        input_products_transactions_array.append(element)

    args_products_transactions = ','.join(f"{i}" for i in input_products_transactions_array)

    # print(args_products_transactions)


    sql_products = "INSERT INTO products_transactions(id_product,id_transaction) VALUES "
    cursor.execute(sql_products + (args_products_transactions))


    connection.commit()
    connection.close()
    print('Products_transactions inseridos com sucesso!')


def insert_classes():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="snelf-postgres", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()

    classes = []
    with open('classes.txt', 'r') as f:
        classes = f.readlines()
    # print(classes)
    
    args_classes = ','.join(f"{i}" for i in classes)
    # print(args_classes)

    sql_products = "INSERT INTO classes(class_label) VALUES "
    cursor.execute(sql_products + args_classes)

    connection.commit()
    connection.close()
    print('Classes inseridas com sucesso!')


def insert_products_classes():
    connection = psycopg2.connect(database="testejp", user="testejp", password="testejp", host="snelf-postgres", port="5432")
    connection.autocommit=True
    cursor = connection.cursor()

    get_max = """select max(c.id) from classes c"""
    cursor.execute(get_max)
    max = cursor.fetchall()[0][0]

    get_min = """select min(c.id) from classes c"""
    cursor.execute(get_min)
    min = cursor.fetchall()[0][0]

    sql_get_all_products = """select p.id from produtos p"""
    cursor.execute(sql_get_all_products)
    product_ids = cursor.fetchall()

    input_products_classes_array = []
    for product_id in product_ids:
        input_products_classes_array.append((product_id[0], random.randint(min, max),'training'))

    # products_classes = []
    # with open('products_classes.txt', 'r') as f:
    #     products_classes = f.readlines()
    # print(products_classes)

    
    args_products_classes = ','.join(f"{i}" for i in input_products_classes_array)
    print(args_products_classes)

    sql_products_classes = """INSERT INTO products_classes(id_produto,id_classe,association_type) VALUES """
    cursor.execute(sql_products_classes + (args_products_classes))

    connection.commit()
    connection.close()
    print('Products_classes inseridas com sucesso!')

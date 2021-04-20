import os
import shutil
import sqlite3
from sqlite3 import Error

from userAccount import *

# from userDAO import insertUser

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
database = os.path.join(THIS_FOLDER, "database.db")


def create_table(conn, create_table_sql):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)


def initTables():

    sql_create_users_table = """ CREATE TABLE IF NOT EXISTS users(
                                id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                firstName text,
                                surname text,
                                active boolean,
                                email text UNIQUE,
                                password text
                             );"""

    sql_create_robots_table = """ CREATE TABLE IF NOT EXISTS robots(
                                robotID integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                robotname text UNIQUE                           
                             );"""

    sql_create_joints_table = """ CREATE TABLE IF NOT EXISTS joints(
                                id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                robotname text,
                                jointname text,
                                minimum integer,
                                maximum integer,
                                robotID integer,
                                FOREIGN KEY (robotID) REFERENCES robots (robotID) ON DELETE CASCADE
                             );"""

    sql_create_poses_table = """ CREATE TABLE IF NOT EXISTS poses(
                                id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                groupname text,
                                posename text UNIQUE,
                                a real,
                                b real,
                                c real,
                                x real,
                                y real,
                                z real,
                                isSaved boolean,
                                robotID integer,
                                FOREIGN KEY (robotID) REFERENCES robots (robotID) ON DELETE CASCADE
                             );"""

    conn = create_connection()

    if conn is not None:

        create_table(conn, sql_create_users_table)
        create_table(conn, sql_create_poses_table)
        create_table(conn, sql_create_robots_table)
        create_table(conn, sql_create_joints_table)
        conn.close()

    else:
        print("Error! cannot create the database connection.")


def create_connection():
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(database, check_same_thread=False)
        conn.execute("PRAGMA foreign_keys = 1")
        return conn
    except Error as e:
        print(e)

    return conn


initTables()

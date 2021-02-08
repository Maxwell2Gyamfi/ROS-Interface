import sqlite3
from sqlite3 import Error
import os
import shutil


THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
database = os.path.join(THIS_FOLDER, 'database.db')


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
    sql_create_waypoints_table = """ CREATE TABLE IF NOT EXISTS waypoints(
                                        id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                        name text UNIQUE,
                                        groupname text,
                                        joint0 real,
                                        joint1 real,
                                        joint2 real,
                                        joint3 real,
                                        joint4 real,
                                        joint5 real,
                                        joint6 real,
                                        w real,
                                        x real,
                                        y real,
                                        z real
                                    ); """

    sql_create_users_table = """ CREATE TABLE IF NOT EXISTS users(
                                id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                firstName text,
                                surname text,
                                email text UNIQUE,
                                password text
                             );"""

    conn = create_connection()

    if conn is not None:
        create_table(conn, sql_create_waypoints_table)
        create_table(conn, sql_create_users_table)
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
        conn = sqlite3.connect(database)
        return conn
    except Error as e:
        print(e)

    return conn


initTables()

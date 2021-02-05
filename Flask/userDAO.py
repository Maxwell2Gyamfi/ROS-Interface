import uuid
import hashlib
from sqlite3 import Error
import sqlite3

database = "database.db"


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


def insertUser(obj):
    conn = None
    try:
        conn = create_connection()
        sql = '''INSERT INTO users(firstName, surname, email, password)
        VALUES(?,?,?,?);'''

        password = obj.getPassword()
        hashedPassword = hash_password(password)
        obj.setPassword(hashedPassword)

        cur = conn.cursor()
        cur.execute(sql, obj)
        conn.commit()

        return True

    except Error as e:
        print(e)
        return False


def verifyUser(email, password):
    conn = None
    try:
        conn = create_connection()
        sql = "SELECT * FROM users WHERE email=?"
        cur = conn.cursor()
        cur.execute(sql, (email,))
        record = cur.fetchone()

        if record != None:
            hashedPassword = dict(record)['password']
            if(checkPassword(hashedPassword, password)):
                return True
            else:
                return False

    except Error as e:
        print(e)
        return False


def hash_password(password):
    salt = uuid.uuid4().hex
    return hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt


def checkPassword(hashedPassword, user_password):
    password, salt = hashedPassword.split(':')
    return password == hashlib.sha256(salt.encode() + user_password.encode()).hexdigest()

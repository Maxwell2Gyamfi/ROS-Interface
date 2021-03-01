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
        sql = '''INSERT INTO users(firstName, surname, active, email, password)
        VALUES(?,?,?,?,?);'''

        password = obj.getPassword()
        hashedPassword = hash_password(password)
        obj.setPassword(hashedPassword)

        userTuple = obj.getUser()
        print(userTuple)

        cur = conn.cursor()
        cur.execute(sql, userTuple)
        conn.commit()
        print("new user added")
        return True

    except Error as e:
        print(e)
        return False


def updateUserStatus(userID):
    try:
        conn = create_connection()
        sql = ''' UPDATE users SET active = ? WHERE id = ?'''
        cur = conn.cursor()
        data_tuple = (True, userID)
        cur.execute(sql, data_tuple)
        conn.commit()
    except Error as e:
        print(e)


def retrieveUserAccount(obj):
    try:
        conn = create_connection()
        sql = "SELECT id, firstName, surname, email FROM users WHERE id=?"
        cur = conn.cursor()
        cur.execute(sql, (obj,))
        record = cur.fetchone()
        print("record is")
        print(record)
        cur.close()
    except Error as e:
        print(e)
    return record


def retrieveUserID(obj):
    try:
        conn = create_connection()
        sql = "SELECT id FROM users WHERE email=?"
        cur = conn.cursor()
        cur.execute(sql, (obj,))
        record = cur.fetchone()
        print("record is")
        print(record[0])
        cur.close()
    except Error as e:
        print(e)
    return record[0]


def verifyUser(email, password):
    conn = None
    try:
        conn = create_connection()
        sql = "SELECT * FROM users WHERE email=?"
        cur = conn.cursor()
        cur.execute(sql, (email,))
        record = cur.fetchone()
        print("user record")
        print(record)
        print(email)
        if record != None:
            hashedPassword = record[5]
            if(checkPassword(hashedPassword, password)):
                if(record[3] == 0):
                    return False, "Account waiting for approval"
                else:
                    return record[0], record[1]
            else:
                return False, 'Invalid Password, please try again'
        else:
            return False, 'Invalid Credentials, please sign up'

    except Error as e:
        print("cooreectsdf")
        print(e)
        return False


def hash_password(password):
    salt = uuid.uuid4().hex
    return hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt


def checkPassword(hashedPassword, user_password):
    password, salt = hashedPassword.split(':')
    return password == hashlib.sha256(salt.encode() + user_password.encode()).hexdigest()

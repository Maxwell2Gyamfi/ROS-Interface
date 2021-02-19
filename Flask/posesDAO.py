import sqlite3
from sqlite3 import Error

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


def insertPose(obj, groupName):
    conn = None
    try:
        conn = create_connection()
        sql = '''INSERT INTO poses(groupname, a, b, c, x, y, z)
                    VALUES(?, ?, ?, ?, ?, ?, ?);'''

        data_tuple = (groupName, float(obj['coordinates'][0]), float(obj['coordinates'][1]), float(
            obj['coordinates'][2]), float(obj['coordinates'][3]), float(obj['coordinates'][4]), float(obj['coordinates'][5]))
        cur = conn.cursor()
        cur.execute(sql, data_tuple)
        conn.commit()

    except Error as e:
        print(e)


def retrieveAllPoses(group_name):
    try:
        conn = create_connection()
        sql = "SELECT * FROM poses where groupname=?"
        cur = conn.cursor()
        cur.execute(sql, (group_name,))
        rows = cur.fetchall()

    except Error as e:
        print(e)

    return rows


def retrievePose(poseid):
    try:
        conn = create_connection()
        sql = "SELECT * FROM poses WHERE id=?"
        cur = conn.cursor()
        cur.execute(sql, (poseid,))
        record = cur.fetchone()
        cur.close()
    except Error as e:
        print(e)
    return record


def deleteSelectedWaypoint(poseid):
    try:
        conn = create_connection()
        sql = "DELETE FROM poses WHERE id=?"
        cur = conn.cursor()
        cur.execute(sql, (poseid,))
        conn.commit()
    except Error as e:
        print(e)

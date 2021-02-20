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


def insertWaypoint(obj):
    conn = None
    try:
        conn = create_connection()
        sql = '''INSERT or REPLACE INTO waypoints(name, groupname, joint0, joint1, joint2, joint3, joint4, joint5, joint6)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);'''

        data_tuple = (obj.get('wayPointName'), obj.get('groupName'), float(obj['jointValues'][0]), float(obj['jointValues'][1]), float(obj['jointValues'][2]),
                      float(obj['jointValues'][3]), float(obj['jointValues'][4]), float(
                          obj['jointValues'][5]), float(obj['jointValues'][6]))
        cur = conn.cursor()
        cur.execute(sql, data_tuple)
        conn.commit()

    except Error as e:
        print(e)


def retrieveAllWaypoints(group_name):
    try:
        conn = create_connection()
        sql = "SELECT * FROM waypoints where groupname=?"
        cur = conn.cursor()
        cur.execute(sql, (group_name,))
        rows = cur.fetchall()

    except Error as e:
        print(e)

    return rows


def retrieveWaypoint(wayPointName):
    try:
        conn = create_connection()
        sql = "SELECT * FROM waypoints WHERE name=?"
        cur = conn.cursor()
        cur.execute(sql, (wayPointName,))
        record = cur.fetchone()
        cur.close()
    except Error as e:
        print(e)
    return record


def deleteSelectedWaypoint(wayPointName):
    try:
        conn = create_connection()
        sql = "DELETE FROM waypoints WHERE name=?"
        cur = conn.cursor()
        cur.execute(sql, (wayPointName,))
        conn.commit()
    except Error as e:
        print(e)

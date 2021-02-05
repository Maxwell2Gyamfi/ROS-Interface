import sqlite3
from sqlite3 import Error


database = "waypointsDB.db"


def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

    return conn


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


def insertWaypoint(obj):
    conn = None
    try:
        conn = create_connection(database)
        sql = '''INSERT or REPLACE INTO waypoints(name, joint0, joint1, joint2, joint3, joint4, joint5, joint6, w, x, y, z)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'''

        data_tuple = (obj.get('wayPointName'), float(obj['jointValues'][0]), float(obj['jointValues'][1]), float(obj['jointValues'][2]),
                      float(obj['jointValues'][3]), float(obj['jointValues'][4]), float(
                          obj['jointValues'][5]), float(obj['jointValues'][6]),
                      float(obj['coordinates'][0]), float(obj['coordinates'][1]), float(obj['coordinates'][2]), float(obj['coordinates'][3]))
        cur = conn.cursor()
        cur.execute(sql, data_tuple)
        conn.commit()

    except Error as e:
        print(e)


def retrieveAllWaypoints():
    try:
        conn = create_connection(database)
        sql = "SELECT * FROM waypoints"
        cur = conn.cursor()
        cur.execute(sql)
        rows = cur.fetchall()

    except Error as e:
        print(e)

    return rows


def retrieveWaypoint(wayPointName):
    try:
        conn = create_connection(database)
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
        conn = create_connection(database)
        sql = "DELETE FROM waypoints WHERE name=?"
        cur = conn.cursor()
        cur.execute(sql, (wayPointName,))
        conn.commit()
    except Error as e:
        print(e)


def main():
    sql_create_projects_table = """ CREATE TABLE IF NOT EXISTS waypoints(
                                        id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                        name text UNIQUE,
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
    # create a database connection
    conn = create_connection(database)

    # create tables
    if conn is not None:
        # create projects table
        create_table(conn, sql_create_projects_table)
        print('success')

    else:
        print("Error! cannot create the database connection.")


if __name__ == '__main__':
    main()

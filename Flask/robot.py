import sqlite3
from sqlite3 import Error

database = "database.db"


class Robot:
    def __init__(self, name):
        self.name = name
        self.joints = []

    def addJoint(self, joint):
        self.joints.append(joint)

    def getJoints(self):
        return self.joints

    def getRobotName(self):
        return self.name

    def __str__(self):
        return f"{self.name} {self.joints}"

    def __repr__(self):
        return f"{self.name} {self.joints}"


class Joint:
    def __init__(self, robotName, jointName, minimum, maximum, robotID):
        self.robotName = robotName
        self.jointName = jointName
        self.minimum = minimum
        self.maximum = maximum
        self.robotID = robotID

    def getJoint(self):
        return (
            self.robotName,
            self.jointName,
            self.minimum,
            self.maximum,
            self.robotID,
        )

    def getMin(self):
        return self.minimum

    def getMax(self):
        return self.maximum

    def getName(self):
        return self.name

    def __str__(self):
        return f"{self.robotName} {self.jointName} {self.minimum} {self.maximum} {self.robotID}"

    def __repr__(self):
        return f"{self.robotName} {self.jointName} {self.minimum} {self.maximum} {self.robotID}"


class RobotDAO:
    def __init__(self):
        self.conn = self.create_connection()

    def create_connection(self):
        connection = None
        try:
            connection = sqlite3.connect(database)
            return connection
        except Error as e:
            print(e)
        return connection

    def insertRobot(self, robot):
        robotName = robot.getRobotName()
        try:
            sql = """INSERT INTO robots(robotname)
                        VALUES(?);"""
            cur = self.conn.cursor()
            cur.execute(sql, (robotName,))
            self.conn.commit()
            print("added robot")
            return True
        except Error as e:
            print(e)
            return False

    def retrieveRobots(self):
        try:
            sql = "SELECT * FROM robots"
            cur = self.conn.cursor()
            cur.execute(sql)
            rows = cur.fetchall()
            print(rows)
            return rows
        except Error as e:
            print(e)
        return None

    def getRobotID(self, robotName):
        try:
            sql = "SELECT robotID FROM robots WHERE robotname=?"
            cur = self.conn.cursor()
            cur.execute(sql, (robotName,))
            record = cur.fetchone()
            cur.close()
        except Error as e:
            print(e)
        return record

    def deleteRobot(self, robotName):
        try:
            print(robotName)
            sql = "DELETE FROM robots WHERE robotname=?"
            cur = self.conn.cursor()
            cur.execute(sql, (robotName,))
            self.conn.commit()
            return True
        except Error as e:
            print(e)
        return False


class JointsDAO:
    def __init__(self):
        self.conn = self.create_connection()

    def create_connection(self):
        connection = None
        try:
            connection = sqlite3.connect(database)
            return connection
        except Error as e:
            print(e)
        return connection

    def insertJoint(self, joint):
        try:
            sql = """INSERT OR REPLACE INTO joints(robotname, jointname, minimum, maximum, robotID)
                    VALUES(?, ?, ?, ?, ?);"""
            data_tuple = joint.getJoint()
            cur = self.conn.cursor()
            cur.execute(sql, data_tuple)
            self.conn.commit()
            print("added joint to joints")
        except Error as e:
            print(e)

    def retrieveJoints(self, robotName):
        try:
            sql = "SELECT id, robotname, jointname, minimum, maximum FROM joints WHERE robotname=?"
            cur = self.conn.cursor()
            cur.execute(sql, (robotName,))
            rows = cur.fetchall()
            cur.close()
            return rows
        except Error as e:
            print(e)
        return None

    def deleteJoints(self, robotName):
        try:
            sql = "DELETE FROM joints WHERE robotname=?"
            cur = self.conn.cursor()
            cur.execute(sql, (robotName,))
            self.conn.commit()
        except Error as e:
            print(e)

import sqlite3
from sqlite3 import Error

database = "database.db"


class Pose:
    def __init__(self, groupName, poseName, a, b, c, x, y, z, isSaved, robotID):
        self.groupName = groupName
        self.poseName = poseName
        self.a = a
        self.b = b
        self.c = c
        self.x = x
        self.y = y
        self.z = z
        self.isSaved = isSaved
        self.robotID = robotID

    def getPoseName(self):
        return self.posename

    def isPoseSaved(self):
        return self.isSaved

    def getPose(self):
        return (
            self.groupName,
            self.poseName,
            self.a,
            self.b,
            self.c,
            self.x,
            self.y,
            self.z,
            self.isSaved,
            self.robotID,
        )

    def __str__(self):
        return f"{self.groupName} {self.poseName} {self.a} {self.b} {self.c} {self.x} {self.y} {self.z} {self.isSaved} {self.robotID}"

    def __repr__(self):
        return f"{self.groupName} {self.poseName} {self.a} {self.b} {self.c} {self.x} {self.y} {self.z} {self.isSaved} {self.robotID}"


class PoseDAO:
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

    def insertPose(self, pose):
        try:
            sql = """INSERT INTO poses(groupname, posename, a, b, c, x, y, z, isSaved, robotID)
                        VALUES(?, ?, ?, ?, ?, ?, ?, ?,?, ?);"""

            data_tuple = pose.getPose()
            cur = self.conn.cursor()
            cur.execute(sql, data_tuple)
            self.conn.commit()
            print("inserted pose")
        except Error as e:
            print(e)

    def retrieveNonSavedPoses(self, group_name):
        try:
            sql = (
                "SELECT id, a, b, c, x, y, z FROM poses where groupname=? and isSaved=?"
            )
            cur = self.conn.cursor()
            cur.execute(sql, (group_name, False))
            rows = cur.fetchall()
        except Error as e:
            print(e)

        return rows

    def retrievePose(self, poseid):
        try:
            sql = "SELECT id, posename, a, b, c, x, y, z, isSaved FROM poses WHERE id=?"
            cur = self.conn.cursor()
            cur.execute(sql, (poseid,))
            record = cur.fetchone()
            cur.close()
        except Error as e:
            print(e)
        return record

    def updatePose(self, poseid, robotName):
        try:
            sql = """ UPDATE poses SET isSaved = ?, posename = ? WHERE id = ?"""
            cur = self.conn.cursor()
            data_tuple = (True, robotName, poseid)
            cur.execute(sql, data_tuple)
            self.conn.commit()
            print("changed pose saved")
            return True

        except Error as e:
            print(e)
            return False

    def retrieveAllSavedPoses(self, robotName):
        try:
            sql = "SELECT id, posename, a, b, c, x, y, z FROM poses where groupname=? AND isSaved=?"
            cur = self.conn.cursor()
            cur.execute(sql, (robotName, True))
            rows = cur.fetchall()
        except Error as e:
            print(e)

        return rows

    def deletePose(self, poseid):
        try:
            sql = "DELETE FROM poses WHERE id=?"
            cur = self.conn.cursor()
            cur.execute(sql, (poseid,))
            self.conn.commit()
        except Error as e:
            print(e)

    def deletePoses(self, robotName):
        try:
            sql = "DELETE FROM poses WHERE robotname=?"
            cur = self.conn.cursor()
            cur.execute(sql, (robotName,))
            self.conn.commit()
        except Error as e:
            print(e)

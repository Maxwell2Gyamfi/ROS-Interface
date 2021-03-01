from userAccount import User
import sqlite3
from sqlite3 import Error

database = "database.db"


class ApprovalsClass():
    def __init__(self, ID, user, actioned):
        self.ID = ID
        self.user = user
        self.actioned = actioned

    def getID(self):
        return self.ID

    def getUser(self):
        return self.user.id

    def isActioned(self):
        return self.actioned

    def __str__(self):
        return f'{self.ID} {self.user} {self.actioned} '

    def __repr__(self):
        return f'{self.ID} {self.user} {self.actioned} '


class ApprovalsDAO():
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

    def insertApproval(self, approval):
        print("approvals")
        print(approval)
        try:
            sql = '''INSERT or REPLACE INTO approvals(accountID, actioned)
                    VALUES(?, ?);'''
            data_tuple = (approval.user.ID,
                          approval.isActioned())
            cur = self.conn.cursor()
            cur.execute(sql, data_tuple)
            self.conn.commit()
            print("added user to approvals")
        except Error as e:
            print(e)

    def updateApproval(self, userID):
        try:
            sql = ''' UPDATE approvals SET actioned = ? WHERE accountID = ?'''
            cur = self.conn.cursor()
            data_tuple = (True, userID)
            cur.execute(sql, data_tuple)
            self.conn.commit()
            print("changed user approval")
        except Error as e:
            print(e)

    def retrieveAllPendingApprovals(self):
        try:
            sql = "SELECT * FROM approvals WHERE actioned=?"
            cur = self.conn.cursor()
            cur.execute(sql, (0,))
            rows = cur.fetchall()
            print(rows)
        except Error as e:
            print(e)
        return rows

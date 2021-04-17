import json
import os
import types

import cv2
from approvals import ApprovalsClass, ApprovalsDAO
from flask import (
    Flask,
    Response,
    flash,
    redirect,
    render_template,
    request,
    send_file,
    send_from_directory,
    session,
    url_for,
)
from poses import *
from robot import *
from tables import initTables
from userAccount import *

app = Flask(__name__)
app.secret_key = "your secret key"
initTables()
admin = User(None, "admin", "admin", True, "admin@admin.com", "password")


insertUser(admin)
camera = cv2.VideoCapture(0)

groupType = "manipulator"


def initManipulator():

    jointDB = JointsDAO()
    robotDB = RobotDAO()
    robot = Robot("manipulator")
    success = robotDB.insertRobot(robot)
    robotID = robotDB.getRobotID("manipulator")
    print(robotID[0])
    if success == True:
        jointDB.insertJoint(
            Joint("manipulator", "Joint 1", -170, 170, robotID[0]))
        jointDB.insertJoint(
            Joint("manipulator", "Joint 2", -120, 120, robotID[0]))
        jointDB.insertJoint(
            Joint("manipulator", "Joint 3", -170, 170, robotID[0]))
        jointDB.insertJoint(
            Joint("manipulator", "Joint 4", -120, 120, robotID[0]))
        jointDB.insertJoint(
            Joint("manipulator", "Joint 5", -170, 170, robotID[0]))
        jointDB.insertJoint(
            Joint("manipulator", "Joint 6", -120, 120, robotID[0]))
        jointDB.insertJoint(
            Joint("manipulator", "Joint 7", -175, 175, robotID[0]))
        print("inserted joints")

    else:
        print("duplicate found")


@app.route("/", methods=["GET", "POST"])
def login():
    try:
        if request.method == "GET":
            return render_template("loginRegister.html", msg="")
        elif request.method == "POST":
            useremail = request.form["useremail"]
            password = request.form["password"]
            userid, username = verifyUser(useremail, password)
            if userid is False:
                msg = username
                return render_template("loginRegister.html", msg=msg)
            else:
                session["loggedin"] = True
                session["id"] = int(userid)
                session["username"] = username
                initManipulator()
                return render_template("index.html", msg="")

    except Exception as e:
        return str(e)


@app.route("/signout", methods=["GET", "POST"])
def signout():
    session.pop("loggedin", None)
    session.pop("id", None)
    session.pop("username", None)
    # Redirect to login page
    return redirect(url_for("login"))


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        obj = request.json
        user = User(
            None, obj["firstname"], obj["surname"], False, obj["email"], obj["password"]
        )
        message = insertUser(user)
        if message == True:
            user.ID = retrieveUserID(user.getEmail())
            approv = ApprovalsClass(None, user, False)
            approvalObj = ApprovalsDAO()
            approvalObj.insertApproval(approv)
            return (
                json.dumps({"success": True}),
                200,
                {"ContentType": "application/json"},
            )
        else:
            return (
                json.dumps({"success": False}),
                400,
                {"ContentType": "application/json"},
            )


@app.route("/retrievePendingApprovals", methods=["GET", "POST"])
def retrievePendingApprovals():
    approvObj = ApprovalsDAO()
    pendingUsers = []
    pendinapprovals = approvObj.retrieveAllPendingApprovals()
    for i in range(0, len(pendinapprovals)):
        useraccount = retrieveUserAccount(pendinapprovals[i][1])
        if useraccount is not None:
            pendingUsers.append(useraccount)
    return (
        json.dumps({"success": True, "pendingapprovals": pendingUsers}),
        200,
        {"ContentType": "application/json"},
    )


@app.route("/approvePendingAccount", methods=["GET", "POST"])
def approvePendingAccount():
    if request.method == "POST":
        id = request.json
        approvObj = ApprovalsDAO()
        approvObj.updateApproval(id)
        updateUserStatus(id)
        return json.dumps({"success": True}), 200, {"ContentType": "application/json"}


@app.route("/denyPendingAccount", methods=["GET", "POST"])
def denyPendingAccount():
    if request.method == "POST":
        id = request.json
        print(id)
        approvObj = ApprovalsDAO()
        approvObj.deleteApproval(id)
        deleteUser(id)
        return json.dumps({"success": True}), 200, {"ContentType": "application/json"}


@app.route("/addRobot", methods=["GET", "POST"])
def addRobot():
    if request.method == "POST":
        obj = request.json
        jointDB = JointsDAO()
        robotDB = RobotDAO()
        robot = Robot(obj["name"])
        success = robotDB.insertRobot(robot)
        if success == True:
            robotID = robotDB.getRobotID(obj["name"])
            jointlist = obj["joints"]

            for i in jointlist:
                new_joint = Joint(
                    obj["name"], i["jointName"], i["min"], i["max"], robotID[0]
                )
                jointDB.insertJoint(new_joint)
                print(i)

            return (
                json.dumps({"success": True, "robotname": obj["name"]}),
                200,
                {"ContentType": "application/json"},
            )
        else:
            return (
                json.dumps({"success": False}),
                400,
                {"ContentType": "application/json"},
            )


@app.route("/deleteRobot", methods=["GET", "POST"])
def deleteRobot():
    if request.method == "POST":
        obj = request.json
        robotDB = RobotDAO()
        jointsDB = JointsDAO()
        pose = PoseDAO()
        success = robotDB.deleteRobot(obj)
        if success == True:
            jointsDB.deleteJoints(obj)
            pose.deletePoses(obj)
            return (
                json.dumps({"success": True}),
                200,
                {"ContentType": "application/json"},
            )
        else:
            return (
                json.dumps({"success": False}),
                400,
                {"ContentType": "application/json"},
            )


@app.route("/getRobotJoints", methods=["GET", "POST"])
def getRobotJoints():
    if request.method == "GET":
        print("im here")
        jointDB = JointsDAO()
        joints = jointDB.retrieveJoints(groupType)

        if joints is not None:
            print(joints)
            return (
                json.dumps({"success": True, "joints": joints}),
                200,
                {"ContentType": "application/json"},
            )
        else:
            print("nothing found")
            return (
                json.dumps({"success": False}),
                400,
                {"ContentType": "application/json"},
            )


@app.route("/getRobots", methods=["GET", "POST"])
def getRobots():
    if request.method == "GET":
        robotDB = RobotDAO()
        robots = robotDB.retrieveRobots()
        if robots is not None:
            print(robots)
            return (
                json.dumps(
                    {"success": True, "robots": robots, "current": groupType}),
                200,
                {"ContentType": "application/json"},
            )
        else:
            return (
                json.dumps({"success": False}),
                400,
                {"ContentType": "application/json"},
            )


@app.route("/setRobot", methods=["GET", "POST"])
def setRobot():
    if request.method == "POST":
        obj = request.json
        global groupType
        groupType = obj

        return json.dumps({"success": True}), 200, {"ContentType": "application/json"}


@app.route("/poses", methods=["GET", "POST"])
def poses():
    if request.method == "POST":
        obj = request.json
        pose = PoseDAO()
        print(obj)
        robot = RobotDAO()
        robotID = robot.getRobotID(groupType)
        pose_js = Pose(
            groupType,
            None,
            float(obj["coordinates"][0]),
            float(obj["coordinates"][1]),
            float(obj["coordinates"][2]),
            float(obj["coordinates"][3]),
            float(obj["coordinates"][4]),
            float(obj["coordinates"][5]),
            False,
            robotID[0],
        )

        pose.insertPose(pose_js)

        return json.dumps({"success": True}), 200, {"ContentType": "application/json"}


@app.route("/savepose", methods=["GET", "POST"])
def savepose():
    if request.method == "POST":
        obj = request.json
        pose = PoseDAO()
        success = pose.updatePose(int(obj[0]), obj[1])
        if success == True:
            return (
                json.dumps({"success": True}),
                200,
                {"ContentType": "application/json"},
            )
        else:
            return (
                json.dumps({"success": False}),
                400,
                {"ContentType": "application/json"},
            )


@app.route("/retrieveposes", methods=["GET", "POST"])
def retrieveposes():
    pose = PoseDAO()
    poses = pose.retrieveNonSavedPoses(groupType)
    return (
        json.dumps({"success": True, "poses": poses}),
        200,
        {"ContentType": "application/json"},
    )


@app.route("/retrieveselectedposes", methods=["GET", "POST"])
def retrieveselectedposes():
    if request.method == "POST":
        obj = request.json
        pose = PoseDAO()
        selectedPoses = []
        print(obj)
        for i in obj:
            selectedPoses.append(pose.retrievePose(int(i)))
        return (
            json.dumps({"success": True, "selectedPoses": selectedPoses}),
            200,
            {"ContentType": "application/json"},
        )


@app.route("/getSavedPoses", methods=["GET", "POST"])
def getSavedPoses():
    if request.method == "GET":
        pose = PoseDAO()
        poses = pose.retrieveAllSavedPoses(groupType)
        print(poses)
        return (
            json.dumps({"success": True, "poses": poses}),
            200,
            {"ContentType": "application/json"},
        )


@app.route("/retrievepose", methods=["GET", "POST"])
def retrievepose():
    poseid = request.json
    pose = PoseDAO()
    my_pose = pose.retrievePose(poseid)
    return (
        json.dumps({"success": True, "pose": my_pose}),
        200,
        {"ContentType": "application/json"},
    )


@app.route("/deletepose", methods=["GET", "POST"])
def deletepose():
    if request.method == "POST":
        poseid = request.json
        pose = PoseDAO()
        pose.deletePose(poseid)
        return json.dumps({"success": True}), 200, {"ContentType": "application/json"}


@app.route("/deleteselectedpose", methods=["GET", "POST"])
def deleteselectedpose():
    if request.method == "POST":
        pose = PoseDAO()
        poses = request.json
        for i in poses:
            pose.deletePose(int(i))
        return json.dumps({"success": True}), 200, {"ContentType": "application/json"}


@app.route("/static/urdfs/<path:filename>")
def serveArmModel(filename):
    """Lets ros3djs access the meshes used to render the arm model"""
    return send_from_directory(os.path.join(app.root_path, "static/urdfs"), filename)


@app.route("/video_feed")
def video_feed():
    return Response(gen_frames(), mimetype="multipart/x-mixed-replace; boundary=frame")


def gen_frames():
    while True:
        success, frame = camera.read()  # read the camera frame
        if not success:
            break
        else:
            ret, buffer = cv2.imencode(".jpg", frame)
            frame = buffer.tobytes()
            yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n")


if __name__ == "__main__":
    app.run(host="0.0.0.0")

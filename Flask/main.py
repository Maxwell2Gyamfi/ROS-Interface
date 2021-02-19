from flask import Flask
from flask import send_file, render_template, Response, request, send_from_directory, url_for, session, flash, redirect
import json
import types
from moveit_class import *
from wayPointsDAO import *
from userDAO import *
from userAccount import User
from tables import initTables
from posesDAO import *
import os

app = Flask(__name__)
app.secret_key = 'your secret key'
initTables()

groupType = 'manipulator'


@app.route('/', methods=['GET', 'POST'])
def login():
    try:
        if request.method == 'GET':
            return render_template('loginRegister.html', msg='')
        elif request.method == 'POST':
            useremail = request.form['useremail']
            password = request.form['password']
            userid, username = verifyUser(useremail, password)
            if userid is False:
                msg = username
                return render_template('loginRegister.html', msg=msg)
            else:
                session['loggedin'] = True
                session['id'] = int(userid)
                session['username'] = username
                return render_template('index.html', msg='')

    except Exception as e:
        return str(e)


@app.route('/signout', methods=['GET', 'POST'])
def signout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    # Redirect to login page
    return redirect(url_for('login'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        obj = request.json
        user = User(obj['firstname'], obj['surname'],
                    obj['email'], obj['password'])
        message = insertUser(user)
        if message == True:
            return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
        else:
            return json.dumps({'success': False}), 400, {'ContentType': 'application/json'}


@app.route('/setRobot', methods=['GET', 'POST'])
def setRobot():
    global groupType
    if request.method == 'POST':
        groupType = request.json
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/getRobot', methods=['GET', 'POST'])
def getRobot():
    return json.dumps({'success': True, 'groupname': groupType}), 200, {'ContentType': 'application/json'}


@app.route('/getJoints')
def getJoints():
    joints = sendCurrentJoints()
    return json.dumps({'success': True, 'joints': joints}), 200, {'ContentType': 'application/json'}


@app.route('/setJoints', methods=['GET', 'POST'])
def setJoints():
    if request.method == 'POST':
        jointsVal = request.json
        isWorkingJointState(jointsVal)
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/setGoalPose', methods=['GET', 'POST'])
def setGoalPose():
    if request.method == 'POST':
        pose = request.json
        pose_dict = {'w': pose[0], 'x': pose[1], 'y': pose[2], 'z': pose[3]}
        isWorking(pose_dict)
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/getCurrentPose')
def getCurrentPose():
    pose = getCurrentPoseVal()
    return json.dumps({'success': True, 'pose': pose}), 200, {'ContentType': 'application/json'}


@app.route('/saveWaypoint', methods=['GET', 'POST'])
def saveWaypoint():
    if request.method == 'POST':
        waypoint = request.json
        insertWaypoint(waypoint)
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/deleteWaypoint', methods=['GET', 'POST'])
def deleteWaypoint():
    if request.method == 'POST':
        waypointName = request.json
        deleteSelectedWaypoint(waypointName)
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/runWaypoint', methods=['GET', 'POST'])
def runWaypoint():
    if request.method == 'POST':
        waypointName = request.json
        waypoint = retrieveWaypoint(waypointName)
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/getAllWaypoints')
def getAllWaypoints():
    group_name = request.args.get('group')
    waypoints = retrieveAllWaypoints(group_name)
    return json.dumps({'success': True, 'waypoints': waypoints}), 200, {'ContentType': 'application/json'}


@app.route('/poses', methods=['GET', 'POST'])
def poses():
    if request.method == 'POST':
        pose = request.json
        print(pose)
        insertPose(pose, groupType)
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/retrieveposes', methods=['GET', 'POST'])
def retrieveposes():
    poses = retrieveAllPoses(groupType)
    print(poses)
    return json.dumps({'success': True, 'poses': poses}), 200, {'ContentType': 'application/json'}


@app.route('/static/urdfs/<path:filename>')
def serveArmModel(filename):
    """Lets ros3djs access the meshes used to render the arm model"""
    return send_from_directory(os.path.join(app.root_path, "static/urdfs"), filename)


def parse_response(data):
    if type(data) is str:
        if is_json(data):
            return data, 200, {'ContentType': 'application/json'}
        else:
            return json.dumps({'success': False, 'error': data}), 200, {'ContentType': 'application/json'}
    elif type(data) is bytes or isinstance(data, types.GeneratorType):
        return Response(data, mimetype='multipart/x-mixed-replace; boundary=frame')
    else:
        return json.dumps({'success': False}), 200, {'ContentType': 'application/json'}


def is_json(myjson):
    try:
        json_object = json.loads(myjson)
        print(json_object)
    except ValueError as e:
        return False
    return True

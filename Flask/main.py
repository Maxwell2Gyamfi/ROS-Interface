from flask import Flask
from flask import send_file, render_template, Response, request, send_from_directory
import json
import types
from moveit_class import *


app = Flask(__name__)


@app.route('/')
def indexPage():
    try:
        return send_file('static/templates/index.html', attachment_filename='index.html')
    except Exception as e:
        return str(e)


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
        print(waypoint)
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


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
    except ValueError as e:
        return False
    return True

from flask import Flask
from flask import send_file, render_template, Response, request, send_from_directory, url_for, session, flash, redirect
import json
import types
from userDAO import *
from userAccount import User
from tables import initTables
from posesDAO import *
import os
import cv2

app = Flask(__name__)
app.secret_key = 'your secret key'
initTables()
camera = cv2.VideoCapture(0)

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


@app.route('/retrievepose', methods=['GET', 'POST'])
def retrievepose():
    poseid = request.json
    pose = retrievePose(poseid)
    print(pose)
    return json.dumps({'success': True, 'pose': pose}), 200, {'ContentType': 'application/json'}


@app.route('/deletepose', methods=['GET', 'POST'])
def deletepose():
    if request.method == 'POST':
        pose = request.json
        deletePose(pose)
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/static/urdfs/<path:filename>')
def serveArmModel(filename):
    """Lets ros3djs access the meshes used to render the arm model"""
    return send_from_directory(os.path.join(app.root_path, "static/urdfs"), filename)


@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


def gen_frames():
    while True:
        success, frame = camera.read()  # read the camera frame
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

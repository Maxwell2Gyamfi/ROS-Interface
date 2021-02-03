from flask import Flask
from flask import send_file, render_template, Response, request, send_from_directory
import json
import types
app = Flask(__name__)


@app.route('/')
def indexPage():
    try:
        return send_file('static/templates/index.html', attachment_filename='index.html')
    except Exception as e:
        return str(e)


@app.route('/getJoints')
def getJoints():
    joints = [0.0001, 1.211, 2.003, 4.00012, -5.9001]
    return json.dumps({'success': True, 'joints': joints}), 200, {'ContentType': 'application/json'}


@app.route('/setJoints', methods=['GET', 'POST'])
def setJoints():
    if request.method == 'POST':
        joints = request.json
        print(joints)
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

var ros;
var totalJoints = 7

class Waypoint {
  constructor(coordinates, jointsValues, wayPointName) {
    this.coordinates = coordinates
    this.jointValues = jointsValues
    this.wayPointName = wayPointName
  }

  getCoordinates() {
    return this.coordinates
  }
  getName() {
    return this.wayPointName
  }
  getJointValues() {
    return this.jointValues
  }
  setCoordinates(coordinates) {
    this.coordinates = coordinates
  }
  setName(wayPointName) {
    this.wayPointName = wayPointName
  }
  setJointValues(jointValues) {
    this.jointValues = jointValues
  }

}


function initROS() {
  ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
  });

  displayConnectionMessage()
}

window.addEventListener('load', (event) => {
  initROS()
});

$(document).ready(function () {
  rangeSlider();
  requestJointValues()
  getCurrentPoseValues()
});

function displayConnectionMessage() {
  message = ''
  var info = document.getElementById('info');
  var p = document.createElement("p");

  ros.on('connection', function () {
    document.getElementById('connectionStatus').style.backgroundColor = '#4caf50'
    document.getElementById('connectionStatus').innerHTML = 'Connected'
    message = ('Connected to Ros')
  });

  ros.on('error', function (error) {
    document.getElementById('connectionStatus').style.backgroundColor = '#f44336'
    document.getElementById('connectionStatus').innerHTML = 'Closed'
    message = ('Error connecting to Ros')
  });

  ros.on('close', function () {
    document.getElementById('connectionStatus').style.backgroundColor = '#f44336'
    document.getElementById('connectionStatus').innerHTML = 'Closed'
    message = ('Connection to Ros closed')
  });

  // p.innerHTML = message;
  // info.appendChild(p);
}

var rangeSlider = function () {
  var slider = $('.range-slider'),
    range = $('.range-slider input[type="range"]'),
    value = $('.range-value');
  slider.each(function () {
    value.each(function () {
      var value = $(this).prev().attr('value');
      $(this).html(value);
    });
    range.on('input', function () {
      $(this).next(value).html(this.value);
    });
  });
};


function getGoalPoseValues() {
  coords = []
  w = document.getElementById('wCoord').value;
  x = document.getElementById('xCoord').value;
  y = document.getElementById('yCoord').value;
  z = document.getElementById('zCoord').value;

  if (x != '' && w != '' && z != '' & z != '') {
    // alert(x)
    coords.push(w)
    coords.push(x);
    coords.push(y);
    coords.push(z);
    message = 'Executed pose goal: w, x, y, z with values ' + coords[0] + ', ' + coords[1] + ', ' + coords[2] + ', ' + coords[3] + '\n';
  }
  else {
    alert('wrong')
  }

  return coords
}

function setCurrentPoseValues(pose) {

  document.getElementById('wCoord').value = pose.orientation.w
  document.getElementById('xCoord').value = pose.position.x
  document.getElementById('yCoord').value = pose.position.y
  document.getElementById('zCoord').value = pose.position.z

}

function planCartesian() {
  alert('planning cartesian')
}

function executePlan() {
  alert('executing plan')
}

function loadAllWaypoints() {
  alert('loading waypoints')
}

function runAllWaypoints() {
  alert('running all waypoints')
}

function saveWaypoint() {
  alert('saving waypoint')
}


function addWayPoint() {
  newwaypoint = document.getElementById('newwaypoint')
  if (newwaypoint.value == '') {
    alert('impossible')
  }
  else {
    var jointValues = getJointValues()
    var coordinates = getGoalPoseValues()
    var waypointName = newwaypoint.value
    var waypoint = new Waypoint(coordinates, jointValues, waypointName)
    saveWaypoint(waypoint)
  }
}

function saveWaypoint(waypoint) {
  jQuery.ajax({
    url: '/saveWaypoint',
    type: "POST",
    data: JSON.stringify(waypoint),
    dataType: "json",
    contentType: 'application/json',
    success: function (e) {
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function getJointValues() {

  var jointsValues = []

  for (i = 0; i < totalJoints; i++) {
    jointsValues.push(document.getElementById('joint' + i).value)
  }

  return jointsValues

}

function loadJointValues(jointsValues) {
  for (i = 0; i < totalJoints; i++) {
    document.getElementById('joint' + i).value = jointsValues[i]
    document.getElementById('joint' + i + 'Span').innerHTML = jointsValues[i]
  }
}

function requestJointValues() {
  var xhttp = new XMLHttpRequest();
  // var msg = document.getElementById('saveImageSuccess');
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      if (obj.success === true) {
        loadJointValues(obj.joints)
      }
    }
  }
  xhttp.open("GET", "/getJoints", true);
  xhttp.send();
}

function setJointValues() {
  var joints = getJointValues()
  jQuery.ajax({
    url: '/setJoints',
    type: "POST",
    data: JSON.stringify(joints),
    dataType: "json",
    contentType: 'application/json',
    success: function (e) {
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function setGoalPoseValues() {
  var pose = getGoalPoseValues()
  if (pose.length != 0) {
    jQuery.ajax({
      url: '/setGoalPose',
      type: "POST",
      data: JSON.stringify(pose),
      dataType: "json",
      contentType: 'application/json',
      success: function (e) {

      },
      error: function (error) {
        console.log(error);
      }
    });
  }
}

function getCurrentPoseValues() {
  var xhttp = new XMLHttpRequest();
  // var msg = document.getElementById('saveImageSuccess');
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      if (obj.success === true) {
        setCurrentPoseValues(obj.pose)
      }
    }
  }
  xhttp.open("GET", "/getCurrentPose", true);
  xhttp.send();

}

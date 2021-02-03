var ros;

function initROS() {
  ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
  });

  displayConnectionMessage()
}

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


window.addEventListener('load', (event) => {

  initROS()

});

$(document).ready(function () {
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
  rangeSlider();
  requestJointValues()
});

function getGoalPoseValues() {
  w = document.getElementById('wCoord').value;
  x = document.getElementById('xCoord').value;
  y = document.getElementById('yCoord').value;
  z = document.getElementById('zCoord').value;

  if (x != '' && w != '' && z != '' & z != '') {
    // alert(x)
    coords = []
    var info = document.getElementById('info');
    coords.push(w)
    coords.push(x);
    coords.push(y);
    coords.push(z);

    message = 'Executed pose goal: w, x, y, z with values ' + coords[0] + ', ' + coords[1] + ', ' + coords[2] + ', ' + coords[3] + '\n';
    var p = document.createElement("p");
    plannedCoordinates.push(coords);
    p.innerHTML = message;
    info.appendChild(p);
  }
  else {
    alert('wrong')
  }
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
function getJointValues() {

  var jointValues = []
  joint1 = document.getElementById('joint1').value
  joint2 = document.getElementById('joint2').value
  joint3 = document.getElementById('joint3').value
  joint4 = document.getElementById('joint4').value
  joint5 = document.getElementById('joint5').value

  jointValues.push(joint1)
  jointValues.push(joint2)
  jointValues.push(joint3)
  jointValues.push(joint4)
  jointValues.push(joint5)

  return jointValues

}
function loadJointValues(jointsValues) {
  document.getElementById('joint1').value = jointsValues[0]
  document.getElementById('joint2').value = jointsValues[1]
  document.getElementById('joint3').value = jointsValues[2]
  document.getElementById('joint4').value = jointsValues[3]
  document.getElementById('joint5').value = jointsValues[4]
}

function loadJointsValuesSpan(jointsValues) {
  document.getElementById('joint1Span').innerHTML = jointsValues[0]
  document.getElementById('joint2Span').innerHTML = jointsValues[1]
  document.getElementById('joint3Span').innerHTML = jointsValues[2]
  document.getElementById('joint4Span').innerHTML = jointsValues[3]
  document.getElementById('joint5Span').innerHTML = jointsValues[4]
}

function goToJointState() {
}
function requestJointValues() {
  var xhttp = new XMLHttpRequest();
  // var msg = document.getElementById('saveImageSuccess');
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      if (obj.success === true) {
        loadJointValues(obj.joints)
        loadJointsValuesSpan(obj.joints)
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
      alert('a')
    },
    error: function (error) {
      console.log(error);
    }
  });
}
var ros;
var totalJoints = 7
var headerCount = 16

alertify.set('notifier', 'position', 'top-center');
alertify.set('notifier', 'delay', 3);

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

class User {
  constructor(firstname, surname, email, password) {
    this.firstname = firstname
    this.surname = surname
    this.password = password
    this.email = email
  }

  getFirstName() {
    return this.firstname
  }
  getSurname() {
    return this.surname
  }
  getPassword() {
    return this.password
  }
  getEmail() {
    return this.email
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
  grabUserDetails()
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
    document.getElementById('connectionStatus').style.backgroundColor = '#e31566'
    document.getElementById('connectionStatus').innerHTML = 'Closed'
    message = ('Error connecting to Ros')
  });

  ros.on('close', function () {
    document.getElementById('connectionStatus').style.backgroundColor = '#e31566'
    document.getElementById('connectionStatus').innerHTML = 'Closed'
    message = ('Connection to Ros closed')
  });

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

function saveWaypoint(waypoint) {
  jQuery.ajax({
    url: '/saveWaypoint',
    type: "POST",
    data: JSON.stringify(waypoint),
    dataType: "json",
    contentType: 'application/json',
    success: function (e) {

      alertify.success('Saved waypoint with current pose and joint values');
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function requestJointValues() {
  var xhttp = new XMLHttpRequest();
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

      alertify.success('Successfully set joint values');
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

        alertify.success('Successfully set goal pose');
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
}

function getCurrentPoseValues() {
  var xhttp = new XMLHttpRequest();
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

function loadAllWaypoints() {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      if (obj.success === true) {
        createWaypointsTable(obj)
      }
    }
  }
  xhttp.open("GET", "/getAllWaypoints", true);
  xhttp.send();

}

function runSelectedWaypoint(id) {
  jQuery.ajax({
    url: '/runWaypoint',
    type: "POST",
    data: JSON.stringify(id),
    dataType: "json",
    contentType: 'application/json',
    success: function (e) {

      alertify.success('Running selected waypoint');
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function deleteSelectedWaypoint(id) {
  jQuery.ajax({
    url: '/deleteWaypoint',
    type: "POST",
    data: JSON.stringify(id),
    dataType: "json",
    contentType: 'application/json',
    success: function (e) {

      alertify.success('Deleted selected waypoint');
      loadAllWaypoints()
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function registerAccount() {

}

function createWaypointsTable(obj) {
  createTableHeader()
  obj.waypoints.forEach(waypoint => {
    appendWaypoints(waypoint)
  })

  var span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    document.getElementById('wayPointsModal').style.display = 'none'
  }
  document.getElementById('wayPointsModal').style.display = 'block'

}
function createTableHeader() {

  var headerNames = ['ID', 'Name', 'Joint1', 'Joint2', 'Joint3', 'Joint4', 'Joint5', 'Joint6', 'Joint7', 'w', 'x', 'y', 'z', 'Run', 'Delete']

  var wayPointsThead = document.createElement('thead')
  var wayPointsHeaderTrow = document.createElement('tr')
  var wayPointsTbody = document.createElement('tbody')

  var wayPointsTable = document.getElementById('wayPointsTable')
  wayPointsTable.innerHTML = ''

  headerNames.forEach(header => {
    var tableHead = document.createElement('th')
    tableHead.innerHTML = header
    wayPointsHeaderTrow.append(tableHead)
  })

  wayPointsThead.append(wayPointsHeaderTrow)
  wayPointsTable.append(wayPointsThead)
  wayPointsTable.append(wayPointsTbody)
  document.getElementById('waypointsDiv').append(wayPointsTable)

}

function appendWaypoints(obj) {

  var wayPointsTable = document.getElementById('wayPointsTable')
  var row = document.createElement('tr')
  var items = []

  var runWaypoint = document.createElement('button')
  var deleteWaypoint = document.createElement('button')

  runWaypoint.onclick = function () {
    runSelectedWaypoint(this.id)
  }

  deleteWaypoint.onclick = function () {
    deleteSelectedWaypoint(this.id)
  }

  runWaypoint.innerHTML = '<i class="fa fa-play-circle" aria-hidden="true"></i>'
  deleteWaypoint.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'

  for (i = 0; i < obj.length; i++) {
    var item = document.createElement('td')
    item.innerText = obj[i]
    items.push(item)
  }

  var itemA = document.createElement('td')
  var itemB = document.createElement('td')
  deleteWaypoint.id = obj[1]
  runWaypoint.id = obj[1]
  itemB.append(runWaypoint)
  itemA.append(deleteWaypoint)

  row.append(items[0], items[1], items[2], items[3], items[4],
    items[5], items[6], items[7], items[8], items[9], items[10],
    items[11], items[12], itemB, itemA)

  wayPointsTable.append(row)
}

function clearTable(table) {
  $(table).remove()
}

function grabUserDetails() {

  $('#registerMe').on('click', function (e) {
    username = $('#username').val()
    surname = $('#usersurname').val()
    email = $('#email').val()
    password = $('#userpassword').val()

    if (username != '' && surname != '' && email != '' && password != '') {
      user = new User(username, surname, email, password)
      registerUser(user)
    }
    else {

      alertify.success('Successfully fill in all fields');
    }

  })
}

function registerUser(user) {
  jQuery.ajax({
    url: '/register',
    type: "POST",
    data: JSON.stringify(user),
    dataType: "json",
    contentType: 'application/json',
    success: function (e) {
      document.getElementById('registration').reset()
      alertify.success('Successfully registered, please sign in');
    },
    error: function (error) {
      alertify.error('Email already present, please sign in');
    }
  });

}

function signout() {
  jQuery.ajax({
    url: '/signout',
    type: "POST",
    data: JSON.stringify(),
    dataType: "json",
    contentType: 'application/json',
    success: function (e) {
    },
    error: function (error) {
    }
  });
}

$(function () {

  var defaultselectbox = $('#cusSelectbox');
  var numOfOptions = $('#cusSelectbox').children('option').length;

  defaultselectbox.addClass('s-hidden');
  defaultselectbox.wrap('<div class="cusSelBlock"></div>');
  defaultselectbox.after('<div class="selectLabel"></div>');
  $('.selectLabel').text(defaultselectbox.children('option').eq(0).text());
  var cusList = $('<ul/>', { 'class': 'options' }).insertAfter($('.selectLabel'));

  for (var i = 0; i < numOfOptions; i++) {
    $('<li/>', {
      text: defaultselectbox.children('option').eq(i).text(),
      rel: defaultselectbox.children('option').eq(i).val()
    }).appendTo(cusList);
  }

  function openList() {
    for (var i = 0; i < numOfOptions; i++) {
      $('.options').children('li').eq(i).attr('tabindex', i).css(
        'transform', 'translateY(' + (i * 100 + 100) + '%)').css(
          'transition-delay', i * 30 + 'ms');
    }
  }

  function closeList() {
    for (var i = 0; i < numOfOptions; i++) {
      $('.options').children('li').eq(i).css(
        'transform', 'translateY(' + i * 0 + 'px)').css('transition-delay', i * 0 + 'ms');
    }
    $('.options').children('li').eq(1).css('transform', 'translateY(' + 2 + 'px)');
    $('.options').children('li').eq(2).css('transform', 'translateY(' + 4 + 'px)');
  }

  $('.selectLabel').click(function () {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      openList();
      focusItems();
    }
    else {
      closeList();
    }
  });

  $(".options li").on('keypress click', function (e) {
    e.preventDefault();
    $('.options li').siblings().removeClass();
    closeList();
    $('.selectLabel').removeClass('active');
    $('.selectLabel').text($(this).text());
    defaultselectbox.val($(this).text());
    $('.selected-item p span').text($('.selectLabel').text());
    setRobotType($('.selectLabel').text())
  });

});

function focusItems() {

  $('.options').on('focus', 'li', function () {
    $this = $(this);
    $this.addClass('active').siblings().removeClass();
  }).on('keydown', 'li', function (e) {
    $this = $(this);
    if (e.keyCode == 40) {
      $this.next().focus();
      return false;
    } else if (e.keyCode == 38) {
      $this.prev().focus();
      return false;
    }
  }).find('li').first().focus();

}

function setRobotType(robotName) {
  var robotName = robotName.toLowerCase()
  jQuery.ajax({
    url: '/setRobot',
    type: "POST",
    data: JSON.stringify(robotName),
    dataType: "json",
    contentType: 'application/json',
    success: function (e) {

      alertify.success('Successfully set robot type to ' + robotName);
    },
    error: function (error) {
      console.log(error);
    }
  });
}

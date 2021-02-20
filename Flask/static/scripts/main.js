
var ros;
var totalJoints = 7;
var headerCount = 17;
var currentGroup = "";
var jointsNames = [];
var jointsPosition = [];
var velocity = [];

alertify.set("notifier", "position", "top-center");
alertify.set("notifier", "delay", 3);

class Waypoint {
  constructor(jointsValues, wayPointName, groupName) {
    this.jointValues = jointsValues;
    this.wayPointName = wayPointName;
    this.groupName = groupName;
  }

  getName() {
    return this.wayPointName;
  }
  getJointValues() {
    return this.jointValues;
  }

  getGroupName() {
    return this.groupName;
  }
  setName(wayPointName) {
    this.wayPointName = wayPointName;
  }
  setJointValues(jointValues) {
    this.jointValues = jointValues;
  }
  setGroupName(groupName) {
    this.groupName = groupName;
  }
}

class User {
  constructor(firstname, surname, email, password) {
    this.firstname = firstname;
    this.surname = surname;
    this.password = password;
    this.email = email;
  }

  getFirstName() {
    return this.firstname;
  }
  getSurname() {
    return this.surname;
  }
  getPassword() {
    return this.password;
  }
  getEmail() {
    return this.email;
  }
}

class Poses {

  constructor(groupName, coordinates) {
    this.groupName = groupName;
    this.coordinates = coordinates;
  }

  getGroupName() {
    return this.groupName;
  }
  getCoordinates() {
    return this.coordinates
  }
}

function getGoalPoseValues() {
  coords = [];
  a = document.getElementById("aCoord").value;
  b = document.getElementById("bCoord").value;
  c = document.getElementById("cCoord").value;
  x = document.getElementById("xCoord").value;
  y = document.getElementById("yCoord").value;
  z = document.getElementById("zCoord").value;

  if (a != "" && b != "" && c != "" && x != "" && z != "" & z != "") {
    coords.push(a)
    coords.push(b)
    coords.push(c)
    coords.push(x);
    coords.push(y);
    coords.push(z);
    addPoseToHistory(coords)

  } else {
    alertify.error("Please complete all fields")
  }
}

function addPose() {
  document.getElementById("coordinates").style.display = "block"
}

function addWayPoint() {
  newwaypoint = document.getElementById("newwaypoint");
  document.getElementById("jointsDetails").open = true
  if (newwaypoint.value == "") {
    alertify.error("Please provide waypoint name")
  } else {

    var jointValues = grabJointValues();
    var waypointName = newwaypoint.value;
    var groupname = currentGroup;
    var waypoint = new Waypoint(
      jointValues,
      waypointName,
      groupname
    );
    console.log(jointValues)
    saveWaypoint(waypoint);
    document.getElementById("jointsDetails").open = false
  }
}

function addPoseToHistory(coordinates) {
  var posetoHistory = new Poses("", coordinates)
  jQuery.ajax({
    url: "/poses",
    type: "POST",
    data: JSON.stringify(posetoHistory),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      alertify.success("Added pose to poses history");
      document.getElementById("coordinates").style.display = "none"
    },
    error: function (error) {
      alertify.error(error);
    },
  });

}

function retrievePosesHistory() {
  jQuery.ajax({
    url: "/retrieveposes",
    type: "GET",
    data: JSON.stringify(),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      alertify.success("Retrieved all poses");
      console.log(e)
      createPosesTable(e)
    },
    error: function (error) {
      alertify.error(error);
    },
  });

}

function displayCurrentPose() {

  var pose = [x = 2, y = 3, z = 5, w = 3]

  document.getElementById("xpose").innerHTML = "x:" + pose[0];
  document.getElementById("ypose").innerHTML = "y:" + pose[1];
  document.getElementById("zpose").innerHTML = "z:" + pose[2];
  document.getElementById("wpose").innerHTML = "w:" + pose[3];
  document.getElementById("currentPosesDiv").style.visibility = "visible"
}

function saveWaypoint(waypoint) {
  jQuery.ajax({
    url: "/saveWaypoint",
    type: "POST",
    data: JSON.stringify(waypoint),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      alertify.success("Saved waypoint with current pose and joint values");
    },
    error: function (error) {
      alertify.error(error);
    },
  });
}

// function requestJointValues() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       var obj = JSON.parse(this.responseText);
//       if (obj.success === true) {
//         loadJointValues(obj.joints);
//       }
//     }
//   };
//   xhttp.open("GET", "/getJoints", true);
//   xhttp.send();
// }

// function setJointValues() {
//   var joints = getJointValues();
//   jQuery.ajax({
//     url: "/setJoints",
//     type: "POST",
//     data: JSON.stringify(joints),
//     dataType: "json",
//     contentType: "application/json",
//     success: function (e) {
//       alertify.success("Successfully set joint values");
//     },
//     error: function (error) {
//       alertify.error(error);
//     },
//   });
// }

function setGoalPoseValues() {
  var pose = getGoalPoseValues();
  if (pose.length != 0) {
    jQuery.ajax({
      url: "/setGoalPose",
      type: "POST",
      data: JSON.stringify(pose),
      dataType: "json",
      contentType: "application/json",
      success: function (e) {
        alertify.success("Successfully set goal pose");
      },
      error: function (error) {
        alertify.error(error);
      },
    });
  }
}

function getCurrentPoseValues() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      if (obj.success === true) {
        setCurrentPoseValues(obj.pose);
      }
    }
  };
  xhttp.open("GET", "/getCurrentPose", true);
  xhttp.send();
}

function loadAllWaypoints() {
  var groupName = currentGroup;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      if (obj.success === true) {
        createWaypointsTable(obj);
      }
    }
  };
  xhttp.open("GET", "/getAllWaypoints?group=" + groupName, true);
  xhttp.send();
}

function runSelectedWaypoint(id) {
  jQuery.ajax({
    url: "/runWaypoint",
    type: "POST",
    data: JSON.stringify(id),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      alertify.success("Running selected waypoint");
    },
    error: function (error) {
      alertify.error(error);
    },
  });
}


function cancelNewPose() {
  document.getElementById("coordinates").style.display = "none"
}

function deleteSelectedWaypoint(id) {
  jQuery.ajax({
    url: "/deleteWaypoint",
    type: "POST",
    data: JSON.stringify(id),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      alertify.success("Deleted selected waypoint");
      loadAllWaypoints();
    },
    error: function (error) {
      alertify.error(error);
    },
  });
}

function createWaypointsTable(obj) {
  var headerNames = [
    "ID",
    "Name",
    "GroupName",
    "Joint1",
    "Joint2",
    "Joint3",
    "Joint4",
    "Joint5",
    "Joint6",
    "Joint7",
    "Run",
    "Delete",
  ];
  var selectedtable = document.getElementById("wayPointsTable")
  var selectedDiv = document.getElementById("waypointsDiv")
  createTableHeader(selectedtable, headerNames, selectedDiv);
  obj.waypoints.forEach((waypoint) => {
    appendWaypoints(waypoint);
  });

  var span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    document.getElementById("wayPointsModal").style.display = "none";
  };
  document.getElementById("wayPointsModal").style.display = "block";
}
function createTableHeader(selectedtable, headerNames, selectedTableDiv) {
  var tablehead = document.createElement("thead");
  var headertrow = document.createElement("tr");
  var tablebody = document.createElement("tbody");

  selectedtable.innerHTML = "";

  headerNames.forEach((header) => {
    var tableHead = document.createElement("th");
    tableHead.innerHTML = header;
    headertrow.append(tableHead);
  });

  tablehead.append(headertrow);
  selectedtable.append(tablehead);
  selectedtable.append(tablebody);
  selectedTableDiv.append(selectedtable);
}

function appendWaypoints(obj) {
  var wayPointsTable = document.getElementById("wayPointsTable");
  var row = document.createElement("tr");
  var items = [];

  var runWaypoint = document.createElement("button");
  var deleteWaypoint = document.createElement("button");

  runWaypoint.onclick = function () {
    runSelectedWaypoint(this.id);
  };

  deleteWaypoint.onclick = function () {
    deleteSelectedWaypoint(this.id);
  };

  runWaypoint.innerHTML =
    '<i class="fa fa-play-circle" aria-hidden="true"></i>';
  deleteWaypoint.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

  for (i = 0; i < obj.length; i++) {
    var item = document.createElement("td");
    item.innerText = obj[i];
    items.push(item);
  }

  var itemA = document.createElement("td");
  var itemB = document.createElement("td");
  deleteWaypoint.id = obj[1];
  runWaypoint.id = obj[1];
  itemB.append(runWaypoint);
  itemA.append(deleteWaypoint);

  row.append(
    items[0],
    items[1],
    items[2],
    items[3],
    items[4],
    items[5],
    items[6],
    items[7],
    items[8],
    items[9],
    itemB,
    itemA
  );

  wayPointsTable.append(row);
}

function createPosesTable(obj) {

  var headerNames = [
    "ID",
    "GroupName",
    "A",
    "B",
    "C",
    "X",
    "Y",
    "Z",
    "Run",
    "Delete",
  ];

  var selectedtable = document.getElementById("posesTable")
  var selectedDiv = document.getElementById("posesDiv")
  createTableHeader(selectedtable, headerNames, selectedDiv);
  obj.poses.forEach((pose) => {
    appendPose(pose);
  });

  var span = document.getElementsByClassName("close")[1];
  span.onclick = function () {
    document.getElementById("posesModal").style.display = "none";
  };
  document.getElementById("posesModal").style.display = "block";

}

function appendPose(obj) {
  var posesTable = document.getElementById("posesTable");
  var row = document.createElement("tr");
  var items = [];

  var runPose = document.createElement("button");
  var deletePose = document.createElement("button");

  runPose.onclick = function () {
    retrievePose(this.id)
  };

  deletePose.onclick = function () {
    deleteSelectedPose(this.id)
  };

  runPose.innerHTML =
    '<i class="fa fa-play-circle" aria-hidden="true"></i>';
  deletePose.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

  for (i = 0; i < obj.length; i++) {
    var item = document.createElement("td");
    item.innerText = obj[i];
    items.push(item);
  }

  var itemA = document.createElement("td");
  var itemB = document.createElement("td");
  deletePose.id = obj[0];
  runPose.id = obj[0];
  itemB.append(runPose);
  itemA.append(deletePose);

  row.append(
    items[0],
    items[1],
    items[2],
    items[3],
    items[4],
    items[5],
    items[6],
    items[7],
    itemB,
    itemA
  );

  posesTable.append(row);
}


function deleteSelectedPose(id) {

  jQuery.ajax({
    url: "/deletepose",
    type: "POST",
    data: JSON.stringify(id),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      alertify.success("Deleted selected pose");
      retrievePosesHistory()
    },
    error: function (error) {
      alertify.error(error);
    },
  });
}

function retrievePose(id) {
  jQuery.ajax({
    url: "/retrievepose",
    type: "POST",
    data: JSON.stringify(id),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      alertify.success("retrieved selected pose");

    },
    error: function (error) {
      alertify.error(error);
    },
  });
}

function clearTable(table) {
  $(table).remove();
}

function setRobotType(robotName) {
  var robotName = robotName.toLowerCase();
  jQuery.ajax({
    url: "/setRobot",
    type: "POST",
    data: JSON.stringify(robotName),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      alertify.success("Successfully set robot type to " + robotName);
    },
    error: function (error) {
      alertify.error(error);
    },
  });
}

function getRobotType() {
  jQuery.ajax({
    url: "/getRobot",
    type: "GET",
    data: JSON.stringify(),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      document.getElementById("currentGroup").innerHTML =
        "Current: " + e.groupname;
      currentGroup = e.groupname;
    },
    error: function (error) {
      alertify.error(error);
    },
  });
}

function grabJointValues() {
  var jointsValues = [];

  for (i = 0; i < totalJoints; i++) {
    jointsValues.push(document.getElementById("joint" + i).value);
  }
  var jointsInRadians = convertDegreestoRadians(jointsValues)
  return jointsInRadians;
}

function loadJointValues(joints) {

  joints = [0.785398163, 0.8726646259971648, 0.8726646259971648, 2.0943951023931953, 0.3490658503988659, 3.141592653589793, 1.0471975511965976]
  var jointsValues = convertRadiansToDegrees(joints)
  for (i = 0; i < jointsValues.length; i++) {
    document.getElementById("joint" + i).value = jointsValues[i];
    document.getElementById("joint" + i + "Span").innerHTML = jointsValues[i];
  }
}

function convertRadiansToDegrees(jointsPositionRadians) {
  var degrees = []
  var pi = Math.PI;

  for (i = 0; i < jointsPositionRadians.length; i++) {
    degrees.push(Math.round(jointsPositionRadians[i] * (180 / pi)))
  }
  return degrees
}

function convertDegreestoRadians(jointsPositionDegrees) {
  var radians = []
  var pi = Math.PI;

  for (i = 0; i < jointsPositionDegrees.length; i++) {
    radians.push(jointsPositionDegrees[i] * (pi / 180))
  }
  return radians
}

function initROS() {
  ros = new ROSLIB.Ros({
    url: "ws://localhost:9090",
  });
  displayConnectionMessage();
}

function displayConnectionMessage() {
  message = "";
  var info = document.getElementById("info");
  var p = document.createElement("p");

  ros.on("connection", function () {
    document.getElementById("connectionStatus").innerHTML = "Connected";
    message = "Connected to Ros";
  });

  ros.on("error", function (error) {
    document.getElementById("connectionStatus").innerHTML = "Closed";
    message = "Error connecting to Ros";
  });

  ros.on("close", function () {
    document.getElementById("connectionStatus").innerHTML = "Closed";
    message = "Connection to Ros closed";
  });
}


function getCurrentPose() {
  var poseTopic = new ROSLIB.Topic({
    ros: ros,
    name: '/robot_pose',
    messageType: 'geometry_msgs/Pose'
  });

  poseTopic.subscribe(function (message) {
    console.log(message)
  })
}

function getJointsState() {
  var joints_listener = new ROSLIB.Topic({
    ros: ros,
    name: "/joint_states",
    messageType: "sensor_msgs/JointState",
  });

  joints_listener.subscribe(function (message) {
    console.log(
      "Received message on " +
      joints_listener.name +
      ": " +
      message.name +
      ":" +
      message.position +
      ":"
    );
    jointsNames = message.name;
    jointsPosition = message.position;
    velocity = message.velocity;
    loadJointValues(jointsPosition)

    joints_listener.unsubscribe();
  });
}

function getGoalPositionOfJoints() {
  var goal_state = new ROSLIB.Topic({
    ros: ros,
    name: "/goal_joint_states",
    messageType: "sensor_msgs/JointState",
  });
  goal_state.subscribe(function (message) {
    console.log("Received message on " + goal_state.name + ": " + message.data);
    goal_state.unsubscribe();
  });
}

function getStartingPositionOfJoints() {
  var start_position = new ROSLIB.Topic({
    ros: ros,
    name: "/start_joint_states",
    messageType: "sensor_msgs/JointState",
  });

  start_position.subscribe(function (message) {
    console.log(
      "Received message on " + start_position.name + ": " + message.data
    );
    start_position.unsubscribe();
  });
}

function getMoveGroupStatus() {
  var group_status = new ROSLIB.Topic({
    ros: ros,
    name: "/move_group/status",
    messageType: "actionlib_msgs/GoalStatusArray",
  });
  group_status.subscribe(function (message) {
    console.log("status running");
  });
  group_status.unsubscribe();
}

function getMoveGroupGoal() {
  var group_goal = new ROSLIB.Topic({
    ros: ros,
    name: "/move_group/goal",
    messageType: "moveit_msgs/MoveGroupActionGoal",
  });
  group_goal.subscribe(function (message) {
    console.log("goal running");
  });
  group_goal.unsubscribe();
}

function getMoveGroupResult() {
  var group_result = new ROSLIB.Topic({
    ros: ros,
    name: "/move_group/result",
    messageType: "moveit_msgs/MoveGroupActionResult",
  });
  group_result.subscribe(function (message) {
    console.log("result running");
  });
  group_result.unsubscribe();
}

function runPose() {
  convertToQuaternion()
}

function convertToQuaternion() {
  console.log("converting to quartenion")
}

function grabUserDetails() {
  $("#registerMe").on("click", function (e) {
    username = $("#username").val();
    surname = $("#usersurname").val();
    email = $("#email").val();
    password = $("#userpassword").val();

    if (username != "" && surname != "" && email != "" && password != "") {
      user = new User(username, surname, email, password);
      registerUser(user);
    } else {
      alertify.error("Please fill in all fields");
    }
  });
}

function registerUser(user) {
  jQuery.ajax({
    url: "/register",
    type: "POST",
    data: JSON.stringify(user),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      document.getElementById("registration").reset();
      alertify.success("Successfully registered, please sign in");
    },
    error: function (error) {
      alertify.error("Email already present, please sign in");
    },
  });
}

function signout() {
  jQuery.ajax({
    url: "/signout",
    type: "POST",
    data: JSON.stringify(),
    dataType: "json",
    contentType: "application/json",
    success: function (e) { },
    error: function (error) { },
  });
}

$(function () {
  var defaultselectbox = $("#cusSelectbox");
  var numOfOptions = $("#cusSelectbox").children("option").length;

  defaultselectbox.addClass("s-hidden");
  defaultselectbox.wrap('<div class="cusSelBlock"></div>');
  defaultselectbox.after('<div class="selectLabel"></div>');
  $(".selectLabel").text(defaultselectbox.children("option").eq(0).text());
  var cusList = $("<ul/>", { class: "options" }).insertAfter($(".selectLabel"));

  for (var i = 0; i < numOfOptions; i++) {
    $("<li/>", {
      text: defaultselectbox.children("option").eq(i).text(),
      rel: defaultselectbox.children("option").eq(i).val(),
    }).appendTo(cusList);
  }

  function openList() {
    for (var i = 0; i < numOfOptions; i++) {
      $(".options")
        .children("li")
        .eq(i)
        .attr("tabindex", i)
        .css("transform", "translateY(" + (i * 100 + 100) + "%)")
        .css("transition-delay", i * 30 + "ms");
    }
  }

  function closeList() {
    for (var i = 0; i < numOfOptions; i++) {
      $(".options")
        .children("li")
        .eq(i)
        .css("transform", "translateY(" + i * 0 + "px)")
        .css("transition-delay", i * 0 + "ms");
    }
    $(".options")
      .children("li")
      .eq(1)
      .css("transform", "translateY(" + 2 + "px)");
    $(".options")
      .children("li")
      .eq(2)
      .css("transform", "translateY(" + 4 + "px)");
  }

  $(".selectLabel").click(function () {
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      openList();
      focusItems();
    } else {
      closeList();
    }
  });

  $(".options li").on("keypress click", function (e) {
    e.preventDefault();
    $(".options li").siblings().removeClass();
    closeList();
    $(".selectLabel").removeClass("active");
    $(".selectLabel").text($(this).text());
    defaultselectbox.val($(this).text());
    $(".selected-item p span").text($(".selectLabel").text());
    setRobotType($(".selectLabel").text());
    $("#currentGroup").text("Current: " + $(this).text());
    currentGroup = $(this).text();
  });
});

function focusItems() {
  $(".options")
    .on("focus", "li", function () {
      $this = $(this);
      $this.addClass("active").siblings().removeClass();
    })
    .on("keydown", "li", function (e) {
      $this = $(this);
      if (e.keyCode == 40) {
        $this.next().focus();
        return false;
      } else if (e.keyCode == 38) {
        $this.prev().focus();
        return false;
      }
    })
    .find("li")
    .first()
    .focus();
}

var rangeSlider = function () {
  var slider = $(".range-slider"),
    range = $('.range-slider input[type="range"]'),
    value = $(".range-value");
  slider.each(function () {
    value.each(function () {
      var value = $(this).prev().attr("value");
      $(this).html(value);
    });
    range.on("input", function () {
      $(this).next(value).html(this.value);
    });
  });
};

window.addEventListener("load", (event) => {
  initROS();
  getJointsState();
  getGoalPositionOfJoints();
  getStartingPositionOfJoints();
  getMoveGroupResult();
  getMoveGroupGoal();
  getMoveGroupStatus();
  displayCurrentPose()
});

$(document).ready(function () {
  rangeSlider();
  grabUserDetails();
  getRobotType();
  loadJointValues()
});
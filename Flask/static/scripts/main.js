var ros;
var defaultJointsNum = 7;
var numJointsLength = 7;
var minJoints = 1;
var maxJoints = 10;
var selectedRobotJointsLength;
var currentGroup = "";
var joints_listener;
var pi = Math.PI;
var isAddedPose = false;
var allCheckboxes;
var currentPose;

alertify.set("notifier", "position", "top-center");
alertify.set("notifier", "delay", 3);

window.addEventListener("load", (event) => {
  initROS();
  getJointsState();
  subcribToRvizImages();
  getCurrentPose();
  getPoseFeedback();
});

$(document).ready(function () {
  rangeSlider();
  grabUserDetails();
  retrieveRobots("robotSelection");
  retrieveRobotJoints();
});

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
    return this.coordinates;
  }
}

class Joint {
  constructor(jointName, min, max) {
    this.jointName = jointName;
    this.min = min;
    this.max = max;
  }

  getJointName() {
    return this.jointName;
  }
  getMin() {
    return this.min;
  }
  getMax() {
    return this.max;
  }
}

class Robot {
  constructor(name) {
    this.name = name;
    this.joints = [];
  }
  getName() {
    return this.name;
  }
  setJoint(joint) {
    this.joints.push(joint);
  }
}

function openCamera() {
  document.getElementById("videofeed").style.display = "block";
  document.getElementById("urdf").style.display = "none";
}

function displayRvizFeed() {
  document.getElementById("videofeed").style.display = "none";
  document.getElementById("urdf").style.display = "block";
}

function grabPoseInputValues() {
  coords = [];

  for (i = 0; i < 6; i++) {
    coords.push(document.getElementsByClassName("inputPose")[i].value);
  }
  return coords;
}

function addPoseInput() {
  document.getElementById("poseInput").style.display = "block";
  document.getElementsByClassName("poseRange")[0].style.display = "none";
}

function addPoseRange() {
  document.getElementById("poseInput").style.display = "none";
  document.getElementsByClassName("poseRange")[0].style.display = "block";
}

function addPoseToHistory(coordinates) {
  var posetoHistory = new Poses("", coordinates);
  jQuery.ajax({
    url: "/poses",
    type: "POST",
    data: JSON.stringify(posetoHistory),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {},
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
      var headerNames = [
        "A",
        "B",
        "C",
        "X",
        "Y",
        "Z",
        "Plan",
        "Execute",
        "Delete",
        "Save",
      ];
      isAddedPose = true;
      createPosesTable(e, headerNames);
    },
    error: function (error) {
      alertify.error(error);
    },
  });
}

function savePose(obj) {
  jQuery.ajax({
    url: "/savepose",
    type: "POST",
    data: JSON.stringify(obj),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      alertify.success("Saved pose");
      document.getElementById("savePoseModal").style.display = "none";
    },
    error: function (error) {
      alertify.error("A pose with this name exists already");
    },
  });
}

function displayCurrentPose() {
  createCurrentPoseTable(currentPose);
}

function openSavePoseModal(objID) {
  hidePosesDiv();
  var savePoseModal = document.getElementById("savePoseModal");
  savePoseModal.style.display = "block";

  document.getElementById("poseName").setAttribute("any", objID);

  document
    .getElementById("poseForm")
    .addEventListener("submit", function (event) {
      var obj = [];
      obj.push(document.getElementById("poseName").getAttribute("any"));
      obj.push(document.getElementById("poseName").value);

      savePose(obj);
      event.preventDefault();
    });

  document.getElementById("poseClose").onclick = function () {
    savePoseModal.style.display = "none";
  };

  document
    .getElementById("btncloseModal")
    .addEventListener("click", function (event) {
      document.getElementById("savePoseModal").style.display = "none";
      event.preventDefault();
    });
}

function getSelectedPoses(id) {
  settings = {
    url: "/retrieveselectedposes",
    type: "POST",
    data: JSON.stringify(id),
    dataType: "json",
    contentType: "application/json",
  };

  return $.ajax(settings);
}

function executeSelectedPoses() {
  var pickedPoses = check();
  var request;
  hideSavedPosesDiv();
  request = getSelectedPoses(pickedPoses);
  $.when(request).done(function (data) {
    for (i = 0; i < data.selectedPoses.length; i++) {
      poses = data.selectedPoses[i].slice(2, 8);
      isAddedPose = true;
      executePose(poses);
    }
  });
}

function planSelectedPoses() {
  var pickedPoses = check();
  var request;
  hideSavedPosesDiv();
  request = getSelectedPoses(pickedPoses);

  $.when(request).done(function (data) {
    for (i = 0; i < data.selectedPoses.length; i++) {
      poses = data.selectedPoses[i].slice(2, 8);
      isAddedPose = true;
      planPose(poses);
    }
  });
}

function addSelectionListener() {
  allCheckboxes = document.querySelectorAll("input[type='checkbox'][id]");
  [...allCheckboxes].forEach((s) =>
    s.addEventListener("change", function (e) {
      e.currentTarget.timeval = new Date().getTime();
    })
  );
}

function check() {
  var output = [...allCheckboxes]
    .filter((s) => s.checked) // filter out non-checked
    .sort((a, b) => a.timeval - b.timeval) //sort by timeval
    .map((s) => s.getAttribute("id"));
  // .join(","); //fetch only data-name for display

  return output;
}

function openAddGroup() {
  document.getElementById("addGroupModal").style.display = "block";
  createNewGroupFields();
}

function openDeleteGroup() {
  document.getElementById("deleteGroupModal").style.display = "block";
  document.getElementById("delRobotSelection").innerHTML = "";
  document.getElementById("deleteClose").onclick = function () {
    retrieveRobots("robotSelection");
    document.getElementById("deleteGroupModal").style.display = "none";
  };
  retrieveRobots("delRobotSelection");
}

function createNewGroupFields() {
  var addDiv = document.getElementById("addGroupDiv");
  var addSpan = document.createElement("span");
  addSpan.className = "close";
  addSpan.innerHTML = "&times;";

  addSpan.onclick = function () {
    document.getElementById("addGroupModal").style.display = "none";
  };
  addDiv.innerHTML = "";

  addDiv.appendChild(addSpan);

  var new_robot_button = document.createElement("button");
  var num_joints_button = document.createElement("button");
  var num_joints_input = document.createElement("input");
  var submitButton = document.createElement("button");
  var new_robot_div = document.createElement("div");
  var num_joints_div = document.createElement("div");
  new_robot_div.className = "multi-button";
  num_joints_div.className = "multi-button";

  new_robot_button.innerHTML =
    '<i class="fa fa-plus" aria-hidden="true"></i> New Robot';

  num_joints_button.innerHTML = "Number of Joints";
  submitButton.innerHTML = "Confirm";
  submitButton.style.backgroundColor = "#4CAF50";

  submitButton.onclick = function (e) {
    numJointsLength = document.getElementById("num_joints_id").value;
    createNewGroupFields();
    e.preventDefault();
  };

  num_joints_input.setAttribute("type", "number");
  num_joints_input.value = numJointsLength;
  num_joints_input.id = "num_joints_id";
  num_joints_input.min = minJoints;
  num_joints_input.max = maxJoints;

  new_robot_div.appendChild(new_robot_button);
  num_joints_div.appendChild(num_joints_button);
  num_joints_div.appendChild(num_joints_input);
  num_joints_div.appendChild(submitButton);

  addDiv.appendChild(new_robot_div);
  addDiv.appendChild(num_joints_div);
  var form = document.createElement("FORM");
  var robot_name_div = document.createElement("div");
  var robot_name = document.createElement("button");
  var robot_name_input = document.createElement("input");

  robot_name_div.className = "multi-button";
  robot_name.innerHTML = "Robot Name";
  robot_name_input.setAttribute("type", "text");
  robot_name_input.required = true;
  robot_name_input.className = "newRobotDetails";

  robot_name_div.appendChild(robot_name);
  robot_name_div.appendChild(robot_name_input);

  form.onsubmit = function (e) {
    addNewGroupName();
    e.preventDefault();
  };
  form.appendChild(robot_name_div);

  for (i = 0; i < numJointsLength; i++) {
    var joint_div = document.createElement("div");
    var joint_button = document.createElement("button");
    var min_button = document.createElement("button");
    var max_button = document.createElement("button");
    var min_input = document.createElement("input");
    var max_input = document.createElement("input");
    var index = i + 1;
    joint_div.className = "multi-button";
    joint_button.innerHTML = "Joint " + index;
    min_button.innerHTML = "min°";
    min_input.setAttribute("type", "number");

    min_input.required = true;
    min_input.name = "joint" + index + "min";
    min_input.id = "joint" + index + "min";

    max_button.innerHTML = "max°";
    max_input.setAttribute("type", "number");
    max_input.required = true;
    max_input.name = "joint" + index + "max";
    max_input.id = "joint" + index + "max";

    joint_div.appendChild(joint_button);
    joint_div.appendChild(min_button);
    joint_div.appendChild(min_input);
    joint_div.appendChild(max_button);
    joint_div.appendChild(max_input);

    form.appendChild(joint_div);
  }

  var button_add = document.createElement("button");
  button_add.innerHTML = "Add";
  button_add.type = "submit";
  button_add.style.backgroundColor = "#4CAF50";

  var button_cancel = document.createElement("button");
  button_cancel.innerHTML = "Cancel";
  button_cancel.style.backgroundColor = "#e31566";
  button_cancel.onclick = function (e) {
    e.preventDefault();
    closeAppGroupName();
    return false;
  };

  var add_cancel_div = document.createElement("div");

  add_cancel_div.className = "multi-button";
  add_cancel_div.appendChild(button_add);
  add_cancel_div.appendChild(button_cancel);

  form.appendChild(add_cancel_div);
  addDiv.appendChild(form);
}

function closeAppGroupName() {
  document.getElementById("addGroupModal").style.display = "none";
}

function addGroupToDB(robot) {
  jQuery.ajax({
    url: "/addRobot",
    type: "POST",
    data: JSON.stringify(robot),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      alertify.success("Successfully added robot " + e.robotname);
      robotSelect = document.getElementById("robotSelection");
      var option = document.createElement("option");
      option.text = e.robotname;
      robotSelect.add(option);
    },
    error: function (error) {
      alertify.error("Robot name already taken");
    },
  });
}

function retrieveRobots(selectName) {
  jQuery.ajax({
    url: "/getRobots",
    type: "GET",
    data: JSON.stringify(),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      var robotSelect = document.getElementById(selectName);
      robotSelect.innerHTML = "";
      populateSelectOption(e.robots, robotSelect, e.current);
    },
    error: function (error) {
      alertify.error(error);
    },
  });
}

function setRobot(robotName) {
  jQuery.ajax({
    url: "/setRobot",
    type: "POST",
    data: JSON.stringify(robotName),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      retrieveRobotJoints();
      setGroupName(robotName);
    },
    error: function (error) {
      alertify.error(error);
    },
  });
}

function deleteRobot() {
  var robotName = $("#delRobotSelection option:selected").html();
  var currentSelect = document.getElementById("robotSelection").value;
  if (currentSelect == robotName) {
    alertify.error("You cannot delete selected group");
  } else {
    jQuery.ajax({
      url: "/deleteRobot",
      type: "POST",
      data: JSON.stringify(robotName),
      dataType: "json",
      contentType: "application/json",
      success: function (e) {
        alertify.success("Successfully deleted robot");
        openDeleteGroup();
      },
      error: function (error) {
        alertify.error(error);
      },
    });
  }
}

function retrieveRobotJoints() {
  jQuery.ajax({
    url: "/getRobotJoints",
    type: "GET",
    data: JSON.stringify(),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      createJointRanges(e.joints);
      document.getElementById("robotSelection").value = e.joints[0][1];
    },
    error: function (error) {
      alertify.error(error);
    },
  });
}

function retrieveSavedPoses() {
  jQuery.ajax({
    url: "/getSavedPoses",
    type: "GET",
    data: JSON.stringify(),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      var headerNames = ["Name", "A", "B", "C", "X", "Y", "Z", "Select"];
      createSavedPosesTable(e, headerNames);
    },
    error: function (error) {
      alertify.error(error);
    },
  });
}

function populateRangeSlider(sel) {
  var robotName = sel.options[sel.selectedIndex].text;
  setRobot(robotName);
}

function populateSelectOption(obj, robotSelect, current) {
  for (i = 0; i < obj.length; i++) {
    var option = document.createElement("option");
    option.text = obj[i][1];
    robotSelect.add(option);
  }
  robotSelect.value = current;
}

function addNewGroupName() {
  var name = document.getElementsByClassName("newRobotDetails")[0].value;
  var robot = new Robot(name);
  var validInputs = true;

  for (i = 0; i < numJointsLength; i++) {
    var index = i + 1;
    var jointName = "Joint " + index;
    var min = parseInt(document.getElementById("joint" + index + "min").value);
    var max = parseInt(document.getElementById("joint" + index + "max").value);
    if (min > max) {
      alertify.error("Please provide correct inputs on joints " + jointName);
      validInputs = false;
    }
    var joint = new Joint(jointName, min, max);
    robot.setJoint(joint);
  }
  if (validInputs == true) {
    addGroupToDB(robot);
  }
}

function createJointRanges(obj) {
  var jointsDiv = document.getElementsByClassName("joints")[0];
  jointsDiv.innerHTML = "";
  for (i = 0; i < obj.length; i++) {
    var sliderDiv = document.createElement("div");
    var sliderLabel = document.createElement("label");
    var sliderSpan = document.createElement("span");
    var min_max = document.createElement("input");

    sliderDiv.className = "range-slider";

    min_max.setAttribute("type", "range");
    min_max.value = 5;
    min_max.min = parseInt(obj[i][3]);
    min_max.max = parseInt(obj[i][4]);
    min_max.step = 5;
    min_max.onchange = function () {
      var joints = grabJointValues();
      setJointState(joints);
    };
    min_max.className = "jointsValues";

    sliderLabel.innerHTML = obj[i][2];
    sliderSpan.className = "range-value";
    sliderSpan.id = "joint" + i;

    sliderDiv.append(sliderLabel);
    sliderDiv.append(min_max);
    sliderDiv.append(sliderSpan);

    jointsDiv.append(sliderDiv);
  }
  selectedRobotJointsLength = obj.length;
  rangeSlider();
}

function createCurrentPoseTable(pose) {
  console.log(pose);
  if (pose.length > 0) {
    var headerNames = ["A°", "B°", "C°", "X (m) ", "Y (m)", "Z (m)"];
    var selectedtable = document.getElementById("currentPoseTable");
    selectedtable.innerHTML = "";
    var selectedDiv = document.getElementById("currentPoseDiv");
    document.getElementById("currentPoseModal").style.display = "block";
    createTableHeader(selectedtable, headerNames, selectedDiv);
    appendCurrentPose(pose);
  } else {
    alertify.error("Couldn't retrieve current pose");
  }
}

function appendCurrentPose(obj) {
  var pendingTable = document.getElementById("currentPoseTable");
  var row = document.createElement("tr");
  var items = [];
  for (i = 0; i < obj.length; i++) {
    var item = document.createElement("td");
    // item.innerText = obj[i];
    item.innerText = obj[i].toFixed(2);
    items.push(item);
  }
  row.append(items[0], items[1], items[2], items[3], items[4], items[5]);
  pendingTable.append(row);
}

function createPendingAccounTables(obj) {
  if (obj != null) {
    var headerNames = ["ID", "Name", "Surname", "Email", "Approve", "Deny"];
    var selectedtable = document.getElementById("pendingTable");
    var selectedDiv = document.getElementById("pendingDiv");
    selectedtable.innerHTML = "";
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
      document.getElementById("pendingModal").style.display = "none";
    };
    document.getElementById("pendingModal").style.display = "block";

    createTableHeader(selectedtable, headerNames, selectedDiv);
    obj.pendingapprovals.forEach((account) => {
      appendAccount(account);
    });
  } else {
    alertify.error("No pending account was found");
  }
}

function appendAccount(obj) {
  var pendingTable = document.getElementById("pendingTable");
  var row = document.createElement("tr");
  var items = [];
  var approve = document.createElement("button");
  var deny = document.createElement("button");

  approve.className = "btnActions";
  deny.className = "btnActions";
  approve.style.backgroundColor = "#4CAF50";
  deny.style.backgroundColor = "#e31566";

  approve.style.color = "white";
  deny.style.color = "white";

  approve.onclick = function () {
    approveAccount(this.id);
  };

  deny.onclick = function () {
    denyAccount(this.id);
  };

  approve.innerHTML = "Approve";
  deny.innerHTML = "Deny";

  for (i = 0; i < obj.length; i++) {
    var item = document.createElement("td");
    item.innerText = obj[i];
    items.push(item);
  }
  var itemA = document.createElement("td");
  var itemB = document.createElement("td");
  approve.id = obj[0];
  deny.id = obj[0];
  itemA.append(approve);
  itemB.append(deny);
  row.append(items[0], items[1], items[2], items[3], itemA, itemB);
  pendingTable.append(row);
}

function cancelNewPose() {
  document.getElementById("poseInput").style.display = "none";
  document.getElementsByClassName("poseRange")[0].style.display = "none";
}

function createTableHeader(selectedtable, headerNames) {
  var tablehead = document.createElement("thead");
  var headertrow = document.createElement("tr");
  var tablebody = document.createElement("tbody");

  headerNames.forEach((header) => {
    var tableHead = document.createElement("th");
    tableHead.innerHTML = header;
    headertrow.append(tableHead);
  });

  tablehead.append(headertrow);
  selectedtable.append(tablehead);
  selectedtable.append(tablebody);
}

function hideCurrentPoseDiv() {
  document.getElementById("currentPoseModal").style.display = "none";
}

function hidePosesDiv() {
  document.getElementById("posesModal").style.display = "none";
}

function hideSavedPosesDiv() {
  document.getElementById("savedPosesModal").style.display = "none";
}

function createSavedPosesTable(obj, headerNames) {
  if (obj != null) {
    var selectedtable = document.getElementById("savedPosesTable");
    var selectedDiv = document.getElementById("savedPosesModal");
    selectedtable.innerHTML = "";
    selectedDiv.style.display = "block";

    createTableHeader(selectedtable, headerNames);
    obj.poses.forEach((pose) => {
      appendSavedPose(pose);
    });

    addSelectionListener();
  } else {
    alertify.error("No pose found");
  }
}

function appendSavedPose(obj) {
  var savedPosesTable = document.getElementById("savedPosesTable");
  var row = document.createElement("tr");
  var items = [];

  for (i = 1; i < obj.length; i++) {
    var item = document.createElement("td");
    item.innerText = obj[i];
    items.push(item);
  }

  var checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");

  checkBox.id = obj[0];

  var itemCheckBox = document.createElement("td");

  itemCheckBox.append(checkBox);

  row.append(
    items[0],
    items[1],
    items[2],
    items[3],
    items[4],
    items[5],
    items[6],
    itemCheckBox
  );

  savedPosesTable.append(row);
}

function createPosesTable(obj, headerNames) {
  var selectedtable = document.getElementById("posesTable");
  var selectedDiv = document.getElementById("posesModal");
  posesTable.innerHTML = "";
  selectedDiv.style.display = "block";

  createTableHeader(selectedtable, headerNames, selectedDiv);
  obj.poses.forEach((pose) => {
    appendPose(pose);
  });
}

function appendPose(obj) {
  var posesTable = document.getElementById("posesTable");
  var row = document.createElement("tr");
  var items = [];

  var plan = document.createElement("button");
  var execute = document.createElement("button");
  var deletePose = document.createElement("button");
  var save = document.createElement("button");

  plan.className = "btnActions";
  execute.className = "btnActions";
  deletePose.className = "btnActions";
  save.className = "btnActions";

  plan.onclick = function () {
    retrievePose(this.id, "plan");
    hidePosesDiv();
  };

  execute.onclick = function () {
    retrievePose(this.id, "execute");
    hidePosesDiv();
  };

  deletePose.onclick = function () {
    deleteSelectedPose(this.id);
  };
  deletePose.style.backgroundColor = "#e31566";
  deletePose.style.color = "white";

  save.onclick = function () {
    openSavePoseModal(this.id);
  };

  save.style.backgroundColor = "#4CAF50";
  save.style.color = "white";

  plan.innerHTML = "Plan";
  execute.innerHTML = "Execute";
  deletePose.innerHTML = "Delete";
  save.innerHTML = "Save";

  for (i = 1; i < obj.length; i++) {
    var item = document.createElement("td");
    item.innerText = obj[i];
    items.push(item);
  }

  var itemA = document.createElement("td");
  var itemB = document.createElement("td");
  var itemC = document.createElement("td");
  var itemD = document.createElement("td");

  deletePose.id = obj[0];
  plan.id = obj[0];
  execute.id = obj[0];
  save.id = obj[0];

  itemD.append(save);
  itemC.append(execute);
  itemB.append(plan);
  itemA.append(deletePose);

  row.append(
    items[0],
    items[1],
    items[2],
    items[3],
    items[4],
    items[5],
    itemB,
    itemC,
    itemA,
    itemD
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
      retrievePosesHistory();
    },
    error: function (error) {
      alertify.error(error);
    },
  });
}

function deleteSelectedPoses(obj) {
  var pickedPoses = check();
  jQuery.ajax({
    url: "/deleteselectedpose",
    type: "POST",
    data: JSON.stringify(pickedPoses),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      alertify.success("Deleted selected poses");
      retrieveSavedPoses();
    },
    error: function (error) {
      alertify.error(error);
    },
  });
}

function retrievePose(id, action) {
  var poseValues = [];
  jQuery.ajax({
    url: "/retrievepose",
    type: "POST",
    data: JSON.stringify(id),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      isAddedPose = true;
      for (i = 2; i < e.pose.length - 1; i++) {
        poseValues.push(e.pose[i]);
      }

      action == "plan" ? planPose(poseValues) : executePose(poseValues);
    },
    error: function (error) {
      alertify.error(error);
    },
  });
}

function clearTable(table) {
  $(table).remove();
}

function grabJointValues() {
  var jointsValues = [];

  for (i = 0; i < selectedRobotJointsLength; i++) {
    jointsValues.push(document.getElementsByClassName("jointsValues")[i].value);
  }
  var jointsInRadians = convertDegreestoRadians(jointsValues);
  return jointsInRadians;
}

function loadJointValues(joints) {
  var jointsValues = convertRadiansToDegrees(joints);
  for (i = 0; i < jointsValues.length; i++) {
    document.getElementsByClassName("jointsValues")[i].value = jointsValues[i];
    document.getElementById("joint" + i).innerHTML = jointsValues[i];
  }
}

function convertRadiansToDegrees(jointsPositionRadians) {
  var degrees = [];

  for (i = 0; i < jointsPositionRadians.length; i++) {
    degrees.push(Math.round(jointsPositionRadians[i] * (180 / pi)));
  }
  return degrees;
}

function convertDegreestoRadians(jointsPositionDegrees) {
  var radians = [];

  for (i = 0; i < jointsPositionDegrees.length; i++) {
    radians.push(jointsPositionDegrees[i] * (pi / 180));
  }

  return radians;
}

function grabPoseRangeValues() {
  poseValues = [];
  for (i = 0; i < 6; i++) {
    poseValues.push(
      document.getElementsByClassName("poseRangeSlider")[i].value
    );
  }
  return poseValues;
}

function planPoseRange() {
  var poseValues = grabPoseRangeValues();
  planPose(poseValues);
}

function planPoseInput() {
  var poseValues = grabPoseInputValues();
  planPose(poseValues);
}

function executePoseRange() {
  var poseValues = grabPoseRangeValues();
  isAddedPose = false;
  executePose(poseValues);
}

function executePoseInput() {
  var poseValues = grabPoseInputValues();
  executePose(poseValues);
}

function initROS() {
  ros = new ROSLIB.Ros({
    url: "ws://localhost:9090",
  });
}

function hexToBase64(str) {
  return btoa(
    String.fromCharCode.apply(
      null,
      str
        .replace(/\r|\n/g, "")
        .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
        .replace(/ +$/, "")
        .split(" ")
    )
  );
}

function subcribToRvizImages() {
  var image_topic = new ROSLIB.Topic({
    ros: ros,
    name: "/rviz1/camera1/image",
    messageType: "sensor_msgs/Image",
  });
  image_topic.subscribe(function (message) {
    var can = document.getElementById("urdf");
    can.innerHtml = "";

    var image = document.getElementById("urdf");
    convertImage(message, can);
    image.src = "data:image/jpg;base64," + message.data;
    // image_topic.unsubscribe();
  });
}

function convertImage(imgMes, can) {
  can.width = imgMes.width;
  can.height = imgMes.height;
  const ctx = can.getContext("2d");

  const imgData = ctx.createImageData(imgMes.width, imgMes.height);
  const data = imgData.data;
  const inData = atob(imgMes.data);

  var j = 0;
  i = 4; // j data in , i data out
  while (j < inData.length) {
    const w1 = inData.charCodeAt(j++); // read 3 16 bit words represent 1 pixel
    const w2 = inData.charCodeAt(j++);
    const w3 = inData.charCodeAt(j++);
    if (!imgMes.is_bigendian) {
      data[i++] = w1; // red
      data[i++] = w2; // green
      data[i++] = w3; // blue
    } else {
      data[i++] = (w1 >> 8) + ((w1 & 0xff) << 8);
      data[i++] = (w2 >> 8) + ((w2 & 0xff) << 8);
      data[i++] = (w3 >> 8) + ((w3 & 0xff) << 8);
    }
    data[i++] = 255; // alpha
  }

  ctx.putImageData(imgData, 0, 0);
  // document.getElementById("visualization").replaceChild(can);
}

function getCurrentPose() {
  var poseTopic = new ROSLIB.Topic({
    ros: ros,
    name: "/current_pose_js",
    messageType: "geometry_msgs/Pose",
  });

  poseTopic.subscribe(function (message) {
    var pose = [];

    pose.push(eulerToDegrees(message.orientation.x.toPrecision()));
    pose.push(eulerToDegrees(message.orientation.y.toPrecision()));
    pose.push(eulerToDegrees(message.orientation.z.toPrecision()));
    // points.push(message.orientation.x);
    // points.push(message.orientation.y);
    // points.push(message.orientation.z);

    // pose = convertRadiansToDegrees(points);
    pose.push(message.position.x);
    pose.push(message.position.y);
    pose.push(message.position.z);

    // pose.unshift(a, b, c);
    currentPose = pose;
    updatePoseFields(pose);
    poseTopic.unsubscribe();
  });
}

function eulerToDegrees(euler) {
  var pi = Math.PI;
  return (euler / (2 * pi)) * 360;
}

function updatePoseFields(pose) {
  for (i = 0; i < pose.length; i++) {
    document.getElementsByClassName("poseRangeSlider")[i].value = pose[
      i
    ].toFixed(2);

    document.getElementsByClassName("inputPose")[i].value = pose[i].toFixed(2);

    document.getElementsByClassName("range-value")[i].innerHTML = pose[
      i
    ].toFixed(2);
  }
  // createPosesTable(pose);
}

function executePose(poseValues) {
  if (isAddedPose == false) {
    addPoseToHistory(poseValues);
  }
  currentPose = poseValues;
  poseValues[0] = poseValues[0] * (pi / 180);
  poseValues[1] = poseValues[1] * (pi / 180);
  poseValues[2] = poseValues[2] * (pi / 180);
  var str = poseValues.toString();

  var psGoal = new ROSLIB.Topic({
    ros: ros,
    name: "/pose_goal_change",
    messageType: "std_msgs/String",
  });

  var data = new ROSLIB.Message({
    data: str,
  });
  psGoal.publish(data);

  // setTimeout(getJointsState, 1000);
}

function fetchValues() {
  getCurrentPose();
  getJointsState();
}

function planPose(poseValues) {
  var str = poseValues.toString();
  poseValues[0] = poseValues[0] * (pi / 180);
  poseValues[1] = poseValues[1] * (pi / 180);
  poseValues[2] = poseValues[2] * (pi / 180);

  var psGoal = new ROSLIB.Topic({
    ros: ros,
    name: "/pose_goal_plan",
    messageType: "std_msgs/String",
  });

  var data = new ROSLIB.Message({
    data: str,
  });
  psGoal.publish(data);
}

function getJointsState() {
  var jointsPosition;
  joints_listener = new ROSLIB.Topic({
    ros: ros,
    name: "/joint_states",
    messageType: "sensor_msgs/JointState",
  });

  joints_listener.subscribe(function (message) {
    jointsPosition = message.position;
    loadJointValues(jointsPosition);
    joints_listener.unsubscribe();
  });
}

function setJointState(joints) {
  var str = joints.toString();
  var jntSt = new ROSLIB.Topic({
    ros: ros,
    name: "/joint_state_change",
    messageType: "std_msgs/String",
  });

  var data = new ROSLIB.Message({
    data: str,
  });
  jntSt.publish(data);
}

function setGroupName(robotName) {
  var group_name = new ROSLIB.Topic({
    ros: ros,
    name: "/set_group_name",
    messageType: "std_msgs/String",
  });

  var data = new ROSLIB.Message({
    data: robotName,
  });
  group_name.publish(data);
}

function getPoseFeedback() {
  feedback_listener = new ROSLIB.Topic({
    ros: ros,
    name: "/move_group/feedback",
    messageType: "moveit_msgs/MoveGroupActionFeedback",
  });

  feedback_listener.subscribe(function (message) {
    if (message.feedback.state == "IDLE") {
      alertify.success(message.status.text);
    }
    // feedback_listener.unsubscribe();
  });
}

function resetJoints() {
  jointValues = [];
  for (i = 0; i < selectedRobotJointsLength; i++) {
    jointValues[i] = 0;
  }
  setJointState(jointValues);
}

function grabUserDetails() {
  $("#registerMe").on("click", function (e) {
    username = $("#username").val();
    surname = $("#usersurname").val();
    email = $("#email").val();
    password = $("#userpassword").val();

    if (username != "" && surname != "" && email != "" && password != "") {
      if (emailIsValid(email)) {
        if (password.length > 7) {
          user = new User(username, surname, email, password);
          registerUser(user);
        } else {
          alertify.error("Password too short, at least 8 characters");
        }
      } else {
        alertify.error("Invalid email format");
      }
    } else {
      alertify.error("Please fill in all fields");
    }
  });
}

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
      alertify.success(
        "Successfully registered, an admin will approve your account shortly"
      );
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
    success: function (e) {},
    error: function (error) {},
  });
}
function retrieveApprovals() {
  jQuery.ajax({
    url: "/retrievePendingApprovals",
    type: "GET",
    data: JSON.stringify(),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      createPendingAccounTables(e);
    },
    error: function (error) {},
  });
}
function approveAccount(id) {
  jQuery.ajax({
    url: "/approvePendingAccount",
    type: "POST",
    data: JSON.stringify(id),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      alertify.success("Successfully approved user");
      retrieveApprovals();
    },
    error: function (error) {},
  });
}

function denyAccount(id) {
  jQuery.ajax({
    url: "/denyPendingAccount",
    type: "POST",
    data: JSON.stringify(id),
    dataType: "json",
    contentType: "application/json",
    success: function (e) {
      alertify.success("Successfully deleted user");
      retrieveApprovals();
    },
    error: function (error) {},
  });
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

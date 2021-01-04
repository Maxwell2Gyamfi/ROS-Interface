var ros;
var twist;
var cmdVel;
var linear_speed = 0;
var angular_speed = 0;
var plannedCoordinates =[]

keys =  document.getElementById('keys');
joystick = document.getElementById('zone_joystick');
coordinates =  document.getElementById('coordinates');

function initROS()
{
    ros = new ROSLIB.Ros({
        url : 'ws://localhost:9090'
      });

    displayConnectionMessage()  
}

function initVelocityPublisher()
{
    cmdVel = new ROSLIB.Topic({
        ros : ros,
        name : '/cmd_vel',
        messageType : 'geometry_msgs/Twist'
      });
    
    cmdVel.publish(twist);

}

function initTwist()
{
  twist = new ROSLIB.Message({
        linear : {
          x : 0.0,
          y : 0.0,
          z : 0.0
        },
        angular : {
          x : 0.0,
          y : 0.0,
          z : 0.0
        }
      });
      
}

function subscribeToTopic()
{
      var listener = new ROSLIB.Topic({
        ros : ros,
        name : '/listener',
        messageType : 'std_msgs/String'
      });
    
        listener.subscribe(function(message) {
        var info = document.getElementById('info');
        var p = document.createElement("p"); 
        p.innerHTML = 'Received message on ' + listener.name + ': ' + message.data
        listener.unsubscribe();
        info.appendChild(p);
       
      });
}

function manageParamValues()
{
    ros.getParams(function(params) {
        console.log(params);
      });
    
      var maxVelX = new ROSLIB.Param({
        ros : ros,
        name : 'max_vel_y'
      });
    
      maxVelX.set(0.8);
      maxVelX.get(function(value) {
        console.log('MAX VAL: ' + value);
      });

}

function displayConnectionMessage()
{
      var message ='';
      var status = document.getElementById('status')
      
      var info = document.getElementById('info');
      var p = document.createElement("p");

      ros.on('connection', function() {
        message = 'Connected to websocket server.'
        status.innerHTML ='Connected'
      });
    
      ros.on('error', function(error) {         
        message = 'Error connecting to websocket server.'    
        status.innerHTML ='Disconnected'
      });
    
      ros.on('close', function() {        
        message = 'Connection to websocket server closed.'
        status.innerHTML ='Closed'
      });

      p.innerHTML = message;
      info.appendChild(p);
    
}

function moveAction(linear, angular)
{
    
    initTwist();

    if (linear !== undefined && angular !== undefined) {
        twist.linear.x = linear;
        twist.angular.z = angular;
    } else {
        twist.linear.x = 0;
        twist.angular.z = 0;
    }
    
    initVelocityPublisher();

}

function displayCoordinatesSetting()
{
  joystick.style.display = 'none';
  keys.style.display = 'none';
  coordinates.style.display='flex';

}

function planCoordinates()
{
   coords =[]
   var info = document.getElementById('info');
   coords.push(document.getElementById('xcoordinate').value);
   coords.push(document.getElementById('ycoordinate').value);
   coords.push(document.getElementById('zcoordinate').value);
   
   message = 'Added coordinates x, y, z with values '+ coords[0]+ ', ' + coords[1]+', '+coords[2]+'\n';
   var p = document.createElement("p");
   plannedCoordinates.push(coords);
   p.innerHTML = message;
   info.appendChild(p);
   
}

function displayJoystick()
{
  joystick.style.display = 'flex';
  keys.style.display = 'none';
  coordinates.style.display='none';

  createJoystick();
}

createJoystick = function () {
    var options = {
      zone: document.getElementById('zone_joystick'),
      threshold: 0.1,
      position: { left: 17 + '%' },
      mode: 'static',
      size: 150,
      color: '#000000',
    };
    manager = nipplejs.create(options);
    joyStart(manager);
    joyMove(manager);
    joyEnd(manager);

    
}

function joyStart(manager)
{
  manager.on('start', function (event, nipple) {
    timer = setInterval(function () {
      moveAction(linear_speed, angular_speed);
    }, 25);
  });
}

function joyMove(manager)
{
  manager.on('move', function (event, nipple) {
    max_linear = 5.0; // m/s
    max_angular = 2.0; // rad/s
    max_distance = 75.0; // pixels;
    linear_speed = Math.sin(nipple.angle.radian) * max_linear * nipple.distance/max_distance;
    angular_speed = -Math.cos(nipple.angle.radian) * max_angular * nipple.distance/max_distance;
  });
}

function joyEnd(manager)
{
  manager.on('end', function () {
    if (timer) {
      clearInterval(timer);
    }
    moveAction(0, 0);
  });
}

window.addEventListener('load', (event) => {

    initROS()
    subscribeToTopic()
   
});

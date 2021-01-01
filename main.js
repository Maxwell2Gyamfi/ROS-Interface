keys =  document.getElementById('keys');
joystick = document.getElementById('joystick');
coordinates =  document.getElementById('coordinates');

document.getElementById('joystickbutton').onclick = function()
{
   joystick.style.display = 'block';
   keys.style.display = 'none';
   coordinates.style.display='none';
}

document.getElementById('coordinatesbutton').onclick = function()
{
   joystick.style.display = 'none';
   keys.style.display = 'none';
   coordinates.style.display='flex';
}


document.getElementById('keysbutton').onclick = function()
{
   joystick.style.display = 'none';
   keys.style.display = 'block';
   coordinates.style.display='none';
}

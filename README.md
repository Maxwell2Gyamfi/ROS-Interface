# ROS-Interface
![Screenshot 2021-03-23 180010](https://user-images.githubusercontent.com/46795132/112195283-aff72e00-8c01-11eb-8148-9e4e37aa9957.png)

# Rosie2.0
## ROS installation
Install and setup ROS (melodic recommended) on your Ubuntu Machine or VM. 
<br />
http://wiki.ros.org/melodic/Installation/Ubuntu
<br />

Clone this repository
```
git clone https://github.com/Maxwell2Gyamfi/ROS-Interface

```
Go to the folder iiwa_moveit_ws and Download the dependencies 
```
cd ROS-Interface/iiwa_stack_ws
rosdep install --from-paths src --ignore-src -r -y
```
Build the workspace :
```
catkin build
```
Source the workspace :
```
source devel/setup.bash
```
Test the installation was successful by launching the iiwa demo
```
roslaunch iiwa_moveit web_interface.launch
```

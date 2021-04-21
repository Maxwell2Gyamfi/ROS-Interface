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
Go to the folder iiwa_stack_ws and download the dependencies 
```
cd ROS-Interface/iiwa_stack_ws
rosdep install --from-paths src --ignore-src -r -y
```

Remove build space
```
catkin clean -b
```

Build the workspace :
```
catkin build
```
Source the workspace :
```
source devel/setup.bash
```

Make moveit.py file executable
```
sudo chmod +x  src/iiwa_stack/iiwa_moveit/scripts/moveit.py
```

Test the installation was successful by launching the iiwa web_interface
```
roslaunch iiwa_moveit web_interface.launch
```

## Flask installation

Go to the folder Flask
```
cd ROS-Interface/Flask
```

Configure a python environmnent
```
sudo apt install python3-venv
python3 -m venv my-project-env
source my-project-env/bin/activate
```

Install python dependencies
```
sudo apt install python3-pip
pip install --upgrade pip
pip install Flask
pip install opencv-python
pip install python-box
```

## Run Web Interface

Go to folder Flask
```
cd ROS-Interface/Flask
```

Activate python environment
```
source my-project-env/bin/activate
```
Execute web app
```
export FLASK_APP="main.py"
flask run -h 0.0.0.0
```

Launch the iiwa web_interface in a new terminal
```
roslaunch iiwa_moveit web_interface.launch
```



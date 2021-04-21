#!/usr/bin/env python

import ast
import copy
import sys
from math import pi

import geometry_msgs.msg
import moveit_commander
import moveit_msgs.msg
import rospy
import tf
from box import Box
from geometry_msgs.msg import Pose
from moveit_commander.conversions import pose_to_list
from std_msgs.msg import String

## END_SUB_TUTORIAL


def go_to_joint_state(joints_values):

    try:
        joint_goal = move_group.get_current_joint_values()
        for i in range(0, len(joint_goal)):
            joint_goal[i] = joints_values[i]

        move_group.go(joint_goal, wait=True)
    except:
        print("error setting joint value")


def go_to_pose_goal(pose):
    try:
        pose_goal = geometry_msgs.msg.Pose()
        pose_goal.orientation.x = float(pose.orientation.x)
        pose_goal.orientation.y = float(pose.orientation.y)
        pose_goal.orientation.z = float(pose.orientation.z)
        pose_goal.orientation.w = float(pose.orientation.w)

        pose_goal.position.x = float(pose.position.x)
        pose_goal.position.y = float(pose.position.y)
        pose_goal.position.z = float(pose.position.z)

        move_group.set_pose_target(pose_goal)
        my_plan = move_group.plan()
        move_group.execute(my_plan)
        # move_group.stop()
        move_group.clear_pose_targets()

    except:
        print("error performing pose")


def plan_to_pose_goal(pose):
    try:
        pose_goal = geometry_msgs.msg.Pose()
        pose_goal.orientation.x = float(pose.orientation.x)
        pose_goal.orientation.y = float(pose.orientation.y)
        pose_goal.orientation.z = float(pose.orientation.z)
        pose_goal.orientation.w = float(pose.orientation.w)

        pose_goal.position.x = float(pose.position.x)
        pose_goal.position.y = float(pose.position.y)
        pose_goal.position.z = float(pose.position.z)

        move_group.set_pose_target(pose_goal)

        plan = move_group.plan()
        # move_group.stop()
        move_group.clear_pose_targets()

    except:
        print("error performing pose")


def get_current_pose_js():

    cur_pose = convert_quaternion_to_euler()
    return cur_pose


def convert_quaternion_to_euler():
    pose_js = []
    myPose = Pose()
    pose = move_group.get_current_pose().pose
    quaternion = (
        pose.orientation.x,
        pose.orientation.y,
        pose.orientation.z,
        pose.orientation.w,
    )

    euler = tf.transformations.euler_from_quaternion(quaternion)
    roll = euler[0]
    pitch = euler[1]
    yaw = euler[2]

    myPose.position = pose.position
    myPose.orientation.x = roll
    myPose.orientation.y = pitch
    myPose.orientation.z = yaw

    return myPose


def joint_change_js(data):
    joints_js = data.data
    str_js = joints_js.split(",")
    joints_values = list(map(float, str_js))
    go_to_joint_state(joints_values)


def convert_euler_to_quaternion(data):
    pose_js = data.data
    str_js = pose_js.split(",")

    pose_values = list(map(float, str_js))

    roll = pose_values[0]
    pitch = pose_values[1]
    yaw = pose_values[2]

    quaternion = tf.transformations.quaternion_from_euler(roll, pitch, yaw)

    pose = list_to_dict(pose_values, quaternion)

    return pose


def plan_pose_goal(data):
    pose = convert_euler_to_quaternion(data)
    plan_to_pose_goal(pose)


def execute_pose_goal(data):
    pose = convert_euler_to_quaternion(data)
    go_to_pose_goal(pose)


def list_to_dict(pose_values, quaternion):
    pose_js = {
        "orientation": {
            "x": quaternion[0],
            "y": quaternion[1],
            "z": quaternion[2],
            "w": quaternion[3],
        },
        "position": {"x": pose_values[3], "y": pose_values[4], "z": pose_values[5]},
    }

    pose = Box(pose_js)
    return pose


def setGroupName(data):
    global group_name
    global move_group

    try:
        group_name = data.data
        move_group = moveit_commander.MoveGroupCommander(group_name)
    except:
        print("Group was not found")


def successMessage():
    pass


moveit_commander.roscpp_initialize(sys.argv)
rospy.init_node("move_group_python_interface_tutorial", anonymous=True)
rate = rospy.Rate(10)

rospy.Subscriber("joint_state_change", String, joint_change_js)
rospy.Subscriber("pose_goal_change", String, execute_pose_goal)
rospy.Subscriber("pose_goal_plan", String, plan_pose_goal)
rospy.Subscriber("set_group_name", String, setGroupName)

pub = rospy.Publisher("current_pose_js", Pose, queue_size=10)
robot = moveit_commander.RobotCommander()

group_name = "manipulator"
move_group = moveit_commander.MoveGroupCommander(group_name)


def main():
    while not rospy.is_shutdown():
        try:
            pose_js = get_current_pose_js()
            pub.publish(pose_js)
        except:
            print("incorrect inputs")
        rospy.sleep(0.5)
        # rate.sleep()
        # rospy.spin()


if __name__ == "__main__":
    main()


#!/usr/bin/env python
'''import copy
import sys
from math import pi

import geometry_msgs.msg
import moveit_msgs.msg
import rospy
from std_msgs.msg import String

import moveit_commander
from moveit_commander.conversions import pose_to_list


class RosMoveit():
    def __init__(self):
        moveit_commander.roscpp_initialize(sys.argv)
        rospy.init_node("move_group_python_interface_tutorial", anonymous=True)
        self.robot = moveit_commander.RobotCommander()
        self.scene = moveit_commander.PlanningSceneInterface()
        self.group_name = "manipulator"
        self.move_group = moveit_commander.MoveGroupCommander(self.group_name)
        self.scale = 1

    def go_to_joint_state(self, jointsValues):
        joint_goal = self.move_group.get_current_joint_values()
        joint_goal[0] = 0
        joint_goal[1] = -pi / 4
        joint_goal[2] = 0
        joint_goal[3] = -pi / 2
        joint_goal[4] = 0
        joint_goal[5] = pi / 3
        joint_goal[6] = 0

        self.move_group.go(joint_goal, wait=True)

    def go_to_pose_goal(self, coordinates):
        pose_goal = geometry_msgs.msg.Pose()
        pose_goal.orientation.w = coordinates.get('w')
        pose_goal.position.x = coordinates.get('x')
        pose_goal.position.y = coordinates.get('y')
        pose_goal.position.z = coordinates.get('z')
        self.move_group.set_pose_target(pose_goal)

        plan = self.move_group.go(wait=True)
        # Calling `stop()` ensures that there is no residual movement
        # move_group.stop()
        self.move_group.clear_pose_targets()

    def plan_cartesian_path(self):
        waypoints = []

        wpose = self.move_group.get_current_pose().pose
        wpose.position.z -= self.scale * 0.1  # First move up (z)
        wpose.position.y += self.scale * 0.2  # and sideways (y)
        waypoints.append(copy.deepcopy(wpose))

        # Second move forward/backwards in (x)
        wpose.position.x += self.scale * 0.1
        waypoints.append(copy.deepcopy(wpose))

        wpose.position.y -= self.scale * 0.1  # Third move sideways (y)
        waypoints.append(copy.deepcopy(wpose))

        (plan, fraction) = self.move_group.compute_cartesian_path(
            waypoints, 0.01, 0.0  # waypoints to follow  # eef_step
        )  # jump_threshold

        return plan, fraction

    def getRobotCurrentState(self):
        return self.robot.get_current_state()

    def getRobotCurrentPose(self):
        return self.move_group.get_current_pose().pose

'''


def isWorking(arr):
    print(arr.get('x'))


def isWorkingJointState(jointsVal):
    print(jointsVal)


def sendCurrentJoints():
    joints = [0.0004, 1.211, 2.003, 4.00012, -5.9001]
    return joints

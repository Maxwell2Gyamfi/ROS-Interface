# Install script for directory: /home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/home/rosie2/iiwa_stack_ws_max/install")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "Release")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Install shared libraries without execute permission?
if(NOT DEFINED CMAKE_INSTALL_SO_NO_EXE)
  set(CMAKE_INSTALL_SO_NO_EXE "1")
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  
      if (NOT EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}")
        file(MAKE_DIRECTORY "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}")
      endif()
      if (NOT EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/.catkin")
        file(WRITE "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/.catkin" "")
      endif()
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  list(APPEND CMAKE_ABSOLUTE_DESTINATION_FILES
   "/home/rosie2/iiwa_stack_ws_max/install/_setup_util.py")
  if(CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(WARNING "ABSOLUTE path INSTALL DESTINATION : ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  endif()
  if(CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(FATAL_ERROR "ABSOLUTE path INSTALL DESTINATION forbidden (by caller): ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  endif()
file(INSTALL DESTINATION "/home/rosie2/iiwa_stack_ws_max/install" TYPE PROGRAM FILES "/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/catkin_generated/installspace/_setup_util.py")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  list(APPEND CMAKE_ABSOLUTE_DESTINATION_FILES
   "/home/rosie2/iiwa_stack_ws_max/install/env.sh")
  if(CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(WARNING "ABSOLUTE path INSTALL DESTINATION : ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  endif()
  if(CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(FATAL_ERROR "ABSOLUTE path INSTALL DESTINATION forbidden (by caller): ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  endif()
file(INSTALL DESTINATION "/home/rosie2/iiwa_stack_ws_max/install" TYPE PROGRAM FILES "/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/catkin_generated/installspace/env.sh")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  list(APPEND CMAKE_ABSOLUTE_DESTINATION_FILES
   "/home/rosie2/iiwa_stack_ws_max/install/setup.bash;/home/rosie2/iiwa_stack_ws_max/install/local_setup.bash")
  if(CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(WARNING "ABSOLUTE path INSTALL DESTINATION : ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  endif()
  if(CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(FATAL_ERROR "ABSOLUTE path INSTALL DESTINATION forbidden (by caller): ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  endif()
file(INSTALL DESTINATION "/home/rosie2/iiwa_stack_ws_max/install" TYPE FILE FILES
    "/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/catkin_generated/installspace/setup.bash"
    "/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/catkin_generated/installspace/local_setup.bash"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  list(APPEND CMAKE_ABSOLUTE_DESTINATION_FILES
   "/home/rosie2/iiwa_stack_ws_max/install/setup.sh;/home/rosie2/iiwa_stack_ws_max/install/local_setup.sh")
  if(CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(WARNING "ABSOLUTE path INSTALL DESTINATION : ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  endif()
  if(CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(FATAL_ERROR "ABSOLUTE path INSTALL DESTINATION forbidden (by caller): ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  endif()
file(INSTALL DESTINATION "/home/rosie2/iiwa_stack_ws_max/install" TYPE FILE FILES
    "/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/catkin_generated/installspace/setup.sh"
    "/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/catkin_generated/installspace/local_setup.sh"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  list(APPEND CMAKE_ABSOLUTE_DESTINATION_FILES
   "/home/rosie2/iiwa_stack_ws_max/install/setup.zsh;/home/rosie2/iiwa_stack_ws_max/install/local_setup.zsh")
  if(CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(WARNING "ABSOLUTE path INSTALL DESTINATION : ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  endif()
  if(CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(FATAL_ERROR "ABSOLUTE path INSTALL DESTINATION forbidden (by caller): ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  endif()
file(INSTALL DESTINATION "/home/rosie2/iiwa_stack_ws_max/install" TYPE FILE FILES
    "/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/catkin_generated/installspace/setup.zsh"
    "/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/catkin_generated/installspace/local_setup.zsh"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  list(APPEND CMAKE_ABSOLUTE_DESTINATION_FILES
   "/home/rosie2/iiwa_stack_ws_max/install/.rosinstall")
  if(CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(WARNING "ABSOLUTE path INSTALL DESTINATION : ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  endif()
  if(CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION)
    message(FATAL_ERROR "ABSOLUTE path INSTALL DESTINATION forbidden (by caller): ${CMAKE_ABSOLUTE_DESTINATION_FILES}")
  endif()
file(INSTALL DESTINATION "/home/rosie2/iiwa_stack_ws_max/install" TYPE FILE FILES "/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/catkin_generated/installspace/.rosinstall")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/iiwa_msgs/msg" TYPE FILE FILES
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/CartesianControlModeLimits.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/CartesianEulerPose.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/CartesianImpedanceControlMode.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/CartesianPlane.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/CartesianPose.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/CartesianQuantity.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/CartesianVelocity.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/CartesianWrench.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/ControlMode.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/DOF.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/DesiredForceControlMode.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/JointDamping.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/JointImpedanceControlMode.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/JointPosition.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/JointPositionVelocity.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/JointQuantity.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/JointStiffness.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/JointTorque.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/JointVelocity.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/RedundancyInformation.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/SinePatternControlMode.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/Spline.msg"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/msg/SplineSegment.msg"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/iiwa_msgs/srv" TYPE FILE FILES
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/srv/ConfigureControlMode.srv"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/srv/SetEndpointFrame.srv"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/srv/SetPTPCartesianSpeedLimits.srv"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/srv/SetPTPJointSpeedLimits.srv"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/srv/SetSmartServoJointSpeedLimits.srv"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/srv/SetSmartServoLinSpeedLimits.srv"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/srv/SetSpeedOverride.srv"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/srv/SetWorkpiece.srv"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/srv/TimeToDestination.srv"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/iiwa_msgs/action" TYPE FILE FILES
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/action/MoveAlongSpline.action"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/action/MoveToCartesianPose.action"
    "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/action/MoveToJointPosition.action"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/iiwa_msgs/msg" TYPE FILE FILES
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveAlongSplineAction.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveAlongSplineActionGoal.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveAlongSplineActionResult.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveAlongSplineActionFeedback.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveAlongSplineGoal.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveAlongSplineResult.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveAlongSplineFeedback.msg"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/iiwa_msgs/msg" TYPE FILE FILES
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveToCartesianPoseAction.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveToCartesianPoseActionGoal.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveToCartesianPoseActionResult.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveToCartesianPoseActionFeedback.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveToCartesianPoseGoal.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveToCartesianPoseResult.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveToCartesianPoseFeedback.msg"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/iiwa_msgs/msg" TYPE FILE FILES
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveToJointPositionAction.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveToJointPositionActionGoal.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveToJointPositionActionResult.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveToJointPositionActionFeedback.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveToJointPositionGoal.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveToJointPositionResult.msg"
    "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/iiwa_msgs/msg/MoveToJointPositionFeedback.msg"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/iiwa_msgs/cmake" TYPE FILE FILES "/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/catkin_generated/installspace/iiwa_msgs-msg-paths.cmake")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include" TYPE DIRECTORY FILES "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/include/iiwa_msgs")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/roseus/ros" TYPE DIRECTORY FILES "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/roseus/ros/iiwa_msgs")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/common-lisp/ros" TYPE DIRECTORY FILES "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/common-lisp/ros/iiwa_msgs")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/gennodejs/ros" TYPE DIRECTORY FILES "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/share/gennodejs/ros/iiwa_msgs")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  execute_process(COMMAND "/usr/bin/python2" -m compileall "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/lib/python2.7/dist-packages/iiwa_msgs")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/python2.7/dist-packages" TYPE DIRECTORY FILES "/home/rosie2/iiwa_stack_ws_max/devel/.private/iiwa_msgs/lib/python2.7/dist-packages/iiwa_msgs")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/pkgconfig" TYPE FILE FILES "/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/catkin_generated/installspace/iiwa_msgs.pc")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/iiwa_msgs/cmake" TYPE FILE FILES "/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/catkin_generated/installspace/iiwa_msgs-msg-extras.cmake")
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/iiwa_msgs/cmake" TYPE FILE FILES
    "/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/catkin_generated/installspace/iiwa_msgsConfig.cmake"
    "/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/catkin_generated/installspace/iiwa_msgsConfig-version.cmake"
    )
endif()

if("x${CMAKE_INSTALL_COMPONENT}x" STREQUAL "xUnspecifiedx" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/iiwa_msgs" TYPE FILE FILES "/home/rosie2/iiwa_stack_ws_max/src/iiwa_stack/iiwa_msgs/package.xml")
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/gtest/cmake_install.cmake")

endif()

if(CMAKE_INSTALL_COMPONENT)
  set(CMAKE_INSTALL_MANIFEST "install_manifest_${CMAKE_INSTALL_COMPONENT}.txt")
else()
  set(CMAKE_INSTALL_MANIFEST "install_manifest.txt")
endif()

string(REPLACE ";" "\n" CMAKE_INSTALL_MANIFEST_CONTENT
       "${CMAKE_INSTALL_MANIFEST_FILES}")
file(WRITE "/home/rosie2/iiwa_stack_ws_max/build/iiwa_msgs/${CMAKE_INSTALL_MANIFEST}"
     "${CMAKE_INSTALL_MANIFEST_CONTENT}")

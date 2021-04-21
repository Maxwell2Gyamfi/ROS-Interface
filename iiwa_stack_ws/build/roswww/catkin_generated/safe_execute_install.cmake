execute_process(COMMAND "/home/academy/iiwa_stack_ws/build/roswww/catkin_generated/python_distutils_install.sh" RESULT_VARIABLE res)

if(NOT res EQUAL 0)
  message(FATAL_ERROR "execute_process(/home/academy/iiwa_stack_ws/build/roswww/catkin_generated/python_distutils_install.sh) returned error code ")
endif()

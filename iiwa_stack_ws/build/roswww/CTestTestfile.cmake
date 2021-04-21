# CMake generated Testfile for 
# Source directory: /home/academy/iiwa_stack_ws/src/roswww
# Build directory: /home/academy/iiwa_stack_ws/build/roswww
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(_ctest_roswww_rostest_test_launch.test "/home/academy/iiwa_stack_ws/build/roswww/catkin_generated/env_cached.sh" "/usr/bin/python2" "/opt/ros/melodic/share/catkin/cmake/test/run_tests.py" "/home/academy/iiwa_stack_ws/build/roswww/test_results/roswww/rostest-test_launch.xml" "--return-code" "/usr/bin/python2 /opt/ros/melodic/share/rostest/cmake/../../../bin/rostest --pkgdir=/home/academy/iiwa_stack_ws/src/roswww --package=roswww --results-filename test_launch.xml --results-base-dir \"/home/academy/iiwa_stack_ws/build/roswww/test_results\" /home/academy/iiwa_stack_ws/src/roswww/test/launch.test ")
subdirs("gtest")

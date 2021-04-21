#!/bin/sh

if [ -n "$DESTDIR" ] ; then
    case $DESTDIR in
        /*) # ok
            ;;
        *)
            /bin/echo "DESTDIR argument must be absolute... "
            /bin/echo "otherwise python's distutils will bork things."
            exit 1
    esac
fi

echo_and_run() { echo "+ $@" ; "$@" ; }

echo_and_run cd "/home/academy/iiwa_stack_ws/src/roswww"

# ensure that Python install destination exists
echo_and_run mkdir -p "$DESTDIR/home/academy/iiwa_stack_ws/install/lib/python2.7/dist-packages"

# Note that PYTHONPATH is pulled from the environment to support installing
# into one location when some dependencies were installed in another
# location, #123.
echo_and_run /usr/bin/env \
    PYTHONPATH="/home/academy/iiwa_stack_ws/install/lib/python2.7/dist-packages:/home/academy/iiwa_stack_ws/build/roswww/lib/python2.7/dist-packages:$PYTHONPATH" \
    CATKIN_BINARY_DIR="/home/academy/iiwa_stack_ws/build/roswww" \
    "/usr/bin/python2" \
    "/home/academy/iiwa_stack_ws/src/roswww/setup.py" \
     \
    build --build-base "/home/academy/iiwa_stack_ws/build/roswww" \
    install \
    --root="${DESTDIR-/}" \
    --install-layout=deb --prefix="/home/academy/iiwa_stack_ws/install" --install-scripts="/home/academy/iiwa_stack_ws/install/bin"

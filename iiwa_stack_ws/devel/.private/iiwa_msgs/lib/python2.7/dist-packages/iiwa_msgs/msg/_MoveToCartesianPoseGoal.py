# This Python file uses the following encoding: utf-8
"""autogenerated by genpy from iiwa_msgs/MoveToCartesianPoseGoal.msg. Do not edit."""
import codecs
import sys
python3 = True if sys.hexversion > 0x03000000 else False
import genpy
import struct

import geometry_msgs.msg
import iiwa_msgs.msg
import std_msgs.msg

class MoveToCartesianPoseGoal(genpy.Message):
  _md5sum = "fbf031118cd35a5312c5e4b7b86d0e5a"
  _type = "iiwa_msgs/MoveToCartesianPoseGoal"
  _has_header = False  # flag to mark the presence of a Header object
  _full_text = """# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======
# Goal
CartesianPose cartesian_pose


================================================================================
MSG: iiwa_msgs/CartesianPose
# Target Pose including redundancy information.
geometry_msgs/PoseStamped poseStamped

# If you have issues with the robot not executing the motion copy this value from the Cartesian Position Tab of the
# robot SmartPad. Set both parameters to -1 to disable them.
RedundancyInformation redundancy

================================================================================
MSG: geometry_msgs/PoseStamped
# A Pose with reference coordinate frame and timestamp
Header header
Pose pose

================================================================================
MSG: std_msgs/Header
# Standard metadata for higher-level stamped data types.
# This is generally used to communicate timestamped data 
# in a particular coordinate frame.
# 
# sequence ID: consecutively increasing ID 
uint32 seq
#Two-integer timestamp that is expressed as:
# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')
# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')
# time-handling sugar is provided by the client library
time stamp
#Frame this data is associated with
string frame_id

================================================================================
MSG: geometry_msgs/Pose
# A representation of pose in free space, composed of position and orientation. 
Point position
Quaternion orientation

================================================================================
MSG: geometry_msgs/Point
# This contains the position of a point in free space
float64 x
float64 y
float64 z

================================================================================
MSG: geometry_msgs/Quaternion
# This represents an orientation in free space in quaternion form.

float64 x
float64 y
float64 z
float64 w

================================================================================
MSG: iiwa_msgs/RedundancyInformation
# E1 parameter
# Specifies Angle of the elbow joint.
float64 e1

# Status parameter
#   Bit 0: 1 - The robot is working above its head
#          0 - The robot is working in the ground area
#   Bit 1: 1 - Angle A4 < 0°
#          0 - Angle A4 >= 0°
#   Bit 2: 1 - Angle A6 <= 0
#          0 - Angle A6 > 0
int32 status

# Turn parameter
# According to Sunrise handbook this is not used for the iiwa.
int32 turn
"""
  __slots__ = ['cartesian_pose']
  _slot_types = ['iiwa_msgs/CartesianPose']

  def __init__(self, *args, **kwds):
    """
    Constructor. Any message fields that are implicitly/explicitly
    set to None will be assigned a default value. The recommend
    use is keyword arguments as this is more robust to future message
    changes.  You cannot mix in-order arguments and keyword arguments.

    The available fields are:
       cartesian_pose

    :param args: complete set of field values, in .msg order
    :param kwds: use keyword arguments corresponding to message field names
    to set specific fields.
    """
    if args or kwds:
      super(MoveToCartesianPoseGoal, self).__init__(*args, **kwds)
      # message fields cannot be None, assign default values for those that are
      if self.cartesian_pose is None:
        self.cartesian_pose = iiwa_msgs.msg.CartesianPose()
    else:
      self.cartesian_pose = iiwa_msgs.msg.CartesianPose()

  def _get_types(self):
    """
    internal API method
    """
    return self._slot_types

  def serialize(self, buff):
    """
    serialize message into buffer
    :param buff: buffer, ``StringIO``
    """
    try:
      _x = self
      buff.write(_get_struct_3I().pack(_x.cartesian_pose.poseStamped.header.seq, _x.cartesian_pose.poseStamped.header.stamp.secs, _x.cartesian_pose.poseStamped.header.stamp.nsecs))
      _x = self.cartesian_pose.poseStamped.header.frame_id
      length = len(_x)
      if python3 or type(_x) == unicode:
        _x = _x.encode('utf-8')
        length = len(_x)
      buff.write(struct.Struct('<I%ss'%length).pack(length, _x))
      _x = self
      buff.write(_get_struct_8d2i().pack(_x.cartesian_pose.poseStamped.pose.position.x, _x.cartesian_pose.poseStamped.pose.position.y, _x.cartesian_pose.poseStamped.pose.position.z, _x.cartesian_pose.poseStamped.pose.orientation.x, _x.cartesian_pose.poseStamped.pose.orientation.y, _x.cartesian_pose.poseStamped.pose.orientation.z, _x.cartesian_pose.poseStamped.pose.orientation.w, _x.cartesian_pose.redundancy.e1, _x.cartesian_pose.redundancy.status, _x.cartesian_pose.redundancy.turn))
    except struct.error as se: self._check_types(struct.error("%s: '%s' when writing '%s'" % (type(se), str(se), str(locals().get('_x', self)))))
    except TypeError as te: self._check_types(ValueError("%s: '%s' when writing '%s'" % (type(te), str(te), str(locals().get('_x', self)))))

  def deserialize(self, str):
    """
    unpack serialized message in str into this message instance
    :param str: byte array of serialized message, ``str``
    """
    codecs.lookup_error("rosmsg").msg_type = self._type
    try:
      if self.cartesian_pose is None:
        self.cartesian_pose = iiwa_msgs.msg.CartesianPose()
      end = 0
      _x = self
      start = end
      end += 12
      (_x.cartesian_pose.poseStamped.header.seq, _x.cartesian_pose.poseStamped.header.stamp.secs, _x.cartesian_pose.poseStamped.header.stamp.nsecs,) = _get_struct_3I().unpack(str[start:end])
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      start = end
      end += length
      if python3:
        self.cartesian_pose.poseStamped.header.frame_id = str[start:end].decode('utf-8', 'rosmsg')
      else:
        self.cartesian_pose.poseStamped.header.frame_id = str[start:end]
      _x = self
      start = end
      end += 72
      (_x.cartesian_pose.poseStamped.pose.position.x, _x.cartesian_pose.poseStamped.pose.position.y, _x.cartesian_pose.poseStamped.pose.position.z, _x.cartesian_pose.poseStamped.pose.orientation.x, _x.cartesian_pose.poseStamped.pose.orientation.y, _x.cartesian_pose.poseStamped.pose.orientation.z, _x.cartesian_pose.poseStamped.pose.orientation.w, _x.cartesian_pose.redundancy.e1, _x.cartesian_pose.redundancy.status, _x.cartesian_pose.redundancy.turn,) = _get_struct_8d2i().unpack(str[start:end])
      return self
    except struct.error as e:
      raise genpy.DeserializationError(e)  # most likely buffer underfill


  def serialize_numpy(self, buff, numpy):
    """
    serialize message with numpy array types into buffer
    :param buff: buffer, ``StringIO``
    :param numpy: numpy python module
    """
    try:
      _x = self
      buff.write(_get_struct_3I().pack(_x.cartesian_pose.poseStamped.header.seq, _x.cartesian_pose.poseStamped.header.stamp.secs, _x.cartesian_pose.poseStamped.header.stamp.nsecs))
      _x = self.cartesian_pose.poseStamped.header.frame_id
      length = len(_x)
      if python3 or type(_x) == unicode:
        _x = _x.encode('utf-8')
        length = len(_x)
      buff.write(struct.Struct('<I%ss'%length).pack(length, _x))
      _x = self
      buff.write(_get_struct_8d2i().pack(_x.cartesian_pose.poseStamped.pose.position.x, _x.cartesian_pose.poseStamped.pose.position.y, _x.cartesian_pose.poseStamped.pose.position.z, _x.cartesian_pose.poseStamped.pose.orientation.x, _x.cartesian_pose.poseStamped.pose.orientation.y, _x.cartesian_pose.poseStamped.pose.orientation.z, _x.cartesian_pose.poseStamped.pose.orientation.w, _x.cartesian_pose.redundancy.e1, _x.cartesian_pose.redundancy.status, _x.cartesian_pose.redundancy.turn))
    except struct.error as se: self._check_types(struct.error("%s: '%s' when writing '%s'" % (type(se), str(se), str(locals().get('_x', self)))))
    except TypeError as te: self._check_types(ValueError("%s: '%s' when writing '%s'" % (type(te), str(te), str(locals().get('_x', self)))))

  def deserialize_numpy(self, str, numpy):
    """
    unpack serialized message in str into this message instance using numpy for array types
    :param str: byte array of serialized message, ``str``
    :param numpy: numpy python module
    """
    codecs.lookup_error("rosmsg").msg_type = self._type
    try:
      if self.cartesian_pose is None:
        self.cartesian_pose = iiwa_msgs.msg.CartesianPose()
      end = 0
      _x = self
      start = end
      end += 12
      (_x.cartesian_pose.poseStamped.header.seq, _x.cartesian_pose.poseStamped.header.stamp.secs, _x.cartesian_pose.poseStamped.header.stamp.nsecs,) = _get_struct_3I().unpack(str[start:end])
      start = end
      end += 4
      (length,) = _struct_I.unpack(str[start:end])
      start = end
      end += length
      if python3:
        self.cartesian_pose.poseStamped.header.frame_id = str[start:end].decode('utf-8', 'rosmsg')
      else:
        self.cartesian_pose.poseStamped.header.frame_id = str[start:end]
      _x = self
      start = end
      end += 72
      (_x.cartesian_pose.poseStamped.pose.position.x, _x.cartesian_pose.poseStamped.pose.position.y, _x.cartesian_pose.poseStamped.pose.position.z, _x.cartesian_pose.poseStamped.pose.orientation.x, _x.cartesian_pose.poseStamped.pose.orientation.y, _x.cartesian_pose.poseStamped.pose.orientation.z, _x.cartesian_pose.poseStamped.pose.orientation.w, _x.cartesian_pose.redundancy.e1, _x.cartesian_pose.redundancy.status, _x.cartesian_pose.redundancy.turn,) = _get_struct_8d2i().unpack(str[start:end])
      return self
    except struct.error as e:
      raise genpy.DeserializationError(e)  # most likely buffer underfill

_struct_I = genpy.struct_I
def _get_struct_I():
    global _struct_I
    return _struct_I
_struct_3I = None
def _get_struct_3I():
    global _struct_3I
    if _struct_3I is None:
        _struct_3I = struct.Struct("<3I")
    return _struct_3I
_struct_8d2i = None
def _get_struct_8d2i():
    global _struct_8d2i
    if _struct_8d2i is None:
        _struct_8d2i = struct.Struct("<8d2i")
    return _struct_8d2i

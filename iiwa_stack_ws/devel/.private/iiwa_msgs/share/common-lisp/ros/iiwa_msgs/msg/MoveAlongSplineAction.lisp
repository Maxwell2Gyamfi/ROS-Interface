; Auto-generated. Do not edit!


(cl:in-package iiwa_msgs-msg)


;//! \htmlinclude MoveAlongSplineAction.msg.html

(cl:defclass <MoveAlongSplineAction> (roslisp-msg-protocol:ros-message)
  ((action_goal
    :reader action_goal
    :initarg :action_goal
    :type iiwa_msgs-msg:MoveAlongSplineActionGoal
    :initform (cl:make-instance 'iiwa_msgs-msg:MoveAlongSplineActionGoal))
   (action_result
    :reader action_result
    :initarg :action_result
    :type iiwa_msgs-msg:MoveAlongSplineActionResult
    :initform (cl:make-instance 'iiwa_msgs-msg:MoveAlongSplineActionResult))
   (action_feedback
    :reader action_feedback
    :initarg :action_feedback
    :type iiwa_msgs-msg:MoveAlongSplineActionFeedback
    :initform (cl:make-instance 'iiwa_msgs-msg:MoveAlongSplineActionFeedback)))
)

(cl:defclass MoveAlongSplineAction (<MoveAlongSplineAction>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <MoveAlongSplineAction>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'MoveAlongSplineAction)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name iiwa_msgs-msg:<MoveAlongSplineAction> is deprecated: use iiwa_msgs-msg:MoveAlongSplineAction instead.")))

(cl:ensure-generic-function 'action_goal-val :lambda-list '(m))
(cl:defmethod action_goal-val ((m <MoveAlongSplineAction>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader iiwa_msgs-msg:action_goal-val is deprecated.  Use iiwa_msgs-msg:action_goal instead.")
  (action_goal m))

(cl:ensure-generic-function 'action_result-val :lambda-list '(m))
(cl:defmethod action_result-val ((m <MoveAlongSplineAction>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader iiwa_msgs-msg:action_result-val is deprecated.  Use iiwa_msgs-msg:action_result instead.")
  (action_result m))

(cl:ensure-generic-function 'action_feedback-val :lambda-list '(m))
(cl:defmethod action_feedback-val ((m <MoveAlongSplineAction>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader iiwa_msgs-msg:action_feedback-val is deprecated.  Use iiwa_msgs-msg:action_feedback instead.")
  (action_feedback m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <MoveAlongSplineAction>) ostream)
  "Serializes a message object of type '<MoveAlongSplineAction>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'action_goal) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'action_result) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'action_feedback) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <MoveAlongSplineAction>) istream)
  "Deserializes a message object of type '<MoveAlongSplineAction>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'action_goal) istream)
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'action_result) istream)
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'action_feedback) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<MoveAlongSplineAction>)))
  "Returns string type for a message object of type '<MoveAlongSplineAction>"
  "iiwa_msgs/MoveAlongSplineAction")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'MoveAlongSplineAction)))
  "Returns string type for a message object of type 'MoveAlongSplineAction"
  "iiwa_msgs/MoveAlongSplineAction")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<MoveAlongSplineAction>)))
  "Returns md5sum for a message object of type '<MoveAlongSplineAction>"
  "8a9cc41458c3e11a14e647ba3c0068f7")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'MoveAlongSplineAction)))
  "Returns md5sum for a message object of type 'MoveAlongSplineAction"
  "8a9cc41458c3e11a14e647ba3c0068f7")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<MoveAlongSplineAction>)))
  "Returns full string definition for message of type '<MoveAlongSplineAction>"
  (cl:format cl:nil "# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%~%MoveAlongSplineActionGoal action_goal~%MoveAlongSplineActionResult action_result~%MoveAlongSplineActionFeedback action_feedback~%~%================================================================================~%MSG: iiwa_msgs/MoveAlongSplineActionGoal~%# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%~%Header header~%actionlib_msgs/GoalID goal_id~%MoveAlongSplineGoal goal~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%string frame_id~%~%================================================================================~%MSG: actionlib_msgs/GoalID~%# The stamp should store the time at which this goal was requested.~%# It is used by an action server when it tries to preempt all~%# goals that were requested before a certain time~%time stamp~%~%# The id provides a way to associate feedback and~%# result message with specific goal requests. The id~%# specified must be unique.~%string id~%~%~%================================================================================~%MSG: iiwa_msgs/MoveAlongSplineGoal~%# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%# Goal~%Spline spline~%~%~%================================================================================~%MSG: iiwa_msgs/Spline~%# The describes a motion along a spline~%~%SplineSegment[] segments~%================================================================================~%MSG: iiwa_msgs/SplineSegment~%# This message describes a segment of a spline path~%~%int32 SPL = 0~%int32 LIN =  1~%int32 CIRC = 2~%~%# The type of the spline segment~%int32 type~%~%# The endpoint of the current segment~%CartesianPose point~%~%# Auxiliary point. Only used for circular segments~%CartesianPose point_aux~%================================================================================~%MSG: iiwa_msgs/CartesianPose~%# Target Pose including redundancy information.~%geometry_msgs/PoseStamped poseStamped~%~%# If you have issues with the robot not executing the motion copy this value from the Cartesian Position Tab of the~%# robot SmartPad. Set both parameters to -1 to disable them.~%RedundancyInformation redundancy~%~%================================================================================~%MSG: geometry_msgs/PoseStamped~%# A Pose with reference coordinate frame and timestamp~%Header header~%Pose pose~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of position and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%================================================================================~%MSG: iiwa_msgs/RedundancyInformation~%# E1 parameter~%# Specifies Angle of the elbow joint.~%float64 e1~%~%# Status parameter~%#   Bit 0: 1 - The robot is working above its head~%#          0 - The robot is working in the ground area~%#   Bit 1: 1 - Angle A4 < 0°~%#          0 - Angle A4 >= 0°~%#   Bit 2: 1 - Angle A6 <= 0~%#          0 - Angle A6 > 0~%int32 status~%~%# Turn parameter~%# According to Sunrise handbook this is not used for the iiwa.~%int32 turn~%~%================================================================================~%MSG: iiwa_msgs/MoveAlongSplineActionResult~%# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%~%Header header~%actionlib_msgs/GoalStatus status~%MoveAlongSplineResult result~%~%================================================================================~%MSG: actionlib_msgs/GoalStatus~%GoalID goal_id~%uint8 status~%uint8 PENDING         = 0   # The goal has yet to be processed by the action server~%uint8 ACTIVE          = 1   # The goal is currently being processed by the action server~%uint8 PREEMPTED       = 2   # The goal received a cancel request after it started executing~%                            #   and has since completed its execution (Terminal State)~%uint8 SUCCEEDED       = 3   # The goal was achieved successfully by the action server (Terminal State)~%uint8 ABORTED         = 4   # The goal was aborted during execution by the action server due~%                            #    to some failure (Terminal State)~%uint8 REJECTED        = 5   # The goal was rejected by the action server without being processed,~%                            #    because the goal was unattainable or invalid (Terminal State)~%uint8 PREEMPTING      = 6   # The goal received a cancel request after it started executing~%                            #    and has not yet completed execution~%uint8 RECALLING       = 7   # The goal received a cancel request before it started executing,~%                            #    but the action server has not yet confirmed that the goal is canceled~%uint8 RECALLED        = 8   # The goal received a cancel request before it started executing~%                            #    and was successfully cancelled (Terminal State)~%uint8 LOST            = 9   # An action client can determine that a goal is LOST. This should not be~%                            #    sent over the wire by an action server~%~%#Allow for the user to associate a string with GoalStatus for debugging~%string text~%~%~%================================================================================~%MSG: iiwa_msgs/MoveAlongSplineResult~%# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%# Result~%bool success~%string error~%~%~%================================================================================~%MSG: iiwa_msgs/MoveAlongSplineActionFeedback~%# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%~%Header header~%actionlib_msgs/GoalStatus status~%MoveAlongSplineFeedback feedback~%~%================================================================================~%MSG: iiwa_msgs/MoveAlongSplineFeedback~%# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%# Feedback~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'MoveAlongSplineAction)))
  "Returns full string definition for message of type 'MoveAlongSplineAction"
  (cl:format cl:nil "# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%~%MoveAlongSplineActionGoal action_goal~%MoveAlongSplineActionResult action_result~%MoveAlongSplineActionFeedback action_feedback~%~%================================================================================~%MSG: iiwa_msgs/MoveAlongSplineActionGoal~%# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%~%Header header~%actionlib_msgs/GoalID goal_id~%MoveAlongSplineGoal goal~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%string frame_id~%~%================================================================================~%MSG: actionlib_msgs/GoalID~%# The stamp should store the time at which this goal was requested.~%# It is used by an action server when it tries to preempt all~%# goals that were requested before a certain time~%time stamp~%~%# The id provides a way to associate feedback and~%# result message with specific goal requests. The id~%# specified must be unique.~%string id~%~%~%================================================================================~%MSG: iiwa_msgs/MoveAlongSplineGoal~%# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%# Goal~%Spline spline~%~%~%================================================================================~%MSG: iiwa_msgs/Spline~%# The describes a motion along a spline~%~%SplineSegment[] segments~%================================================================================~%MSG: iiwa_msgs/SplineSegment~%# This message describes a segment of a spline path~%~%int32 SPL = 0~%int32 LIN =  1~%int32 CIRC = 2~%~%# The type of the spline segment~%int32 type~%~%# The endpoint of the current segment~%CartesianPose point~%~%# Auxiliary point. Only used for circular segments~%CartesianPose point_aux~%================================================================================~%MSG: iiwa_msgs/CartesianPose~%# Target Pose including redundancy information.~%geometry_msgs/PoseStamped poseStamped~%~%# If you have issues with the robot not executing the motion copy this value from the Cartesian Position Tab of the~%# robot SmartPad. Set both parameters to -1 to disable them.~%RedundancyInformation redundancy~%~%================================================================================~%MSG: geometry_msgs/PoseStamped~%# A Pose with reference coordinate frame and timestamp~%Header header~%Pose pose~%~%================================================================================~%MSG: geometry_msgs/Pose~%# A representation of pose in free space, composed of position and orientation. ~%Point position~%Quaternion orientation~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%================================================================================~%MSG: geometry_msgs/Quaternion~%# This represents an orientation in free space in quaternion form.~%~%float64 x~%float64 y~%float64 z~%float64 w~%~%================================================================================~%MSG: iiwa_msgs/RedundancyInformation~%# E1 parameter~%# Specifies Angle of the elbow joint.~%float64 e1~%~%# Status parameter~%#   Bit 0: 1 - The robot is working above its head~%#          0 - The robot is working in the ground area~%#   Bit 1: 1 - Angle A4 < 0°~%#          0 - Angle A4 >= 0°~%#   Bit 2: 1 - Angle A6 <= 0~%#          0 - Angle A6 > 0~%int32 status~%~%# Turn parameter~%# According to Sunrise handbook this is not used for the iiwa.~%int32 turn~%~%================================================================================~%MSG: iiwa_msgs/MoveAlongSplineActionResult~%# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%~%Header header~%actionlib_msgs/GoalStatus status~%MoveAlongSplineResult result~%~%================================================================================~%MSG: actionlib_msgs/GoalStatus~%GoalID goal_id~%uint8 status~%uint8 PENDING         = 0   # The goal has yet to be processed by the action server~%uint8 ACTIVE          = 1   # The goal is currently being processed by the action server~%uint8 PREEMPTED       = 2   # The goal received a cancel request after it started executing~%                            #   and has since completed its execution (Terminal State)~%uint8 SUCCEEDED       = 3   # The goal was achieved successfully by the action server (Terminal State)~%uint8 ABORTED         = 4   # The goal was aborted during execution by the action server due~%                            #    to some failure (Terminal State)~%uint8 REJECTED        = 5   # The goal was rejected by the action server without being processed,~%                            #    because the goal was unattainable or invalid (Terminal State)~%uint8 PREEMPTING      = 6   # The goal received a cancel request after it started executing~%                            #    and has not yet completed execution~%uint8 RECALLING       = 7   # The goal received a cancel request before it started executing,~%                            #    but the action server has not yet confirmed that the goal is canceled~%uint8 RECALLED        = 8   # The goal received a cancel request before it started executing~%                            #    and was successfully cancelled (Terminal State)~%uint8 LOST            = 9   # An action client can determine that a goal is LOST. This should not be~%                            #    sent over the wire by an action server~%~%#Allow for the user to associate a string with GoalStatus for debugging~%string text~%~%~%================================================================================~%MSG: iiwa_msgs/MoveAlongSplineResult~%# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%# Result~%bool success~%string error~%~%~%================================================================================~%MSG: iiwa_msgs/MoveAlongSplineActionFeedback~%# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%~%Header header~%actionlib_msgs/GoalStatus status~%MoveAlongSplineFeedback feedback~%~%================================================================================~%MSG: iiwa_msgs/MoveAlongSplineFeedback~%# ====== DO NOT MODIFY! AUTOGENERATED FROM AN ACTION DEFINITION ======~%# Feedback~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <MoveAlongSplineAction>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'action_goal))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'action_result))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'action_feedback))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <MoveAlongSplineAction>))
  "Converts a ROS message object to a list"
  (cl:list 'MoveAlongSplineAction
    (cl:cons ':action_goal (action_goal msg))
    (cl:cons ':action_result (action_result msg))
    (cl:cons ':action_feedback (action_feedback msg))
))

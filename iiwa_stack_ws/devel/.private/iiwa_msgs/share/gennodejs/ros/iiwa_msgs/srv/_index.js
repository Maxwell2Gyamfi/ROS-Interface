
"use strict";

let SetSmartServoLinSpeedLimits = require('./SetSmartServoLinSpeedLimits.js')
let SetWorkpiece = require('./SetWorkpiece.js')
let SetPTPCartesianSpeedLimits = require('./SetPTPCartesianSpeedLimits.js')
let ConfigureControlMode = require('./ConfigureControlMode.js')
let SetPTPJointSpeedLimits = require('./SetPTPJointSpeedLimits.js')
let TimeToDestination = require('./TimeToDestination.js')
let SetSmartServoJointSpeedLimits = require('./SetSmartServoJointSpeedLimits.js')
let SetEndpointFrame = require('./SetEndpointFrame.js')
let SetSpeedOverride = require('./SetSpeedOverride.js')

module.exports = {
  SetSmartServoLinSpeedLimits: SetSmartServoLinSpeedLimits,
  SetWorkpiece: SetWorkpiece,
  SetPTPCartesianSpeedLimits: SetPTPCartesianSpeedLimits,
  ConfigureControlMode: ConfigureControlMode,
  SetPTPJointSpeedLimits: SetPTPJointSpeedLimits,
  TimeToDestination: TimeToDestination,
  SetSmartServoJointSpeedLimits: SetSmartServoJointSpeedLimits,
  SetEndpointFrame: SetEndpointFrame,
  SetSpeedOverride: SetSpeedOverride,
};

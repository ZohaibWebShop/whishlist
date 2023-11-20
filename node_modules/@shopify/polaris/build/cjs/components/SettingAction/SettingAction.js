'use strict';

var React = require('react');
var SettingAction$1 = require('./SettingAction.scss.js');

function SettingAction({
  action,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: SettingAction$1.default.SettingAction
  }, /*#__PURE__*/React.createElement("div", {
    className: SettingAction$1.default.Setting
  }, children), /*#__PURE__*/React.createElement("div", {
    className: SettingAction$1.default.Action
  }, action));
}

exports.SettingAction = SettingAction;

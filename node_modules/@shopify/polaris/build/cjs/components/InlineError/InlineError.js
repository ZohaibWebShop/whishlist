'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var InlineError$1 = require('./InlineError.scss.js');
var hooks = require('../../utilities/features/hooks.js');
var Icon = require('../Icon/Icon.js');

function InlineError({
  message,
  fieldID
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  if (!message) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    id: errorTextID(fieldID),
    className: InlineError$1.default.InlineError
  }, /*#__PURE__*/React.createElement("div", {
    className: InlineError$1.default.Icon
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisSummerEditions2023 ? polarisIcons.CircleAlertMajor : polarisIcons.DiamondAlertMinor
  })), message);
}
function errorTextID(id) {
  return `${id}Error`;
}

exports.InlineError = InlineError;
exports.errorTextID = errorTextID;

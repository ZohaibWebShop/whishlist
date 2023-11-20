'use strict';

var React = require('react');
var MessageIndicator$1 = require('./MessageIndicator.scss.js');

function MessageIndicator({
  children,
  active
}) {
  const indicatorMarkup = active && /*#__PURE__*/React.createElement("div", {
    className: MessageIndicator$1.default.MessageIndicator
  });
  return /*#__PURE__*/React.createElement("div", {
    className: MessageIndicator$1.default.MessageIndicatorWrapper
  }, indicatorMarkup, children);
}

exports.MessageIndicator = MessageIndicator;

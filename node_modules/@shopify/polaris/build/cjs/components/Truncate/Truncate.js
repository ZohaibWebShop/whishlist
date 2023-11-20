'use strict';

var React = require('react');
var Truncate$1 = require('./Truncate.scss.js');

function Truncate({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: Truncate$1.default.Truncate
  }, children);
}

exports.Truncate = Truncate;

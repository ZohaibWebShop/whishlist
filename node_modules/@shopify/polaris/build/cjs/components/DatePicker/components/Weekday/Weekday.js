'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var DatePicker = require('../../DatePicker.scss.js');

const Weekday = /*#__PURE__*/React.memo(function Weekday({
  label,
  title,
  current
}) {
  const className = css.classNames(DatePicker.default.Weekday, current && DatePicker.default['Weekday-current']);
  return /*#__PURE__*/React.createElement("th", {
    "aria-label": label,
    scope: "col",
    className: className
  }, title);
});

exports.Weekday = Weekday;

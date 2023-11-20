'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var Indicator$1 = require('./Indicator.scss.js');

function Indicator({
  pulse = true
}) {
  const className = css.classNames(Indicator$1.default.Indicator, pulse && Indicator$1.default.pulseIndicator);
  return /*#__PURE__*/React.createElement("span", {
    className: className
  });
}

exports.Indicator = Indicator;

'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var Layout = require('../../Layout.scss.js');

function Section({
  children,
  secondary,
  fullWidth,
  oneHalf,
  oneThird
}) {
  const className = css.classNames(Layout.default.Section, secondary && Layout.default['Section-secondary'], fullWidth && Layout.default['Section-fullWidth'], oneHalf && Layout.default['Section-oneHalf'], oneThird && Layout.default['Section-oneThird']);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, children);
}

exports.Section = Section;

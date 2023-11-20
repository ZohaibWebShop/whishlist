'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var Checkbox$1 = require('./Checkbox.scss.js');
var Icon = require('../../../Icon/Icon.js');

function Checkbox({
  id: idProp,
  checked = false,
  disabled,
  active,
  onChange,
  name,
  value,
  role
}) {
  const uniqId = React.useId();
  const id = idProp ?? uniqId;
  const className = css.classNames(Checkbox$1.default.Checkbox, active && Checkbox$1.default.active);
  const inputClassName = css.classNames(Checkbox$1.default.Input);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    name: name,
    value: value,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    className: inputClassName,
    "aria-checked": checked,
    onChange: onChange,
    role: role
  }), /*#__PURE__*/React.createElement("div", {
    className: Checkbox$1.default.Backdrop
  }), /*#__PURE__*/React.createElement("div", {
    className: Checkbox$1.default.Icon
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.TickSmallMinor
  })));
}

exports.Checkbox = Checkbox;

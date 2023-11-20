'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var CheckableButton$1 = require('./CheckableButton.scss.js');
var Checkbox = require('../Checkbox/Checkbox.js');

const CheckableButton = /*#__PURE__*/React.forwardRef(function CheckableButton({
  accessibilityLabel,
  label = '',
  onToggleAll,
  selected,
  disabled,
  ariaLive
}, ref) {
  const checkBoxRef = React.useRef(null);
  function focus() {
    checkBoxRef?.current?.focus();
  }
  React.useImperativeHandle(ref, () => {
    return {
      focus
    };
  });
  const className = css.classNames(CheckableButton$1.default.CheckableButton);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    onClick: onToggleAll
  }, /*#__PURE__*/React.createElement("div", {
    className: CheckableButton$1.default.Checkbox
  }, /*#__PURE__*/React.createElement(Checkbox.Checkbox, {
    label: accessibilityLabel,
    labelHidden: true,
    checked: selected,
    disabled: disabled,
    onChange: onToggleAll,
    ref: checkBoxRef
  })), /*#__PURE__*/React.createElement("span", {
    className: CheckableButton$1.default.Label,
    "aria-live": ariaLive
  }, label));
});

exports.CheckableButton = CheckableButton;

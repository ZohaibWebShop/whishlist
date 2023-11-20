'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var FilterButton$1 = require('./FilterButton.scss.js');
var hooks = require('../../../../utilities/features/hooks.js');
var Button = require('../../../Button/Button.js');
var UnstyledButton = require('../../../UnstyledButton/UnstyledButton.js');

function FilterButton({
  onClick,
  label,
  icon,
  disabled,
  children
}) {
  const {
    polarisSummerEditions2023: se23
  } = hooks.useFeatures();
  const classes = css.classNames(FilterButton$1.default.FilterButton, disabled && FilterButton$1.default.Disabled);
  const buttonMarkup = se23 ? /*#__PURE__*/React.createElement(Button.Button, {
    size: "slim",
    icon: icon,
    onClick: onClick,
    disabled: disabled,
    accessibilityLabel: label
  }) : /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, {
    className: classes,
    onClick: onClick,
    disabled: disabled,
    accessibilityLabel: label
  }, children);
  return buttonMarkup;
}

exports.FilterButton = FilterButton;

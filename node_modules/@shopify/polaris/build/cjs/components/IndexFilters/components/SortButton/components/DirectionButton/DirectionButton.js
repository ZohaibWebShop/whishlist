'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../../../utilities/css.js');
var DirectionButton$1 = require('./DirectionButton.scss.js');
var hooks = require('../../../../../../utilities/features/hooks.js');
var UnstyledButton = require('../../../../../UnstyledButton/UnstyledButton.js');
var Icon = require('../../../../../Icon/Icon.js');

function DirectionButton({
  onClick,
  active,
  children,
  direction,
  value
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const classes = css.classNames(DirectionButton$1.default.DirectionButton, active && DirectionButton$1.default['DirectionButton-active']);
  function handleClick() {
    onClick([value]);
  }
  return /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, {
    className: classes,
    onClick: handleClick
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: direction === 'asc' ? polarisIcons.ArrowUpMinor : polarisIcons.ArrowDownMinor,
    color:
    // eslint-disable-next-line no-nested-ternary
    polarisSummerEditions2023 ? 'base' : active ? 'interactive' : 'base'
  }), /*#__PURE__*/React.createElement("span", {
    className: DirectionButton$1.default.Label
  }, children));
}

exports.DirectionButton = DirectionButton;

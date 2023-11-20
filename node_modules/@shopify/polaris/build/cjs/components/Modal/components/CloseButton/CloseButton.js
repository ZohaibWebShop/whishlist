'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var CloseButton$1 = require('./CloseButton.scss.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var hooks$1 = require('../../../../utilities/features/hooks.js');
var Button = require('../../../Button/Button.js');
var Icon = require('../../../Icon/Icon.js');

function CloseButton({
  pressed,
  titleHidden = false,
  onClick
}) {
  const i18n = hooks.useI18n();
  const {
    polarisSummerEditions2023
  } = hooks$1.useFeatures();
  return polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(Button.Button, {
    primary: true,
    plain: true,
    pressed: pressed,
    icon: polarisIcons.CancelMajor,
    onClick: onClick,
    accessibilityLabel: i18n.translate('Polaris.Common.close')
  }) : /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: css.classNames(CloseButton$1.default.CloseButton, titleHidden && CloseButton$1.default.titleHidden, pressed && CloseButton$1.default.pressed),
    "aria-label": i18n.translate('Polaris.Common.close')
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.MobileCancelMajor,
    color: "base"
  }));
}

exports.CloseButton = CloseButton;

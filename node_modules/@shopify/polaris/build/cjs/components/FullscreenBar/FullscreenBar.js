'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var FullscreenBar$1 = require('./FullscreenBar.scss.js');
var hooks = require('../../utilities/i18n/hooks.js');
var hooks$1 = require('../../utilities/features/hooks.js');
var Text = require('../Text/Text.js');
var Icon = require('../Icon/Icon.js');

function FullscreenBar({
  onAction,
  children
}) {
  const i18n = hooks.useI18n();
  const {
    polarisSummerEditions2023
  } = hooks$1.useFeatures();
  const backButtonMarkup = polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyLg"
  }, i18n.translate('Polaris.FullscreenBar.back')) : i18n.translate('Polaris.FullscreenBar.back');
  return /*#__PURE__*/React.createElement("div", {
    className: FullscreenBar$1.default.FullscreenBar
  }, /*#__PURE__*/React.createElement("button", {
    className: FullscreenBar$1.default.BackAction,
    onClick: onAction,
    "aria-label": i18n.translate('Polaris.FullscreenBar.accessibilityLabel')
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.ExitMajor
  }), backButtonMarkup), children);
}

exports.FullscreenBar = FullscreenBar;

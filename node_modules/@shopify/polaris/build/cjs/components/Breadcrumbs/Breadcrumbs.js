'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var focus = require('../../utilities/focus.js');
var Breadcrumbs$1 = require('./Breadcrumbs.scss.js');
var hooks = require('../../utilities/features/hooks.js');
var Icon = require('../Icon/Icon.js');
var Text = require('../Text/Text.js');
var UnstyledLink = require('../UnstyledLink/UnstyledLink.js');
var Button = require('../Button/Button.js');

function Breadcrumbs({
  backAction
}) {
  const {
    content
  } = backAction;
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const contentMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: Breadcrumbs$1.default.Icon
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.ArrowLeftMinor
  })), /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    visuallyHidden: true
  }, content));
  const breadcrumbMarkup = 'url' in backAction ? /*#__PURE__*/React.createElement(UnstyledLink.UnstyledLink, {
    key: content,
    url: backAction.url,
    className: Breadcrumbs$1.default.Breadcrumb,
    onMouseUp: focus.handleMouseUpByBlurring,
    "aria-label": backAction.accessibilityLabel
  }, contentMarkup) : /*#__PURE__*/React.createElement("button", {
    key: content,
    className: Breadcrumbs$1.default.Breadcrumb,
    onClick: backAction.onAction,
    onMouseUp: focus.handleMouseUpByBlurring,
    type: "button",
    "aria-label": backAction.accessibilityLabel
  }, contentMarkup);
  const summerEditionsBreadcrumbMarkup = /*#__PURE__*/React.createElement(Button.Button, {
    key: content,
    url: 'url' in backAction ? backAction.url : undefined,
    onClick: 'onAction' in backAction ? backAction.onAction : undefined,
    onPointerDown: focus.handleMouseUpByBlurring,
    icon: polarisIcons.ArrowLeftMinor,
    accessibilityLabel: backAction.accessibilityLabel ?? content
  });
  return /*#__PURE__*/React.createElement("nav", {
    role: "navigation"
  }, polarisSummerEditions2023 ? summerEditionsBreadcrumbMarkup : breadcrumbMarkup);
}

exports.Breadcrumbs = Breadcrumbs;

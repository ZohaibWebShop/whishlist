'use strict';

var React = require('react');
var hooks = require('../../../../utilities/features/hooks.js');
var utils = require('../../../Button/utils.js');
var HorizontalStack = require('../../../HorizontalStack/HorizontalStack.js');
var Box = require('../../../Box/Box.js');

function Footer({
  primaryAction,
  secondaryActions,
  children
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const primaryActionButton = primaryAction && utils.buttonsFrom(primaryAction, {
    primary: true
  }) || null;
  const secondaryActionButtons = secondaryActions && utils.buttonsFrom(secondaryActions) || null;
  const actions = primaryActionButton || secondaryActionButtons ? /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    gap: "2"
  }, secondaryActionButtons, primaryActionButton) : null;
  return /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    gap: "4",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(Box.Box, {
    borderColor: polarisSummerEditions2023 ? 'border' : 'border-subdued',
    borderBlockStartWidth: "1",
    minHeight: polarisSummerEditions2023 ? undefined : 'var(--p-space-16)',
    padding: "4",
    paddingInlineStart: polarisSummerEditions2023 ? undefined : '5',
    paddingInlineEnd: polarisSummerEditions2023 ? undefined : '5',
    width: "100%"
  }, /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    gap: "4",
    blockAlign: "center",
    align: "space-between"
  }, /*#__PURE__*/React.createElement(Box.Box, null, children), actions)));
}

exports.Footer = Footer;

'use strict';

var React = require('react');
var LegacyCard = require('../../LegacyCard.scss.js');
var utils = require('../../../Button/utils.js');
var LegacyStack = require('../../../LegacyStack/LegacyStack.js');
var hooks = require('../../../../utilities/features/hooks.js');
var ButtonGroup = require('../../../ButtonGroup/ButtonGroup.js');
var HorizontalStack = require('../../../HorizontalStack/HorizontalStack.js');
var Text = require('../../../Text/Text.js');

function Header({
  children,
  title,
  actions
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const actionMarkup = actions ? /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, null, utils.buttonsFrom(actions, {
    plain: true
  })) : null;
  const titleMarkup = /*#__PURE__*/React.isValidElement(title) ? title : /*#__PURE__*/React.createElement(Text.Text, {
    variant: polarisSummerEditions2023 ? 'headingSm' : 'headingMd',
    as: "h2"
  }, title);
  const headingMarkup =
  // eslint-disable-next-line no-nested-ternary
  actionMarkup || children ? polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    wrap: false,
    gap: "2",
    align: "space-between",
    blockAlign: "center"
  }, titleMarkup, /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    wrap: false,
    gap: "4",
    blockAlign: "center"
  }, actionMarkup, children)) : /*#__PURE__*/React.createElement(LegacyStack.LegacyStack, {
    alignment: "baseline"
  }, /*#__PURE__*/React.createElement(LegacyStack.LegacyStack.Item, {
    fill: true
  }, titleMarkup), actionMarkup, children) : titleMarkup;
  return /*#__PURE__*/React.createElement("div", {
    className: LegacyCard.default.Header
  }, headingMarkup);
}

exports.Header = Header;

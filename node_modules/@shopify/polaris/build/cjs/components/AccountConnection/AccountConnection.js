'use strict';

var React = require('react');
var breakpoints = require('../../utilities/breakpoints.js');
var utils = require('../Button/utils.js');
var Card = require('../Card/Card.js');
var SettingAction = require('../SettingAction/SettingAction.js');
var Avatar = require('../Avatar/Avatar.js');
var hooks = require('../../utilities/features/hooks.js');
var Box = require('../Box/Box.js');
var HorizontalStack = require('../HorizontalStack/HorizontalStack.js');
var VerticalStack = require('../VerticalStack/VerticalStack.js');
var Text = require('../Text/Text.js');

function AccountConnection({
  connected = false,
  action,
  avatarUrl,
  accountName = '',
  title,
  details,
  termsOfService
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const breakpoints$1 = breakpoints.useBreakpoints();
  const initials = accountName ? accountName.split(/\s+/).map(name => name[0]).join('') : undefined;
  const avatarMarkup = connected ? /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Avatar.Avatar, {
    accessibilityLabel: "",
    name: accountName,
    initials: initials,
    source: avatarUrl
  })) : null;
  const titleContent = title ? title : accountName;
  const titleMarkup = polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(Text.Text, {
    as: "h2",
    variant: "headingSm"
  }, titleContent) : titleContent;
  const detailsMarkup = details ? /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    color: "subdued"
  }, details) : null;
  const termsOfServiceMarkup = termsOfService ? /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockStart: polarisSummerEditions2023 && breakpoints$1.mdUp ? '4' : '5'
  }, termsOfService) : null;
  const actionElement = action ? utils.buttonFrom(action, {
    primary: !connected
  }) : null;
  return /*#__PURE__*/React.createElement(Card.Card, null, /*#__PURE__*/React.createElement(SettingAction.SettingAction, {
    action: actionElement
  }, /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    gap: "4"
  }, avatarMarkup, /*#__PURE__*/React.createElement(VerticalStack.VerticalStack, {
    gap: polarisSummerEditions2023 ? '1' : '2'
  }, titleMarkup, detailsMarkup))), termsOfServiceMarkup);
}

exports.AccountConnection = AccountConnection;

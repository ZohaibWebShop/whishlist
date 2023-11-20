import React from 'react';
import { useBreakpoints } from '../../utilities/breakpoints.js';
import { buttonFrom } from '../Button/utils.js';
import { Card } from '../Card/Card.js';
import { SettingAction } from '../SettingAction/SettingAction.js';
import { Avatar } from '../Avatar/Avatar.js';
import { useFeatures } from '../../utilities/features/hooks.js';
import { Box } from '../Box/Box.js';
import { HorizontalStack } from '../HorizontalStack/HorizontalStack.js';
import { VerticalStack } from '../VerticalStack/VerticalStack.js';
import { Text } from '../Text/Text.js';

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
  } = useFeatures();
  const breakpoints = useBreakpoints();
  const initials = accountName ? accountName.split(/\s+/).map(name => name[0]).join('') : undefined;
  const avatarMarkup = connected ? /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Avatar, {
    accessibilityLabel: "",
    name: accountName,
    initials: initials,
    source: avatarUrl
  })) : null;
  const titleContent = title ? title : accountName;
  const titleMarkup = polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(Text, {
    as: "h2",
    variant: "headingSm"
  }, titleContent) : titleContent;
  const detailsMarkup = details ? /*#__PURE__*/React.createElement(Text, {
    as: "span",
    color: "subdued"
  }, details) : null;
  const termsOfServiceMarkup = termsOfService ? /*#__PURE__*/React.createElement(Box, {
    paddingBlockStart: polarisSummerEditions2023 && breakpoints.mdUp ? '4' : '5'
  }, termsOfService) : null;
  const actionElement = action ? buttonFrom(action, {
    primary: !connected
  }) : null;
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SettingAction, {
    action: actionElement
  }, /*#__PURE__*/React.createElement(HorizontalStack, {
    gap: "4"
  }, avatarMarkup, /*#__PURE__*/React.createElement(VerticalStack, {
    gap: polarisSummerEditions2023 ? '1' : '2'
  }, titleMarkup, detailsMarkup))), termsOfServiceMarkup);
}

export { AccountConnection };

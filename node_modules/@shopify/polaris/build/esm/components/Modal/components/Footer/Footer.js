import React from 'react';
import { useFeatures } from '../../../../utilities/features/hooks.js';
import { buttonsFrom } from '../../../Button/utils.js';
import { HorizontalStack } from '../../../HorizontalStack/HorizontalStack.js';
import { Box } from '../../../Box/Box.js';

function Footer({
  primaryAction,
  secondaryActions,
  children
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const primaryActionButton = primaryAction && buttonsFrom(primaryAction, {
    primary: true
  }) || null;
  const secondaryActionButtons = secondaryActions && buttonsFrom(secondaryActions) || null;
  const actions = primaryActionButton || secondaryActionButtons ? /*#__PURE__*/React.createElement(HorizontalStack, {
    gap: "2"
  }, secondaryActionButtons, primaryActionButton) : null;
  return /*#__PURE__*/React.createElement(HorizontalStack, {
    gap: "4",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    borderColor: polarisSummerEditions2023 ? 'border' : 'border-subdued',
    borderBlockStartWidth: "1",
    minHeight: polarisSummerEditions2023 ? undefined : 'var(--p-space-16)',
    padding: "4",
    paddingInlineStart: polarisSummerEditions2023 ? undefined : '5',
    paddingInlineEnd: polarisSummerEditions2023 ? undefined : '5',
    width: "100%"
  }, /*#__PURE__*/React.createElement(HorizontalStack, {
    gap: "4",
    blockAlign: "center",
    align: "space-between"
  }, /*#__PURE__*/React.createElement(Box, null, children), actions)));
}

export { Footer };

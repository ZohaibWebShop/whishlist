import React from 'react';
import { CloseButton } from '../CloseButton/CloseButton.js';
import { HorizontalGrid } from '../../../HorizontalGrid/HorizontalGrid.js';
import { useFeatures } from '../../../../utilities/features/hooks.js';
import { Box } from '../../../Box/Box.js';
import { HorizontalStack } from '../../../HorizontalStack/HorizontalStack.js';
import { Text } from '../../../Text/Text.js';

function Header({
  id,
  children,
  closing,
  titleHidden,
  onClose
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const headerPaddingInline = polarisSummerEditions2023 ? '4' : '5';
  const headerPaddingBlock = '4';
  if (titleHidden || !children) {
    return polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(Box, {
      position: "absolute",
      insetInlineEnd: headerPaddingInline,
      insetBlockStart: headerPaddingBlock,
      zIndex: "1"
    }, /*#__PURE__*/React.createElement(CloseButton, {
      titleHidden: titleHidden,
      onClick: onClose
    })) : /*#__PURE__*/React.createElement(Box, {
      position: "absolute",
      insetInlineEnd: "0",
      zIndex: "1"
    }, /*#__PURE__*/React.createElement(HorizontalStack, {
      gap: "4",
      align: "end",
      blockAlign: "center"
    }, /*#__PURE__*/React.createElement(CloseButton, {
      titleHidden: titleHidden,
      onClick: onClose
    })));
  }
  return /*#__PURE__*/React.createElement(Box, {
    paddingBlockStart: "4",
    paddingBlockEnd: "4",
    paddingInlineStart: headerPaddingInline,
    paddingInlineEnd: headerPaddingInline,
    borderBlockEndWidth: "1",
    borderColor: polarisSummerEditions2023 ? 'border' : 'border-subdued',
    background: polarisSummerEditions2023 ? 'bg-secondary-experimental' : undefined
  }, /*#__PURE__*/React.createElement(HorizontalGrid, {
    columns: {
      xs: '1fr auto'
    },
    gap: "4"
  }, /*#__PURE__*/React.createElement(HorizontalStack, {
    gap: "4",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(Text, {
    id: id,
    as: "h2",
    variant: polarisSummerEditions2023 ? 'headingMd' : 'headingLg',
    breakWord: true
  }, children)), /*#__PURE__*/React.createElement(CloseButton, {
    pressed: closing,
    titleHidden: titleHidden,
    onClick: onClose
  })));
}

export { Header };

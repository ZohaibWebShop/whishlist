'use strict';

var React = require('react');
var CloseButton = require('../CloseButton/CloseButton.js');
var HorizontalGrid = require('../../../HorizontalGrid/HorizontalGrid.js');
var hooks = require('../../../../utilities/features/hooks.js');
var Box = require('../../../Box/Box.js');
var HorizontalStack = require('../../../HorizontalStack/HorizontalStack.js');
var Text = require('../../../Text/Text.js');

function Header({
  id,
  children,
  closing,
  titleHidden,
  onClose
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const headerPaddingInline = polarisSummerEditions2023 ? '4' : '5';
  const headerPaddingBlock = '4';
  if (titleHidden || !children) {
    return polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(Box.Box, {
      position: "absolute",
      insetInlineEnd: headerPaddingInline,
      insetBlockStart: headerPaddingBlock,
      zIndex: "1"
    }, /*#__PURE__*/React.createElement(CloseButton.CloseButton, {
      titleHidden: titleHidden,
      onClick: onClose
    })) : /*#__PURE__*/React.createElement(Box.Box, {
      position: "absolute",
      insetInlineEnd: "0",
      zIndex: "1"
    }, /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
      gap: "4",
      align: "end",
      blockAlign: "center"
    }, /*#__PURE__*/React.createElement(CloseButton.CloseButton, {
      titleHidden: titleHidden,
      onClick: onClose
    })));
  }
  return /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockStart: "4",
    paddingBlockEnd: "4",
    paddingInlineStart: headerPaddingInline,
    paddingInlineEnd: headerPaddingInline,
    borderBlockEndWidth: "1",
    borderColor: polarisSummerEditions2023 ? 'border' : 'border-subdued',
    background: polarisSummerEditions2023 ? 'bg-secondary-experimental' : undefined
  }, /*#__PURE__*/React.createElement(HorizontalGrid.HorizontalGrid, {
    columns: {
      xs: '1fr auto'
    },
    gap: "4"
  }, /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    gap: "4",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(Text.Text, {
    id: id,
    as: "h2",
    variant: polarisSummerEditions2023 ? 'headingMd' : 'headingLg',
    breakWord: true
  }, children)), /*#__PURE__*/React.createElement(CloseButton.CloseButton, {
    pressed: closing,
    titleHidden: titleHidden,
    onClick: onClose
  })));
}

exports.Header = Header;

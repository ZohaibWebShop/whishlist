'use strict';

var React = require('react');
var Item = require('../Item/Item.js');
var VerticalStack = require('../../../VerticalStack/VerticalStack.js');
var hooks = require('../../../../utilities/features/hooks.js');
var Box = require('../../../Box/Box.js');
var HorizontalStack = require('../../../HorizontalStack/HorizontalStack.js');
var Text = require('../../../Text/Text.js');

function Section({
  section,
  hasMultipleSections,
  isFirst,
  actionRole,
  onActionAnyItem
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const handleAction = itemOnAction => {
    return () => {
      if (itemOnAction) {
        itemOnAction();
      }
      if (onActionAnyItem) {
        onActionAnyItem();
      }
    };
  };
  const actionMarkup = section.items.map(({
    content,
    helpText,
    onAction,
    ...item
  }, index) => {
    const itemMarkup = /*#__PURE__*/React.createElement(Item.Item, Object.assign({
      content: content,
      helpText: helpText,
      role: actionRole,
      onAction: handleAction(onAction)
    }, item));
    return /*#__PURE__*/React.createElement(Box.Box, {
      as: "li",
      key: `${content}-${index}`,
      role: actionRole === 'menuitem' ? 'presentation' : undefined
    }, polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
      wrap: false
    }, itemMarkup) : itemMarkup);
  });
  let titleMarkup = null;
  if (section.title) {
    titleMarkup = typeof section.title === 'string' ? /*#__PURE__*/React.createElement(Box.Box, polarisSummerEditions2023 ? {
      paddingBlockStart: '3',
      paddingBlockEnd: '1',
      paddingInlineStart: '3',
      paddingInlineEnd: '3'
    } : {
      paddingBlockStart: '4',
      paddingInlineStart: '4',
      paddingBlockEnd: '2',
      paddingInlineEnd: '4'
    }, /*#__PURE__*/React.createElement(Text.Text, {
      as: "p",
      variant: polarisSummerEditions2023 ? 'headingSm' : 'headingXs'
    }, section.title)) : /*#__PURE__*/React.createElement(Box.Box, {
      padding: "2",
      paddingInlineEnd: "1_5-experimental"
    }, section.title);
  }
  let sectionRole;
  switch (actionRole) {
    case 'option':
      sectionRole = 'presentation';
      break;
    case 'menuitem':
      sectionRole = !hasMultipleSections ? 'menu' : 'presentation';
      break;
    default:
      sectionRole = undefined;
      break;
  }
  const sectionMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, titleMarkup, /*#__PURE__*/React.createElement(Box.Box, Object.assign({
    as: polarisSummerEditions2023 ? 'div' : 'ul',
    padding: polarisSummerEditions2023 ? '1_5-experimental' : '2'
  }, hasMultipleSections && {
    paddingBlockStart: '0'
  }, sectionRole && !polarisSummerEditions2023 && {
    role: sectionRole
  }, {
    tabIndex: !hasMultipleSections ? -1 : undefined
  }), polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(VerticalStack.VerticalStack, Object.assign({
    gap: "1",
    as: "ul"
  }, sectionRole && {
    role: sectionRole
  }), actionMarkup) : actionMarkup));
  return hasMultipleSections ? /*#__PURE__*/React.createElement(Box.Box, Object.assign({
    as: "li",
    role: "presentation",
    borderColor: "border-subdued"
  }, !isFirst && {
    borderBlockStartWidth: '1'
  }, !section.title && {
    paddingBlockStart: polarisSummerEditions2023 ? '1_5-experimental' : '2'
  }), sectionMarkup) : sectionMarkup;
}

exports.Section = Section;

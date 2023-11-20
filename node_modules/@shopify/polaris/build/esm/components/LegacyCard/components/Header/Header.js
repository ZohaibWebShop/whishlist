import React, { isValidElement } from 'react';
import styles from '../../LegacyCard.scss.js';
import { buttonsFrom } from '../../../Button/utils.js';
import { LegacyStack } from '../../../LegacyStack/LegacyStack.js';
import { useFeatures } from '../../../../utilities/features/hooks.js';
import { ButtonGroup } from '../../../ButtonGroup/ButtonGroup.js';
import { HorizontalStack } from '../../../HorizontalStack/HorizontalStack.js';
import { Text } from '../../../Text/Text.js';

function Header({
  children,
  title,
  actions
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const actionMarkup = actions ? /*#__PURE__*/React.createElement(ButtonGroup, null, buttonsFrom(actions, {
    plain: true
  })) : null;
  const titleMarkup = /*#__PURE__*/isValidElement(title) ? title : /*#__PURE__*/React.createElement(Text, {
    variant: polarisSummerEditions2023 ? 'headingSm' : 'headingMd',
    as: "h2"
  }, title);
  const headingMarkup =
  // eslint-disable-next-line no-nested-ternary
  actionMarkup || children ? polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(HorizontalStack, {
    wrap: false,
    gap: "2",
    align: "space-between",
    blockAlign: "center"
  }, titleMarkup, /*#__PURE__*/React.createElement(HorizontalStack, {
    wrap: false,
    gap: "4",
    blockAlign: "center"
  }, actionMarkup, children)) : /*#__PURE__*/React.createElement(LegacyStack, {
    alignment: "baseline"
  }, /*#__PURE__*/React.createElement(LegacyStack.Item, {
    fill: true
  }, titleMarkup), actionMarkup, children) : titleMarkup;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.Header
  }, headingMarkup);
}

export { Header };

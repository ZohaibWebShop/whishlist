import React from 'react';
import { CircleAlertMajor, DiamondAlertMinor } from '@shopify/polaris-icons';
import styles from './InlineError.scss.js';
import { useFeatures } from '../../utilities/features/hooks.js';
import { Icon } from '../Icon/Icon.js';

function InlineError({
  message,
  fieldID
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  if (!message) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    id: errorTextID(fieldID),
    className: styles.InlineError
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Icon
  }, /*#__PURE__*/React.createElement(Icon, {
    source: polarisSummerEditions2023 ? CircleAlertMajor : DiamondAlertMinor
  })), message);
}
function errorTextID(id) {
  return `${id}Error`;
}

export { InlineError, errorTextID };

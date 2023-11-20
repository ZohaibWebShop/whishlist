import React from 'react';
import { classNames } from '../../utilities/css.js';
import styles from './Labelled.scss.js';
import { InlineError } from '../InlineError/InlineError.js';
import { Label } from '../Label/Label.js';
export { labelID } from '../Label/Label.js';
import { useFeatures } from '../../utilities/features/hooks.js';
import { buttonFrom } from '../Button/utils.js';
import { Text } from '../Text/Text.js';

function Labelled({
  id,
  label,
  error,
  action,
  helpText,
  children,
  labelHidden,
  requiredIndicator,
  disabled,
  readOnly,
  ...rest
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const className = classNames(labelHidden && styles.hidden, disabled && styles.disabled, polarisSummerEditions2023 && readOnly && styles.readOnly);
  const actionMarkup = action ? /*#__PURE__*/React.createElement("div", {
    className: styles.Action
  }, buttonFrom(action, {
    plain: true
  })) : null;
  const helpTextMarkup = helpText ? /*#__PURE__*/React.createElement("div", {
    className: styles.HelpText,
    id: helpTextID(id),
    "aria-disabled": disabled
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    color: "subdued",
    breakWord: true
  }, helpText)) : null;
  const errorMarkup = error && typeof error !== 'boolean' && /*#__PURE__*/React.createElement("div", {
    className: styles.Error
  }, /*#__PURE__*/React.createElement(InlineError, {
    message: error,
    fieldID: id
  }));
  const labelMarkup = label ? /*#__PURE__*/React.createElement("div", {
    className: styles.LabelWrapper
  }, /*#__PURE__*/React.createElement(Label, Object.assign({
    id: id,
    requiredIndicator: requiredIndicator
  }, rest, {
    hidden: false
  }), label), actionMarkup) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, labelMarkup, children, errorMarkup, helpTextMarkup);
}
function helpTextID(id) {
  return `${id}HelpText`;
}

export { Labelled, helpTextID };

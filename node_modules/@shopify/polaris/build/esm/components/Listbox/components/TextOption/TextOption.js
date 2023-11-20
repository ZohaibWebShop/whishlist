import React, { memo, useContext } from 'react';
import { TickMinor } from '@shopify/polaris-icons';
import { classNames } from '../../../../utilities/css.js';
import { ComboboxListboxOptionContext } from '../../../../utilities/combobox/context.js';
import { ActionContext } from '../../../../utilities/listbox/context.js';
import styles from './TextOption.scss.js';
import { Checkbox } from '../../../Checkbox/Checkbox.js';
import { useFeatures } from '../../../../utilities/features/hooks.js';
import { Box } from '../../../Box/Box.js';
import { HorizontalStack } from '../../../HorizontalStack/HorizontalStack.js';
import { Icon } from '../../../Icon/Icon.js';

const TextOption = /*#__PURE__*/memo(function TextOption({
  children,
  selected,
  disabled
}) {
  const {
    allowMultiple
  } = useContext(ComboboxListboxOptionContext);
  const isAction = useContext(ActionContext);
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const textOptionClassName = classNames(styles.TextOption, selected && !allowMultiple && styles.selected, disabled && styles.disabled, allowMultiple && styles.allowMultiple, isAction && styles.isAction);
  const optionMarkup = polarisSummerEditions2023 && selected ? /*#__PURE__*/React.createElement(Box, {
    width: "100%"
  }, /*#__PURE__*/React.createElement(HorizontalStack, {
    wrap: false,
    align: "space-between",
    gap: "2"
  }, children, /*#__PURE__*/React.createElement(HorizontalStack, {
    align: "end"
  }, /*#__PURE__*/React.createElement(Icon, {
    source: TickMinor
  })))) : /*#__PURE__*/React.createElement(React.Fragment, null, children);
  return /*#__PURE__*/React.createElement("div", {
    className: textOptionClassName
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Content
  }, allowMultiple && !isAction ? /*#__PURE__*/React.createElement("div", {
    className: styles.Checkbox
  }, /*#__PURE__*/React.createElement(Checkbox, {
    disabled: disabled,
    checked: selected,
    label: children
  })) : optionMarkup));
});

export { TextOption };

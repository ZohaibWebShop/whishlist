import React, { useId, useRef, useEffect } from 'react';
import { CircleCancelMinor } from '@shopify/polaris-icons';
import { classNames } from '../../../../utilities/css.js';
import styles from './SearchField.scss.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { useFeatures } from '../../../../utilities/features/hooks.js';
import { UnstyledButton } from '../../../UnstyledButton/UnstyledButton.js';
import { Text } from '../../../Text/Text.js';
import { Icon } from '../../../Icon/Icon.js';
import { TextField } from '../../../TextField/TextField.js';

function SearchField({
  onChange,
  onClear,
  onFocus,
  onBlur,
  focused,
  value,
  placeholder,
  disabled,
  borderlessQueryField
}) {
  const i18n = useI18n();
  const id = useId();
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const inputRef = useRef(null);
  function handleChange(value) {
    onChange(value);
  }
  useEffect(() => {
    if (focused) inputRef.current?.focus();
  }, [focused]);
  function handleClear() {
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  }
  return polarisSummerEditions2023 ? /*#__PURE__*/React.createElement("div", {
    className: styles.SearchField
  }, /*#__PURE__*/React.createElement("label", {
    className: styles.Label,
    htmlFor: id
  }, placeholder), /*#__PURE__*/React.createElement("input", {
    id: id,
    ref: inputRef,
    className: classNames(styles.Input, focused && styles.focused, borderlessQueryField && styles.borderless),
    value: value,
    onChange: event => handleChange(event?.currentTarget.value ?? value),
    onFocus: onFocus,
    onBlur: onBlur,
    autoComplete: "off",
    placeholder: placeholder,
    disabled: disabled
  }), value !== '' && /*#__PURE__*/React.createElement(UnstyledButton, {
    className: classNames(styles.ClearButton, focused && styles['ClearButton-focused']),
    onClick: () => handleClear(),
    disabled: disabled
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, i18n.translate('Polaris.Common.clear')), /*#__PURE__*/React.createElement(Icon, {
    source: CircleCancelMinor,
    color: "subdued"
  }))) : /*#__PURE__*/React.createElement(TextField, {
    value: value,
    onChange: handleChange,
    onFocus: onFocus,
    onBlur: onBlur,
    label: placeholder,
    labelHidden: true,
    autoComplete: "off",
    focused: focused,
    placeholder: placeholder,
    clearButton: true,
    onClearButtonClick: handleClear,
    disabled: disabled,
    borderless: borderlessQueryField
  });
}

export { SearchField };

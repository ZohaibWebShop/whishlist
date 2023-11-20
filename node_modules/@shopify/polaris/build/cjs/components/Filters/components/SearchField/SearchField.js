'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var SearchField$1 = require('./SearchField.scss.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var hooks$1 = require('../../../../utilities/features/hooks.js');
var UnstyledButton = require('../../../UnstyledButton/UnstyledButton.js');
var Text = require('../../../Text/Text.js');
var Icon = require('../../../Icon/Icon.js');
var TextField = require('../../../TextField/TextField.js');

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
  const i18n = hooks.useI18n();
  const id = React.useId();
  const {
    polarisSummerEditions2023
  } = hooks$1.useFeatures();
  const inputRef = React.useRef(null);
  function handleChange(value) {
    onChange(value);
  }
  React.useEffect(() => {
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
    className: SearchField$1.default.SearchField
  }, /*#__PURE__*/React.createElement("label", {
    className: SearchField$1.default.Label,
    htmlFor: id
  }, placeholder), /*#__PURE__*/React.createElement("input", {
    id: id,
    ref: inputRef,
    className: css.classNames(SearchField$1.default.Input, focused && SearchField$1.default.focused, borderlessQueryField && SearchField$1.default.borderless),
    value: value,
    onChange: event => handleChange(event?.currentTarget.value ?? value),
    onFocus: onFocus,
    onBlur: onBlur,
    autoComplete: "off",
    placeholder: placeholder,
    disabled: disabled
  }), value !== '' && /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, {
    className: css.classNames(SearchField$1.default.ClearButton, focused && SearchField$1.default['ClearButton-focused']),
    onClick: () => handleClear(),
    disabled: disabled
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    visuallyHidden: true
  }, i18n.translate('Polaris.Common.clear')), /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.CircleCancelMinor,
    color: "subdued"
  }))) : /*#__PURE__*/React.createElement(TextField.TextField, {
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

exports.SearchField = SearchField;

'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var useToggle = require('../../../../utilities/use-toggle.js');
var css = require('../../../../utilities/css.js');
var Option$1 = require('./Option.scss.js');
var Checkbox$1 = require('../Checkbox/Checkbox.js');
var hooks = require('../../../../utilities/features/hooks.js');
var Checkbox = require('../../../Checkbox/Checkbox.js');
var HorizontalStack = require('../../../HorizontalStack/HorizontalStack.js');
var Icon = require('../../../Icon/Icon.js');
var Scrollable = require('../../../Scrollable/Scrollable.js');

function Option({
  label,
  value,
  id,
  select,
  active,
  allowMultiple,
  disabled,
  role,
  media,
  onClick,
  section,
  index,
  verticalAlign,
  onPointerEnter,
  onFocus
}) {
  const {
    value: focused,
    toggle: toggleFocused
  } = useToggle.useToggle(false);
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const handleClick = React.useCallback(() => {
    if (disabled) {
      return;
    }
    onClick(section, index);
  }, [disabled, index, onClick, section]);
  const handlePointerEnter = React.useCallback(() => {
    if (disabled) {
      return;
    }
    onPointerEnter(section, index);
  }, [disabled, onPointerEnter, section, index]);
  const handleFocus = React.useCallback(() => {
    toggleFocused();
    onFocus(section, index);
  }, [toggleFocused, onFocus, section, index]);
  const mediaMarkup = media ? /*#__PURE__*/React.createElement("div", {
    className: Option$1.default.Media
  }, media) : null;
  const singleSelectClassName = css.classNames(Option$1.default.SingleSelectOption, focused && Option$1.default.focused, disabled && Option$1.default.disabled, select && Option$1.default.select, active && Option$1.default.active, verticalAlign && Option$1.default[css.variationName('verticalAlign', verticalAlign)]);
  const multiSelectClassName = css.classNames(Option$1.default.Label, disabled && Option$1.default.disabled, active && Option$1.default.active, select && Option$1.default.select, verticalAlign && Option$1.default[css.variationName('verticalAlign', verticalAlign)], polarisSummerEditions2023 && allowMultiple && Option$1.default.CheckboxLabel, polarisSummerEditions2023 && allowMultiple && Option$1.default.MultiSelectOption);
  const checkBoxRole = role === 'option' ? 'presentation' : undefined;
  const optionMarkup = allowMultiple ? /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    className: multiSelectClassName
  }, /*#__PURE__*/React.createElement("div", {
    className: Option$1.default.Checkbox
  }, polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(Checkbox.Checkbox, {
    id: id,
    label: "",
    ariaDescribedBy: `${id}-label`,
    value: value,
    checked: select,
    disabled: disabled,
    onChange: handleClick
  }) : /*#__PURE__*/React.createElement(Checkbox$1.Checkbox, {
    id: id,
    value: value,
    checked: select,
    active: active,
    disabled: disabled,
    onChange: handleClick,
    role: checkBoxRole
  })), mediaMarkup, polarisSummerEditions2023 ? /*#__PURE__*/React.createElement("span", {
    id: `${id}-label`
  }, label) : label) : /*#__PURE__*/React.createElement("button", {
    id: id,
    type: "button",
    className: singleSelectClassName,
    onClick: handleClick,
    disabled: disabled,
    onFocus: handleFocus,
    onBlur: toggleFocused,
    "aria-pressed": polarisSummerEditions2023 ? active || select : active
  }, polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    wrap: false,
    blockAlign: verticalAlignToBlockAlign(verticalAlign)
  }, mediaMarkup, label), (select || active) && /*#__PURE__*/React.createElement("span", {
    className: Option$1.default.Icon
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.TickMinor
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, mediaMarkup, label));
  const scrollMarkup = active ? /*#__PURE__*/React.createElement(Scrollable.Scrollable.ScrollTo, null) : null;
  return /*#__PURE__*/React.createElement("li", {
    key: id,
    className: Option$1.default.Option,
    tabIndex: -1,
    onPointerEnter: handlePointerEnter
  }, scrollMarkup, optionMarkup);
}
function verticalAlignToBlockAlign(verticalAlign) {
  switch (verticalAlign) {
    case 'top':
      return 'start';
    case 'center':
      return 'center';
    case 'bottom':
      return 'end';
    default:
      return 'start';
  }
}

exports.Option = Option;

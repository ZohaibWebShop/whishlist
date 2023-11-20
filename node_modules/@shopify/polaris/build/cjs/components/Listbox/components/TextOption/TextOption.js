'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var context = require('../../../../utilities/combobox/context.js');
var context$1 = require('../../../../utilities/listbox/context.js');
var TextOption$1 = require('./TextOption.scss.js');
var Checkbox = require('../../../Checkbox/Checkbox.js');
var hooks = require('../../../../utilities/features/hooks.js');
var Box = require('../../../Box/Box.js');
var HorizontalStack = require('../../../HorizontalStack/HorizontalStack.js');
var Icon = require('../../../Icon/Icon.js');

const TextOption = /*#__PURE__*/React.memo(function TextOption({
  children,
  selected,
  disabled
}) {
  const {
    allowMultiple
  } = React.useContext(context.ComboboxListboxOptionContext);
  const isAction = React.useContext(context$1.ActionContext);
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const textOptionClassName = css.classNames(TextOption$1.default.TextOption, selected && !allowMultiple && TextOption$1.default.selected, disabled && TextOption$1.default.disabled, allowMultiple && TextOption$1.default.allowMultiple, isAction && TextOption$1.default.isAction);
  const optionMarkup = polarisSummerEditions2023 && selected ? /*#__PURE__*/React.createElement(Box.Box, {
    width: "100%"
  }, /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    wrap: false,
    align: "space-between",
    gap: "2"
  }, children, /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    align: "end"
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.TickMinor
  })))) : /*#__PURE__*/React.createElement(React.Fragment, null, children);
  return /*#__PURE__*/React.createElement("div", {
    className: textOptionClassName
  }, /*#__PURE__*/React.createElement("div", {
    className: TextOption$1.default.Content
  }, allowMultiple && !isAction ? /*#__PURE__*/React.createElement("div", {
    className: TextOption$1.default.Checkbox
  }, /*#__PURE__*/React.createElement(Checkbox.Checkbox, {
    disabled: disabled,
    checked: selected,
    label: children
  })) : optionMarkup));
});

exports.TextOption = TextOption;

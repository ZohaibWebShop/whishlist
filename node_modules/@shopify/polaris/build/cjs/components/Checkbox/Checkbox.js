'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../utilities/css.js');
var context = require('../../utilities/listbox/context.js');
var Checkbox$1 = require('./Checkbox.scss.js');
var Choice = require('../Choice/Choice.js');
var InlineError = require('../InlineError/InlineError.js');
var hooks = require('../../utilities/features/hooks.js');
var Icon = require('../Icon/Icon.js');

const Checkbox = /*#__PURE__*/React.forwardRef(function Checkbox({
  ariaControls,
  ariaDescribedBy: ariaDescribedByProp,
  label,
  labelHidden,
  checked = false,
  helpText,
  disabled,
  id: idProp,
  name,
  value,
  error,
  onChange,
  onFocus,
  onBlur,
  labelClassName,
  fill,
  bleed,
  bleedBlockStart,
  bleedBlockEnd,
  bleedInlineStart,
  bleedInlineEnd
}, ref) {
  const inputNode = React.useRef(null);
  const uniqId = React.useId();
  const id = idProp ?? uniqId;
  const isWithinListbox = React.useContext(context.WithinListboxContext);
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputNode.current) {
        inputNode.current.focus();
      }
    }
  }));
  const handleBlur = () => {
    onBlur && onBlur();
  };
  const handleOnClick = () => {
    if (onChange == null || inputNode.current == null || disabled) {
      return;
    }
    onChange(inputNode.current.checked, id);
    inputNode.current.focus();
  };
  const describedBy = [];
  if (error && typeof error !== 'boolean') {
    describedBy.push(InlineError.errorTextID(id));
  }
  if (helpText) {
    describedBy.push(Choice.helpTextID(id));
  }
  if (ariaDescribedByProp) {
    describedBy.push(ariaDescribedByProp);
  }
  const ariaDescribedBy = describedBy.length ? describedBy.join(' ') : undefined;
  const wrapperClassName = css.classNames(Checkbox$1.default.Checkbox, error && Checkbox$1.default.error);
  const isIndeterminate = checked === 'indeterminate';
  const isChecked = !isIndeterminate && Boolean(checked);
  const indeterminateAttributes = isIndeterminate ? {
    indeterminate: 'true',
    'aria-checked': 'mixed'
  } : {
    'aria-checked': isChecked
  };
  const iconSource = isIndeterminate ? polarisIcons.MinusMinor : polarisIcons.TickSmallMinor;
  const animatedTickIcon = polarisSummerEditions2023 && !isIndeterminate;
  const iconSourceSe23 = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 16 16",
    shapeRendering: "geometricPrecision",
    textRendering: "geometricPrecision"
  }, /*#__PURE__*/React.createElement("path", {
    className: css.classNames(checked && Checkbox$1.default.checked),
    d: "M1.5,5.5L3.44655,8.22517C3.72862,8.62007,4.30578,8.64717,4.62362,8.28044L10.5,1.5",
    transform: "translate(2 2.980376)",
    opacity: "0",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    pathLength: "1"
  }));
  const inputClassName = css.classNames(Checkbox$1.default.Input, isIndeterminate && Checkbox$1.default['Input-indeterminate']);
  const extraChoiceProps = {
    helpText,
    error,
    bleed,
    bleedBlockStart,
    bleedBlockEnd,
    bleedInlineStart,
    bleedInlineEnd
  };
  return /*#__PURE__*/React.createElement(Choice.Choice, Object.assign({
    id: id,
    label: label,
    labelHidden: labelHidden,
    disabled: disabled,
    labelClassName: css.classNames(Checkbox$1.default.ChoiceLabel, labelClassName),
    fill: fill
  }, extraChoiceProps), /*#__PURE__*/React.createElement("span", {
    className: wrapperClassName
  }, /*#__PURE__*/React.createElement("input", Object.assign({
    ref: inputNode,
    id: id,
    name: name,
    value: value,
    type: "checkbox",
    checked: isChecked,
    disabled: disabled,
    className: inputClassName,
    onBlur: handleBlur,
    onChange: noop,
    onClick: handleOnClick,
    onFocus: onFocus,
    "aria-invalid": error != null,
    "aria-controls": ariaControls,
    "aria-describedby": ariaDescribedBy,
    role: isWithinListbox ? 'presentation' : 'checkbox'
  }, indeterminateAttributes)), /*#__PURE__*/React.createElement("span", {
    className: Checkbox$1.default.Backdrop,
    onClick: stopPropagation,
    onKeyUp: stopPropagation
  }), /*#__PURE__*/React.createElement("span", {
    className: css.classNames(Checkbox$1.default.Icon, animatedTickIcon && Checkbox$1.default.animated)
  }, animatedTickIcon ? iconSourceSe23 : /*#__PURE__*/React.createElement(Icon.Icon, {
    source: iconSource
  }))));
});
function noop() {}
function stopPropagation(event) {
  event.stopPropagation();
}

exports.Checkbox = Checkbox;

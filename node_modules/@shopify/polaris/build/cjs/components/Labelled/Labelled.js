'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var Labelled$1 = require('./Labelled.scss.js');
var InlineError = require('../InlineError/InlineError.js');
var Label = require('../Label/Label.js');
var hooks = require('../../utilities/features/hooks.js');
var utils = require('../Button/utils.js');
var Text = require('../Text/Text.js');

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
  } = hooks.useFeatures();
  const className = css.classNames(labelHidden && Labelled$1.default.hidden, disabled && Labelled$1.default.disabled, polarisSummerEditions2023 && readOnly && Labelled$1.default.readOnly);
  const actionMarkup = action ? /*#__PURE__*/React.createElement("div", {
    className: Labelled$1.default.Action
  }, utils.buttonFrom(action, {
    plain: true
  })) : null;
  const helpTextMarkup = helpText ? /*#__PURE__*/React.createElement("div", {
    className: Labelled$1.default.HelpText,
    id: helpTextID(id),
    "aria-disabled": disabled
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    color: "subdued",
    breakWord: true
  }, helpText)) : null;
  const errorMarkup = error && typeof error !== 'boolean' && /*#__PURE__*/React.createElement("div", {
    className: Labelled$1.default.Error
  }, /*#__PURE__*/React.createElement(InlineError.InlineError, {
    message: error,
    fieldID: id
  }));
  const labelMarkup = label ? /*#__PURE__*/React.createElement("div", {
    className: Labelled$1.default.LabelWrapper
  }, /*#__PURE__*/React.createElement(Label.Label, Object.assign({
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

exports.labelID = Label.labelID;
exports.Labelled = Labelled;
exports.helpTextID = helpTextID;

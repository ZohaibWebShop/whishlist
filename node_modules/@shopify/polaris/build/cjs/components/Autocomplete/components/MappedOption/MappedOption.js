'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var MappedOption$1 = require('./MappedOption.scss.js');
var Listbox = require('../../../Listbox/Listbox.js');

const MappedOption = /*#__PURE__*/React.memo(function MappedOption({
  label,
  value,
  disabled,
  media,
  selected,
  singleSelection
}) {
  const mediaClassNames = css.classNames(MappedOption$1.default.Media, disabled && MappedOption$1.default.disabledMedia, singleSelection && MappedOption$1.default.singleSelectionMedia);
  const mediaMarkup = media ? /*#__PURE__*/React.createElement("div", {
    className: mediaClassNames
  }, media) : null;
  const accessibilityLabel = typeof label === 'string' ? label : undefined;
  return /*#__PURE__*/React.createElement(Listbox.Listbox.Option, {
    accessibilityLabel: accessibilityLabel,
    key: value,
    selected: selected,
    value: value,
    disabled: disabled
  }, /*#__PURE__*/React.createElement(Listbox.Listbox.TextOption, {
    selected: selected,
    disabled: disabled
  }, /*#__PURE__*/React.createElement("div", {
    className: MappedOption$1.default.Content
  }, mediaMarkup, label)));
});

exports.MappedOption = MappedOption;

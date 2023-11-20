'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var FilterButton = require('../FilterButton/FilterButton.js');
var hooks = require('../../../../utilities/features/hooks.js');
var Tooltip = require('../../../Tooltip/Tooltip.js');
var Text = require('../../../Text/Text.js');
var HorizontalStack = require('../../../HorizontalStack/HorizontalStack.js');
var Icon = require('../../../Icon/Icon.js');

function SearchFilterButton({
  onClick,
  label,
  disabled,
  tooltipContent,
  style,
  hideFilters,
  hideQueryField
}) {
  const {
    polarisSummerEditions2023: se23
  } = hooks.useFeatures();
  const iconMarkup = /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    gap: "0"
  }, hideQueryField ? null : /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.SearchMinor,
    color: "base"
  }), hideFilters ? null : /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.FilterMinor,
    color: "base"
  }));
  const childMarkup = !se23 ? iconMarkup : null;
  const activator = /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement(FilterButton.FilterButton, {
    onClick: onClick,
    label: label,
    disabled: disabled,
    icon: se23 ? iconMarkup : undefined
  }, childMarkup));
  const content = /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd",
    alignment: "center"
  }, tooltipContent);
  return /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
    content: content,
    preferredPosition: "above",
    hoverDelay: 400
  }, activator);
}

exports.SearchFilterButton = SearchFilterButton;

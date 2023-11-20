'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var LegacyCard = require('../../LegacyCard.scss.js');
var hooks = require('../../../../utilities/features/hooks.js');
var ButtonGroup = require('../../../ButtonGroup/ButtonGroup.js');
var utils = require('../../../Button/utils.js');
var LegacyStack = require('../../../LegacyStack/LegacyStack.js');
var Text = require('../../../Text/Text.js');

function Section({
  children,
  title,
  subdued,
  flush,
  fullWidth,
  actions,
  hideOnPrint
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const className = css.classNames(LegacyCard.default.Section, flush && LegacyCard.default['Section-flush'], subdued && LegacyCard.default['Section-subdued'], fullWidth && LegacyCard.default['Section-fullWidth'], hideOnPrint && LegacyCard.default['Section-hideOnPrint']);
  const actionMarkup = actions ? /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, null, utils.buttonsFrom(actions, {
    plain: true
  })) : null;
  const titleMarkup = typeof title === 'string' ? /*#__PURE__*/React.createElement(Text.Text, {
    variant: "headingSm",
    as: "h3",
    fontWeight: polarisSummerEditions2023 ? 'medium' : 'semibold'
  }, title) : title;
  const titleAreaMarkup = titleMarkup || actionMarkup ? /*#__PURE__*/React.createElement("div", {
    className: LegacyCard.default.SectionHeader
  }, actionMarkup ? /*#__PURE__*/React.createElement(LegacyStack.LegacyStack, {
    alignment: "baseline"
  }, /*#__PURE__*/React.createElement(LegacyStack.LegacyStack.Item, {
    fill: true
  }, titleMarkup), actionMarkup) : titleMarkup) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, titleAreaMarkup, children);
}

exports.Section = Section;

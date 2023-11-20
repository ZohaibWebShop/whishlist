'use strict';

var React = require('react');
var Popover = require('../../Popover.scss.js');
var Box = require('../../../Box/Box.js');
var hooks = require('../../../../utilities/features/hooks.js');

function Section({
  children
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  return /*#__PURE__*/React.createElement("div", {
    className: Popover.default.Section
  }, /*#__PURE__*/React.createElement(Box.Box, {
    padding: polarisSummerEditions2023 ? undefined : '4',
    paddingInlineStart: polarisSummerEditions2023 ? '3' : undefined,
    paddingInlineEnd: polarisSummerEditions2023 ? '3' : undefined,
    paddingBlockStart: polarisSummerEditions2023 ? '2' : undefined,
    paddingBlockEnd: polarisSummerEditions2023 ? '1_5-experimental' : undefined
  }, children));
}

exports.Section = Section;

'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var Section$1 = require('./Section.scss.js');
var hooks = require('../../../../utilities/features/hooks.js');
var Box = require('../../../Box/Box.js');

function Section({
  children,
  flush = false,
  subdued = false,
  titleHidden = false
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const className = css.classNames(Section$1.default.Section, titleHidden && Section$1.default.titleHidden);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement(Box.Box, Object.assign({
    as: "section"
    // eslint-disable-next-line no-nested-ternary
    ,
    padding: flush ? '0' : polarisSummerEditions2023 ? '4' : '5'
  }, titleHidden && {
    paddingInlineEnd: '0'
  }, subdued && {
    background: polarisSummerEditions2023 ? 'bg-secondary-experimental' : 'bg-subdued'
  }), children));
}

exports.Section = Section;

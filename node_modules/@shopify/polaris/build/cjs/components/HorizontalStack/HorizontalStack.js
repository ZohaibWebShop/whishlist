'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var HorizontalStack$1 = require('./HorizontalStack.scss.js');

const HorizontalStack = function HorizontalStack({
  align,
  blockAlign,
  gap,
  wrap = true,
  children
}) {
  const style = {
    '--pc-horizontal-stack-align': align,
    '--pc-horizontal-stack-block-align': blockAlign,
    '--pc-horizontal-stack-wrap': wrap ? 'wrap' : 'nowrap',
    ...css.getResponsiveProps('horizontal-stack', 'gap', 'space', gap)
  };
  return /*#__PURE__*/React.createElement("div", {
    className: HorizontalStack$1.default.HorizontalStack,
    style: style
  }, children);
};

exports.HorizontalStack = HorizontalStack;

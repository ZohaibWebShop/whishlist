'use strict';

var React = require('react');
var hooks = require('../Section/hooks.js');
var Box = require('../../../Box/Box.js');
var Text = require('../../../Text/Text.js');

function Header({
  children
}) {
  const sectionId = hooks.useSection() || '';
  const content = typeof children === 'string' ? /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockStart: "2",
    paddingInlineStart: "4",
    paddingBlockEnd: "2",
    paddingInlineEnd: "4"
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "headingXs",
    color: "subdued"
  }, children)) : children;
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    id: sectionId
  }, content);
}

exports.Header = Header;

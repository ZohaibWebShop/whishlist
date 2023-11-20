'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var LegacyStack = require('../../LegacyStack.scss.js');

function Item({
  children,
  fill
}) {
  const className = css.classNames(LegacyStack.default.Item, fill && LegacyStack.default['Item-fill']);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, children);
}

exports.Item = Item;

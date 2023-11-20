'use strict';

var React = require('react');
var Connected$1 = require('./Connected.scss.js');
var Item = require('./components/Item/Item.js');

function Connected({
  children,
  left,
  right
}) {
  const leftConnectionMarkup = left ? /*#__PURE__*/React.createElement(Item.Item, {
    position: "left"
  }, left) : null;
  const rightConnectionMarkup = right ? /*#__PURE__*/React.createElement(Item.Item, {
    position: "right"
  }, right) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: Connected$1.default.Connected
  }, leftConnectionMarkup, /*#__PURE__*/React.createElement(Item.Item, {
    position: "primary"
  }, children), rightConnectionMarkup);
}

exports.Connected = Connected;

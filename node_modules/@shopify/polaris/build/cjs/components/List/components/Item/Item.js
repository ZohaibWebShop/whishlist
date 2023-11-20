'use strict';

var React = require('react');
var List = require('../../List.scss.js');

function Item({
  children
}) {
  return /*#__PURE__*/React.createElement("li", {
    className: List.default.Item
  }, children);
}

exports.Item = Item;

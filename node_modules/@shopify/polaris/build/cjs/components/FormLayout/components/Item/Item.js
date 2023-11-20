'use strict';

var React = require('react');
var FormLayout = require('../../FormLayout.scss.js');

function Item({
  children
}) {
  return children ? /*#__PURE__*/React.createElement("div", {
    className: FormLayout.default.Item
  }, children) : null;
}

exports.Item = Item;

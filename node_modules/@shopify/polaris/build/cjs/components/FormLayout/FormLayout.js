'use strict';

var React = require('react');
var components = require('../../utilities/components.js');
var FormLayout$1 = require('./FormLayout.scss.js');
var Group = require('./components/Group/Group.js');
var Item = require('./components/Item/Item.js');

const FormLayout = /*#__PURE__*/React.memo(function FormLayout({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: FormLayout$1.default.FormLayout
  }, React.Children.map(children, wrapChildren));
});
FormLayout.Group = Group.Group;
function wrapChildren(child, index) {
  if (components.isElementOfType(child, Group.Group)) {
    return child;
  }
  const props = {
    key: index
  };
  return components.wrapWithComponent(child, Item.Item, props);
}

exports.FormLayout = FormLayout;

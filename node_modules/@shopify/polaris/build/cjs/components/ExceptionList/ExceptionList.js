'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var ExceptionList$1 = require('./ExceptionList.scss.js');
var Truncate = require('../Truncate/Truncate.js');
var Icon = require('../Icon/Icon.js');

function ExceptionList({
  items: itemsList
}) {
  const items = itemsList.map((item, index) => {
    const {
      status,
      icon,
      title,
      description,
      truncate = false
    } = item;
    const itemClasses = css.classNames(ExceptionList$1.default.Item, status && ExceptionList$1.default[css.variationName('status', status)]);
    const iconMarkup = icon ? /*#__PURE__*/React.createElement(Icon.Icon, {
      source: icon
    }) : /*#__PURE__*/React.createElement("span", {
      className: ExceptionList$1.default.Bullet
    });
    const titleMarkup = title && /*#__PURE__*/React.createElement("span", {
      className: ExceptionList$1.default.Title
    }, title);
    const descriptionMarkup = description && /*#__PURE__*/React.createElement("span", {
      className: ExceptionList$1.default.Description
    }, description);
    const Element = truncate ? Truncate.Truncate : React.Fragment;
    return /*#__PURE__*/React.createElement("li", {
      className: itemClasses,
      key: index
    }, /*#__PURE__*/React.createElement("span", {
      className: ExceptionList$1.default.Icon
    }, iconMarkup), /*#__PURE__*/React.createElement(Element, null, titleMarkup, descriptionMarkup));
  });
  return /*#__PURE__*/React.createElement("ul", {
    className: ExceptionList$1.default.ExceptionList
  }, items);
}

exports.ExceptionList = ExceptionList;

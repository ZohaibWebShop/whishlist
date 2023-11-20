'use strict';

var React = require('react');
var Container$1 = require('./Container.scss.js');

const Container = ({
  children
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: Container$1.default.Container
  }, children);
};

exports.Container = Container;

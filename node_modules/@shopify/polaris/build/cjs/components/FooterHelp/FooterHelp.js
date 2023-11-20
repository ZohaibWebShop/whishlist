'use strict';

var React = require('react');
var FooterHelp$1 = require('./FooterHelp.scss.js');

function FooterHelp({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: FooterHelp$1.default.FooterHelp
  }, /*#__PURE__*/React.createElement("div", {
    className: FooterHelp$1.default.Text
  }, children));
}

exports.FooterHelp = FooterHelp;

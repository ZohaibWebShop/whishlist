'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var Label$1 = require('./Label.scss.js');

function labelID(id) {
  return `${id}Label`;
}
function Label({
  children,
  id,
  hidden,
  requiredIndicator
}) {
  const className = css.classNames(Label$1.default.Label, hidden && Label$1.default.hidden);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("label", {
    id: labelID(id),
    htmlFor: id,
    className: css.classNames(Label$1.default.Text, requiredIndicator && Label$1.default.RequiredIndicator)
  }, children));
}

exports.Label = Label;
exports.labelID = labelID;

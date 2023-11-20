'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var TextContainer$1 = require('./TextContainer.scss.js');

/** @deprecated Use VerticalStack instead */
function TextContainer({
  spacing,
  children
}) {
  const className = css.classNames(TextContainer$1.default.TextContainer, spacing && TextContainer$1.default[css.variationName('spacing', spacing)]);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, children);
}

exports.TextContainer = TextContainer;

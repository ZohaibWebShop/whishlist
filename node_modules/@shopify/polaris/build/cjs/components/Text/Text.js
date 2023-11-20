'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var Text$1 = require('./Text.scss.js');

const Text = ({
  alignment,
  as,
  breakWord,
  children,
  color,
  fontWeight,
  id,
  numeric = false,
  truncate = false,
  variant,
  visuallyHidden = false,
  textDecorationLine
}) => {
  const Component = as || (visuallyHidden ? 'span' : 'p');
  const className = css.classNames(Text$1.default.root, variant && Text$1.default[variant], fontWeight && Text$1.default[fontWeight], (alignment || truncate) && Text$1.default.block, alignment && Text$1.default[alignment], breakWord && Text$1.default.break, color && Text$1.default[color], numeric && Text$1.default.numeric, truncate && Text$1.default.truncate, visuallyHidden && Text$1.default.visuallyHidden, textDecorationLine && Text$1.default[textDecorationLine]);
  return /*#__PURE__*/React.createElement(Component, Object.assign({
    className: className
  }, id && {
    id
  }), children);
};

exports.Text = Text;

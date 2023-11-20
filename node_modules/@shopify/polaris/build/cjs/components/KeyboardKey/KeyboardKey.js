'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var KeyboardKey$1 = require('./KeyboardKey.scss.js');

function KeyboardKey({
  children = '',
  size
}) {
  const key = !size && children.length > 1 ? children.toLowerCase() : children.toUpperCase();
  const className = css.classNames(KeyboardKey$1.default.KeyboardKey, size && KeyboardKey$1.default[size]);
  return /*#__PURE__*/React.createElement("kbd", {
    className: className
  }, key);
}

exports.KeyboardKey = KeyboardKey;

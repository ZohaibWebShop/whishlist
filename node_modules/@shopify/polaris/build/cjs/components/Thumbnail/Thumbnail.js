'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var Thumbnail$1 = require('./Thumbnail.scss.js');
var Image = require('../Image/Image.js');
var Icon = require('../Icon/Icon.js');

function Thumbnail({
  source,
  alt,
  size = 'medium',
  transparent
}) {
  const className = css.classNames(Thumbnail$1.default.Thumbnail, size && Thumbnail$1.default[css.variationName('size', size)], transparent && Thumbnail$1.default.transparent);
  const content = typeof source === 'string' ? /*#__PURE__*/React.createElement(Image.Image, {
    alt: alt,
    source: source
  }) : /*#__PURE__*/React.createElement(Icon.Icon, {
    accessibilityLabel: alt,
    source: source
  });
  return /*#__PURE__*/React.createElement("span", {
    className: className
  }, content);
}

exports.Thumbnail = Thumbnail;

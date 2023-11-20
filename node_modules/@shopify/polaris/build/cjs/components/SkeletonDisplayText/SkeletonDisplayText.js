'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var SkeletonDisplayText$1 = require('./SkeletonDisplayText.scss.js');

function SkeletonDisplayText({
  size = 'medium'
}) {
  const className = css.classNames(SkeletonDisplayText$1.default.DisplayText, size && SkeletonDisplayText$1.default[css.variationName('size', size)]);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  });
}

exports.SkeletonDisplayText = SkeletonDisplayText;

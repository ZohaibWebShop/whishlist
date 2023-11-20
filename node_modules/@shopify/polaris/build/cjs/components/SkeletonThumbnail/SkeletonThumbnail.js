'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var SkeletonThumbnail$1 = require('./SkeletonThumbnail.scss.js');

function SkeletonThumbnail({
  size = 'medium'
}) {
  const className = css.classNames(SkeletonThumbnail$1.default.SkeletonThumbnail, size && SkeletonThumbnail$1.default[css.variationName('size', size)]);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  });
}

exports.SkeletonThumbnail = SkeletonThumbnail;

'use strict';

var React = require('react');
var SkeletonBodyText$1 = require('./SkeletonBodyText.scss.js');

function SkeletonBodyText({
  lines = 3
}) {
  const bodyTextLines = [];
  for (let i = 0; i < lines; i++) {
    bodyTextLines.push( /*#__PURE__*/React.createElement("div", {
      className: SkeletonBodyText$1.default.SkeletonBodyText,
      key: i
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: SkeletonBodyText$1.default.SkeletonBodyTextContainer
  }, bodyTextLines);
}

exports.SkeletonBodyText = SkeletonBodyText;

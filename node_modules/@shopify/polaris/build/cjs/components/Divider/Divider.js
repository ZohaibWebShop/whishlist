'use strict';

var React = require('react');
var Divider$1 = require('./Divider.scss.js');

const Divider = ({
  borderColor = 'border-subdued',
  borderWidth = '1'
}) => {
  const borderColorValue = borderColor === 'transparent' ? borderColor : `var(--p-color-${borderColor})`;
  return /*#__PURE__*/React.createElement("hr", {
    className: Divider$1.default.Divider,
    style: {
      borderBlockStart: `var(--p-border-width-${borderWidth}) solid ${borderColorValue}`
    }
  });
};

exports.Divider = Divider;

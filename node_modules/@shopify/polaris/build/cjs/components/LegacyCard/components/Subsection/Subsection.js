'use strict';

var React = require('react');
var LegacyCard = require('../../LegacyCard.scss.js');

function Subsection({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: LegacyCard.default.Subsection
  }, children);
}

exports.Subsection = Subsection;

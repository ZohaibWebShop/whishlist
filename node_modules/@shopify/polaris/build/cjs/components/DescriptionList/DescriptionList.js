'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var DescriptionList$1 = require('./DescriptionList.scss.js');
var Text = require('../Text/Text.js');

function DescriptionList({
  items,
  spacing = 'loose'
}) {
  // There's no good key to give React so using the index is a last resport.
  // we can't use the term/description value as it may be a react component
  // which can't be stringified
  const terms = items.reduce((allTerms, {
    term,
    description
  }, index) => [...allTerms, /*#__PURE__*/React.createElement("dt", {
    key: `dt${index}`,
    className: DescriptionList$1.default.Term
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "headingSm"
  }, term)), /*#__PURE__*/React.createElement("dd", {
    key: `dd${index}`,
    className: DescriptionList$1.default.Description
  }, description)], []);
  const className = css.classNames(DescriptionList$1.default.DescriptionList, spacing === 'tight' && DescriptionList$1.default.spacingTight);
  return /*#__PURE__*/React.createElement("dl", {
    className: className
  }, terms);
}

exports.DescriptionList = DescriptionList;

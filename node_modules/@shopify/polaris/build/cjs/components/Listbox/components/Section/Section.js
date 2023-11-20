'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var selectors = require('./selectors.js');
var context = require('./context.js');
var Section$1 = require('./Section.scss.js');

function Section({
  children,
  divider = true,
  title
}) {
  const id = React.useId();
  return /*#__PURE__*/React.createElement(context.SectionContext.Provider, {
    value: id
  }, /*#__PURE__*/React.createElement("li", Object.assign({
    role: "presentation"
  }, selectors.listboxSectionDataSelector.props), title, /*#__PURE__*/React.createElement("ul", {
    role: "group",
    "aria-labelledby": id,
    className: css.classNames(Section$1.default.SectionGroup, !divider && Section$1.default.noDivider)
  }, children)));
}

exports.Section = Section;

'use strict';

var React = require('react');
var Layout = require('../../Layout.scss.js');
var hooks = require('../../../../utilities/features/hooks.js');
var TextContainer = require('../../../TextContainer/TextContainer.js');
var Text = require('../../../Text/Text.js');
var Box = require('../../../Box/Box.js');

function AnnotatedSection({
  children,
  title,
  description,
  id
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const descriptionMarkup =
  // eslint-disable-next-line no-nested-ternary
  typeof description === 'string' ? polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(Text.Text, {
    as: "p",
    variant: "bodyMd"
  }, description) : /*#__PURE__*/React.createElement("p", null, description) : description;
  return /*#__PURE__*/React.createElement("div", {
    className: Layout.default.AnnotatedSection
  }, /*#__PURE__*/React.createElement("div", {
    className: Layout.default.AnnotationWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: Layout.default.Annotation
  }, /*#__PURE__*/React.createElement(TextContainer.TextContainer, {
    spacing: polarisSummerEditions2023 ? 'tight' : undefined
  }, /*#__PURE__*/React.createElement(Text.Text, {
    id: id,
    variant: "headingMd",
    as: "h2"
  }, title), descriptionMarkup && /*#__PURE__*/React.createElement(Box.Box, {
    color: "text-subdued"
  }, descriptionMarkup))), /*#__PURE__*/React.createElement("div", {
    className: Layout.default.AnnotationContent
  }, children)));
}

exports.AnnotatedSection = AnnotatedSection;

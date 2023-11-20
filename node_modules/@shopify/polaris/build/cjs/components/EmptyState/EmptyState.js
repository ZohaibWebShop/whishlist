'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var withinContentContext = require('../../utilities/within-content-context.js');
var EmptyState$1 = require('./EmptyState.scss.js');
var hooks = require('../../utilities/features/hooks.js');
var utils = require('../Button/utils.js');
var Box = require('../Box/Box.js');
var VerticalStack = require('../VerticalStack/VerticalStack.js');
var Image = require('../Image/Image.js');
var Text = require('../Text/Text.js');
var HorizontalStack = require('../HorizontalStack/HorizontalStack.js');

function EmptyState({
  children,
  heading,
  image,
  largeImage,
  imageContained,
  fullWidth = false,
  action,
  secondaryAction,
  footerContent
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const withinContentContainer = React.useContext(withinContentContext.WithinContentContext);
  const imageContainedClass = css.classNames(imageContained && EmptyState$1.default.imageContained);
  const imageMarkup = largeImage ? /*#__PURE__*/React.createElement(Image.Image, {
    alt: "",
    role: "presentation",
    source: largeImage,
    className: imageContainedClass,
    sourceSet: [{
      source: image,
      descriptor: '568w'
    }, {
      source: largeImage,
      descriptor: '1136w'
    }],
    sizes: "(max-width: 568px) 60vw"
  }) : /*#__PURE__*/React.createElement(Image.Image, {
    className: imageContainedClass,
    role: "presentation",
    alt: "",
    source: image
  });
  const secondaryActionMarkup = secondaryAction ? utils.buttonFrom(secondaryAction, {}) : null;
  const footerContentMarkup = footerContent ? /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockStart: "4"
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    color: polarisSummerEditions2023 ? undefined : 'subdued',
    alignment: "center",
    variant: polarisSummerEditions2023 ? 'bodySm' : 'bodyMd'
  }, footerContent)) : null;
  const headingSize = withinContentContainer ? 'headingLg' : 'headingXl';
  const primaryActionMarkup = action ? utils.buttonFrom(action, {
    primary: true,
    size: 'medium'
  }) : null;
  const headingMarkup = heading ? /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockEnd: polarisSummerEditions2023 ? '1_5-experimental' : '4'
  }, /*#__PURE__*/React.createElement(Text.Text, {
    variant: polarisSummerEditions2023 ? 'headingMd' : headingSize,
    as: "p",
    alignment: "center"
  }, heading)) : null;
  const childrenMarkup = children ? /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    color: polarisSummerEditions2023 ? undefined : 'subdued',
    alignment: "center",
    variant: polarisSummerEditions2023 ? 'bodySm' : 'bodyMd'
  }, children) : null;
  const textContentMarkup = headingMarkup || children ? /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockEnd: polarisSummerEditions2023 ? '4' : '6'
  }, headingMarkup, childrenMarkup) : null;
  const actionsMarkup = primaryActionMarkup || secondaryActionMarkup ? /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    align: "center",
    gap: "2"
  }, secondaryActionMarkup, primaryActionMarkup) : null;
  const detailsMarkup = textContentMarkup || actionsMarkup || footerContentMarkup ? /*#__PURE__*/React.createElement(Box.Box, {
    maxWidth: fullWidth ? '100%' : '400px'
  }, /*#__PURE__*/React.createElement(VerticalStack.VerticalStack, {
    inlineAlign: "center"
  }, textContentMarkup, actionsMarkup, footerContentMarkup)) : null;
  return /*#__PURE__*/React.createElement(Box.Box, {
    paddingInlineStart: "0",
    paddingInlineEnd: "0",
    paddingBlockStart: "5",
    paddingBlockEnd: "16"
  }, /*#__PURE__*/React.createElement(VerticalStack.VerticalStack, {
    inlineAlign: "center"
  }, imageMarkup, detailsMarkup));
}

exports.EmptyState = EmptyState;

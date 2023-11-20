'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../utilities/css.js');
var CalloutCard$1 = require('./CalloutCard.scss.js');
var LegacyCard = require('../LegacyCard/LegacyCard.js');
var TextContainer = require('../TextContainer/TextContainer.js');
var hooks = require('../../utilities/features/hooks.js');
var utils = require('../Button/utils.js');
var Button = require('../Button/Button.js');
var Text = require('../Text/Text.js');
var Image = require('../Image/Image.js');
var ButtonGroup = require('../ButtonGroup/ButtonGroup.js');

function CalloutCard({
  title,
  children,
  illustration,
  primaryAction,
  secondaryAction,
  onDismiss
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const primaryActionMarkup = utils.buttonFrom(primaryAction);
  const secondaryActionMarkup = secondaryAction ? utils.buttonFrom(secondaryAction, {
    plain: true,
    primary: polarisSummerEditions2023
  }) : null;
  const buttonMarkup = secondaryActionMarkup ? /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, null, primaryActionMarkup, secondaryActionMarkup) : primaryActionMarkup;
  const dismissButton = onDismiss ? /*#__PURE__*/React.createElement("div", {
    className: CalloutCard$1.default.Dismiss
  }, /*#__PURE__*/React.createElement(Button.Button, {
    plain: true,
    icon: polarisIcons.CancelSmallMinor,
    onClick: onDismiss,
    accessibilityLabel: "Dismiss card"
  })) : null;
  const imageClassName = css.classNames(CalloutCard$1.default.Image, onDismiss && CalloutCard$1.default.DismissImage);
  const containerClassName = css.classNames(CalloutCard$1.default.Container, onDismiss && CalloutCard$1.default.hasDismiss);
  return /*#__PURE__*/React.createElement(LegacyCard.LegacyCard, null, /*#__PURE__*/React.createElement("div", {
    className: containerClassName
  }, dismissButton, /*#__PURE__*/React.createElement(LegacyCard.LegacyCard.Section, null, /*#__PURE__*/React.createElement("div", {
    className: CalloutCard$1.default.CalloutCard
  }, /*#__PURE__*/React.createElement("div", {
    className: CalloutCard$1.default.Content
  }, /*#__PURE__*/React.createElement("div", {
    className: CalloutCard$1.default.Title
  }, /*#__PURE__*/React.createElement(Text.Text, {
    variant: "headingMd",
    as: "h2"
  }, title)), /*#__PURE__*/React.createElement(TextContainer.TextContainer, null, children), /*#__PURE__*/React.createElement("div", {
    className: CalloutCard$1.default.Buttons
  }, buttonMarkup)), /*#__PURE__*/React.createElement(Image.Image, {
    alt: "",
    className: imageClassName,
    source: illustration
  })))));
}

exports.CalloutCard = CalloutCard;

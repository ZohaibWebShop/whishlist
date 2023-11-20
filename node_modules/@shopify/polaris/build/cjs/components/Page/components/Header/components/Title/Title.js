'use strict';

var React = require('react');
var css = require('../../../../../../utilities/css.js');
var Title$1 = require('./Title.scss.js');
var hooks = require('../../../../../../utilities/features/hooks.js');
var Text = require('../../../../../Text/Text.js');

function Title({
  title,
  subtitle,
  titleMetadata,
  compactTitle
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const className = css.classNames(Title$1.default.Title, subtitle && Title$1.default.TitleWithSubtitle);
  const titleMarkup = title ? /*#__PURE__*/React.createElement("h1", {
    className: className
  }, title) : null;
  const titleMetadataMarkup = titleMetadata ? /*#__PURE__*/React.createElement("div", {
    className: Title$1.default.TitleMetadata
  }, titleMetadata) : null;
  const wrappedTitleMarkup = titleMetadata ? /*#__PURE__*/React.createElement("div", {
    className: Title$1.default.TitleWithMetadataWrapper
  }, titleMarkup, titleMetadataMarkup) : titleMarkup;
  const subtitleMarkup = subtitle ? /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Title$1.default.SubTitle, compactTitle && Title$1.default.SubtitleCompact)
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "p",
    variant: polarisSummerEditions2023 ? 'bodySm' : undefined
  }, subtitle)) : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, wrappedTitleMarkup, subtitleMarkup);
}

exports.Title = Title;

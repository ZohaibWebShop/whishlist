'use strict';

var React = require('react');
var SkeletonPage$1 = require('./SkeletonPage.scss.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Box = require('../Box/Box.js');
var VerticalStack = require('../VerticalStack/VerticalStack.js');
var HorizontalStack = require('../HorizontalStack/HorizontalStack.js');

function SkeletonPage({
  children,
  fullWidth,
  narrowWidth,
  primaryAction,
  title = '',
  backAction
}) {
  const i18n = hooks.useI18n();
  const titleContent = title ? /*#__PURE__*/React.createElement("h1", {
    className: SkeletonPage$1.default.Title
  }, title) : /*#__PURE__*/React.createElement("div", {
    className: SkeletonPage$1.default.SkeletonTitle
  }, /*#__PURE__*/React.createElement(Box.Box, {
    background: "bg-strong",
    minWidth: "120px",
    minHeight: "28px",
    borderRadius: "1"
  }));
  const primaryActionMarkup = primaryAction ? /*#__PURE__*/React.createElement(Box.Box, {
    id: "SkeletonPage-PrimaryAction",
    borderRadius: "1",
    background: "bg-strong",
    minHeight: "2.25rem",
    minWidth: "6.25rem"
  }) : null;
  const backActionMarkup = backAction ? /*#__PURE__*/React.createElement(Box.Box, {
    borderRadius: "1",
    background: "bg-strong",
    minHeight: "2.25rem",
    minWidth: "2.25rem",
    maxWidth: "2.25rem"
  }) : null;
  return /*#__PURE__*/React.createElement(VerticalStack.VerticalStack, {
    gap: "4",
    inlineAlign: "center"
  }, /*#__PURE__*/React.createElement(Box.Box, Object.assign({
    width: "100%",
    padding: "0",
    paddingInlineStart: {
      sm: '6'
    },
    paddingInlineEnd: {
      sm: '6'
    },
    maxWidth: "var(--pc-skeleton-page-max-width)",
    "aria-label": i18n.translate('Polaris.SkeletonPage.loadingLabel'),
    role: "status"
  }, narrowWidth && {
    maxWidth: 'var(--pc-skeleton-page-max-width-narrow)'
  }, fullWidth && {
    maxWidth: 'none'
  }), /*#__PURE__*/React.createElement(VerticalStack.VerticalStack, null, /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockStart: {
      xs: '4',
      md: '5'
    },
    paddingBlockEnd: {
      xs: '4',
      md: '5'
    },
    paddingInlineStart: {
      xs: '4',
      sm: '0'
    },
    paddingInlineEnd: {
      xs: '4',
      sm: '0'
    },
    width: "100%"
  }, /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    gap: "4",
    align: "space-between",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    gap: "4"
  }, backActionMarkup, /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockStart: "1",
    paddingBlockEnd: "1"
  }, titleContent)), primaryActionMarkup)), /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockEnd: "2",
    width: "100%"
  }, children))));
}

exports.SkeletonPage = SkeletonPage;

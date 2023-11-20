'use strict';

var polarisIcons = require('@shopify/polaris-icons');
var React = require('react');
var isInputFocused = require('../../utilities/is-input-focused.js');
var Pagination$1 = require('./Pagination.scss.js');
var hooks = require('../../utilities/i18n/hooks.js');
var hooks$1 = require('../../utilities/features/hooks.js');
var KeypressListener = require('../KeypressListener/KeypressListener.js');
var ButtonGroup = require('../ButtonGroup/ButtonGroup.js');
var Tooltip = require('../Tooltip/Tooltip.js');
var Box = require('../Box/Box.js');
var Button = require('../Button/Button.js');
var Text = require('../Text/Text.js');

function Pagination({
  hasNext,
  hasPrevious,
  nextURL,
  previousURL,
  onNext,
  onPrevious,
  nextTooltip,
  previousTooltip,
  nextKeys,
  previousKeys,
  accessibilityLabel,
  accessibilityLabels,
  label
}) {
  const i18n = hooks.useI18n();
  const {
    polarisSummerEditions2023
  } = hooks$1.useFeatures();
  const node = /*#__PURE__*/React.createRef();
  const navLabel = accessibilityLabel || i18n.translate('Polaris.Pagination.pagination');
  const previousLabel = accessibilityLabels?.previous || i18n.translate('Polaris.Pagination.previous');
  const nextLabel = accessibilityLabels?.next || i18n.translate('Polaris.Pagination.next');
  const prev = /*#__PURE__*/React.createElement(Button.Button, {
    outline: true,
    icon: polarisIcons.ChevronLeftMinor,
    accessibilityLabel: previousLabel,
    url: previousURL,
    onClick: onPrevious,
    disabled: !hasPrevious,
    id: "previousURL"
  });
  const constructedPrevious = previousTooltip && hasPrevious ? /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
    activatorWrapper: "span",
    content: previousTooltip,
    preferredPosition: "below"
  }, prev) : prev;
  const next = /*#__PURE__*/React.createElement(Button.Button, {
    outline: true,
    icon: polarisIcons.ChevronRightMinor,
    accessibilityLabel: nextLabel,
    url: nextURL,
    onClick: onNext,
    disabled: !hasNext,
    id: "nextURL"
  });
  const constructedNext = nextTooltip && hasNext ? /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
    activatorWrapper: "span",
    content: nextTooltip,
    preferredPosition: "below"
  }, next) : next;
  const previousHandler = onPrevious || noop;
  const previousButtonEvents = previousKeys && (previousURL || onPrevious) && hasPrevious && previousKeys.map(key => /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
    key: key,
    keyCode: key,
    handler: previousURL ? handleCallback(clickPaginationLink('previousURL', node)) : handleCallback(previousHandler)
  }));
  const nextHandler = onNext || noop;
  const nextButtonEvents = nextKeys && (nextURL || onNext) && hasNext && nextKeys.map(key => /*#__PURE__*/React.createElement(KeypressListener.KeypressListener, {
    key: key,
    keyCode: key,
    handler: nextURL ? handleCallback(clickPaginationLink('nextURL', node)) : handleCallback(nextHandler)
  }));
  const labelTextMarkup = hasNext && hasPrevious ? /*#__PURE__*/React.createElement("span", null, label) : /*#__PURE__*/React.createElement(Text.Text, {
    color: "subdued",
    as: "span"
  }, label);
  const labelMarkup = label ? /*#__PURE__*/React.createElement(Box.Box, {
    padding: polarisSummerEditions2023 ? '3' : undefined,
    paddingBlockStart: "0",
    paddingBlockEnd: "0"
  }, /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite"
  }, labelTextMarkup)) : null;
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": navLabel,
    ref: node,
    className: Pagination$1.default.Pagination
  }, previousButtonEvents, nextButtonEvents, /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, {
    segmented: !label || polarisSummerEditions2023
  }, constructedPrevious, labelMarkup, constructedNext));
}
function clickPaginationLink(id, node) {
  return () => {
    if (node.current == null) {
      return;
    }
    const link = node.current.querySelector(`#${id}`);
    if (link) {
      link.click();
    }
  };
}
function handleCallback(fn) {
  return () => {
    if (isInputFocused.isInputFocused()) {
      return;
    }
    fn();
  };
}
function noop() {}

exports.Pagination = Pagination;

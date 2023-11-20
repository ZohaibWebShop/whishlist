'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var shared = require('../../../shared.js');
var TooltipOverlay$1 = require('./TooltipOverlay.scss.js');
var hooks = require('../../../../utilities/features/hooks.js');
var hooks$1 = require('../../../../utilities/i18n/hooks.js');
var PositionedOverlay = require('../../../PositionedOverlay/PositionedOverlay.js');

const tailUpPaths = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M18.829 8.171 11.862.921A3 3 0 0 0 7.619.838L0 8.171h1.442l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557h1.387Z",
  fill: "#E3E3E3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M17.442 10.171h-16v-2l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557v2Z",
  fill: "var(--p-color-bg)"
}));
const tailDownPaths = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "m0 2 6.967 7.25a3 3 0 0 0 4.243.083L18.829 2h-1.442l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2H0Z",
  fill: "#D4D4D4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M1.387 0h16v2l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2V0Z",
  fill: "var(--p-color-bg)"
}));
function TooltipOverlay({
  active,
  activator,
  preferredPosition = 'above',
  preventInteraction,
  id,
  children,
  accessibilityLabel,
  width,
  padding,
  borderRadius,
  zIndexOverride,
  instant
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const i18n = hooks$1.useI18n();
  const markup = active ? /*#__PURE__*/React.createElement(PositionedOverlay.PositionedOverlay, {
    active: active,
    activator: activator,
    preferredPosition: preferredPosition,
    preventInteraction: preventInteraction,
    render: renderTooltip,
    zIndexOverride: zIndexOverride
  }) : null;
  return markup;
  function renderTooltip(overlayDetails) {
    const {
      measuring,
      desiredHeight,
      positioning,
      chevronOffset
    } = overlayDetails;
    const containerClassName = css.classNames(TooltipOverlay$1.default.TooltipOverlay, measuring && TooltipOverlay$1.default.measuring, !measuring && TooltipOverlay$1.default.measured, instant && TooltipOverlay$1.default.instant, positioning === 'above' && TooltipOverlay$1.default.positionedAbove);
    const contentClassName = css.classNames(TooltipOverlay$1.default.Content, width && TooltipOverlay$1.default[width]);
    const contentStyles = measuring ? undefined : {
      minHeight: desiredHeight
    };
    const style = {
      '--pc-tooltip-chevron-x-pos': `${chevronOffset}px`,
      '--pc-tooltip-border-radius': borderRadius ? `var(--p-border-radius-${borderRadius})` : undefined,
      '--pc-tooltip-padding': padding && padding === 'default' ? 'var(--p-space-1) var(--p-space-2)' : `var(--p-space-${padding})`
    };
    return /*#__PURE__*/React.createElement("div", Object.assign({
      style: style,
      className: containerClassName
    }, shared.layer.props), polarisSummerEditions2023 && /*#__PURE__*/React.createElement("svg", {
      className: TooltipOverlay$1.default.Tail,
      width: "19",
      height: "11",
      fill: "none"
    }, positioning === 'above' ? tailDownPaths : tailUpPaths), /*#__PURE__*/React.createElement("div", {
      id: id,
      role: "tooltip",
      className: contentClassName,
      style: {
        ...contentStyles,
        ...style
      },
      "aria-label": accessibilityLabel ? i18n.translate('Polaris.TooltipOverlay.accessibilityLabel', {
        label: accessibilityLabel
      }) : undefined
    }, children));
  }
}

exports.TooltipOverlay = TooltipOverlay;

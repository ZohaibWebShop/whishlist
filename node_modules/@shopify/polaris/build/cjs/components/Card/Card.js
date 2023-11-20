'use strict';

var React = require('react');
var breakpoints = require('../../utilities/breakpoints.js');
var withinContentContext = require('../../utilities/within-content-context.js');
var ShadowBevel = require('../ShadowBevel/ShadowBevel.js');
var hooks = require('../../utilities/features/hooks.js');
var Box = require('../Box/Box.js');

const Card = ({
  children,
  background = 'bg',
  padding = {
    xs: '4',
    sm: '5'
  },
  roundedAbove
}) => {
  const breakpoints$1 = breakpoints.useBreakpoints();
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const defaultBorderRadius = polarisSummerEditions2023 ? '3' : '2';
  const isDefaultPadding = typeof padding !== 'string' && padding?.xs === '4' && padding?.sm === '5' && padding.md === undefined && padding.lg === undefined && padding.xl === undefined;
  const finalPadding = isDefaultPadding && polarisSummerEditions2023 ? {
    xs: '4'
  } : padding;
  let hasBorderRadius = !roundedAbove;
  if (roundedAbove && breakpoints$1[`${roundedAbove}Up`]) {
    hasBorderRadius = true;
  }
  return /*#__PURE__*/React.createElement(withinContentContext.WithinContentContext.Provider, {
    value: true
  }, polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(ShadowBevel.ShadowBevel, {
    boxShadow: "xs",
    borderRadius: hasBorderRadius ? '3' : '0-experimental',
    zIndex: "32"
  }, /*#__PURE__*/React.createElement(Box.Box, {
    background: background,
    padding: finalPadding,
    overflowX: "hidden",
    overflowY: "hidden",
    minHeight: "100%"
  }, children)) : /*#__PURE__*/React.createElement(Box.Box, {
    background: background,
    padding: finalPadding,
    shadow: "md",
    borderRadius: hasBorderRadius ? defaultBorderRadius : undefined,
    overflowX: "hidden",
    overflowY: "hidden"
  }, children));
};

exports.Card = Card;

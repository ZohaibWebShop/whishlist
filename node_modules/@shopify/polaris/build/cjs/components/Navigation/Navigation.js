'use strict';

var React = require('react');
var withinContentContext = require('../../utilities/within-content-context.js');
var css = require('../../utilities/css.js');
var getWidth = require('../../utilities/get-width.js');
var context = require('./context.js');
var Navigation$1 = require('./Navigation.scss.js');
var Section = require('./components/Section/Section.js');
var hooks = require('../../utilities/frame/hooks.js');
var UnstyledLink = require('../UnstyledLink/UnstyledLink.js');
var Image = require('../Image/Image.js');
var Scrollable = require('../Scrollable/Scrollable.js');
var Item = require('./components/Item/Item.js');

const Navigation = function Navigation({
  children,
  contextControl,
  location,
  onDismiss,
  ariaLabelledBy,
  logoSuffix
}) {
  const {
    logo
  } = hooks.useFrame();
  const width = getWidth.getWidth(logo, 104);
  const logoMarkup = logo ? /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Navigation$1.default.LogoContainer, logoSuffix && Navigation$1.default.hasLogoSuffix)
  }, /*#__PURE__*/React.createElement(UnstyledLink.UnstyledLink, {
    url: logo.url || '',
    className: Navigation$1.default.LogoLink,
    style: {
      width
    }
  }, /*#__PURE__*/React.createElement(Image.Image, {
    source: logo.topBarSource || '',
    alt: logo.accessibilityLabel || '',
    className: Navigation$1.default.Logo,
    style: {
      width
    }
  })), logoSuffix) : null;
  const mediaMarkup = contextControl ? /*#__PURE__*/React.createElement("div", {
    className: Navigation$1.default.ContextControl
  }, contextControl) : logoMarkup;
  const context$1 = React.useMemo(() => ({
    location,
    onNavigationDismiss: onDismiss
  }), [location, onDismiss]);
  return /*#__PURE__*/React.createElement(context.NavigationContext.Provider, {
    value: context$1
  }, /*#__PURE__*/React.createElement(withinContentContext.WithinContentContext.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement("nav", {
    className: Navigation$1.default.Navigation,
    "aria-labelledby": ariaLabelledBy
  }, mediaMarkup, /*#__PURE__*/React.createElement(Scrollable.Scrollable, {
    className: Navigation$1.default.PrimaryNavigation
  }, children))));
};
Navigation.Item = Item.Item;
Navigation.Section = Section.Section;

exports.Navigation = Navigation;

'use strict';

var React = require('react');
var bannerContext = require('../../utilities/banner-context.js');
var css = require('../../utilities/css.js');
var Link$1 = require('./Link.scss.js');
var UnstyledLink = require('../UnstyledLink/UnstyledLink.js');

function Link({
  url,
  children,
  onClick,
  external,
  target,
  id,
  monochrome,
  removeUnderline,
  accessibilityLabel,
  dataPrimaryLink
}) {
  return /*#__PURE__*/React.createElement(bannerContext.BannerContext.Consumer, null, BannerContext => {
    const shouldBeMonochrome = monochrome || BannerContext;
    const className = css.classNames(Link$1.default.Link, shouldBeMonochrome && Link$1.default.monochrome, removeUnderline && Link$1.default.removeUnderline);
    return url ? /*#__PURE__*/React.createElement(UnstyledLink.UnstyledLink, {
      onClick: onClick,
      className: className,
      url: url,
      external: external,
      target: target,
      id: id,
      "aria-label": accessibilityLabel,
      "data-primary-link": dataPrimaryLink
    }, children) : /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onClick,
      className: className,
      id: id,
      "aria-label": accessibilityLabel,
      "data-primary-link": dataPrimaryLink
    }, children);
  });
}

exports.Link = Link;

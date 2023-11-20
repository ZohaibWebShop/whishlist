'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../utilities/css.js');
var focus = require('../../utilities/focus.js');
var Tag$1 = require('./Tag.scss.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Icon = require('../Icon/Icon.js');

function Tag({
  children,
  disabled = false,
  onClick,
  onRemove,
  accessibilityLabel,
  url
}) {
  const i18n = hooks.useI18n();
  const segmented = onRemove && url;
  const className = css.classNames(Tag$1.default.Tag, disabled && Tag$1.default.disabled, onClick && Tag$1.default.clickable, onRemove && Tag$1.default.removable, url && !disabled && Tag$1.default.linkable, segmented && Tag$1.default.segmented);
  if (onClick) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      disabled: disabled,
      className: className,
      onClick: onClick
    }, children);
  }
  let tagTitle = accessibilityLabel;
  if (!tagTitle) {
    tagTitle = typeof children === 'string' ? children : undefined;
  }
  const ariaLabel = i18n.translate('Polaris.Tag.ariaLabel', {
    children: tagTitle || ''
  });
  const removeButton = onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": ariaLabel,
    className: css.classNames(Tag$1.default.Button, segmented && Tag$1.default.segmented),
    onClick: onRemove,
    onMouseUp: focus.handleMouseUpByBlurring,
    disabled: disabled
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.CancelSmallMinor
  })) : null;
  const tagContent = url && !disabled ? /*#__PURE__*/React.createElement("a", {
    className: css.classNames(Tag$1.default.Link, segmented && Tag$1.default.segmented),
    href: url
  }, /*#__PURE__*/React.createElement("span", {
    title: tagTitle,
    className: Tag$1.default.LinkText
  }, children)) : /*#__PURE__*/React.createElement("span", {
    title: tagTitle,
    className: Tag$1.default.TagText
  }, children);
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    "aria-disabled": disabled
  }, tagContent, removeButton);
}

exports.Tag = Tag;

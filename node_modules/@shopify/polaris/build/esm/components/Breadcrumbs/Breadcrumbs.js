import React from 'react';
import { ArrowLeftMinor } from '@shopify/polaris-icons';
import { handleMouseUpByBlurring } from '../../utilities/focus.js';
import styles from './Breadcrumbs.scss.js';
import { useFeatures } from '../../utilities/features/hooks.js';
import { Icon } from '../Icon/Icon.js';
import { Text } from '../Text/Text.js';
import { UnstyledLink } from '../UnstyledLink/UnstyledLink.js';
import { Button } from '../Button/Button.js';

function Breadcrumbs({
  backAction
}) {
  const {
    content
  } = backAction;
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const contentMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: styles.Icon
  }, /*#__PURE__*/React.createElement(Icon, {
    source: ArrowLeftMinor
  })), /*#__PURE__*/React.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, content));
  const breadcrumbMarkup = 'url' in backAction ? /*#__PURE__*/React.createElement(UnstyledLink, {
    key: content,
    url: backAction.url,
    className: styles.Breadcrumb,
    onMouseUp: handleMouseUpByBlurring,
    "aria-label": backAction.accessibilityLabel
  }, contentMarkup) : /*#__PURE__*/React.createElement("button", {
    key: content,
    className: styles.Breadcrumb,
    onClick: backAction.onAction,
    onMouseUp: handleMouseUpByBlurring,
    type: "button",
    "aria-label": backAction.accessibilityLabel
  }, contentMarkup);
  const summerEditionsBreadcrumbMarkup = /*#__PURE__*/React.createElement(Button, {
    key: content,
    url: 'url' in backAction ? backAction.url : undefined,
    onClick: 'onAction' in backAction ? backAction.onAction : undefined,
    onPointerDown: handleMouseUpByBlurring,
    icon: ArrowLeftMinor,
    accessibilityLabel: backAction.accessibilityLabel ?? content
  });
  return /*#__PURE__*/React.createElement("nav", {
    role: "navigation"
  }, polarisSummerEditions2023 ? summerEditionsBreadcrumbMarkup : breadcrumbMarkup);
}

export { Breadcrumbs };

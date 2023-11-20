'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../utilities/css.js');
var bannerContext = require('../../utilities/banner-context.js');
var withinContentContext = require('../../utilities/within-content-context.js');
var Banner$1 = require('./Banner.scss.js');
var utils = require('../UnstyledButton/utils.js');
var BannerExperimental = require('./components/BannerExperimental/BannerExperimental.js');
var hooks = require('../../utilities/i18n/hooks.js');
var hooks$1 = require('../../utilities/features/hooks.js');
var Spinner = require('../Spinner/Spinner.js');
var Box = require('../Box/Box.js');
var Button = require('../Button/Button.js');
var Icon = require('../Icon/Icon.js');
var Text = require('../Text/Text.js');
var ButtonGroup = require('../ButtonGroup/ButtonGroup.js');
var UnstyledLink = require('../UnstyledLink/UnstyledLink.js');
var UnstyledButton = require('../UnstyledButton/UnstyledButton.js');

const Banner = /*#__PURE__*/React.forwardRef(function Banner(props, bannerRef) {
  const {
    icon,
    action,
    secondaryAction,
    title,
    children,
    status,
    onDismiss,
    stopAnnouncements,
    hideIcon
  } = props;
  const withinContentContainer = React.useContext(withinContentContext.WithinContentContext);
  const i18n = hooks.useI18n();
  const {
    wrapperRef,
    handleKeyUp,
    handleBlur,
    handleMouseUp,
    shouldShowFocus
  } = useBannerFocus(bannerRef);
  const {
    defaultIcon,
    iconColor,
    ariaRoleType
  } = useBannerAttributes(status);
  const iconName = icon || defaultIcon;
  const {
    polarisSummerEditions2023
  } = hooks$1.useFeatures();
  const className = css.classNames(Banner$1.default.Banner, !polarisSummerEditions2023 && status && Banner$1.default[css.variationName('status', status)], onDismiss && Banner$1.default.hasDismiss, shouldShowFocus && Banner$1.default.keyFocused, withinContentContainer ? Banner$1.default.withinContentContainer : Banner$1.default.withinPage);
  let headingMarkup = null;
  if (title) {
    headingMarkup = /*#__PURE__*/React.createElement(Text.Text, {
      as: "h2",
      variant: "headingMd",
      breakWord: true
    }, title);
  }
  const spinnerMarkup = action?.loading ? /*#__PURE__*/React.createElement("button", {
    disabled: true,
    "aria-busy": true,
    className: css.classNames(Banner$1.default.Button, Banner$1.default.loading)
  }, /*#__PURE__*/React.createElement("span", {
    className: Banner$1.default.Spinner
  }, /*#__PURE__*/React.createElement(Spinner.Spinner, {
    size: "small",
    accessibilityLabel: i18n.translate('Polaris.Button.spinnerAccessibilityLabel')
  })), action.content) : null;
  const primaryActionMarkup = action ? /*#__PURE__*/React.createElement(Box.Box, {
    paddingInlineEnd: "2"
  }, action.loading ? spinnerMarkup : utils.unstyledButtonFrom(action, {
    className: `${Banner$1.default.Button} ${Banner$1.default.PrimaryAction}`
  })) : null;
  const secondaryActionMarkup = secondaryAction ? /*#__PURE__*/React.createElement(SecondaryActionFrom, {
    action: secondaryAction
  }) : null;
  const actionMarkup = action || secondaryAction ? /*#__PURE__*/React.createElement(Box.Box, {
    paddingBlockStart: withinContentContainer ? '3' : '4',
    paddingBlockEnd: withinContentContainer ? '1' : undefined
  }, /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, null, primaryActionMarkup, secondaryActionMarkup)) : null;
  let contentMarkup = null;
  if (children || actionMarkup) {
    contentMarkup = /*#__PURE__*/React.createElement(Box.Box, {
      paddingBlockStart: "05",
      paddingBlockEnd: "05"
    }, children, actionMarkup);
  }
  const dismissButton = onDismiss && /*#__PURE__*/React.createElement("div", {
    className: Banner$1.default.Dismiss
  }, /*#__PURE__*/React.createElement(Button.Button, {
    plain: true,
    icon: polarisIcons.CancelSmallMinor,
    onClick: onDismiss,
    accessibilityLabel: i18n.translate('Polaris.Banner.dismissButton')
  }));
  return /*#__PURE__*/React.createElement(bannerContext.BannerContext.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement("div", {
    className: className
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    ,
    tabIndex: 0,
    ref: wrapperRef,
    role: ariaRoleType,
    "aria-live": stopAnnouncements ? 'off' : 'polite',
    onMouseUp: handleMouseUp,
    onKeyUp: handleKeyUp,
    onBlur: handleBlur
  }, polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(BannerExperimental.BannerExperimental, props) : /*#__PURE__*/React.createElement(React.Fragment, null, dismissButton, hideIcon ? null : /*#__PURE__*/React.createElement(Box.Box, {
    paddingInlineEnd: "4"
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: iconName,
    color: iconColor
  })), /*#__PURE__*/React.createElement("div", {
    className: Banner$1.default.ContentWrapper
  }, headingMarkup, contentMarkup))));
});
function SecondaryActionFrom({
  action
}) {
  if (action.url) {
    return /*#__PURE__*/React.createElement(UnstyledLink.UnstyledLink, {
      className: Banner$1.default.SecondaryAction,
      url: action.url,
      external: action.external,
      target: action.target
    }, /*#__PURE__*/React.createElement("span", {
      className: Banner$1.default.Text
    }, action.content));
  }
  return /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, {
    className: Banner$1.default.SecondaryAction,
    onClick: action.onAction
  }, /*#__PURE__*/React.createElement("span", {
    className: Banner$1.default.Text
  }, action.content));
}
function useBannerAttributes(status) {
  switch (status) {
    case 'success':
      return {
        defaultIcon: polarisIcons.CircleTickMajor,
        iconColor: 'success',
        ariaRoleType: 'status'
      };
    case 'info':
      return {
        defaultIcon: polarisIcons.CircleInformationMajor,
        iconColor: 'highlight',
        ariaRoleType: 'status'
      };
    case 'warning':
      return {
        defaultIcon: polarisIcons.CircleAlertMajor,
        iconColor: 'warning',
        ariaRoleType: 'alert'
      };
    case 'critical':
      return {
        defaultIcon: polarisIcons.DiamondAlertMajor,
        iconColor: 'critical',
        ariaRoleType: 'alert'
      };
    default:
      return {
        defaultIcon: polarisIcons.CircleInformationMajor,
        iconColor: 'base',
        ariaRoleType: 'status'
      };
  }
}
function useBannerFocus(bannerRef) {
  const wrapperRef = React.useRef(null);
  const [shouldShowFocus, setShouldShowFocus] = React.useState(false);
  React.useImperativeHandle(bannerRef, () => ({
    focus: () => {
      wrapperRef.current?.focus();
      setShouldShowFocus(true);
    }
  }), []);
  const handleKeyUp = event => {
    if (event.target === wrapperRef.current) {
      setShouldShowFocus(true);
    }
  };
  const handleBlur = () => setShouldShowFocus(false);
  const handleMouseUp = event => {
    event.currentTarget.blur();
    setShouldShowFocus(false);
  };
  return {
    wrapperRef,
    handleKeyUp,
    handleBlur,
    handleMouseUp,
    shouldShowFocus
  };
}

exports.Banner = Banner;
exports.useBannerAttributes = useBannerAttributes;

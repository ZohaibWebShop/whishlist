import React, { forwardRef, useContext, useRef, useState, useImperativeHandle } from 'react';
import { CancelSmallMinor, CircleInformationMajor, DiamondAlertMajor, CircleAlertMajor, CircleTickMajor } from '@shopify/polaris-icons';
import { classNames, variationName } from '../../utilities/css.js';
import { BannerContext } from '../../utilities/banner-context.js';
import { WithinContentContext } from '../../utilities/within-content-context.js';
import styles from './Banner.scss.js';
import { unstyledButtonFrom } from '../UnstyledButton/utils.js';
import { BannerExperimental } from './components/BannerExperimental/BannerExperimental.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { useFeatures } from '../../utilities/features/hooks.js';
import { Spinner } from '../Spinner/Spinner.js';
import { Box } from '../Box/Box.js';
import { Button } from '../Button/Button.js';
import { Icon } from '../Icon/Icon.js';
import { Text } from '../Text/Text.js';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup.js';
import { UnstyledLink } from '../UnstyledLink/UnstyledLink.js';
import { UnstyledButton } from '../UnstyledButton/UnstyledButton.js';

const Banner = /*#__PURE__*/forwardRef(function Banner(props, bannerRef) {
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
  const withinContentContainer = useContext(WithinContentContext);
  const i18n = useI18n();
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
  } = useFeatures();
  const className = classNames(styles.Banner, !polarisSummerEditions2023 && status && styles[variationName('status', status)], onDismiss && styles.hasDismiss, shouldShowFocus && styles.keyFocused, withinContentContainer ? styles.withinContentContainer : styles.withinPage);
  let headingMarkup = null;
  if (title) {
    headingMarkup = /*#__PURE__*/React.createElement(Text, {
      as: "h2",
      variant: "headingMd",
      breakWord: true
    }, title);
  }
  const spinnerMarkup = action?.loading ? /*#__PURE__*/React.createElement("button", {
    disabled: true,
    "aria-busy": true,
    className: classNames(styles.Button, styles.loading)
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.Spinner
  }, /*#__PURE__*/React.createElement(Spinner, {
    size: "small",
    accessibilityLabel: i18n.translate('Polaris.Button.spinnerAccessibilityLabel')
  })), action.content) : null;
  const primaryActionMarkup = action ? /*#__PURE__*/React.createElement(Box, {
    paddingInlineEnd: "2"
  }, action.loading ? spinnerMarkup : unstyledButtonFrom(action, {
    className: `${styles.Button} ${styles.PrimaryAction}`
  })) : null;
  const secondaryActionMarkup = secondaryAction ? /*#__PURE__*/React.createElement(SecondaryActionFrom, {
    action: secondaryAction
  }) : null;
  const actionMarkup = action || secondaryAction ? /*#__PURE__*/React.createElement(Box, {
    paddingBlockStart: withinContentContainer ? '3' : '4',
    paddingBlockEnd: withinContentContainer ? '1' : undefined
  }, /*#__PURE__*/React.createElement(ButtonGroup, null, primaryActionMarkup, secondaryActionMarkup)) : null;
  let contentMarkup = null;
  if (children || actionMarkup) {
    contentMarkup = /*#__PURE__*/React.createElement(Box, {
      paddingBlockStart: "05",
      paddingBlockEnd: "05"
    }, children, actionMarkup);
  }
  const dismissButton = onDismiss && /*#__PURE__*/React.createElement("div", {
    className: styles.Dismiss
  }, /*#__PURE__*/React.createElement(Button, {
    plain: true,
    icon: CancelSmallMinor,
    onClick: onDismiss,
    accessibilityLabel: i18n.translate('Polaris.Banner.dismissButton')
  }));
  return /*#__PURE__*/React.createElement(BannerContext.Provider, {
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
  }, polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(BannerExperimental, props) : /*#__PURE__*/React.createElement(React.Fragment, null, dismissButton, hideIcon ? null : /*#__PURE__*/React.createElement(Box, {
    paddingInlineEnd: "4"
  }, /*#__PURE__*/React.createElement(Icon, {
    source: iconName,
    color: iconColor
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.ContentWrapper
  }, headingMarkup, contentMarkup))));
});
function SecondaryActionFrom({
  action
}) {
  if (action.url) {
    return /*#__PURE__*/React.createElement(UnstyledLink, {
      className: styles.SecondaryAction,
      url: action.url,
      external: action.external,
      target: action.target
    }, /*#__PURE__*/React.createElement("span", {
      className: styles.Text
    }, action.content));
  }
  return /*#__PURE__*/React.createElement(UnstyledButton, {
    className: styles.SecondaryAction,
    onClick: action.onAction
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.Text
  }, action.content));
}
function useBannerAttributes(status) {
  switch (status) {
    case 'success':
      return {
        defaultIcon: CircleTickMajor,
        iconColor: 'success',
        ariaRoleType: 'status'
      };
    case 'info':
      return {
        defaultIcon: CircleInformationMajor,
        iconColor: 'highlight',
        ariaRoleType: 'status'
      };
    case 'warning':
      return {
        defaultIcon: CircleAlertMajor,
        iconColor: 'warning',
        ariaRoleType: 'alert'
      };
    case 'critical':
      return {
        defaultIcon: DiamondAlertMajor,
        iconColor: 'critical',
        ariaRoleType: 'alert'
      };
    default:
      return {
        defaultIcon: CircleInformationMajor,
        iconColor: 'base',
        ariaRoleType: 'status'
      };
  }
}
function useBannerFocus(bannerRef) {
  const wrapperRef = useRef(null);
  const [shouldShowFocus, setShouldShowFocus] = useState(false);
  useImperativeHandle(bannerRef, () => ({
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

export { Banner, useBannerAttributes };

import React, { useContext, useState, useRef, useCallback, useEffect } from 'react';
import { CancelMinor } from '@shopify/polaris-icons';
import { useBreakpoints } from '../../../../utilities/breakpoints.js';
import { WithinContentContext } from '../../../../utilities/within-content-context.js';
import { useEventListener } from '../../../../utilities/use-event-listener.js';
import { bannerAttributes } from './utilities.js';
import styles from './BannerExperimental.scss.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { Text } from '../../../Text/Text.js';
import { Icon } from '../../../Icon/Icon.js';
import { ButtonGroup } from '../../../ButtonGroup/ButtonGroup.js';
import { Button } from '../../../Button/Button.js';
import { Box } from '../../../Box/Box.js';
import { VerticalStack } from '../../../VerticalStack/VerticalStack.js';
import { HorizontalStack } from '../../../HorizontalStack/HorizontalStack.js';

function BannerExperimental({
  status = 'info',
  icon,
  hideIcon,
  onDismiss,
  action,
  secondaryAction,
  title,
  children
}) {
  const i18n = useI18n();
  const withinContentContainer = useContext(WithinContentContext);
  const isInlineIconBanner = !title && !withinContentContainer;
  const bannerStatus = Object.keys(bannerAttributes).includes(status) ? status : 'info';
  const bannerColors = bannerAttributes[bannerStatus][withinContentContainer ? 'withinContentContainer' : 'withinPage'];
  const sharedBannerProps = {
    backgroundColor: bannerColors.background,
    textColor: bannerColors.text,
    bannerTitle: title ? /*#__PURE__*/React.createElement(Text, {
      as: "h2",
      variant: "headingSm",
      breakWord: true
    }, title) : null,
    bannerIcon: hideIcon ? null : /*#__PURE__*/React.createElement("span", {
      className: styles[bannerColors.icon]
    }, /*#__PURE__*/React.createElement(Icon, {
      source: icon ?? bannerAttributes[bannerStatus].icon
    })),
    actionButtons: action || secondaryAction ? /*#__PURE__*/React.createElement(ButtonGroup, null, action && /*#__PURE__*/React.createElement(Button, Object.assign({
      onClick: action.onAction
    }, action), action.content), secondaryAction && /*#__PURE__*/React.createElement(Button, Object.assign({
      onClick: secondaryAction.onAction
    }, secondaryAction), secondaryAction.content)) : null,
    dismissButton: onDismiss ? /*#__PURE__*/React.createElement(Button, {
      plain: true,
      primary: true,
      icon: /*#__PURE__*/React.createElement("span", {
        className: styles[isInlineIconBanner ? 'icon-subdued' : bannerColors.icon]
      }, /*#__PURE__*/React.createElement(Icon, {
        source: CancelMinor
      })),
      onClick: onDismiss,
      accessibilityLabel: i18n.translate('Polaris.Banner.dismissButton')
    }) : null
  };
  if (withinContentContainer) {
    return /*#__PURE__*/React.createElement(WithinContentContainerBanner, sharedBannerProps, children);
  }
  if (isInlineIconBanner) {
    return /*#__PURE__*/React.createElement(InlineIconBanner, sharedBannerProps, children);
  }
  return /*#__PURE__*/React.createElement(DefaultBanner, sharedBannerProps, children);
}
function DefaultBanner({
  backgroundColor,
  textColor,
  bannerTitle,
  bannerIcon,
  actionButtons,
  dismissButton,
  children
}) {
  const {
    smUp
  } = useBreakpoints();
  const hasContent = children || actionButtons;
  return /*#__PURE__*/React.createElement(Box, {
    width: "100%"
  }, /*#__PURE__*/React.createElement(VerticalStack, {
    align: "space-between"
  }, /*#__PURE__*/React.createElement(Box, {
    background: backgroundColor,
    color: textColor,
    borderRadiusStartStart: smUp ? '3' : undefined,
    borderRadiusStartEnd: smUp ? '3' : undefined,
    borderRadiusEndStart: !hasContent && smUp ? '3' : undefined,
    borderRadiusEndEnd: !hasContent && smUp ? '3' : undefined,
    padding: "3"
  }, /*#__PURE__*/React.createElement(HorizontalStack, {
    align: "space-between",
    blockAlign: "center",
    gap: "2",
    wrap: false
  }, /*#__PURE__*/React.createElement(HorizontalStack, {
    gap: "1",
    wrap: false
  }, bannerIcon, bannerTitle), dismissButton)), hasContent && /*#__PURE__*/React.createElement(Box, {
    padding: {
      xs: '3',
      md: '4'
    },
    paddingBlockStart: "3"
  }, /*#__PURE__*/React.createElement(VerticalStack, {
    gap: "2"
  }, /*#__PURE__*/React.createElement("div", null, children), actionButtons))));
}
function InlineIconBanner({
  backgroundColor,
  bannerIcon,
  actionButtons,
  dismissButton,
  children
}) {
  const [blockAlign, setBlockAlign] = useState('center');
  const contentNode = useRef(null);
  const iconNode = useRef(null);
  const handleResize = useCallback(() => {
    const contentHeight = contentNode.current?.offsetHeight;
    const iconBoxHeight = iconNode.current?.offsetHeight;
    if (!contentHeight || !iconBoxHeight) return;
    contentHeight > iconBoxHeight ? setBlockAlign('start') : setBlockAlign('center');
  }, []);
  useEffect(() => handleResize(), [handleResize]);
  useEventListener('resize', handleResize);
  return /*#__PURE__*/React.createElement(Box, {
    width: "100%",
    padding: "3",
    borderRadius: "3"
  }, /*#__PURE__*/React.createElement(HorizontalStack, {
    align: "space-between",
    blockAlign: blockAlign,
    wrap: false
  }, /*#__PURE__*/React.createElement(Box, {
    width: "100%"
  }, /*#__PURE__*/React.createElement(HorizontalStack, {
    gap: "2",
    wrap: false,
    blockAlign: blockAlign
  }, bannerIcon ? /*#__PURE__*/React.createElement("div", {
    ref: iconNode
  }, /*#__PURE__*/React.createElement(Box, {
    background: backgroundColor,
    borderRadius: "2",
    padding: "1"
  }, bannerIcon)) : null, /*#__PURE__*/React.createElement(Box, {
    ref: contentNode,
    width: "100%"
  }, /*#__PURE__*/React.createElement(VerticalStack, {
    gap: "2"
  }, /*#__PURE__*/React.createElement("div", null, children), actionButtons)))), dismissButton));
}
function WithinContentContainerBanner({
  backgroundColor,
  textColor,
  bannerTitle,
  bannerIcon,
  actionButtons,
  dismissButton,
  children
}) {
  return /*#__PURE__*/React.createElement(Box, {
    width: "100%",
    background: backgroundColor,
    padding: "2",
    borderRadius: "2",
    color: textColor
  }, /*#__PURE__*/React.createElement(HorizontalStack, {
    align: "space-between",
    blockAlign: "start",
    wrap: false,
    gap: "2"
  }, /*#__PURE__*/React.createElement(HorizontalStack, {
    gap: "1_5-experimental",
    wrap: false
  }, bannerIcon, /*#__PURE__*/React.createElement(Box, {
    width: "100%"
  }, /*#__PURE__*/React.createElement(VerticalStack, {
    gap: "2"
  }, /*#__PURE__*/React.createElement(VerticalStack, {
    gap: "05"
  }, bannerTitle, /*#__PURE__*/React.createElement("div", null, children)), actionButtons))), dismissButton));
}

export { BannerExperimental, DefaultBanner, InlineIconBanner, WithinContentContainerBanner };

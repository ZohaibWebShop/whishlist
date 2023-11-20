import React from 'react';
import { CancelMinor, HorizontalDotsMinor } from '@shopify/polaris-icons';
import { useToggle } from '../../utilities/use-toggle.js';
import { classNames } from '../../utilities/css.js';
import styles from './MediaCard.scss.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { useFeatures } from '../../utilities/features/hooks.js';
import { Button } from '../Button/Button.js';
import { HorizontalStack } from '../HorizontalStack/HorizontalStack.js';
import { Popover } from '../Popover/Popover.js';
import { ActionList } from '../ActionList/ActionList.js';
import { buttonFrom } from '../Button/utils.js';
import { LegacyCard } from '../LegacyCard/LegacyCard.js';
import { Box } from '../Box/Box.js';
import { VerticalStack } from '../VerticalStack/VerticalStack.js';
import { LegacyStack } from '../LegacyStack/LegacyStack.js';
import { Text } from '../Text/Text.js';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup.js';

function MediaCard({
  title,
  children,
  primaryAction,
  secondaryAction,
  description,
  popoverActions = [],
  portrait = false,
  size = 'medium',
  onDismiss
}) {
  const i18n = useI18n();
  const {
    value: popoverActive,
    toggle: togglePopoverActive
  } = useToggle(false);
  const {
    polarisSummerEditions2023
  } = useFeatures();
  let headerMarkup = null;
  if (title) {
    const headerContent = typeof title === 'string' ? /*#__PURE__*/React.createElement(Text, {
      variant: polarisSummerEditions2023 ? 'headingSm' : 'headingMd',
      as: "h2"
    }, title) : title;
    headerMarkup = /*#__PURE__*/React.createElement("div", {
      className: styles.Heading
    }, headerContent);
  }
  const dismissButtonMarkup = onDismiss ? /*#__PURE__*/React.createElement(Button, {
    icon: CancelMinor,
    onClick: onDismiss,
    size: "slim",
    plain: true,
    accessibilityLabel: i18n.translate('Polaris.MediaCard.dismissButton'),
    primary: polarisSummerEditions2023
  }) : null;
  const popoverActivator = /*#__PURE__*/React.createElement(HorizontalStack, {
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(Button, {
    icon: HorizontalDotsMinor,
    onClick: togglePopoverActive,
    size: "slim",
    plain: true,
    accessibilityLabel: i18n.translate('Polaris.MediaCard.popoverButton'),
    primary: polarisSummerEditions2023
  }));
  const popoverActionsMarkup = popoverActions.length > 0 ? /*#__PURE__*/React.createElement(Popover, {
    active: popoverActive,
    activator: popoverActivator,
    onClose: togglePopoverActive,
    preferredAlignment: "left",
    preferredPosition: "below"
  }, /*#__PURE__*/React.createElement(ActionList, {
    items: popoverActions,
    onActionAnyItem: togglePopoverActive
  })) : null;
  const primaryActionMarkup = primaryAction ? /*#__PURE__*/React.createElement("div", {
    className: styles.PrimaryAction
  }, buttonFrom(primaryAction)) : null;
  const secondaryActionMarkup = secondaryAction ? /*#__PURE__*/React.createElement("div", {
    className: styles.SecondaryAction
  }, polarisSummerEditions2023 ? buttonFrom(secondaryAction) : buttonFrom(secondaryAction, {
    plain: true
  })) : null;
  const actionClassName = classNames(styles.ActionContainer, portrait && styles.portrait);
  const actionMarkup = primaryActionMarkup || secondaryActionMarkup ? /*#__PURE__*/React.createElement("div", {
    className: actionClassName
  }, /*#__PURE__*/React.createElement(ButtonGroup, null, primaryActionMarkup, secondaryActionMarkup)) : null;
  const mediaCardClassName = classNames(styles.MediaCard, portrait && styles.portrait);
  const mediaContainerClassName = classNames(styles.MediaContainer, portrait && styles.portrait, size === 'small' && styles.sizeSmall);
  const infoContainerClassName = classNames(styles.InfoContainer, portrait && styles.portrait, size === 'small' && styles.sizeSmall);
  const popoverOrDismissMarkup = popoverActionsMarkup || dismissButtonMarkup ? /*#__PURE__*/React.createElement(Box, {
    position: "absolute",
    insetBlockStart: polarisSummerEditions2023 ? undefined : '4',
    insetInlineEnd: "5",
    zIndex: "var(--p-z-index-2)"
  }, /*#__PURE__*/React.createElement(HorizontalStack, {
    gap: "1",
    wrap: !polarisSummerEditions2023
  }, popoverActionsMarkup, dismissButtonMarkup)) : null;
  return /*#__PURE__*/React.createElement(LegacyCard, null, /*#__PURE__*/React.createElement("div", {
    className: mediaCardClassName
  }, /*#__PURE__*/React.createElement("div", {
    className: mediaContainerClassName
  }, children), /*#__PURE__*/React.createElement("div", {
    className: infoContainerClassName
  }, polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(Box, {
    padding: "5"
  }, /*#__PURE__*/React.createElement(VerticalStack, {
    gap: "2"
  }, /*#__PURE__*/React.createElement(HorizontalStack, {
    wrap: false,
    align: "space-between",
    gap: "2"
  }, headerMarkup, popoverOrDismissMarkup), /*#__PURE__*/React.createElement("p", {
    className: styles.Description
  }, description), actionMarkup)) : /*#__PURE__*/React.createElement(LegacyCard.Section, null, popoverOrDismissMarkup, /*#__PURE__*/React.createElement(LegacyStack, {
    vertical: true,
    spacing: "tight"
  }, headerMarkup, /*#__PURE__*/React.createElement("p", {
    className: styles.Description
  }, description), actionMarkup)))));
}

export { MediaCard };

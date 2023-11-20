import React from 'react';
import { CancelMajor, MobileCancelMajor } from '@shopify/polaris-icons';
import { classNames } from '../../../../utilities/css.js';
import styles from './CloseButton.scss.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { useFeatures } from '../../../../utilities/features/hooks.js';
import { Button } from '../../../Button/Button.js';
import { Icon } from '../../../Icon/Icon.js';

function CloseButton({
  pressed,
  titleHidden = false,
  onClick
}) {
  const i18n = useI18n();
  const {
    polarisSummerEditions2023
  } = useFeatures();
  return polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(Button, {
    primary: true,
    plain: true,
    pressed: pressed,
    icon: CancelMajor,
    onClick: onClick,
    accessibilityLabel: i18n.translate('Polaris.Common.close')
  }) : /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: classNames(styles.CloseButton, titleHidden && styles.titleHidden, pressed && styles.pressed),
    "aria-label": i18n.translate('Polaris.Common.close')
  }, /*#__PURE__*/React.createElement(Icon, {
    source: MobileCancelMajor,
    color: "base"
  }));
}

export { CloseButton };

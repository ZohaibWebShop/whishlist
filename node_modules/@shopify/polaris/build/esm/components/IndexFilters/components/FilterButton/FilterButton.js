import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from './FilterButton.scss.js';
import { useFeatures } from '../../../../utilities/features/hooks.js';
import { Button } from '../../../Button/Button.js';
import { UnstyledButton } from '../../../UnstyledButton/UnstyledButton.js';

function FilterButton({
  onClick,
  label,
  icon,
  disabled,
  children
}) {
  const {
    polarisSummerEditions2023: se23
  } = useFeatures();
  const classes = classNames(styles.FilterButton, disabled && styles.Disabled);
  const buttonMarkup = se23 ? /*#__PURE__*/React.createElement(Button, {
    size: "slim",
    icon: icon,
    onClick: onClick,
    disabled: disabled,
    accessibilityLabel: label
  }) : /*#__PURE__*/React.createElement(UnstyledButton, {
    className: classes,
    onClick: onClick,
    disabled: disabled,
    accessibilityLabel: label
  }, children);
  return buttonMarkup;
}

export { FilterButton };

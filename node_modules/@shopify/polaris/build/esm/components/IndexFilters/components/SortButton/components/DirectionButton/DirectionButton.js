import React from 'react';
import { ArrowUpMinor, ArrowDownMinor } from '@shopify/polaris-icons';
import { classNames } from '../../../../../../utilities/css.js';
import styles from './DirectionButton.scss.js';
import { useFeatures } from '../../../../../../utilities/features/hooks.js';
import { UnstyledButton } from '../../../../../UnstyledButton/UnstyledButton.js';
import { Icon } from '../../../../../Icon/Icon.js';

function DirectionButton({
  onClick,
  active,
  children,
  direction,
  value
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const classes = classNames(styles.DirectionButton, active && styles['DirectionButton-active']);
  function handleClick() {
    onClick([value]);
  }
  return /*#__PURE__*/React.createElement(UnstyledButton, {
    className: classes,
    onClick: handleClick
  }, /*#__PURE__*/React.createElement(Icon, {
    source: direction === 'asc' ? ArrowUpMinor : ArrowDownMinor,
    color:
    // eslint-disable-next-line no-nested-ternary
    polarisSummerEditions2023 ? 'base' : active ? 'interactive' : 'base'
  }), /*#__PURE__*/React.createElement("span", {
    className: styles.Label
  }, children));
}

export { DirectionButton };

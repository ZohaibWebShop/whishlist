import React from 'react';
import { classNames, variationName } from '../../utilities/css.js';
import styles from './SkeletonDisplayText.scss.js';

function SkeletonDisplayText({
  size = 'medium'
}) {
  const className = classNames(styles.DisplayText, size && styles[variationName('size', size)]);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  });
}

export { SkeletonDisplayText };

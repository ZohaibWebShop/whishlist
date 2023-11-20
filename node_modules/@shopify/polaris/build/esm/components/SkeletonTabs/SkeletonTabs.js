import React from 'react';
import { classNames } from '../../utilities/css.js';
import styles from './SkeletonTabs.scss.js';
import { SkeletonBodyText } from '../SkeletonBodyText/SkeletonBodyText.js';

function SkeletonTabs({
  count = 2
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.Tabs
  }, [...Array(count).keys()].map(key => {
    const tabWidthClassName = key % 2 === 0 ? styles['Tab-short'] : styles['Tab-long'];
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: classNames(styles.Tab, tabWidthClassName)
    }, /*#__PURE__*/React.createElement(SkeletonBodyText, {
      lines: 1
    }));
  }));
}

export { SkeletonTabs };

import React from 'react';
import styles from '../../FormLayout.scss.js';

function Item({
  children
}) {
  return children ? /*#__PURE__*/React.createElement("div", {
    className: styles.Item
  }, children) : null;
}

export { Item };

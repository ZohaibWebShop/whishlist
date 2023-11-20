import React from 'react';
import { classNames, variationName } from '../../utilities/css.js';
import styles from './List.scss.js';
import { Item } from './components/Item/Item.js';

const List = function List({
  children,
  spacing = 'loose',
  type = 'bullet'
}) {
  const className = classNames(styles.List, spacing && styles[variationName('spacing', spacing)], type && styles[variationName('type', type)]);
  const ListElement = type === 'bullet' ? 'ul' : 'ol';
  return /*#__PURE__*/React.createElement(ListElement, {
    className: className
  }, children);
};
List.Item = Item;

export { List };

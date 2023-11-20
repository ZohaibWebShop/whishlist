import React from 'react';
import { getResponsiveValue, getResponsiveProps, sanitizeCustomProperties } from '../../utilities/css.js';
import styles from './HorizontalGrid.scss.js';

function HorizontalGrid({
  children,
  columns,
  gap,
  alignItems
}) {
  const style = {
    ...getResponsiveValue('horizontal-grid', 'grid-template-columns', formatHorizontalGrid(columns)),
    ...getResponsiveProps('horizontal-grid', 'gap', 'space', gap),
    '--pc-horizontal-grid-align-items': alignItems
  };
  return /*#__PURE__*/React.createElement("div", {
    className: styles.HorizontalGrid,
    style: sanitizeCustomProperties(style)
  }, children);
}
function formatHorizontalGrid(columns) {
  if (typeof columns === 'object' && columns !== null && !Array.isArray(columns)) {
    return Object.fromEntries(Object.entries(columns).map(([breakpointAlias, breakpointHorizontalGrid]) => [breakpointAlias, getColumnValue(breakpointHorizontalGrid)]));
  }
  return getColumnValue(columns);
}
function getColumnValue(columns) {
  if (!columns) return undefined;
  if (typeof columns === 'number' || !isNaN(Number(columns))) {
    return `repeat(${Number(columns)}, minmax(0, 1fr))`;
  }
  if (typeof columns === 'string') return columns;
  return columns.map(column => {
    switch (column) {
      case 'oneThird':
        return 'minmax(0, 1fr)';
      case 'oneHalf':
        return 'minmax(0, 1fr)';
      case 'twoThirds':
        return 'minmax(0, 2fr)';
    }
  }).join(' ');
}

export { HorizontalGrid };

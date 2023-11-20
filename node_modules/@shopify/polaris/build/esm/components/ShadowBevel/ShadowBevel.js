import React from 'react';
import { getResponsiveValue } from '../../utilities/css.js';
import styles from './ShadowBevel.scss.js';
import { useFeatures } from '../../utilities/features/hooks.js';

function ShadowBevel(props) {
  const {
    as = 'div',
    bevel = true,
    borderRadius,
    boxShadow,
    children,
    zIndex = '0'
  } = props;
  const {
    polarisSummerEditions2023ShadowBevelOptOut
  } = useFeatures();
  const Component = as;
  return /*#__PURE__*/React.createElement(Component, {
    className: styles.ShadowBevel,
    style: {
      '--pc-shadow-bevel-z-index': zIndex,
      ...getResponsiveValue('shadow-bevel', 'content', mapResponsiveProp(bevel, bevel => {
        if (polarisSummerEditions2023ShadowBevelOptOut) {
          return 'none';
        }
        return bevel ? '""' : 'none';
      })),
      ...getResponsiveValue('shadow-bevel', 'box-shadow', mapResponsiveProp(bevel, bevel => bevel ? `var(--p-shadow-${boxShadow})` : 'none')),
      ...getResponsiveValue('shadow-bevel', 'border-radius', mapResponsiveProp(bevel, bevel => bevel ? `var(--p-border-radius-${borderRadius})` : 'var(--p-border-radius-0-experimental)'))
    }
  }, children);
}
function mapResponsiveProp(responsiveProp, callback) {
  if (typeof responsiveProp === 'boolean') {
    return callback(responsiveProp);
  }
  return Object.fromEntries(Object.entries(responsiveProp).map(([breakpointsAlias, value]) => [breakpointsAlias, callback(value)]));
}

export { ShadowBevel };

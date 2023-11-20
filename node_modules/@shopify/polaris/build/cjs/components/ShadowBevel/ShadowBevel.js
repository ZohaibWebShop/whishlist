'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var ShadowBevel$1 = require('./ShadowBevel.scss.js');
var hooks = require('../../utilities/features/hooks.js');

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
  } = hooks.useFeatures();
  const Component = as;
  return /*#__PURE__*/React.createElement(Component, {
    className: ShadowBevel$1.default.ShadowBevel,
    style: {
      '--pc-shadow-bevel-z-index': zIndex,
      ...css.getResponsiveValue('shadow-bevel', 'content', mapResponsiveProp(bevel, bevel => {
        if (polarisSummerEditions2023ShadowBevelOptOut) {
          return 'none';
        }
        return bevel ? '""' : 'none';
      })),
      ...css.getResponsiveValue('shadow-bevel', 'box-shadow', mapResponsiveProp(bevel, bevel => bevel ? `var(--p-shadow-${boxShadow})` : 'none')),
      ...css.getResponsiveValue('shadow-bevel', 'border-radius', mapResponsiveProp(bevel, bevel => bevel ? `var(--p-border-radius-${borderRadius})` : 'var(--p-border-radius-0-experimental)'))
    }
  }, children);
}
function mapResponsiveProp(responsiveProp, callback) {
  if (typeof responsiveProp === 'boolean') {
    return callback(responsiveProp);
  }
  return Object.fromEntries(Object.entries(responsiveProp).map(([breakpointsAlias, value]) => [breakpointsAlias, callback(value)]));
}

exports.ShadowBevel = ShadowBevel;

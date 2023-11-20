'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var VerticalStack$1 = require('./VerticalStack.scss.js');

const VerticalStack = ({
  as = 'div',
  children,
  align,
  inlineAlign,
  gap,
  id,
  reverseOrder = false,
  ...restProps
}) => {
  const className = css.classNames(VerticalStack$1.default.VerticalStack, (as === 'ul' || as === 'ol') && VerticalStack$1.default.listReset, as === 'fieldset' && VerticalStack$1.default.fieldsetReset);
  const style = {
    '--pc-vertical-stack-align': align ? `${align}` : null,
    '--pc-vertical-stack-inline-align': inlineAlign ? `${inlineAlign}` : null,
    '--pc-vertical-stack-order': reverseOrder ? 'column-reverse' : 'column',
    ...css.getResponsiveProps('vertical-stack', 'gap', 'space', gap)
  };
  return /*#__PURE__*/React.createElement(as, {
    className,
    style: css.sanitizeCustomProperties(style),
    ...restProps
  }, children);
};

exports.VerticalStack = VerticalStack;

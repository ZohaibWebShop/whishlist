'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var SecondaryAction$1 = require('./SecondaryAction.scss.js');
var Button = require('../../../Button/Button.js');
var Tooltip = require('../../../Tooltip/Tooltip.js');

function SecondaryAction({
  children,
  destructive,
  helpText,
  onAction,
  getOffsetWidth,
  ...rest
}) {
  const secondaryActionsRef = React.useRef(null);
  React.useEffect(() => {
    if (!getOffsetWidth || !secondaryActionsRef.current) return;
    getOffsetWidth(secondaryActionsRef.current?.offsetWidth);
  }, [getOffsetWidth]);
  const buttonMarkup = /*#__PURE__*/React.createElement(Button.Button, Object.assign({
    onClick: onAction
  }, rest), children);
  const actionMarkup = helpText ? /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
    preferredPosition: "below",
    content: helpText
  }, buttonMarkup) : buttonMarkup;
  return /*#__PURE__*/React.createElement("div", {
    className: css.classNames(SecondaryAction$1.default.SecondaryAction, destructive && SecondaryAction$1.default.destructive),
    ref: secondaryActionsRef
  }, actionMarkup);
}

exports.SecondaryAction = SecondaryAction;

import React, { useRef, useEffect } from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from './SecondaryAction.scss.js';
import { Button } from '../../../Button/Button.js';
import { Tooltip } from '../../../Tooltip/Tooltip.js';

function SecondaryAction({
  children,
  destructive,
  helpText,
  onAction,
  getOffsetWidth,
  ...rest
}) {
  const secondaryActionsRef = useRef(null);
  useEffect(() => {
    if (!getOffsetWidth || !secondaryActionsRef.current) return;
    getOffsetWidth(secondaryActionsRef.current?.offsetWidth);
  }, [getOffsetWidth]);
  const buttonMarkup = /*#__PURE__*/React.createElement(Button, Object.assign({
    onClick: onAction
  }, rest), children);
  const actionMarkup = helpText ? /*#__PURE__*/React.createElement(Tooltip, {
    preferredPosition: "below",
    content: helpText
  }, buttonMarkup) : buttonMarkup;
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.SecondaryAction, destructive && styles.destructive),
    ref: secondaryActionsRef
  }, actionMarkup);
}

export { SecondaryAction };

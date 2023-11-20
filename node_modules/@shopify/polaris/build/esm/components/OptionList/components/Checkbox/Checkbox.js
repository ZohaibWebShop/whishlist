import React, { useId } from 'react';
import { TickSmallMinor } from '@shopify/polaris-icons';
import { classNames } from '../../../../utilities/css.js';
import styles from './Checkbox.scss.js';
import { Icon } from '../../../Icon/Icon.js';

function Checkbox({
  id: idProp,
  checked = false,
  disabled,
  active,
  onChange,
  name,
  value,
  role
}) {
  const uniqId = useId();
  const id = idProp ?? uniqId;
  const className = classNames(styles.Checkbox, active && styles.active);
  const inputClassName = classNames(styles.Input);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    name: name,
    value: value,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    className: inputClassName,
    "aria-checked": checked,
    onChange: onChange,
    role: role
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.Backdrop
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.Icon
  }, /*#__PURE__*/React.createElement(Icon, {
    source: TickSmallMinor
  })));
}

export { Checkbox };

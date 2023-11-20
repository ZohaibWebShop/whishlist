'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var Backdrop$1 = require('./Backdrop.scss.js');
var ScrollLock = require('../ScrollLock/ScrollLock.js');

function Backdrop(props) {
  const {
    onClick,
    onTouchStart,
    belowNavigation,
    transparent,
    setClosing
  } = props;
  const className = css.classNames(Backdrop$1.default.Backdrop, belowNavigation && Backdrop$1.default.belowNavigation, transparent && Backdrop$1.default.transparent);
  const handleMouseDown = () => {
    if (setClosing) {
      setClosing(true);
    }
  };
  const handleClick = () => {
    if (setClosing) {
      setClosing(false);
    }
    if (onClick) {
      onClick();
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScrollLock.ScrollLock, null), /*#__PURE__*/React.createElement("div", {
    className: className,
    onClick: handleClick,
    onTouchStart: onTouchStart,
    onMouseDown: handleMouseDown
  }));
}

exports.Backdrop = Backdrop;

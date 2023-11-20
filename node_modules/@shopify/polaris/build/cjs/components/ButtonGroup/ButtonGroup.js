'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var components = require('../../utilities/components.js');
var ButtonGroup$1 = require('./ButtonGroup.scss.js');
var Item = require('./components/Item/Item.js');

function ButtonGroup({
  children,
  spacing,
  segmented,
  fullWidth,
  connectedTop,
  noWrap
}) {
  const className = css.classNames(ButtonGroup$1.default.ButtonGroup, spacing && ButtonGroup$1.default[spacing], segmented && ButtonGroup$1.default.segmented, fullWidth && ButtonGroup$1.default.fullWidth, noWrap && ButtonGroup$1.default.noWrap);
  const contents = components.elementChildren(children).map((child, index) => /*#__PURE__*/React.createElement(Item.Item, {
    button: child,
    key: index
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    "data-buttongroup-segmented": segmented,
    "data-buttongroup-connected-top": connectedTop,
    "data-buttongroup-full-width": fullWidth,
    "data-buttongroup-no-wrap": noWrap
  }, contents);
}

exports.ButtonGroup = ButtonGroup;

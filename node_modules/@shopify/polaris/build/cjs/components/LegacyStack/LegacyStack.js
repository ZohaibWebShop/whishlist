'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var components = require('../../utilities/components.js');
var LegacyStack$1 = require('./LegacyStack.scss.js');
var Item = require('./components/Item/Item.js');

const LegacyStack = /*#__PURE__*/React.memo(function Stack({
  children,
  vertical,
  spacing,
  distribution,
  alignment,
  wrap
}) {
  const className = css.classNames(LegacyStack$1.default.LegacyStack, vertical && LegacyStack$1.default.vertical, spacing && LegacyStack$1.default[css.variationName('spacing', spacing)], distribution && LegacyStack$1.default[css.variationName('distribution', distribution)], alignment && LegacyStack$1.default[css.variationName('alignment', alignment)], wrap === false && LegacyStack$1.default.noWrap);
  const itemMarkup = components.elementChildren(children).map((child, index) => {
    const props = {
      key: index
    };
    return components.wrapWithComponent(child, Item.Item, props);
  });
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, itemMarkup);
});
LegacyStack.Item = Item.Item;

exports.LegacyStack = LegacyStack;

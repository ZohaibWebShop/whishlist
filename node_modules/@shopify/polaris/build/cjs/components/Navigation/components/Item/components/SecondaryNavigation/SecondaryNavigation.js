'use strict';

var React = require('react');
var isEqual = require('react-fast-compare');
var css = require('../../../../../../utilities/css.js');
var context = require('../../../../context.js');
var Navigation = require('../../../../Navigation.scss.js');
var hooks = require('../../../../../../utilities/features/hooks.js');
var Collapsible = require('../../../../../Collapsible/Collapsible.js');

function SecondaryNavigation({
  ItemComponent,
  icon,
  longestMatch,
  subNavigationItems,
  showExpanded,
  truncateText,
  secondaryNavigationId
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const uid = React.useId();
  const {
    onNavigationDismiss
  } = React.useContext(context.NavigationContext);
  const [hoveredItem, setHoveredItem] = React.useState();
  const matchedItemPosition = subNavigationItems.findIndex(item => isEqual(item, longestMatch));
  const hoveredItemPosition = subNavigationItems.findIndex(item => isEqual(item, hoveredItem));
  return /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Navigation.default.SecondaryNavigation, showExpanded && Navigation.default.SecondaryNavigationOpen, !icon && Navigation.default['SecondaryNavigation-noIcon'])
  }, /*#__PURE__*/React.createElement(Collapsible.Collapsible, {
    id: secondaryNavigationId || uid,
    open: showExpanded,
    transition: false
  }, /*#__PURE__*/React.createElement("ul", {
    className: Navigation.default.List
  }, subNavigationItems.map((item, index) => {
    const {
      label,
      ...rest
    } = item;
    const onClick = () => {
      onNavigationDismiss?.();
      if (item.onClick && item.onClick !== onNavigationDismiss) {
        item.onClick();
      }
    };
    const shouldShowVerticalLine = polarisSummerEditions2023 ? index < matchedItemPosition : false;
    return /*#__PURE__*/React.createElement(ItemComponent, Object.assign({
      key: label
    }, rest, {
      label: label,
      showVerticalLine: shouldShowVerticalLine,
      showVerticalHoverPointer: polarisSummerEditions2023 && index === hoveredItemPosition,
      onMouseEnter: item.disabled ? undefined : () => setHoveredItem(item),
      onMouseLeave: item.disabled ? undefined : () => setHoveredItem(undefined),
      matches: isEqual(item, longestMatch),
      onClick: onClick,
      truncateText: truncateText
    }));
  }))));
}

exports.SecondaryNavigation = SecondaryNavigation;

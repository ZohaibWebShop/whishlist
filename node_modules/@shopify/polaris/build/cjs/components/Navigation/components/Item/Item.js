'use strict';

var React = require('react');
var useIsomorphicLayoutEffect = require('../../../../utilities/use-isomorphic-layout-effect.js');
var css = require('../../../../utilities/css.js');
var context = require('../../context.js');
var Navigation = require('../../Navigation.scss.js');
var types = require('../../types.js');
var SecondaryNavigation = require('./components/SecondaryNavigation/SecondaryNavigation.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var hooks$1 = require('../../../../utilities/media-query/hooks.js');
var hooks$2 = require('../../../../utilities/features/hooks.js');
var Indicator = require('../../../Indicator/Indicator.js');
var Icon = require('../../../Icon/Icon.js');
var Badge = require('../../../Badge/Badge.js');
var UnstyledLink = require('../../../UnstyledLink/UnstyledLink.js');
var UnstyledButton = require('../../../UnstyledButton/UnstyledButton.js');
var Tooltip = require('../../../Tooltip/Tooltip.js');

const MAX_SECONDARY_ACTIONS = 2;
const TOOLTIP_HOVER_DELAY = 1000;
function Item({
  url,
  icon: baseIcon,
  matchedItemIcon,
  label,
  subNavigationItems = [],
  secondaryAction,
  secondaryActions,
  displayActionsOnHover,
  disabled,
  onClick,
  accessibilityLabel,
  selected: selectedOverride,
  badge,
  new: isNew,
  matches,
  exactMatch,
  matchPaths,
  excludePaths,
  external,
  onToggleExpandedState,
  expanded,
  shouldResizeIcon,
  truncateText,
  showVerticalLine,
  showVerticalHoverPointer,
  onMouseEnter,
  onMouseLeave
}) {
  const i18n = hooks.useI18n();
  const {
    isNavigationCollapsed
  } = hooks$1.useMediaQuery();
  const secondaryNavigationId = React.useId();
  const {
    location,
    onNavigationDismiss
  } = React.useContext(context.NavigationContext);
  const navTextRef = React.useRef(null);
  const [isTruncated, setIsTruncated] = React.useState(false);
  const {
    polarisSummerEditions2023
  } = hooks$2.useFeatures();
  React.useEffect(() => {
    if (!isNavigationCollapsed && expanded) {
      onToggleExpandedState?.();
    }
  }, [expanded, isNavigationCollapsed, onToggleExpandedState]);
  useIsomorphicLayoutEffect.useIsomorphicLayoutEffect(() => {
    const navTextNode = navTextRef.current;
    if (truncateText && navTextNode) {
      setIsTruncated(navTextNode.scrollHeight > navTextNode.clientHeight);
    }
  }, [truncateText]);
  const tabIndex = disabled ? -1 : 0;
  const hasNewChild = subNavigationItems.filter(subNavigationItem => subNavigationItem.new).length > 0;
  const indicatorMarkup = hasNewChild ? /*#__PURE__*/React.createElement("span", {
    className: Navigation.default.Indicator
  }, /*#__PURE__*/React.createElement(Indicator.Indicator, {
    pulse: true
  })) : null;
  const matchState = matchStateForItem({
    url,
    matches,
    exactMatch,
    matchPaths,
    excludePaths
  }, location);
  const matchingSubNavigationItems = subNavigationItems.filter(item => {
    const subMatchState = matchStateForItem(item, location);
    return subMatchState === types.MatchState.MatchForced || subMatchState === types.MatchState.MatchUrl || subMatchState === types.MatchState.MatchPaths;
  });
  const childIsActive = matchingSubNavigationItems.length > 0;
  const selected = selectedOverride == null ? matchState === types.MatchState.MatchForced || matchState === types.MatchState.MatchUrl || matchState === types.MatchState.MatchPaths : selectedOverride;
  const icon = polarisSummerEditions2023 && (selected || childIsActive) ? matchedItemIcon ?? baseIcon : baseIcon;
  const iconMarkup = icon ? /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Navigation.default.Icon, shouldResizeIcon && Navigation.default['Icon-resized'])
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: icon
  })) : null;
  let badgeMarkup = null;
  if (isNew) {
    badgeMarkup = /*#__PURE__*/React.createElement(Badge.Badge, {
      status: "new"
    }, i18n.translate('Polaris.Badge.STATUS_LABELS.new'));
  } else if (typeof badge === 'string') {
    badgeMarkup = /*#__PURE__*/React.createElement(Badge.Badge, {
      status: "new"
    }, badge);
  } else {
    badgeMarkup = badge;
  }
  const wrappedBadgeMarkup = badgeMarkup == null ? null : /*#__PURE__*/React.createElement("div", {
    className: Navigation.default.Badge
  }, badgeMarkup);
  const itemLabelMarkup = /*#__PURE__*/React.createElement("span", {
    className: css.classNames(Navigation.default.Text, truncateText && Navigation.default['Text-truncated']),
    ref: navTextRef
  }, label, indicatorMarkup);
  if (url == null) {
    const className = css.classNames(Navigation.default.Item, disabled && Navigation.default['Item-disabled'], selectedOverride && Navigation.default['Item-selected']);
    return /*#__PURE__*/React.createElement("li", {
      className: Navigation.default.ListItem
    }, /*#__PURE__*/React.createElement("div", {
      className: Navigation.default.ItemWrapper
    }, /*#__PURE__*/React.createElement("div", {
      className: css.classNames(Navigation.default.ItemInnerWrapper, disabled && Navigation.default.ItemInnerDisabled, polarisSummerEditions2023 ? selectedOverride && Navigation.default['ItemInnerWrapper-selected'] : undefined)
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: className,
      disabled: disabled,
      "aria-disabled": disabled,
      "aria-label": accessibilityLabel,
      onClick: getClickHandler(onClick)
    }, iconMarkup, itemLabelMarkup, wrappedBadgeMarkup))));
  }
  if (secondaryAction && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn('Deprecation: The `secondaryAction` prop on the `Navigation.Item` has been deprecated. Use `secondaryActions` instead.');
  }
  const actions = secondaryActions || secondaryAction && [secondaryAction];
  if (actions && actions.length > MAX_SECONDARY_ACTIONS) {
    actions.length = MAX_SECONDARY_ACTIONS;
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(`secondaryActions must have a maximum of ${MAX_SECONDARY_ACTIONS} actions. Only the first ${MAX_SECONDARY_ACTIONS} actions will be rendered.`);
    }
  }
  const secondaryActionMarkup = actions?.length ? /*#__PURE__*/React.createElement("span", {
    className: Navigation.default.SecondaryActions
  }, actions.map(action => /*#__PURE__*/React.createElement(ItemSecondaryAction, Object.assign({
    key: action.accessibilityLabel
  }, action, {
    tabIndex: tabIndex,
    disabled: disabled
  })))) : null;
  const itemContentMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, iconMarkup, itemLabelMarkup, secondaryActionMarkup ? null : wrappedBadgeMarkup);
  const outerContentMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, secondaryActionMarkup ? wrappedBadgeMarkup : null);
  const showExpanded = selected || expanded || childIsActive;
  const canBeActive = subNavigationItems.length === 0 || !childIsActive;
  const itemClassName = css.classNames(Navigation.default.Item, disabled && Navigation.default['Item-disabled'], polarisSummerEditions2023 ? (selected || childIsActive) && Navigation.default['Item-selected'] : selected && canBeActive && Navigation.default['Item-selected'], showExpanded && Navigation.default.subNavigationActive, childIsActive && Navigation.default['Item-child-active'], showVerticalLine && polarisSummerEditions2023 && Navigation.default['Item-line'], matches && polarisSummerEditions2023 && Navigation.default['Item-line-pointer'], showVerticalHoverPointer && polarisSummerEditions2023 && Navigation.default['Item-hover-pointer']);
  let secondaryNavigationMarkup = null;
  if (subNavigationItems.length > 0) {
    const longestMatch = matchingSubNavigationItems.sort(({
      url: firstUrl
    }, {
      url: secondUrl
    }) => secondUrl.length - firstUrl.length)[0];
    secondaryNavigationMarkup = /*#__PURE__*/React.createElement(SecondaryNavigation.SecondaryNavigation, {
      ItemComponent: Item,
      icon: icon,
      longestMatch: longestMatch,
      subNavigationItems: subNavigationItems,
      showExpanded: showExpanded,
      truncateText: truncateText,
      secondaryNavigationId: secondaryNavigationId
    });
  }
  const className = css.classNames(Navigation.default.ListItem, Boolean(actions && actions.length) && Navigation.default['ListItem-hasAction']);
  const itemLinkMarkup = () => {
    const linkMarkup = /*#__PURE__*/React.createElement(UnstyledLink.UnstyledLink, Object.assign({
      url: url,
      className: itemClassName,
      external: external,
      tabIndex: tabIndex,
      "aria-disabled": disabled,
      "aria-label": accessibilityLabel,
      onClick: getClickHandler(onClick)
    }, normalizeAriaAttributes(secondaryNavigationId, subNavigationItems.length > 0, showExpanded)), itemContentMarkup);
    return isTruncated ? /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
      hoverDelay: TOOLTIP_HOVER_DELAY,
      content: label,
      preferredPosition: "above"
    }, linkMarkup) : linkMarkup;
  };
  return /*#__PURE__*/React.createElement("li", {
    className: className,
    onMouseEnter: () => {
      onMouseEnter?.(label);
    },
    onMouseLeave: onMouseLeave
  }, /*#__PURE__*/React.createElement("div", {
    className: Navigation.default.ItemWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Navigation.default.ItemInnerWrapper, polarisSummerEditions2023 ? selected && childIsActive && Navigation.default['ItemInnerWrapper-open'] || selected && !childIsActive && Navigation.default['ItemInnerWrapper-selected'] : selected && canBeActive && Navigation.default['ItemInnerWrapper-selected'], displayActionsOnHover && Navigation.default['ItemInnerWrapper-display-actions-on-hover'], disabled && Navigation.default.ItemInnerDisabled)
  }, displayActionsOnHover && secondaryActionMarkup && wrappedBadgeMarkup ? /*#__PURE__*/React.createElement("span", {
    className: Navigation.default.ItemWithFloatingActions
  }, itemLinkMarkup(), secondaryActionMarkup) : /*#__PURE__*/React.createElement(React.Fragment, null, itemLinkMarkup(), secondaryActionMarkup), outerContentMarkup)), secondaryNavigationMarkup);
  function getClickHandler(onClick) {
    return event => {
      const {
        currentTarget
      } = event;
      if (currentTarget.getAttribute('href') === location) {
        event.preventDefault();
      }
      if (subNavigationItems && subNavigationItems.length > 0 && isNavigationCollapsed) {
        event.preventDefault();
        onToggleExpandedState?.();
      } else if (onNavigationDismiss) {
        onNavigationDismiss();
        if (onClick && onClick !== onNavigationDismiss) {
          onClick();
        }
        return;
      }
      if (onClick) {
        onClick();
      }
    };
  }
}
function ItemSecondaryAction({
  url,
  icon,
  accessibilityLabel,
  tooltip,
  onClick,
  disabled,
  tabIndex
}) {
  const markup = url ? /*#__PURE__*/React.createElement(UnstyledLink.UnstyledLink, {
    external: true,
    url: url,
    className: Navigation.default.SecondaryAction,
    tabIndex: tabIndex,
    "aria-disabled": disabled,
    "aria-label": accessibilityLabel,
    onClick: onClick
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: icon
  })) : /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, {
    className: Navigation.default.SecondaryAction,
    tabIndex: tabIndex,
    disabled: disabled,
    accessibilityLabel: accessibilityLabel,
    onClick: onClick
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: icon
  }));
  return tooltip ? /*#__PURE__*/React.createElement(Tooltip.Tooltip, tooltip, " ", markup, " ") : markup;
}
function isNavigationItemActive(navigationItem, currentPath) {
  const matchState = matchStateForItem(navigationItem, currentPath);
  const matchingSubNavigationItems = navigationItem.subNavigationItems && navigationItem.subNavigationItems.filter(item => {
    const subMatchState = matchStateForItem(item, currentPath);
    return subMatchState === types.MatchState.MatchForced || subMatchState === types.MatchState.MatchUrl || subMatchState === types.MatchState.MatchPaths;
  });
  const childIsActive = matchingSubNavigationItems && matchingSubNavigationItems.length > 0;
  const selected = matchState === types.MatchState.MatchForced || matchState === types.MatchState.MatchUrl || matchState === types.MatchState.MatchPaths;
  return selected || childIsActive;
}
function normalizePathname(pathname) {
  const barePathname = pathname.split('?')[0].split('#')[0];
  return barePathname.endsWith('/') ? barePathname : `${barePathname}/`;
}
function safeEqual(location, path) {
  return normalizePathname(location) === normalizePathname(path);
}
function safeStartsWith(location, path) {
  return normalizePathname(location).startsWith(normalizePathname(path));
}
function matchStateForItem({
  url,
  matches,
  exactMatch,
  matchPaths,
  excludePaths
}, location) {
  if (url == null) {
    return types.MatchState.NoMatch;
  }
  if (matches) {
    return types.MatchState.MatchForced;
  }
  if (matches === false || excludePaths && excludePaths.some(path => safeStartsWith(location, path))) {
    return types.MatchState.Excluded;
  }
  if (matchPaths && matchPaths.some(path => safeStartsWith(location, path))) {
    return types.MatchState.MatchPaths;
  }
  const matchesUrl = exactMatch ? safeEqual(location, url) : safeStartsWith(location, url);
  return matchesUrl ? types.MatchState.MatchUrl : types.MatchState.NoMatch;
}
function normalizeAriaAttributes(controlId, hasSubMenu, expanded) {
  return hasSubMenu ? {
    'aria-expanded': expanded,
    'aria-controls': controlId
  } : undefined;
}

exports.Item = Item;
exports.ItemSecondaryAction = ItemSecondaryAction;
exports.MAX_SECONDARY_ACTIONS = MAX_SECONDARY_ACTIONS;
exports.isNavigationItemActive = isNavigationItemActive;

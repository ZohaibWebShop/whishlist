'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var components = require('../../../../utilities/components.js');
var isInterface = require('../../../../utilities/is-interface.js');
var isReactElement = require('../../../../utilities/is-react-element.js');
var Header$1 = require('./Header.scss.js');
var Breadcrumbs = require('../../../Breadcrumbs/Breadcrumbs.js');
var Pagination = require('../../../Pagination/Pagination.js');
var Title = require('./components/Title/Title.js');
var ActionMenu = require('../../../ActionMenu/ActionMenu.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var hooks$1 = require('../../../../utilities/features/hooks.js');
var hooks$2 = require('../../../../utilities/media-query/hooks.js');
var Box = require('../../../Box/Box.js');
var Text = require('../../../Text/Text.js');
var HorizontalStack = require('../../../HorizontalStack/HorizontalStack.js');
var utils = require('../../../Button/utils.js');
var Tooltip = require('../../../Tooltip/Tooltip.js');

const SHORT_TITLE = 20;
const REALLY_SHORT_TITLE = 8;
const LONG_TITLE = 34;
function Header({
  title,
  subtitle,
  titleMetadata,
  additionalMetadata,
  titleHidden = false,
  primaryAction,
  pagination,
  additionalNavigation,
  backAction,
  secondaryActions = [],
  actionGroups = [],
  compactTitle = false,
  onActionRollup
}) {
  const i18n = hooks.useI18n();
  const {
    polarisSummerEditions2023
  } = hooks$1.useFeatures();
  const {
    isNavigationCollapsed
  } = hooks$2.useMediaQuery();
  if (additionalNavigation && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn('Deprecation: The `additionalNavigation` on Page is deprecated and will be removed in the next major version.');
  }
  const isSingleRow = !primaryAction && !pagination && (isInterface.isInterface(secondaryActions) && !secondaryActions.length || isReactElement.isReactElement(secondaryActions)) && !actionGroups.length;
  const breadcrumbMarkup = backAction ? /*#__PURE__*/React.createElement("div", {
    className: Header$1.default.BreadcrumbWrapper
  }, /*#__PURE__*/React.createElement(Box.Box, {
    maxWidth: "100%",
    paddingInlineEnd: polarisSummerEditions2023 ? '1' : '4',
    printHidden: true
  }, /*#__PURE__*/React.createElement(Breadcrumbs.Breadcrumbs, {
    backAction: backAction
  }))) : null;
  const paginationMarkup = pagination && !isNavigationCollapsed ? /*#__PURE__*/React.createElement("div", {
    className: Header$1.default.PaginationWrapper
  }, /*#__PURE__*/React.createElement(Box.Box, {
    printHidden: true
  }, /*#__PURE__*/React.createElement(Pagination.Pagination, pagination))) : null;
  const additionalNavigationMarkup = additionalNavigation ? /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    gap: "4",
    align: "end"
  }, /*#__PURE__*/React.createElement(Box.Box, {
    printHidden: true
  }, additionalNavigation)) : null;
  const pageTitleMarkup = /*#__PURE__*/React.createElement("div", {
    className: Header$1.default.TitleWrapper
  }, /*#__PURE__*/React.createElement(Title.Title, {
    title: title,
    subtitle: subtitle,
    titleMetadata: titleMetadata,
    compactTitle: compactTitle
  }));
  const primaryActionMarkup = primaryAction ? /*#__PURE__*/React.createElement(PrimaryActionMarkup, {
    primaryAction: primaryAction
  }) : null;
  let actionMenuMarkup = null;
  if (isInterface.isInterface(secondaryActions) && (secondaryActions.length > 0 || ActionMenu.hasGroupsWithActions(actionGroups))) {
    actionMenuMarkup = /*#__PURE__*/React.createElement(ActionMenu.ActionMenu, {
      actions: secondaryActions,
      groups: actionGroups,
      rollup: isNavigationCollapsed,
      rollupActionsLabel: title ? i18n.translate('Polaris.Page.Header.rollupActionsLabel', {
        title
      }) : undefined,
      onActionRollup: onActionRollup
    });
  } else if (isReactElement.isReactElement(secondaryActions)) {
    actionMenuMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, secondaryActions);
  }
  const navigationMarkup = breadcrumbMarkup || paginationMarkup || additionalNavigationMarkup ? /*#__PURE__*/React.createElement(Box.Box, {
    printHidden: true,
    paddingBlockEnd: "1",
    paddingInlineEnd: actionMenuMarkup && isNavigationCollapsed ? '10' : undefined
  }, /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    gap: "4",
    align: "space-between",
    blockAlign: "center"
  }, breadcrumbMarkup, additionalNavigationMarkup, paginationMarkup)) : null;
  const additionalMetadataMarkup = additionalMetadata ? /*#__PURE__*/React.createElement("div", {
    className: Header$1.default.AdditionalMetaData
  }, /*#__PURE__*/React.createElement(Text.Text, {
    color: "subdued",
    as: "span",
    variant: polarisSummerEditions2023 ? 'bodySm' : undefined
  }, additionalMetadata)) : null;
  const headerClassNames = css.classNames(isSingleRow && Header$1.default.isSingleRow, navigationMarkup && Header$1.default.hasNavigation, actionMenuMarkup && Header$1.default.hasActionMenu, isNavigationCollapsed && Header$1.default.mobileView, !backAction && Header$1.default.noBreadcrumbs, title && title.length < LONG_TITLE && Header$1.default.mediumTitle, title && title.length > LONG_TITLE && Header$1.default.longTitle);
  const {
    slot1,
    slot2,
    slot3,
    slot4,
    slot5,
    slot6
  } = determineLayout({
    actionMenuMarkup,
    additionalMetadataMarkup,
    additionalNavigationMarkup,
    breadcrumbMarkup,
    isNavigationCollapsed,
    pageTitleMarkup,
    paginationMarkup,
    primaryActionMarkup,
    title
  });
  return /*#__PURE__*/React.createElement(Box.Box, {
    position: "relative",
    paddingBlockStart: {
      xs: '4',
      md: polarisSummerEditions2023 ? '6' : '5'
    },
    paddingBlockEnd: {
      xs: '4',
      md: polarisSummerEditions2023 ? '6' : '5'
    },
    paddingInlineStart: {
      xs: '4',
      sm: '0'
    },
    paddingInlineEnd: {
      xs: '4',
      sm: '0'
    },
    visuallyHidden: titleHidden
  }, /*#__PURE__*/React.createElement("div", {
    className: headerClassNames
  }, /*#__PURE__*/React.createElement(components.ConditionalRender, {
    condition: [slot1, slot2, slot3, slot4].some(notNull)
  }, /*#__PURE__*/React.createElement("div", {
    className: Header$1.default.Row
  }, slot1, slot2, /*#__PURE__*/React.createElement(components.ConditionalRender, {
    condition: [slot3, slot4].some(notNull)
  }, /*#__PURE__*/React.createElement("div", {
    className: Header$1.default.RightAlign
  }, /*#__PURE__*/React.createElement(components.ConditionalWrapper, {
    condition: [slot3, slot4].every(notNull),
    wrapper: children => /*#__PURE__*/React.createElement("div", {
      className: Header$1.default.Actions
    }, children)
  }, slot3, slot4))))), /*#__PURE__*/React.createElement(components.ConditionalRender, {
    condition: [slot5, slot6].some(notNull)
  }, /*#__PURE__*/React.createElement("div", {
    className: Header$1.default.Row
  }, /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    gap: "4"
  }, slot5), /*#__PURE__*/React.createElement(components.ConditionalRender, {
    condition: slot6 != null
  }, /*#__PURE__*/React.createElement("div", {
    className: Header$1.default.RightAlign
  }, slot6))))));
}
function PrimaryActionMarkup({
  primaryAction
}) {
  const {
    isNavigationCollapsed
  } = hooks$2.useMediaQuery();
  let actionMarkup;
  if (isInterface.isInterface(primaryAction)) {
    const {
      primary: isPrimary,
      helpText
    } = primaryAction;
    const primary = isPrimary === undefined ? true : isPrimary;
    const content = utils.buttonFrom(shouldShowIconOnly(isNavigationCollapsed, primaryAction), {
      primary
    });
    actionMarkup = helpText ? /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
      content: helpText
    }, content) : content;
  } else {
    actionMarkup = primaryAction;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: Header$1.default.PrimaryActionWrapper
  }, /*#__PURE__*/React.createElement(Box.Box, {
    printHidden: true
  }, actionMarkup));
}
function shouldShowIconOnly(isMobile, action) {
  let {
    content,
    accessibilityLabel,
    icon
  } = action;
  if (icon == null) return {
    ...action,
    icon: undefined
  };
  if (isMobile) {
    accessibilityLabel = accessibilityLabel || content;
    content = undefined;
  } else {
    icon = undefined;
  }
  return {
    ...action,
    content,
    accessibilityLabel,
    icon
  };
}
function notNull(value) {
  return value != null;
}
function determineLayout({
  actionMenuMarkup,
  additionalMetadataMarkup,
  additionalNavigationMarkup,
  breadcrumbMarkup,
  isNavigationCollapsed,
  pageTitleMarkup,
  paginationMarkup,
  primaryActionMarkup,
  title
}) {
  //    Header Layout
  // |----------------------------------------------------|
  // | slot1 | slot2 |                    | slot3 | slot4 |
  // |----------------------------------------------------|
  // | slot5 |                                    | slot6 |
  // |----------------------------------------------------|
  //
  const layouts = {
    mobileCompact: {
      slots: {
        slot1: null,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup
      },
      condition: isNavigationCollapsed && breadcrumbMarkup == null && title != null && title.length <= REALLY_SHORT_TITLE
    },
    mobileDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup
      },
      condition: isNavigationCollapsed
    },
    desktopCompact: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup
      },
      condition: !isNavigationCollapsed && paginationMarkup == null && actionMenuMarkup == null && title != null && title.length <= SHORT_TITLE
    },
    desktopDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: /*#__PURE__*/React.createElement(React.Fragment, null, actionMenuMarkup, primaryActionMarkup),
        slot4: paginationMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup
      },
      condition: !isNavigationCollapsed
    }
  };
  const layout = Object.values(layouts).find(layout => layout.condition) || layouts.desktopDefault;
  return layout.slots;
}

exports.Header = Header;

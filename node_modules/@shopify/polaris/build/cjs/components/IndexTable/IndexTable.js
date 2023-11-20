'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var reactTransitionGroup = require('react-transition-group');
var polarisTokens = require('@shopify/polaris-tokens');
var debounce = require('../../utilities/debounce.js');
var useToggle = require('../../utilities/use-toggle.js');
var useIsomorphicLayoutEffect = require('../../utilities/use-isomorphic-layout-effect.js');
var css = require('../../utilities/css.js');
var IndexTable$1 = require('./IndexTable.scss.js');
var IndexProvider = require('../IndexProvider/IndexProvider.js');
var Cell = require('./components/Cell/Cell.js');
var Row = require('./components/Row/Row.js');
var useIsBulkActionsSticky = require('../BulkActions/hooks/use-is-bulk-actions-sticky.js');
var types = require('../../utilities/index-provider/types.js');
var utilities = require('./utilities/utilities.js');
var EmptySearchResult = require('../EmptySearchResult/EmptySearchResult.js');
var ScrollContainer = require('./components/ScrollContainer/ScrollContainer.js');
var BulkActions = require('../BulkActions/BulkActions.js');
var SelectAllActions = require('../SelectAllActions/SelectAllActions.js');
var hooks = require('../../utilities/index-provider/hooks.js');
var hooks$1 = require('../../utilities/features/hooks.js');
var hooks$2 = require('../../utilities/i18n/hooks.js');
var LegacyStack = require('../LegacyStack/LegacyStack.js');
var Spinner = require('../Spinner/Spinner.js');
var AfterInitialMount = require('../AfterInitialMount/AfterInitialMount.js');
var EventListener = require('../EventListener/EventListener.js');
var Checkbox = require('../Checkbox/Checkbox.js');
var Badge = require('../Badge/Badge.js');
var Text = require('../Text/Text.js');
var UnstyledButton = require('../UnstyledButton/UnstyledButton.js');
var Tooltip = require('../Tooltip/Tooltip.js');
var Sticky = require('../Sticky/Sticky.js');

const SCROLL_BAR_PADDING = 4;
const SCROLL_BAR_DEBOUNCE_PERIOD = 300;
function IndexTableBase({
  headings,
  bulkActions = [],
  promotedBulkActions = [],
  children,
  emptyState,
  sort,
  paginatedSelectAllActionText,
  lastColumnSticky = false,
  sortable,
  sortDirection,
  defaultSortDirection = 'descending',
  sortColumnIndex,
  onSort,
  sortToggleLabels,
  hasZebraStriping,
  ...restProps
}) {
  const {
    loading,
    bulkSelectState,
    resourceName,
    bulkActionsAccessibilityLabel,
    selectMode,
    selectable = restProps.selectable,
    paginatedSelectAllText,
    itemCount,
    hasMoreItems,
    selectedItemsCount,
    condensed
  } = hooks.useIndexValue();
  const {
    polarisSummerEditions2023
  } = hooks$1.useFeatures();
  const handleSelectionChange = hooks.useIndexSelectionChange();
  const i18n = hooks$2.useI18n();
  const {
    value: hasMoreLeftColumns,
    toggle: toggleHasMoreLeftColumns
  } = useToggle.useToggle(false);
  const tablePosition = React.useRef({
    top: 0,
    left: 0
  });
  const tableHeadingRects = React.useRef([]);
  const scrollableContainerElement = React.useRef(null);
  const tableElement = React.useRef(null);
  const condensedListElement = React.useRef(null);
  const loadingElement = React.useRef(null);
  const [tableInitialized, setTableInitialized] = React.useState(false);
  const [stickyWrapper, setStickyWrapper] = React.useState(null);
  const [hideScrollContainer, setHideScrollContainer] = React.useState(false);
  const tableHeadings = React.useRef([]);
  const stickyTableHeadings = React.useRef([]);
  const stickyHeaderWrapperElement = React.useRef(null);
  const firstStickyHeaderElement = React.useRef(null);
  const stickyHeaderElement = React.useRef(null);
  const scrollBarElement = React.useRef(null);
  const scrollContainerElement = React.useRef(null);
  const scrollingWithBar = React.useRef(false);
  const scrollingContainer = React.useRef(false);
  const lastSortedColumnIndex = React.useRef(sortColumnIndex);
  const renderAfterSelectEvent = React.useRef(false);
  const lastSelectedItemsCount = React.useRef(0);
  const hasSelected = React.useRef(false);
  if (selectedItemsCount !== lastSelectedItemsCount.current) {
    renderAfterSelectEvent.current = true;
    lastSelectedItemsCount.current = selectedItemsCount;
  }
  if (!hasSelected.current && selectedItemsCount !== 0) {
    hasSelected.current = true;
  }
  const {
    bulkActionsIntersectionRef,
    tableMeasurerRef,
    isBulkActionsSticky,
    bulkActionsAbsoluteOffset,
    bulkActionsMaxWidth,
    bulkActionsOffsetLeft,
    computeTableDimensions
  } = useIsBulkActionsSticky.useIsBulkActionsSticky(selectMode);
  React.useEffect(() => {
    computeTableDimensions();
  }, [computeTableDimensions, itemCount]);
  const tableBodyRef = React.useCallback(node => {
    if (node !== null && !tableInitialized) {
      setTableInitialized(true);
    }
  }, [tableInitialized]);
  const handleSelectAllItemsInStore = React.useCallback(() => {
    handleSelectionChange(selectedItemsCount === types.SELECT_ALL_ITEMS ? types.SelectionType.Page : types.SelectionType.All, true);
  }, [handleSelectionChange, selectedItemsCount]);
  const calculateFirstHeaderOffset = React.useCallback(() => {
    if (!selectable) {
      return tableHeadingRects.current[0].offsetWidth;
    }
    return condensed ? tableHeadingRects.current[0].offsetWidth : tableHeadingRects.current[0].offsetWidth + tableHeadingRects.current[1].offsetWidth;
  }, [condensed, selectable]);
  const resizeTableHeadings = React.useMemo(() => debounce.debounce(() => {
    if (!tableElement.current || !scrollableContainerElement.current) {
      return;
    }
    const boundingRect = scrollableContainerElement.current.getBoundingClientRect();
    tablePosition.current = {
      top: boundingRect.top,
      left: boundingRect.left
    };
    tableHeadingRects.current = tableHeadings.current.map(heading => ({
      offsetWidth: heading.offsetWidth || 0,
      offsetLeft: heading.offsetLeft || 0
    }));
    if (tableHeadings.current.length === 0) {
      return;
    }

    // update left offset for first column
    if (selectable && tableHeadings.current.length > 1) tableHeadings.current[1].style.left = `${tableHeadingRects.current[0].offsetWidth}px`;

    // update the min width of the checkbox to be the be the un-padded width of the first heading
    if (selectable && firstStickyHeaderElement?.current && !polarisSummerEditions2023) {
      const elementStyle = getComputedStyle(tableHeadings.current[0]);
      const boxWidth = tableHeadings.current[0].offsetWidth;
      firstStickyHeaderElement.current.style.minWidth = `calc(${boxWidth}px - ${elementStyle.paddingLeft} - ${elementStyle.paddingRight} + 2px)`;
    }

    // update sticky header min-widths
    stickyTableHeadings.current.forEach((heading, index) => {
      let minWidth = 0;
      if (index === 0 && (!isBreakpointsXS() || !selectable)) {
        minWidth = calculateFirstHeaderOffset();
      } else if (selectable && tableHeadingRects.current.length > index) {
        minWidth = tableHeadingRects.current[index]?.offsetWidth || 0;
      } else if (!selectable && tableHeadingRects.current.length >= index) {
        minWidth = tableHeadingRects.current[index - 1]?.offsetWidth || 0;
      }
      heading.style.minWidth = `${minWidth}px`;
    });
  }), [calculateFirstHeaderOffset, selectable, polarisSummerEditions2023]);
  const resizeTableScrollBar = React.useCallback(() => {
    if (scrollBarElement.current && tableElement.current && tableInitialized) {
      scrollBarElement.current.style.setProperty('--pc-index-table-scroll-bar-content-width', `${tableElement.current.offsetWidth - SCROLL_BAR_PADDING}px`);
      setHideScrollContainer(scrollContainerElement.current?.offsetWidth === tableElement.current?.offsetWidth);
    }
  }, [tableInitialized]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceResizeTableScrollbar = React.useCallback(debounce.debounce(resizeTableScrollBar, SCROLL_BAR_DEBOUNCE_PERIOD, {
    trailing: true
  }), [resizeTableScrollBar]);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCanScrollRight = React.useCallback(debounce.debounce(() => {
    if (!lastColumnSticky || !tableElement.current || !scrollableContainerElement.current) {
      return;
    }
    const tableRect = tableElement.current.getBoundingClientRect();
    const scrollableRect = scrollableContainerElement.current.getBoundingClientRect();
    setCanScrollRight(tableRect.width > scrollableRect.width);
  }), [lastColumnSticky]);
  React.useEffect(() => {
    handleCanScrollRight();
  }, [handleCanScrollRight]);
  const [canFitStickyColumn, setCanFitStickyColumn] = React.useState(true);
  const handleCanFitStickyColumn = React.useCallback(() => {
    if (!scrollableContainerElement.current || !tableHeadings.current.length) {
      return;
    }
    const scrollableRect = scrollableContainerElement.current.getBoundingClientRect();
    const checkboxColumnWidth = selectable ? tableHeadings.current[0].getBoundingClientRect().width : 0;
    const firstStickyColumnWidth = tableHeadings.current[selectable ? 1 : 0].getBoundingClientRect().width;
    const lastColumnIsNotTheFirst = selectable ? tableHeadings.current.length > 2 : 1;
    // Don't consider the last column in the calculations if it's not sticky
    const lastStickyColumnWidth = lastColumnSticky && lastColumnIsNotTheFirst ? tableHeadings.current[tableHeadings.current.length - 1].getBoundingClientRect().width : 0;
    // Secure some space for the remaining columns to be visible
    const restOfContentMinWidth = 100;
    setCanFitStickyColumn(scrollableRect.width > firstStickyColumnWidth + checkboxColumnWidth + lastStickyColumnWidth + restOfContentMinWidth);
  }, [lastColumnSticky, selectable]);
  React.useEffect(() => {
    if (tableInitialized) {
      handleCanFitStickyColumn();
    }
  }, [handleCanFitStickyColumn, tableInitialized]);
  const handleResize = React.useCallback(() => {
    // hide the scrollbar when resizing
    scrollBarElement.current?.style.setProperty('--pc-index-table-scroll-bar-content-width', `0px`);
    resizeTableHeadings();
    debounceResizeTableScrollbar();
    handleCanScrollRight();
    handleCanFitStickyColumn();
  }, [resizeTableHeadings, debounceResizeTableScrollbar, handleCanScrollRight, handleCanFitStickyColumn]);
  const handleScrollContainerScroll = React.useCallback((canScrollLeft, canScrollRight) => {
    if (!scrollableContainerElement.current || !scrollBarElement.current) {
      return;
    }
    if (!scrollingWithBar.current) {
      scrollingContainer.current = true;
      scrollBarElement.current.scrollLeft = scrollableContainerElement.current.scrollLeft;
    }
    scrollingWithBar.current = false;
    if (stickyHeaderElement.current) {
      stickyHeaderElement.current.scrollLeft = scrollableContainerElement.current.scrollLeft;
    }
    if (canScrollLeft && !hasMoreLeftColumns || !canScrollLeft && hasMoreLeftColumns) {
      toggleHasMoreLeftColumns();
    }
    setCanScrollRight(canScrollRight);
  }, [hasMoreLeftColumns, toggleHasMoreLeftColumns]);
  const handleScrollBarScroll = React.useCallback(() => {
    if (!scrollableContainerElement.current || !scrollBarElement.current) {
      return;
    }
    if (!scrollingContainer.current) {
      scrollingWithBar.current = true;
      scrollableContainerElement.current.scrollLeft = scrollBarElement.current.scrollLeft;
    }
    scrollingContainer.current = false;
  }, []);
  useIsomorphicLayoutEffect.useIsomorphicLayoutEffect(() => {
    tableHeadings.current = utilities.getTableHeadingsBySelector(tableElement.current, '[data-index-table-heading]');
    stickyTableHeadings.current = utilities.getTableHeadingsBySelector(stickyHeaderWrapperElement.current, '[data-index-table-sticky-heading]');
    resizeTableHeadings();
  }, [headings, resizeTableHeadings, firstStickyHeaderElement, tableInitialized]);
  React.useEffect(() => {
    resizeTableScrollBar();
    setStickyWrapper(condensed ? condensedListElement.current : tableElement.current);
  }, [tableInitialized, resizeTableScrollBar, condensed]);
  const hasBulkActions = Boolean(promotedBulkActions && promotedBulkActions.length > 0 || bulkActions && bulkActions.length > 0);
  const headingsMarkup = headings.map(renderHeading).reduce((acc, heading) => acc.concat(heading), []);
  const bulkActionsSelectable = Boolean(promotedBulkActions.length > 0 || bulkActions.length > 0);
  const stickyColumnHeaderStyle = tableHeadingRects.current && tableHeadingRects.current.length > 0 ? {
    minWidth: calculateFirstHeaderOffset()
  } : undefined;
  const stickyColumnHeader = /*#__PURE__*/React.createElement("div", {
    className: css.classNames(IndexTable$1.default.TableHeading, polarisSummerEditions2023 && selectable && IndexTable$1.default['TableHeading-first'], polarisSummerEditions2023 && headings[0].flush && IndexTable$1.default['TableHeading-flush']),
    key: getHeadingKey(headings[0]),
    style: stickyColumnHeaderStyle,
    "data-index-table-sticky-heading": true
  }, /*#__PURE__*/React.createElement(LegacyStack.LegacyStack, {
    spacing: "none",
    wrap: false,
    alignment: "center"
  }, selectable && /*#__PURE__*/React.createElement("div", {
    className: IndexTable$1.default.FirstStickyHeaderElement,
    ref: firstStickyHeaderElement
  }, renderCheckboxContent()), selectable && /*#__PURE__*/React.createElement("div", {
    className: IndexTable$1.default['StickyTableHeading-second-scrolling']
  }, renderHeadingContent(headings[0], 0)), !selectable && /*#__PURE__*/React.createElement("div", {
    className: css.classNames(IndexTable$1.default.FirstStickyHeaderElement),
    ref: firstStickyHeaderElement
  }, renderHeadingContent(headings[0], 0))));
  const stickyHeadingsMarkup = headings.map(renderStickyHeading);
  const selectedItemsCountLabel = selectedItemsCount === types.SELECT_ALL_ITEMS ? `${itemCount}+` : selectedItemsCount;
  const handleTogglePage = React.useCallback(() => {
    handleSelectionChange(types.SelectionType.Page, Boolean(!bulkSelectState || bulkSelectState === 'indeterminate'));
  }, [bulkSelectState, handleSelectionChange]);
  const paginatedSelectAllAction = getPaginatedSelectAllAction();
  const loadingTransitionClassNames = {
    enter: IndexTable$1.default['LoadingContainer-enter'],
    enterActive: IndexTable$1.default['LoadingContainer-enter-active'],
    exit: IndexTable$1.default['LoadingContainer-exit'],
    exitActive: IndexTable$1.default['LoadingContainer-exit-active']
  };
  const loadingMarkup = /*#__PURE__*/React.createElement(reactTransitionGroup.CSSTransition, {
    in: loading,
    classNames: loadingTransitionClassNames,
    timeout: parseInt(polarisTokens.motion['motion-duration-100'], 10),
    nodeRef: loadingElement,
    appear: true,
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", {
    className: IndexTable$1.default.LoadingPanel,
    ref: loadingElement
  }, /*#__PURE__*/React.createElement("div", {
    className: IndexTable$1.default.LoadingPanelRow
  }, /*#__PURE__*/React.createElement(Spinner.Spinner, {
    size: "small"
  }), /*#__PURE__*/React.createElement("span", {
    className: IndexTable$1.default.LoadingPanelText
  }, i18n.translate('Polaris.IndexTable.resourceLoadingAccessibilityLabel', {
    resourceNamePlural: resourceName.plural.toLocaleLowerCase()
  })))));
  const stickyTableClassNames = css.classNames(IndexTable$1.default.StickyTable, condensed && IndexTable$1.default['StickyTable-condensed']);
  const shouldShowBulkActions = bulkActionsSelectable && selectedItemsCount;
  const bulkActionClassNames = css.classNames(IndexTable$1.default.BulkActionsWrapper, isBulkActionsSticky && IndexTable$1.default.BulkActionsWrapperSticky);
  const shouldShowActions = !condensed || selectedItemsCount;
  const promotedActions = shouldShowActions ? promotedBulkActions : [];
  const actions = shouldShowActions ? bulkActions : [];
  const bulkActionsMarkup = shouldShowBulkActions && !condensed ? /*#__PURE__*/React.createElement("div", {
    className: bulkActionClassNames,
    style: {
      insetBlockStart: isBulkActionsSticky ? undefined : bulkActionsAbsoluteOffset,
      width: bulkActionsMaxWidth,
      insetInlineStart: isBulkActionsSticky ? bulkActionsOffsetLeft : undefined
    }
  }, /*#__PURE__*/React.createElement(BulkActions.BulkActions, {
    selectMode: selectMode,
    promotedActions: promotedActions,
    actions: actions,
    onSelectModeToggle: condensed ? handleSelectModeToggle : undefined,
    isSticky: isBulkActionsSticky,
    width: bulkActionsMaxWidth
  })) : null;
  const stickyHeaderMarkup = /*#__PURE__*/React.createElement("div", {
    className: stickyTableClassNames,
    role: "presentation"
  }, /*#__PURE__*/React.createElement(Sticky.Sticky, {
    boundingElement: stickyWrapper
  }, isSticky => {
    const stickyHeaderClassNames = css.classNames(IndexTable$1.default.StickyTableHeader, isSticky && IndexTable$1.default['StickyTableHeader-isSticky']);
    const selectAllActionsClassName = css.classNames(IndexTable$1.default.SelectAllActionsWrapper, condensed && IndexTable$1.default['StickyTableHeader-condensed'], isSticky && IndexTable$1.default['StickyTableHeader-isSticky']);
    const selectAllActionsMarkup = shouldShowBulkActions && !condensed ? /*#__PURE__*/React.createElement("div", {
      className: selectAllActionsClassName
    }, /*#__PURE__*/React.createElement(SelectAllActions.SelectAllActions, {
      label: i18n.translate('Polaris.IndexTable.selected', {
        selectedItemsCount: selectedItemsCountLabel
      }),
      accessibilityLabel: bulkActionsAccessibilityLabel,
      selected: bulkSelectState,
      selectMode: selectMode,
      onToggleAll: handleTogglePage,
      paginatedSelectAllText: paginatedSelectAllText,
      paginatedSelectAllAction: paginatedSelectAllAction
    }), loadingMarkup) : null;
    const headerMarkup = condensed ? /*#__PURE__*/React.createElement("div", {
      className: css.classNames(IndexTable$1.default.HeaderWrapper, (!selectable || condensed) && IndexTable$1.default.unselectable)
    }, loadingMarkup, sort) : /*#__PURE__*/React.createElement("div", {
      className: stickyHeaderClassNames,
      ref: stickyHeaderWrapperElement
    }, loadingMarkup, /*#__PURE__*/React.createElement("div", {
      className: IndexTable$1.default.StickyTableColumnHeader
    }, stickyColumnHeader), /*#__PURE__*/React.createElement("div", {
      className: IndexTable$1.default.StickyTableHeadings,
      ref: stickyHeaderElement
    }, stickyHeadingsMarkup));
    const stickyContent = selectAllActionsMarkup ?? headerMarkup;
    return stickyContent;
  }), bulkActionsMarkup);
  const scrollBarWrapperClassNames = css.classNames(IndexTable$1.default.ScrollBarContainer, condensed && IndexTable$1.default.scrollBarContainerCondensed, hideScrollContainer && IndexTable$1.default.scrollBarContainerHidden);
  const scrollBarClassNames = css.classNames(tableElement.current && tableInitialized && IndexTable$1.default.ScrollBarContent);
  const scrollBarMarkup = itemCount > 0 ? /*#__PURE__*/React.createElement(AfterInitialMount.AfterInitialMount, {
    onMount: resizeTableScrollBar
  }, /*#__PURE__*/React.createElement("div", {
    className: scrollBarWrapperClassNames,
    ref: scrollContainerElement
  }, /*#__PURE__*/React.createElement("div", {
    onScroll: handleScrollBarScroll,
    className: IndexTable$1.default.ScrollBar,
    ref: scrollBarElement
  }, /*#__PURE__*/React.createElement("div", {
    className: scrollBarClassNames
  })))) : null;
  const isSortable = sortable?.some(value => value);
  const tableClassNames = css.classNames(IndexTable$1.default.Table, hasMoreLeftColumns && IndexTable$1.default['Table-scrolling'], selectMode && IndexTable$1.default.disableTextSelection, selectMode && shouldShowBulkActions && IndexTable$1.default.selectMode, !selectable && IndexTable$1.default['Table-unselectable'], canFitStickyColumn && IndexTable$1.default['Table-sticky'], isSortable && IndexTable$1.default['Table-sortable'], canFitStickyColumn && lastColumnSticky && IndexTable$1.default['Table-sticky-last'], canFitStickyColumn && lastColumnSticky && canScrollRight && IndexTable$1.default['Table-sticky-scrolling'], hasZebraStriping && IndexTable$1.default.ZebraStriping);
  const emptyStateMarkup = emptyState ? emptyState : /*#__PURE__*/React.createElement(EmptySearchResult.EmptySearchResult, {
    title: i18n.translate('Polaris.IndexTable.emptySearchTitle', {
      resourceNamePlural: resourceName.plural
    }),
    description: i18n.translate('Polaris.IndexTable.emptySearchDescription'),
    withIllustration: true
  });
  const sharedMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EventListener.EventListener, {
    event: "resize",
    handler: handleResize
  }), /*#__PURE__*/React.createElement(AfterInitialMount.AfterInitialMount, null, stickyHeaderMarkup));
  const condensedClassNames = css.classNames(IndexTable$1.default.CondensedList, hasZebraStriping && IndexTable$1.default.ZebraStriping);
  const bodyMarkup = condensed ? /*#__PURE__*/React.createElement(React.Fragment, null, sharedMarkup, /*#__PURE__*/React.createElement("ul", {
    "data-selectmode": Boolean(selectMode),
    className: condensedClassNames,
    ref: condensedListElement
  }, children)) : /*#__PURE__*/React.createElement(React.Fragment, null, sharedMarkup, /*#__PURE__*/React.createElement(ScrollContainer.ScrollContainer, {
    scrollableContainerRef: scrollableContainerElement,
    onScroll: handleScrollContainerScroll
  }, /*#__PURE__*/React.createElement("table", {
    ref: tableElement,
    className: tableClassNames
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: IndexTable$1.default.HeadingRow
  }, headingsMarkup)), /*#__PURE__*/React.createElement("tbody", {
    ref: tableBodyRef
  }, children))));
  const tableContentMarkup = itemCount > 0 ? bodyMarkup : /*#__PURE__*/React.createElement("div", {
    className: IndexTable$1.default.EmptySearchResultWrapper
  }, emptyStateMarkup);
  const tableWrapperClassNames = css.classNames(IndexTable$1.default.IndexTableWrapper, hideScrollContainer && IndexTable$1.default['IndexTableWrapper-scrollBarHidden'], Boolean(bulkActionsMarkup) && selectMode && IndexTable$1.default.IndexTableWrapperWithBulkActions);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: IndexTable$1.default.IndexTable
  }, /*#__PURE__*/React.createElement("div", {
    className: tableWrapperClassNames,
    ref: tableMeasurerRef
  }, !shouldShowBulkActions && !condensed && loadingMarkup, tableContentMarkup), /*#__PURE__*/React.createElement("div", {
    ref: bulkActionsIntersectionRef
  })), scrollBarMarkup);
  function renderHeading(heading, index) {
    const isSecond = index === 0;
    const isLast = index === headings.length - 1;
    const hasSortable = sortable?.some(value => value === true);
    const headingAlignment = heading.alignment || 'start';
    const headingContentClassName = css.classNames(IndexTable$1.default.TableHeading, headingAlignment === 'center' && IndexTable$1.default['TableHeading-align-center'], headingAlignment === 'end' && IndexTable$1.default['TableHeading-align-end'], hasSortable && IndexTable$1.default['TableHeading-sortable'], isSecond && IndexTable$1.default['TableHeading-second'], isLast && !heading.hidden && IndexTable$1.default['TableHeading-last'], !selectable && IndexTable$1.default['TableHeading-unselectable'], heading.flush && IndexTable$1.default['TableHeading-flush']);
    const stickyPositioningStyle = selectable !== false && isSecond && tableHeadingRects.current && tableHeadingRects.current.length > 0 ? {
      left: tableHeadingRects.current[0].offsetWidth
    } : undefined;
    const headingContent = /*#__PURE__*/React.createElement("th", {
      className: headingContentClassName,
      key: getHeadingKey(heading),
      "data-index-table-heading": true,
      style: stickyPositioningStyle
    }, renderHeadingContent(heading, index));
    if (index !== 0 || !selectable) {
      return headingContent;
    }
    const checkboxClassName = css.classNames(IndexTable$1.default.TableHeading, hasSortable && IndexTable$1.default['TableHeading-sortable'], index === 0 && IndexTable$1.default['TableHeading-first']);
    const checkboxContent = /*#__PURE__*/React.createElement("th", {
      className: checkboxClassName,
      key: `${heading}-${index}`,
      "data-index-table-heading": true
    }, renderCheckboxContent());
    return [checkboxContent, headingContent];
  }
  function renderCheckboxContent() {
    return /*#__PURE__*/React.createElement("div", {
      className: IndexTable$1.default.ColumnHeaderCheckboxWrapper
    }, /*#__PURE__*/React.createElement(Checkbox.Checkbox, {
      label: i18n.translate('Polaris.IndexTable.selectAllLabel', {
        resourceNamePlural: resourceName.plural
      }),
      labelHidden: true,
      onChange: handleSelectPage,
      checked: bulkSelectState
    }));
  }
  function handleSortHeadingClick(index, direction) {
    renderAfterSelectEvent.current = false;
    hasSelected.current = false;
    lastSortedColumnIndex.current = sortColumnIndex;
    onSort?.(index, direction);
  }
  function renderHeadingContent(heading, index) {
    let headingContent;
    const defaultTooltipProps = {
      width: heading.tooltipWidth ?? 'default',
      activatorWrapper: 'div',
      dismissOnMouseOut: true,
      persistOnClick: heading.tooltipPersistsOnClick
    };
    const defaultHeaderTooltipProps = {
      ...defaultTooltipProps,
      padding: '4',
      borderRadius: '2',
      content: heading.tooltipContent,
      preferredPosition: 'above'
    };
    if (heading.new) {
      headingContent = /*#__PURE__*/React.createElement(LegacyStack.LegacyStack, {
        wrap: false,
        alignment: "center"
      }, /*#__PURE__*/React.createElement("span", null, heading.title), /*#__PURE__*/React.createElement(Badge.Badge, {
        status: "new"
      }, i18n.translate('Polaris.IndexTable.onboardingBadgeText')));
    } else if (heading.hidden) {
      headingContent = /*#__PURE__*/React.createElement(Text.Text, {
        as: "span",
        visuallyHidden: true
      }, heading.title);
    } else {
      headingContent = heading.title;
    }
    if (sortable?.[index]) {
      const isCurrentlySorted = index === sortColumnIndex;
      const isPreviouslySorted = !isCurrentlySorted && index === lastSortedColumnIndex.current;
      const isRenderAfterSelectEvent = renderAfterSelectEvent.current || !hasSelected.current && selectedItemsCount !== 0;
      const isAscending = sortDirection === 'ascending';
      let newDirection = heading.defaultSortDirection ?? defaultSortDirection;
      let SourceComponent = newDirection === 'ascending' ? polarisIcons.SortAscendingMajor : polarisIcons.SortDescendingMajor;
      if (isCurrentlySorted) {
        newDirection = isAscending ? 'descending' : 'ascending';
        SourceComponent = sortDirection === 'ascending' ? polarisIcons.SortAscendingMajor : polarisIcons.SortDescendingMajor;
      }
      const iconMarkup = /*#__PURE__*/React.createElement("span", {
        className: css.classNames(IndexTable$1.default.TableHeadingSortIcon, heading?.alignment === 'end' && IndexTable$1.default['TableHeadingSortIcon-heading-align-end'], isCurrentlySorted && IndexTable$1.default['TableHeadingSortIcon-visible'])
      }, /*#__PURE__*/React.createElement(SourceComponent, {
        focusable: "false",
        "aria-hidden": "true",
        className: IndexTable$1.default.TableHeadingSortSvg
      }));
      const defaultSortButtonProps = {
        onClick: () => handleSortHeadingClick(index, newDirection),
        className: css.classNames(IndexTable$1.default.TableHeadingSortButton, !isCurrentlySorted && heading?.alignment === 'end' && IndexTable$1.default['TableHeadingSortButton-heading-align-end'], isCurrentlySorted && heading?.alignment === 'end' && IndexTable$1.default['TableHeadingSortButton-heading-align-end-currently-sorted'], isPreviouslySorted && !isRenderAfterSelectEvent && heading?.alignment === 'end' && IndexTable$1.default['TableHeadingSortButton-heading-align-end-previously-sorted']),
        tabIndex: selectMode ? -1 : 0
      };
      const sortMarkup = /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, defaultSortButtonProps, iconMarkup, /*#__PURE__*/React.createElement("span", {
        className: css.classNames(sortToggleLabels && selectMode && heading.tooltipContent && IndexTable$1.default.TableHeadingTooltipUnderlinePlaceholder)
      }, headingContent));
      if (!sortToggleLabels || selectMode) {
        return /*#__PURE__*/React.createElement("div", {
          className: IndexTable$1.default.SortableTableHeadingWithCustomMarkup
        }, sortMarkup);
      }
      const tooltipDirection = isCurrentlySorted ? sortDirection : newDirection;
      const sortTooltipContent = sortToggleLabels[index][tooltipDirection];
      if (!heading.tooltipContent) {
        return (
          /*#__PURE__*/
          // Regular header with sort icon and sort direction tooltip
          React.createElement(Tooltip.Tooltip, Object.assign({}, defaultTooltipProps, {
            content: sortTooltipContent,
            preferredPosition: "above"
          }), sortMarkup)
        );
      }
      if (heading.tooltipContent) {
        return (
          /*#__PURE__*/
          // Header text and sort icon have separate tooltips
          React.createElement("div", {
            className: IndexTable$1.default.SortableTableHeadingWithCustomMarkup
          }, /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, defaultSortButtonProps, /*#__PURE__*/React.createElement(Tooltip.Tooltip, defaultHeaderTooltipProps, /*#__PURE__*/React.createElement("span", {
            className: IndexTable$1.default.TableHeadingUnderline
          }, headingContent)), /*#__PURE__*/React.createElement(Tooltip.Tooltip, Object.assign({}, defaultTooltipProps, {
            content: sortTooltipContent,
            preferredPosition: "above"
          }), iconMarkup)))
        );
      }
    }
    if (heading.tooltipContent) {
      return (
        /*#__PURE__*/
        // Non-sortable header with tooltip
        React.createElement(Tooltip.Tooltip, Object.assign({}, defaultHeaderTooltipProps, {
          activatorWrapper: "span"
        }), /*#__PURE__*/React.createElement("span", {
          className: css.classNames(IndexTable$1.default.TableHeadingUnderline, IndexTable$1.default.SortableTableHeaderWrapper)
        }, headingContent))
      );
    }
    return headingContent;
  }
  function handleSelectPage(checked) {
    handleSelectionChange(types.SelectionType.Page, checked);
  }
  function renderStickyHeading(heading, index) {
    const position = index + 1;
    const headingStyle = tableHeadingRects.current && tableHeadingRects.current.length > position ? {
      minWidth: tableHeadingRects.current[position].offsetWidth
    } : undefined;
    const headingAlignment = heading.alignment || 'start';
    const headingContent = renderHeadingContent(heading, index);
    const stickyHeadingClassName = css.classNames(IndexTable$1.default.TableHeading, polarisSummerEditions2023 && heading.flush && IndexTable$1.default['TableHeading-flush'], headingAlignment === 'center' && IndexTable$1.default['TableHeading-align-center'], headingAlignment === 'end' && IndexTable$1.default['TableHeading-align-end'], index === 0 && IndexTable$1.default['StickyTableHeading-second'], index === 0 && !selectable && IndexTable$1.default.unselectable);
    return /*#__PURE__*/React.createElement("div", {
      className: stickyHeadingClassName,
      key: getHeadingKey(heading),
      style: headingStyle,
      "data-index-table-sticky-heading": true
    }, headingContent);
  }
  function getPaginatedSelectAllAction() {
    if (!selectable || !hasBulkActions || !hasMoreItems) {
      return;
    }
    const customActionText = paginatedSelectAllActionText ?? i18n.translate('Polaris.IndexTable.selectAllItems', {
      itemsLength: itemCount,
      resourceNamePlural: resourceName.plural.toLocaleLowerCase()
    });
    const actionText = selectedItemsCount === types.SELECT_ALL_ITEMS ? i18n.translate('Polaris.IndexTable.undo') : customActionText;
    return {
      content: actionText,
      onAction: handleSelectAllItemsInStore
    };
  }
  function handleSelectModeToggle() {
    handleSelectionChange(types.SelectionType.All, false);
  }
}
const isBreakpointsXS = () => {
  return typeof window === 'undefined' ? false : window.innerWidth < parseFloat(polarisTokens.toPx(polarisTokens.tokens.breakpoints['breakpoints-sm']) ?? '');
};
function getHeadingKey(heading) {
  if ('id' in heading && heading.id) {
    return heading.id;
  }
  if (typeof heading.title === 'string') {
    return heading.title;
  }
  return '';
}
function IndexTable({
  children,
  selectable = true,
  itemCount,
  selectedItemsCount = 0,
  resourceName: passedResourceName,
  loading,
  hasMoreItems,
  condensed,
  onSelectionChange,
  ...indexTableBaseProps
}) {
  return /*#__PURE__*/React.createElement(IndexProvider.IndexProvider, {
    selectable: selectable && !condensed,
    itemCount: itemCount,
    selectedItemsCount: selectedItemsCount,
    resourceName: passedResourceName,
    loading: loading,
    hasMoreItems: hasMoreItems,
    condensed: condensed,
    onSelectionChange: onSelectionChange
  }, /*#__PURE__*/React.createElement(IndexTableBase, indexTableBaseProps, children));
}
IndexTable.Cell = Cell.Cell;
IndexTable.Row = Row.Row;

exports.IndexTable = IndexTable;

'use strict';

var React = require('react');
var useToggle = require('../../../../utilities/use-toggle.js');
var css = require('../../../../utilities/css.js');
var IndexTable = require('../../IndexTable.scss.js');
var hooks = require('../../../../utilities/index-provider/hooks.js');
var types = require('../../../../utilities/index-provider/types.js');
var Checkbox = require('../Checkbox/Checkbox.js');
var context = require('../../../../utilities/index-table/context.js');

const Row = /*#__PURE__*/React.memo(function Row({
  children,
  selected,
  id,
  position,
  subdued,
  status,
  disabled,
  onNavigation,
  onClick
}) {
  const {
    selectable,
    selectMode,
    condensed
  } = hooks.useIndexRow();
  const onSelectionChange = hooks.useIndexSelectionChange();
  const {
    value: hovered,
    setTrue: setHoverIn,
    setFalse: setHoverOut
  } = useToggle.useToggle(false);
  const handleInteraction = React.useCallback(event => {
    event.stopPropagation();
    if ('key' in event && event.key !== ' ' || !onSelectionChange) return;
    const selectionType = event.nativeEvent.shiftKey ? types.SelectionType.Multi : types.SelectionType.Single;
    onSelectionChange(selectionType, !selected, id, position);
  }, [id, onSelectionChange, position, selected]);
  const contextValue = React.useMemo(() => ({
    itemId: id,
    selected,
    position,
    onInteraction: handleInteraction,
    disabled
  }), [id, selected, disabled, position, handleInteraction]);
  const primaryLinkElement = React.useRef(null);
  const isNavigating = React.useRef(false);
  const tableRowRef = React.useRef(null);
  const tableRowCallbackRef = React.useCallback(node => {
    tableRowRef.current = node;
    const el = node?.querySelector('[data-primary-link]');
    if (el) {
      primaryLinkElement.current = el;
    }
  }, []);
  const rowClassName = css.classNames(IndexTable.default.TableRow, selectable && condensed && IndexTable.default.condensedRow, selected && IndexTable.default['TableRow-selected'], subdued && IndexTable.default['TableRow-subdued'], hovered && !condensed && IndexTable.default['TableRow-hovered'], disabled && IndexTable.default['TableRow-disabled'], status && IndexTable.default[css.variationName('status', status)], !selectable && !primaryLinkElement.current && IndexTable.default['TableRow-unclickable']);
  let handleRowClick;
  if (!disabled && selectable || primaryLinkElement.current) {
    handleRowClick = event => {
      if (!tableRowRef.current || isNavigating.current) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      if (onClick) {
        onClick();
        return;
      }
      if (primaryLinkElement.current && !selectMode) {
        isNavigating.current = true;
        const {
          ctrlKey,
          metaKey
        } = event.nativeEvent;
        if (onNavigation) {
          onNavigation(id);
        }
        if ((ctrlKey || metaKey) && primaryLinkElement.current instanceof HTMLAnchorElement) {
          isNavigating.current = false;
          window.open(primaryLinkElement.current.href, '_blank');
          return;
        }
        primaryLinkElement.current.dispatchEvent(new MouseEvent(event.type, event.nativeEvent));
      } else {
        isNavigating.current = false;
        handleInteraction(event);
      }
    };
  }
  const RowWrapper = condensed ? 'li' : 'tr';
  const checkboxMarkup = selectable ? /*#__PURE__*/React.createElement(Checkbox.Checkbox, null) : null;
  return /*#__PURE__*/React.createElement(context.RowContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(context.RowHoveredContext.Provider, {
    value: hovered
  }, /*#__PURE__*/React.createElement(RowWrapper, {
    key: id,
    className: rowClassName,
    onMouseEnter: setHoverIn,
    onMouseLeave: setHoverOut,
    onClick: handleRowClick,
    ref: tableRowCallbackRef
  }, checkboxMarkup, children)));
});

exports.Row = Row;

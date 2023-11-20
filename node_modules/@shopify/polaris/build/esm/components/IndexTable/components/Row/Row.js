import React, { memo, useCallback, useMemo, useRef } from 'react';
import { useToggle } from '../../../../utilities/use-toggle.js';
import { classNames, variationName } from '../../../../utilities/css.js';
import styles from '../../IndexTable.scss.js';
import { useIndexRow, useIndexSelectionChange } from '../../../../utilities/index-provider/hooks.js';
import { SelectionType } from '../../../../utilities/index-provider/types.js';
import { Checkbox } from '../Checkbox/Checkbox.js';
import { RowContext, RowHoveredContext } from '../../../../utilities/index-table/context.js';

const Row = /*#__PURE__*/memo(function Row({
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
  } = useIndexRow();
  const onSelectionChange = useIndexSelectionChange();
  const {
    value: hovered,
    setTrue: setHoverIn,
    setFalse: setHoverOut
  } = useToggle(false);
  const handleInteraction = useCallback(event => {
    event.stopPropagation();
    if ('key' in event && event.key !== ' ' || !onSelectionChange) return;
    const selectionType = event.nativeEvent.shiftKey ? SelectionType.Multi : SelectionType.Single;
    onSelectionChange(selectionType, !selected, id, position);
  }, [id, onSelectionChange, position, selected]);
  const contextValue = useMemo(() => ({
    itemId: id,
    selected,
    position,
    onInteraction: handleInteraction,
    disabled
  }), [id, selected, disabled, position, handleInteraction]);
  const primaryLinkElement = useRef(null);
  const isNavigating = useRef(false);
  const tableRowRef = useRef(null);
  const tableRowCallbackRef = useCallback(node => {
    tableRowRef.current = node;
    const el = node?.querySelector('[data-primary-link]');
    if (el) {
      primaryLinkElement.current = el;
    }
  }, []);
  const rowClassName = classNames(styles.TableRow, selectable && condensed && styles.condensedRow, selected && styles['TableRow-selected'], subdued && styles['TableRow-subdued'], hovered && !condensed && styles['TableRow-hovered'], disabled && styles['TableRow-disabled'], status && styles[variationName('status', status)], !selectable && !primaryLinkElement.current && styles['TableRow-unclickable']);
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
  const checkboxMarkup = selectable ? /*#__PURE__*/React.createElement(Checkbox, null) : null;
  return /*#__PURE__*/React.createElement(RowContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(RowHoveredContext.Provider, {
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

export { Row };

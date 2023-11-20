'use strict';

var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var css = require('../../utilities/css.js');
var SelectAllActions$1 = require('./SelectAllActions.scss.js');
var CheckableButton = require('../CheckableButton/CheckableButton.js');
var UnstyledButton = require('../UnstyledButton/UnstyledButton.js');

const SelectAllActions = /*#__PURE__*/React.forwardRef(function SelectAllActions({
  accessibilityLabel,
  label,
  selected,
  selectMode,
  paginatedSelectAllText,
  paginatedSelectAllAction,
  disabled,
  onToggleAll
}, ref) {
  const paginatedSelectAllActionMarkup = paginatedSelectAllAction ? /*#__PURE__*/React.createElement(UnstyledButton.UnstyledButton, {
    className: SelectAllActions$1.default.AllAction,
    onClick: paginatedSelectAllAction.onAction,
    size: "slim",
    disabled: disabled
  }, paginatedSelectAllAction.content) : null;
  const hasTextAndAction = paginatedSelectAllText && paginatedSelectAllAction;
  const paginatedSelectAllMarkup = paginatedSelectAllActionMarkup ? /*#__PURE__*/React.createElement("div", {
    className: SelectAllActions$1.default.PaginatedSelectAll
  }, paginatedSelectAllActionMarkup) : null;
  const ariaLive = hasTextAndAction ? 'polite' : undefined;
  const checkableButtonProps = {
    accessibilityLabel,
    label: hasTextAndAction ? paginatedSelectAllText : label,
    selected,
    onToggleAll,
    disabled,
    ariaLive,
    ref
  };
  const markup = /*#__PURE__*/React.createElement(reactTransitionGroup.Transition, {
    timeout: 0,
    in: selectMode,
    key: "markup"
  }, status => {
    const wrapperClasses = css.classNames(SelectAllActions$1.default.SelectAllActions, SelectAllActions$1.default[`SelectAllActions-${status}`]);
    return /*#__PURE__*/React.createElement("div", {
      className: wrapperClasses
    }, /*#__PURE__*/React.createElement(CheckableButton.CheckableButton, checkableButtonProps), paginatedSelectAllMarkup);
  });
  return markup;
});

exports.SelectAllActions = SelectAllActions;

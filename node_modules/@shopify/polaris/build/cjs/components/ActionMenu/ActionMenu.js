'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var ActionMenu$1 = require('./ActionMenu.scss.js');
var RollupActions = require('./components/RollupActions/RollupActions.js');
var Actions = require('./components/Actions/Actions.js');

function ActionMenu({
  actions = [],
  groups = [],
  rollup,
  rollupActionsLabel,
  onActionRollup
}) {
  if (actions.length === 0 && groups.length === 0) {
    return null;
  }
  const actionMenuClassNames = css.classNames(ActionMenu$1.default.ActionMenu, rollup && ActionMenu$1.default.rollup);
  const rollupSections = groups.map(group => convertGroupToSection(group));
  return /*#__PURE__*/React.createElement("div", {
    className: actionMenuClassNames
  }, rollup ? /*#__PURE__*/React.createElement(RollupActions.RollupActions, {
    accessibilityLabel: rollupActionsLabel,
    items: actions,
    sections: rollupSections
  }) : /*#__PURE__*/React.createElement(Actions.Actions, {
    actions: actions,
    groups: groups,
    onActionRollup: onActionRollup
  }));
}
function hasGroupsWithActions(groups = []) {
  return groups.length === 0 ? false : groups.some(group => group.actions.length > 0);
}
function convertGroupToSection({
  title,
  actions,
  disabled
}) {
  return {
    title,
    items: actions.map(action => ({
      ...action,
      disabled: disabled || action.disabled
    }))
  };
}

exports.ActionMenu = ActionMenu;
exports.hasGroupsWithActions = hasGroupsWithActions;

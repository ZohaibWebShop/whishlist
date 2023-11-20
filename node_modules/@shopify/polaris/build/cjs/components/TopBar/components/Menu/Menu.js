'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var Menu$1 = require('./Menu.scss.js');
var Message = require('./components/Message/Message.js');
var hooks = require('../../../../utilities/features/hooks.js');
var Popover = require('../../../Popover/Popover.js');
var Box = require('../../../Box/Box.js');
var ActionList = require('../../../ActionList/ActionList.js');

function Menu(props) {
  const {
    actions,
    onOpen,
    onClose,
    open,
    activatorContent,
    message,
    accessibilityLabel,
    customWidth,
    userMenu
  } = props;
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const badgeProps = message && message.badge && {
    content: message.badge.content,
    status: message.badge.status
  };
  const messageMarkup = message && /*#__PURE__*/React.createElement(Message.Message, {
    title: message.title,
    description: message.description,
    action: {
      onClick: message.action.onClick,
      content: message.action.content
    },
    link: {
      to: message.link.to,
      content: message.link.content
    },
    badge: badgeProps
  });
  return /*#__PURE__*/React.createElement(Popover.Popover, {
    activator: /*#__PURE__*/React.createElement("div", {
      className: Menu$1.default.ActivatorWrapper
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: css.classNames(Menu$1.default.Activator, userMenu && polarisSummerEditions2023 && Menu$1.default['Activator-userMenu']),
      onClick: onOpen,
      "aria-label": accessibilityLabel
    }, activatorContent)),
    active: open,
    onClose: onClose,
    fixed: true,
    fullHeight: true,
    preferredAlignment: "right"
  }, /*#__PURE__*/React.createElement("div", {
    className: Menu$1.default.MenuItems
  }, /*#__PURE__*/React.createElement(Box.Box, {
    width: customWidth
  }, /*#__PURE__*/React.createElement(ActionList.ActionList, {
    actionRole: "menuitem",
    onActionAnyItem: onClose,
    sections: actions
  }), messageMarkup)));
}

exports.Menu = Menu;

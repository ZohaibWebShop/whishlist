'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var components = require('../../../../utilities/components.js');
var FormLayout = require('../../FormLayout.scss.js');
var Item = require('../Item/Item.js');
var hooks = require('../../../../utilities/features/hooks.js');
var Box = require('../../../Box/Box.js');

function Group({
  children,
  condensed,
  title,
  helpText
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const className = css.classNames(condensed ? FormLayout.default.condensed : FormLayout.default.grouped);
  const id = React.useId();
  let helpTextElement = null;
  let helpTextID;
  let titleElement = null;
  let titleID;
  if (helpText) {
    helpTextID = `${id}HelpText`;
    helpTextElement = /*#__PURE__*/React.createElement(Box.Box, {
      id: helpTextID,
      paddingBlockStart: "2",
      paddingInlineStart: polarisSummerEditions2023 ? '2' : '5',
      paddingBlockEnd: "0",
      paddingInlineEnd: polarisSummerEditions2023 ? '2' : '5',
      color: "text-subdued"
    }, helpText);
  }
  if (title) {
    titleID = `${id}Title`;
    titleElement = /*#__PURE__*/React.createElement("div", {
      id: titleID,
      className: FormLayout.default.Title
    }, title);
  }
  const itemsMarkup = React.Children.map(children, child => components.wrapWithComponent(child, Item.Item, {}));
  return /*#__PURE__*/React.createElement("div", {
    role: "group",
    className: className,
    "aria-labelledby": titleID,
    "aria-describedby": helpTextID
  }, titleElement, /*#__PURE__*/React.createElement("div", {
    className: FormLayout.default.Items
  }, itemsMarkup), helpTextElement);
}

exports.Group = Group;

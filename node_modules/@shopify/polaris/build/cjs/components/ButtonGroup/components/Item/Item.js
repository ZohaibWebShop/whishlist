'use strict';

var React = require('react');
var useToggle = require('../../../../utilities/use-toggle.js');
var css = require('../../../../utilities/css.js');
var ButtonGroup = require('../../ButtonGroup.scss.js');

function Item({
  button
}) {
  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle.useToggle(false);
  const className = css.classNames(ButtonGroup.default.Item, focused && ButtonGroup.default['Item-focused'], button.props.plain && ButtonGroup.default['Item-plain']);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    onFocus: forceTrueFocused,
    onBlur: forceFalseFocused
  }, button);
}

exports.Item = Item;

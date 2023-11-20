'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var FilterButton = require('../FilterButton/FilterButton.js');
var ChoiceList = require('../../../ChoiceList/ChoiceList.js');
var DirectionButton = require('./components/DirectionButton/DirectionButton.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var hooks$1 = require('../../../../utilities/features/hooks.js');
var Tooltip = require('../../../Tooltip/Tooltip.js');
var Popover = require('../../../Popover/Popover.js');
var Box = require('../../../Box/Box.js');
var Icon = require('../../../Icon/Icon.js');

exports.SortButtonDirection = void 0;
(function (SortButtonDirection) {
  SortButtonDirection["Asc"] = "asc";
  SortButtonDirection["Desc"] = "desc";
})(exports.SortButtonDirection || (exports.SortButtonDirection = {}));
function SortButton({
  choices,
  selected,
  onChange,
  disabled,
  onChangeKey,
  onChangeDirection
}) {
  const i18n = hooks.useI18n();
  const {
    polarisSummerEditions2023
  } = hooks$1.useFeatures();
  const [active, setActive] = React.useState(false);
  const [selectedValueKey, selectedDirection] = selected[0].split(' ');
  function handleClick() {
    setActive(pastActive => !pastActive);
  }
  function handleClose() {
    setActive(false);
  }
  function handleChangeChoiceList(sel) {
    if (onChangeKey) {
      const [key] = sel[0].split(' ');
      onChangeKey(key);
    } else {
      onChange(sel);
    }
  }
  function handleChangeDirection(sel) {
    if (onChangeDirection) {
      const [, direction] = sel[0].split(' ');
      onChangeDirection(direction);
    } else {
      onChange(sel);
    }
  }
  const choiceListChoices = React.useMemo(() => {
    const choiceCategories = choices.reduce((acc, curr) => {
      const alreadyExists = acc.some(option => option.label === curr.label);
      const [, currentValueDirection] = curr.value.split(' ');
      const isSameDirection = currentValueDirection === selectedDirection;
      if (!alreadyExists) {
        return [...acc, curr];
      }
      if (isSameDirection) {
        return acc.map(option => {
          if (option.label === curr.label) {
            return curr;
          }
          return option;
        });
      }
      return acc;
    }, []);
    return choiceCategories;
  }, [choices, selectedDirection]);
  const selectedChoices = choices.filter(choice => {
    const [currentKey] = choice.value.split(' ');
    return currentKey === selectedValueKey;
  });
  const iconMarkup = polarisSummerEditions2023 ? polarisIcons.SortMinor : undefined;
  const childMarkup = !polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.SortMinor,
    color: "base"
  }) : null;
  const sortButton = /*#__PURE__*/React.createElement(Tooltip.Tooltip, {
    content: i18n.translate('Polaris.IndexFilters.SortButton.tooltip'),
    preferredPosition: "above",
    hoverDelay: 400
  }, /*#__PURE__*/React.createElement(FilterButton.FilterButton, {
    icon: iconMarkup,
    onClick: handleClick,
    label: i18n.translate('Polaris.IndexFilters.SortButton.ariaLabel'),
    disabled: disabled
  }, childMarkup));
  return /*#__PURE__*/React.createElement(Popover.Popover, {
    active: active && !disabled,
    activator: sortButton,
    autofocusTarget: "first-node",
    onClose: handleClose,
    preferredAlignment: "right",
    fluidContent: true
  }, /*#__PURE__*/React.createElement(Box.Box, {
    minWidth: "148px",
    padding: polarisSummerEditions2023 ? undefined : '4',
    paddingInlineStart: polarisSummerEditions2023 ? '3' : undefined,
    paddingInlineEnd: polarisSummerEditions2023 ? '3' : undefined,
    paddingBlockStart: polarisSummerEditions2023 ? '2' : undefined,
    paddingBlockEnd: polarisSummerEditions2023 ? '2' : undefined,
    borderBlockEndWidth: "1",
    borderColor: "border-subdued"
  }, /*#__PURE__*/React.createElement(ChoiceList.ChoiceList, {
    title: i18n.translate('Polaris.IndexFilters.SortButton.title'),
    choices: choiceListChoices,
    selected: selected,
    onChange: handleChangeChoiceList
  })), /*#__PURE__*/React.createElement(Box.Box, {
    padding: polarisSummerEditions2023 ? undefined : '4',
    paddingInlineStart: polarisSummerEditions2023 ? '1_5-experimental' : undefined,
    paddingInlineEnd: polarisSummerEditions2023 ? '1_5-experimental' : undefined,
    paddingBlockStart: polarisSummerEditions2023 ? '2' : undefined,
    paddingBlockEnd: polarisSummerEditions2023 ? '2' : undefined
  }, /*#__PURE__*/React.createElement(DirectionButton.DirectionButton, {
    direction: "asc",
    active: selectedDirection === exports.SortButtonDirection.Asc,
    onClick: handleChangeDirection,
    value: selectedChoices?.[0]?.value
  }, selectedChoices?.[0]?.directionLabel), /*#__PURE__*/React.createElement(DirectionButton.DirectionButton, {
    direction: "desc",
    active: selectedDirection === exports.SortButtonDirection.Desc,
    onClick: handleChangeDirection,
    value: selectedChoices?.[1]?.value
  }, selectedChoices?.[1]?.directionLabel)));
}

exports.SortButton = SortButton;

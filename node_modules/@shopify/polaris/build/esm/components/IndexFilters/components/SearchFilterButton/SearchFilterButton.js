import React from 'react';
import { SearchMinor, FilterMinor } from '@shopify/polaris-icons';
import { FilterButton } from '../FilterButton/FilterButton.js';
import { useFeatures } from '../../../../utilities/features/hooks.js';
import { Tooltip } from '../../../Tooltip/Tooltip.js';
import { Text } from '../../../Text/Text.js';
import { HorizontalStack } from '../../../HorizontalStack/HorizontalStack.js';
import { Icon } from '../../../Icon/Icon.js';

function SearchFilterButton({
  onClick,
  label,
  disabled,
  tooltipContent,
  style,
  hideFilters,
  hideQueryField
}) {
  const {
    polarisSummerEditions2023: se23
  } = useFeatures();
  const iconMarkup = /*#__PURE__*/React.createElement(HorizontalStack, {
    gap: "0"
  }, hideQueryField ? null : /*#__PURE__*/React.createElement(Icon, {
    source: SearchMinor,
    color: "base"
  }), hideFilters ? null : /*#__PURE__*/React.createElement(Icon, {
    source: FilterMinor,
    color: "base"
  }));
  const childMarkup = !se23 ? iconMarkup : null;
  const activator = /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement(FilterButton, {
    onClick: onClick,
    label: label,
    disabled: disabled,
    icon: se23 ? iconMarkup : undefined
  }, childMarkup));
  const content = /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    alignment: "center"
  }, tooltipContent);
  return /*#__PURE__*/React.createElement(Tooltip, {
    content: content,
    preferredPosition: "above",
    hoverDelay: 400
  }, activator);
}

export { SearchFilterButton };

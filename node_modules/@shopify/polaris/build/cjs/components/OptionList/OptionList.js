'use strict';

var React = require('react');
var options = require('../../utilities/options.js');
var arrays = require('../../utilities/arrays.js');
var useDeepEffect = require('../../utilities/use-deep-effect.js');
var Option = require('./components/Option/Option.js');
var hooks = require('../../utilities/features/hooks.js');
var Box = require('../Box/Box.js');
var VerticalStack = require('../VerticalStack/VerticalStack.js');
var Text = require('../Text/Text.js');
var Bleed = require('../Bleed/Bleed.js');

function OptionList({
  options,
  sections,
  title,
  selected,
  allowMultiple,
  role,
  optionRole,
  verticalAlign,
  onChange,
  id: idProp,
  onPointerEnterOption,
  onFocusOption
}) {
  const {
    polarisSummerEditions2023
  } = hooks.useFeatures();
  const [normalizedOptions, setNormalizedOptions] = React.useState(createNormalizedOptions(options, sections, title));
  const uniqId = React.useId();
  const id = idProp ?? uniqId;
  useDeepEffect.useDeepEffect(() => {
    setNormalizedOptions(createNormalizedOptions(options || [], sections || [], title));
  }, [options, sections, title], optionArraysAreEqual);
  const handleClick = React.useCallback((sectionIndex, optionIndex) => {
    const selectedValue = normalizedOptions[sectionIndex].options[optionIndex].value;
    const foundIndex = selected.indexOf(selectedValue);
    if (allowMultiple) {
      const newSelection = foundIndex === -1 ? [selectedValue, ...selected] : [...selected.slice(0, foundIndex), ...selected.slice(foundIndex + 1, selected.length)];
      onChange(newSelection);
      return;
    }
    onChange([selectedValue]);
  }, [normalizedOptions, selected, allowMultiple, onChange]);
  const handlePointerEnter = React.useCallback((sectionIndex, optionIndex) => {
    if (!onPointerEnterOption) return;
    const selectedValue = normalizedOptions[sectionIndex].options[optionIndex].value;
    onPointerEnterOption(selectedValue);
  }, [normalizedOptions, onPointerEnterOption]);
  const handleFocus = React.useCallback((sectionIndex, optionIndex) => {
    if (!onFocusOption) return;
    const selectedValue = normalizedOptions[sectionIndex].options[optionIndex].value;
    onFocusOption(selectedValue);
  }, [normalizedOptions, onFocusOption]);
  const optionsExist = normalizedOptions.length > 0;
  const optionsMarkup = optionsExist ? normalizedOptions.map(({
    title,
    options
  }, sectionIndex) => {
    const isFirstOption = sectionIndex === 0;
    const sectionPaddingBlockStart = polarisSummerEditions2023 ? '3' : '4';
    const firstOptionBlockStartPadding = polarisSummerEditions2023 ? '05' : '2';
    const titleLevel = isFirstOption ? 'h2' : 'h3';
    const titleMarkup = title ? /*#__PURE__*/React.createElement(Box.Box, {
      paddingBlockStart: isFirstOption ? firstOptionBlockStartPadding : sectionPaddingBlockStart,
      paddingInlineStart: polarisSummerEditions2023 ? '1_5-experimental' : '2',
      paddingBlockEnd: polarisSummerEditions2023 ? '1' : '2',
      paddingInlineEnd: polarisSummerEditions2023 ? '1_5-experimental' : '2',
      borderColor: "border-subdued",
      borderBlockStartWidth: !isFirstOption && !polarisSummerEditions2023 ? '1' : undefined
    }, /*#__PURE__*/React.createElement(Text.Text, {
      as: polarisSummerEditions2023 ? titleLevel : 'p',
      variant: "headingXs"
    }, title)) : null;
    const optionsMarkup = options && options.map((option, optionIndex) => {
      const isSelected = selected.includes(option.value);
      const optionId = option.id || `${id}-${sectionIndex}-${optionIndex}`;
      return /*#__PURE__*/React.createElement(Option.Option, Object.assign({
        key: optionId
      }, option, {
        id: optionId,
        section: sectionIndex,
        index: optionIndex,
        onClick: handleClick,
        select: isSelected,
        allowMultiple: allowMultiple,
        verticalAlign: verticalAlign,
        role: optionRole,
        onPointerEnter: handlePointerEnter,
        onFocus: handleFocus
      }));
    });
    const option = /*#__PURE__*/React.createElement(Bleed.Bleed, {
      marginBlockStart: title || polarisSummerEditions2023 ? undefined : '05'
    }, /*#__PURE__*/React.createElement(Box.Box, {
      as: "ul",
      id: `${id}-${sectionIndex}`,
      role: role
    }, optionsMarkup));

    // eslint-disable-next-line no-nested-ternary
    const blockStartPadding = isFirstOption ?
    // eslint-disable-next-line no-nested-ternary
    polarisSummerEditions2023 ? title ? '1' : '0' : undefined :
    // eslint-disable-next-line no-nested-ternary
    polarisSummerEditions2023 ? title ? '05' : '0' : '2';
    return /*#__PURE__*/React.createElement(Box.Box, {
      key: title || `noTitle-${sectionIndex}`,
      as: "li",
      paddingBlockStart: blockStartPadding
    }, polarisSummerEditions2023 ? /*#__PURE__*/React.createElement(VerticalStack.VerticalStack, {
      gap: isFirstOption && sections ? undefined : '0'
    }, titleMarkup, option) : /*#__PURE__*/React.createElement(React.Fragment, null, titleMarkup, option));
  }) : null;
  return /*#__PURE__*/React.createElement(Box.Box, {
    as: "ul",
    role: role,
    padding: polarisSummerEditions2023 ? '1_5-experimental' : '2'
  }, optionsMarkup);
}
function createNormalizedOptions(options, sections, title) {
  if (options == null) {
    const section = {
      options: [],
      title
    };
    return sections == null ? [] : [section, ...sections];
  }
  if (sections == null) {
    return [{
      title,
      options
    }];
  }
  return [{
    title,
    options
  }, ...sections];
}
function optionArraysAreEqual(firstArray, secondArray) {
  if (options.isSection(firstArray) && options.isSection(secondArray)) {
    return arrays.arraysAreEqual(firstArray, secondArray, testSectionsPropEquality);
  }
  return arrays.arraysAreEqual(firstArray, secondArray);
}
function testSectionsPropEquality(previousSection, currentSection) {
  const {
    options: previousOptions
  } = previousSection;
  const {
    options: currentOptions
  } = currentSection;
  const optionsAreEqual = arrays.arraysAreEqual(previousOptions, currentOptions);
  const titlesAreEqual = previousSection.title === currentSection.title;
  return optionsAreEqual && titlesAreEqual;
}

exports.OptionList = OptionList;

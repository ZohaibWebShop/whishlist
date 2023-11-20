import React, { useContext } from 'react';
import { classNames } from '../../utilities/css.js';
import { WithinContentContext } from '../../utilities/within-content-context.js';
import styles from './EmptyState.scss.js';
import { useFeatures } from '../../utilities/features/hooks.js';
import { buttonFrom } from '../Button/utils.js';
import { Box } from '../Box/Box.js';
import { VerticalStack } from '../VerticalStack/VerticalStack.js';
import { Image } from '../Image/Image.js';
import { Text } from '../Text/Text.js';
import { HorizontalStack } from '../HorizontalStack/HorizontalStack.js';

function EmptyState({
  children,
  heading,
  image,
  largeImage,
  imageContained,
  fullWidth = false,
  action,
  secondaryAction,
  footerContent
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const withinContentContainer = useContext(WithinContentContext);
  const imageContainedClass = classNames(imageContained && styles.imageContained);
  const imageMarkup = largeImage ? /*#__PURE__*/React.createElement(Image, {
    alt: "",
    role: "presentation",
    source: largeImage,
    className: imageContainedClass,
    sourceSet: [{
      source: image,
      descriptor: '568w'
    }, {
      source: largeImage,
      descriptor: '1136w'
    }],
    sizes: "(max-width: 568px) 60vw"
  }) : /*#__PURE__*/React.createElement(Image, {
    className: imageContainedClass,
    role: "presentation",
    alt: "",
    source: image
  });
  const secondaryActionMarkup = secondaryAction ? buttonFrom(secondaryAction, {}) : null;
  const footerContentMarkup = footerContent ? /*#__PURE__*/React.createElement(Box, {
    paddingBlockStart: "4"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    color: polarisSummerEditions2023 ? undefined : 'subdued',
    alignment: "center",
    variant: polarisSummerEditions2023 ? 'bodySm' : 'bodyMd'
  }, footerContent)) : null;
  const headingSize = withinContentContainer ? 'headingLg' : 'headingXl';
  const primaryActionMarkup = action ? buttonFrom(action, {
    primary: true,
    size: 'medium'
  }) : null;
  const headingMarkup = heading ? /*#__PURE__*/React.createElement(Box, {
    paddingBlockEnd: polarisSummerEditions2023 ? '1_5-experimental' : '4'
  }, /*#__PURE__*/React.createElement(Text, {
    variant: polarisSummerEditions2023 ? 'headingMd' : headingSize,
    as: "p",
    alignment: "center"
  }, heading)) : null;
  const childrenMarkup = children ? /*#__PURE__*/React.createElement(Text, {
    as: "span",
    color: polarisSummerEditions2023 ? undefined : 'subdued',
    alignment: "center",
    variant: polarisSummerEditions2023 ? 'bodySm' : 'bodyMd'
  }, children) : null;
  const textContentMarkup = headingMarkup || children ? /*#__PURE__*/React.createElement(Box, {
    paddingBlockEnd: polarisSummerEditions2023 ? '4' : '6'
  }, headingMarkup, childrenMarkup) : null;
  const actionsMarkup = primaryActionMarkup || secondaryActionMarkup ? /*#__PURE__*/React.createElement(HorizontalStack, {
    align: "center",
    gap: "2"
  }, secondaryActionMarkup, primaryActionMarkup) : null;
  const detailsMarkup = textContentMarkup || actionsMarkup || footerContentMarkup ? /*#__PURE__*/React.createElement(Box, {
    maxWidth: fullWidth ? '100%' : '400px'
  }, /*#__PURE__*/React.createElement(VerticalStack, {
    inlineAlign: "center"
  }, textContentMarkup, actionsMarkup, footerContentMarkup)) : null;
  return /*#__PURE__*/React.createElement(Box, {
    paddingInlineStart: "0",
    paddingInlineEnd: "0",
    paddingBlockStart: "5",
    paddingBlockEnd: "16"
  }, /*#__PURE__*/React.createElement(VerticalStack, {
    inlineAlign: "center"
  }, imageMarkup, detailsMarkup));
}

export { EmptyState };

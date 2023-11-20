import React, { useContext } from 'react';
import { UploadMajor } from '@shopify/polaris-icons';
import { classNames } from '../../../../utilities/css.js';
import { capitalize } from '../../../../utilities/capitalize.js';
import { DropZoneContext } from '../../context.js';
import { createAllowMultipleKey } from '../../utils/index.js';
import styles from './FileUpload.scss.js';
import uploadArrow from '../../images/upload-arrow.svg.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { useFeatures } from '../../../../utilities/features/hooks.js';
import { Icon } from '../../../Icon/Icon.js';
import { VerticalStack } from '../../../VerticalStack/VerticalStack.js';
import { Text } from '../../../Text/Text.js';

function FileUpload(props) {
  const i18n = useI18n();
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const {
    size,
    measuring,
    type,
    disabled,
    allowMultiple
  } = useContext(DropZoneContext);
  const typeSuffix = capitalize(type);
  const allowMultipleKey = createAllowMultipleKey(allowMultiple);
  const {
    actionTitle = i18n.translate(`Polaris.DropZone.${allowMultipleKey}.actionTitle${typeSuffix}`),
    actionHint
  } = props;
  const actionClassNames = classNames(styles.Action, disabled && styles.disabled);
  const actionMarkup = /*#__PURE__*/React.createElement("div", {
    className: actionClassNames
  }, actionTitle);
  const fileUploadClassName = classNames(styles.FileUpload, measuring && styles.measuring, size === 'large' && styles.large, size === 'small' && styles.small);
  const actionHintMarkup = actionHint && /*#__PURE__*/React.createElement(Text, {
    variant: "bodySm",
    as: "p",
    color: "subdued"
  }, actionHint);
  let viewMarkup;
  switch (size) {
    case 'large':
      viewMarkup = /*#__PURE__*/React.createElement(VerticalStack, {
        inlineAlign: "center",
        gap: "2"
      }, actionMarkup, actionHintMarkup);
      break;
    case 'medium':
      viewMarkup = /*#__PURE__*/React.createElement(VerticalStack, {
        inlineAlign: "center",
        gap: "2"
      }, actionMarkup, actionHintMarkup);
      break;
    case 'small':
      viewMarkup = /*#__PURE__*/React.createElement("img", {
        width: "20",
        src: uploadArrow,
        alt: ""
      });
      if (polarisSummerEditions2023) {
        viewMarkup = /*#__PURE__*/React.createElement("div", {
          className: classNames(styles.UploadIcon, disabled && styles.disabled)
        }, /*#__PURE__*/React.createElement(Icon, {
          source: UploadMajor
        }));
      }
      break;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: fileUploadClassName
  }, viewMarkup);
}

export { FileUpload };

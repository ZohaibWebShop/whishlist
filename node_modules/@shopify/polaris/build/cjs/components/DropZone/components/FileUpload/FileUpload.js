'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var capitalize = require('../../../../utilities/capitalize.js');
var context = require('../../context.js');
var index = require('../../utils/index.js');
var FileUpload$1 = require('./FileUpload.scss.js');
var uploadArrow = require('../../images/upload-arrow.svg.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var hooks$1 = require('../../../../utilities/features/hooks.js');
var Icon = require('../../../Icon/Icon.js');
var VerticalStack = require('../../../VerticalStack/VerticalStack.js');
var Text = require('../../../Text/Text.js');

function FileUpload(props) {
  const i18n = hooks.useI18n();
  const {
    polarisSummerEditions2023
  } = hooks$1.useFeatures();
  const {
    size,
    measuring,
    type,
    disabled,
    allowMultiple
  } = React.useContext(context.DropZoneContext);
  const typeSuffix = capitalize.capitalize(type);
  const allowMultipleKey = index.createAllowMultipleKey(allowMultiple);
  const {
    actionTitle = i18n.translate(`Polaris.DropZone.${allowMultipleKey}.actionTitle${typeSuffix}`),
    actionHint
  } = props;
  const actionClassNames = css.classNames(FileUpload$1.default.Action, disabled && FileUpload$1.default.disabled);
  const actionMarkup = /*#__PURE__*/React.createElement("div", {
    className: actionClassNames
  }, actionTitle);
  const fileUploadClassName = css.classNames(FileUpload$1.default.FileUpload, measuring && FileUpload$1.default.measuring, size === 'large' && FileUpload$1.default.large, size === 'small' && FileUpload$1.default.small);
  const actionHintMarkup = actionHint && /*#__PURE__*/React.createElement(Text.Text, {
    variant: "bodySm",
    as: "p",
    color: "subdued"
  }, actionHint);
  let viewMarkup;
  switch (size) {
    case 'large':
      viewMarkup = /*#__PURE__*/React.createElement(VerticalStack.VerticalStack, {
        inlineAlign: "center",
        gap: "2"
      }, actionMarkup, actionHintMarkup);
      break;
    case 'medium':
      viewMarkup = /*#__PURE__*/React.createElement(VerticalStack.VerticalStack, {
        inlineAlign: "center",
        gap: "2"
      }, actionMarkup, actionHintMarkup);
      break;
    case 'small':
      viewMarkup = /*#__PURE__*/React.createElement("img", {
        width: "20",
        src: uploadArrow.default,
        alt: ""
      });
      if (polarisSummerEditions2023) {
        viewMarkup = /*#__PURE__*/React.createElement("div", {
          className: css.classNames(FileUpload$1.default.UploadIcon, disabled && FileUpload$1.default.disabled)
        }, /*#__PURE__*/React.createElement(Icon.Icon, {
          source: polarisIcons.UploadMajor
        }));
      }
      break;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: fileUploadClassName
  }, viewMarkup);
}

exports.FileUpload = FileUpload;

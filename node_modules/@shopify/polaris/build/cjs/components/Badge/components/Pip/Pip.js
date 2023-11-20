'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var utils = require('../../utils.js');
var Pip$1 = require('./Pip.scss.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Text = require('../../../Text/Text.js');

function Pip({
  status,
  progress = 'complete',
  accessibilityLabelOverride
}) {
  const i18n = hooks.useI18n();
  const className = css.classNames(Pip$1.default.Pip, status && Pip$1.default[css.variationName('status', status)], progress && Pip$1.default[css.variationName('progress', progress)]);
  const accessibilityLabel = accessibilityLabelOverride ? accessibilityLabelOverride : utils.getDefaultAccessibilityLabel(i18n, progress, status);
  return /*#__PURE__*/React.createElement("span", {
    className: className
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    visuallyHidden: true
  }, accessibilityLabel));
}

exports.Pip = Pip;

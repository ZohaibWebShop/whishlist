'use strict';

var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var polarisTokens = require('@shopify/polaris-tokens');
var css = require('../../utilities/css.js');
var ProgressBar$1 = require('./ProgressBar.scss.js');
var hooks = require('../../utilities/i18n/hooks.js');

function ProgressBar({
  progress = 0,
  size = 'medium',
  color = 'highlight',
  animated: hasAppearAnimation = true,
  ariaLabelledBy
}) {
  const i18n = hooks.useI18n();
  const indicatorRef = React.useRef(null);
  const className = css.classNames(ProgressBar$1.default.ProgressBar, size && ProgressBar$1.default[css.variationName('size', size)], color && ProgressBar$1.default[css.variationName('color', color)]);
  const warningMessage = i18n.translate(progress < 0 ? 'Polaris.ProgressBar.negativeWarningMessage' : 'Polaris.ProgressBar.exceedWarningMessage', {
    progress
  });
  const parsedProgress = parseProgress(progress, warningMessage);
  const progressBarDuration = hasAppearAnimation ? polarisTokens.motion['motion-duration-500'] : polarisTokens.motion['motion-duration-0'];

  /* eslint-disable @shopify/jsx-no-hardcoded-content */
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("progress", {
    "aria-labelledby": ariaLabelledBy,
    className: ProgressBar$1.default.Progress,
    value: parsedProgress,
    max: "100"
  }), /*#__PURE__*/React.createElement(reactTransitionGroup.CSSTransition, {
    in: true,
    appear: true,
    timeout: parseInt(progressBarDuration, 10),
    nodeRef: indicatorRef,
    classNames: {
      appearActive: ProgressBar$1.default.IndicatorAppearActive,
      appearDone: ProgressBar$1.default.IndicatorAppearDone
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: indicatorRef,
    className: ProgressBar$1.default.Indicator,
    style: {
      '--pc-progress-bar-duration': progressBarDuration,
      '--pc-progress-bar-percent': parsedProgress / 100
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: ProgressBar$1.default.Label
  }, parsedProgress, "%"))))
  /* eslint-enable @shopify/jsx-no-hardcoded-content */;
}

function parseProgress(progress, warningMessage) {
  let progressWidth;
  if (progress < 0) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(warningMessage);
    }
    progressWidth = 0;
  } else if (progress > 100) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(warningMessage);
    }
    progressWidth = 100;
  } else {
    progressWidth = progress;
  }
  return progressWidth;
}

exports.ProgressBar = ProgressBar;

'use strict';

var polarisIcons = require('@shopify/polaris-icons');

const bannerAttributes = {
  success: {
    withinPage: {
      background: 'bg-success-strong',
      text: 'text-on-color',
      icon: 'icon-on-color'
    },
    withinContentContainer: {
      background: 'bg-success-subdued',
      text: 'text-success',
      icon: 'icon-success-strong-experimental'
    },
    icon: polarisIcons.TickMinor
  },
  warning: {
    withinPage: {
      background: 'bg-warning-strong-experimental',
      text: 'text-warning-strong',
      icon: 'text-warning-strong'
    },
    withinContentContainer: {
      background: 'bg-warning-subdued-experimental',
      text: 'text-warning-experimental',
      icon: 'icon-warning-strong-experimental'
    },
    icon: polarisIcons.RiskMinor
  },
  critical: {
    withinPage: {
      background: 'bg-critical-strong',
      text: 'text-on-color',
      icon: 'icon-on-color'
    },
    withinContentContainer: {
      background: 'bg-critical-subdued',
      text: 'text-critical-strong',
      icon: 'icon-critical-strong-experimental'
    },
    icon: polarisIcons.DiamondAlertMinor
  },
  info: {
    withinPage: {
      background: 'bg-info-strong',
      text: 'text-info-strong',
      icon: 'text-info-strong'
    },
    withinContentContainer: {
      background: 'bg-info-subdued',
      text: 'text-info',
      icon: 'icon-info-strong-experimental'
    },
    icon: polarisIcons.InfoMinor
  }
};

exports.bannerAttributes = bannerAttributes;

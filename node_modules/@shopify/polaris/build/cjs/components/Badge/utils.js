'use strict';

var types = require('./types.js');

function getDefaultAccessibilityLabel(i18n, progress, status) {
  let progressLabel = '';
  let statusLabel = '';
  if (!progress && !status) {
    return '';
  }
  switch (progress) {
    case types.ProgressValue.Incomplete:
      progressLabel = i18n.translate('Polaris.Badge.PROGRESS_LABELS.incomplete');
      break;
    case types.ProgressValue.PartiallyComplete:
      progressLabel = i18n.translate('Polaris.Badge.PROGRESS_LABELS.partiallyComplete');
      break;
    case types.ProgressValue.Complete:
      progressLabel = i18n.translate('Polaris.Badge.PROGRESS_LABELS.complete');
      break;
  }
  switch (status) {
    case types.StatusValue.Info:
    case types.StatusValue.InfoStrongExperimental:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.info');
      break;
    case types.StatusValue.Success:
    case types.StatusValue.SuccessStrongExperimental:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.success');
      break;
    case types.StatusValue.Warning:
    case types.StatusValue.WarningStrongExperimental:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.warning');
      break;
    case types.StatusValue.Critical:
    case types.StatusValue.CriticalStrongExperimental:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.critical');
      break;
    case types.StatusValue.Attention:
    case types.StatusValue.AttentionStrongExperimental:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.attention');
      break;
    case types.StatusValue.New:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.new');
      break;
    case types.StatusValue.ReadOnlyExperimental:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.readOnly');
      break;
    case types.StatusValue.EnabledExperimental:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.enabled');
      break;
  }
  if (!status && progress) {
    return progressLabel;
  } else if (status && !progress) {
    return statusLabel;
  } else {
    return i18n.translate('Polaris.Badge.progressAndStatus', {
      progressLabel,
      statusLabel
    });
  }
}

exports.getDefaultAccessibilityLabel = getDefaultAccessibilityLabel;

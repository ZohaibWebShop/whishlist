'use strict';

exports.StatusValue = void 0;
(function (StatusValue) {
  StatusValue["Info"] = "info";
  StatusValue["Success"] = "success";
  StatusValue["Warning"] = "warning";
  StatusValue["Critical"] = "critical";
  StatusValue["Attention"] = "attention";
  StatusValue["New"] = "new";
  StatusValue["InfoStrongExperimental"] = "info-strong-experimental";
  StatusValue["SuccessStrongExperimental"] = "success-strong-experimental";
  StatusValue["WarningStrongExperimental"] = "warning-strong-experimental";
  StatusValue["CriticalStrongExperimental"] = "critical-strong-experimental";
  StatusValue["AttentionStrongExperimental"] = "attention-strong-experimental";
  StatusValue["ReadOnlyExperimental"] = "read-only-experimental";
  StatusValue["EnabledExperimental"] = "enabled-experimental";
})(exports.StatusValue || (exports.StatusValue = {}));
exports.ProgressValue = void 0;
(function (ProgressValue) {
  ProgressValue["Incomplete"] = "incomplete";
  ProgressValue["PartiallyComplete"] = "partiallyComplete";
  ProgressValue["Complete"] = "complete";
})(exports.ProgressValue || (exports.ProgressValue = {}));

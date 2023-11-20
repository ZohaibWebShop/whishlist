'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var SearchDismissOverlay$1 = require('./SearchDismissOverlay.scss.js');
var ScrollLock = require('../../../ScrollLock/ScrollLock.js');

function SearchDismissOverlay({
  onDismiss,
  visible
}) {
  const node = React.useRef(null);
  const handleDismiss = React.useCallback(({
    target
  }) => {
    if (target === node.current && onDismiss != null) {
      onDismiss();
    }
  }, [onDismiss]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, visible ? /*#__PURE__*/React.createElement(ScrollLock.ScrollLock, null) : null, /*#__PURE__*/React.createElement("div", {
    ref: node,
    className: css.classNames(SearchDismissOverlay$1.default.SearchDismissOverlay, visible && SearchDismissOverlay$1.default.visible),
    onClick: handleDismiss
  }));
}

exports.SearchDismissOverlay = SearchDismissOverlay;

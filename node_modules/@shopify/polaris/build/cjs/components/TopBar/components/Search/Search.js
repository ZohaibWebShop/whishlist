'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var Search$1 = require('./Search.scss.js');
var SearchDismissOverlay = require('../SearchDismissOverlay/SearchDismissOverlay.js');

function Search({
  visible,
  children,
  onDismiss,
  overlayVisible = false
}) {
  if (children == null) {
    return null;
  }
  const overlayMarkup = visible ? /*#__PURE__*/React.createElement(SearchDismissOverlay.SearchDismissOverlay, {
    onDismiss: onDismiss,
    visible: overlayVisible
  }) : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, overlayMarkup, /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Search$1.default.Search, visible && Search$1.default.visible)
  }, /*#__PURE__*/React.createElement("div", {
    className: Search$1.default.SearchContent
  }, /*#__PURE__*/React.createElement("div", {
    className: Search$1.default.Results
  }, children))));
}

exports.Search = Search;

'use strict';

var React = require('react');
var css = require('../../../../utilities/css.js');
var IndexTable = require('../../IndexTable.scss.js');

const Cell = /*#__PURE__*/React.memo(function Cell({
  children,
  className,
  flush
}) {
  const cellClassName = css.classNames(className, IndexTable.default.TableCell, flush && IndexTable.default['TableCell-flush']);
  return /*#__PURE__*/React.createElement("td", {
    className: cellClassName
  }, children);
});

exports.Cell = Cell;

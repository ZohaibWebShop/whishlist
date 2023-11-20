'use strict';

var React = require('react');
var debounce = require('../../../../utilities/debounce.js');
var css = require('../../../../utilities/css.js');
var setRootProperty = require('../../../../utilities/set-root-property.js');
var IndexTable = require('../../IndexTable.scss.js');
var Checkbox$1 = require('./Checkbox.scss.js');
var hooks$1 = require('../../../../utilities/index-provider/hooks.js');
var context = require('../../../../utilities/index-table/context.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Checkbox$2 = require('../../../Checkbox/Checkbox.js');

const Checkbox = /*#__PURE__*/React.memo(function Checkbox() {
  const i18n = hooks.useI18n();
  const {
    resourceName
  } = hooks$1.useIndexValue();
  const {
    itemId,
    selected,
    disabled,
    onInteraction
  } = React.useContext(context.RowContext);
  const wrapperClassName = css.classNames(Checkbox$1.default.Wrapper);
  return /*#__PURE__*/React.createElement(CheckboxWrapper, null, /*#__PURE__*/React.createElement("div", {
    className: Checkbox$1.default.TableCellContentContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: wrapperClassName,
    onClick: onInteraction,
    onKeyUp: noop
  }, /*#__PURE__*/React.createElement(Checkbox$2.Checkbox, {
    id: itemId,
    label: i18n.translate('Polaris.IndexTable.selectItem', {
      resourceName: resourceName.singular
    }),
    labelHidden: true,
    checked: selected,
    disabled: disabled
  }))));
});
function CheckboxWrapper({
  children
}) {
  const {
    position
  } = React.useContext(context.RowContext);
  const checkboxNode = React.useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResize = React.useCallback(debounce.debounce(() => {
    if (position !== 0 || !checkboxNode.current) return;
    const {
      width
    } = checkboxNode.current.getBoundingClientRect();
    setRootProperty.setRootProperty('--pc-checkbox-offset', `${width}px`);
  }), [position]);
  React.useEffect(() => {
    handleResize();
  }, [handleResize]);
  React.useEffect(() => {
    if (!checkboxNode.current) return;
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  const checkboxClassName = css.classNames(IndexTable.default.TableCell, IndexTable.default['TableCell-first']);
  return /*#__PURE__*/React.createElement("td", {
    className: checkboxClassName,
    ref: checkboxNode
  }, children);
}
function noop() {}

exports.Checkbox = Checkbox;
exports.CheckboxWrapper = CheckboxWrapper;

'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var isEqual = require('react-fast-compare');
var breakpoints = require('../../utilities/breakpoints.js');
var css = require('../../utilities/css.js');
var ResourceItem$1 = require('./ResourceItem.scss.js');
var types = require('../../utilities/resource-list/types.js');
var hooks = require('../../utilities/features/hooks.js');
var context = require('../../utilities/resource-list/context.js');
var hooks$1 = require('../../utilities/i18n/hooks.js');
var Checkbox = require('../Checkbox/Checkbox.js');
var ButtonGroup = require('../ButtonGroup/ButtonGroup.js');
var utils = require('../Button/utils.js');
var Popover = require('../Popover/Popover.js');
var Button = require('../Button/Button.js');
var ActionList = require('../ActionList/ActionList.js');
var Box = require('../Box/Box.js');
var HorizontalGrid = require('../HorizontalGrid/HorizontalGrid.js');
var HorizontalStack = require('../HorizontalStack/HorizontalStack.js');
var UnstyledLink = require('../UnstyledLink/UnstyledLink.js');

class BaseResourceItem extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      actionsMenuVisible: false,
      focused: false,
      focusedInner: false,
      selected: isSelected(this.props.id, this.props.context.selectedItems)
    };
    this.node = null;
    this.overlayRef = /*#__PURE__*/React.createRef();
    this.buttonOverlay = /*#__PURE__*/React.createRef();
    this.setNode = node => {
      this.node = node;
    };
    this.handleFocus = event => {
      if (event.target === this.buttonOverlay.current || this.node && event.target === this.overlayRef.current) {
        this.setState({
          focused: true,
          focusedInner: false
        });
      } else if (this.node && this.node.contains(event.target)) {
        this.setState({
          focused: true,
          focusedInner: true
        });
      }
    };
    this.handleBlur = ({
      relatedTarget
    }) => {
      if (this.node && relatedTarget instanceof Element && this.node.contains(relatedTarget)) {
        return;
      }
      this.setState({
        focused: false,
        focusedInner: false
      });
    };
    this.handleMouseOut = () => {
      this.state.focused && this.setState({
        focused: false,
        focusedInner: false
      });
      if (this.props.onMouseOut) {
        this.props.onMouseOut();
      }
    };
    this.handleLargerSelectionArea = event => {
      stopPropagation(event);
      this.handleSelection(!this.state.selected, event.nativeEvent.shiftKey);
    };
    this.handleSelection = (value, shiftKey) => {
      const {
        id,
        sortOrder,
        context: {
          onSelectionChange
        }
      } = this.props;
      if (id == null || onSelectionChange == null) {
        return;
      }
      this.setState({
        focused: value,
        focusedInner: value
      });
      onSelectionChange(value, id, sortOrder, shiftKey);
    };
    this.handleClick = event => {
      stopPropagation(event);
      const {
        id,
        onClick,
        url,
        context: {
          selectMode
        }
      } = this.props;
      const {
        ctrlKey,
        metaKey
      } = event.nativeEvent;
      const anchor = this.node && this.node.querySelector('a');
      if (selectMode) {
        this.handleLargerSelectionArea(event);
        return;
      }
      if (anchor === event.target) {
        return;
      }
      if (onClick) {
        onClick(id);
      }
      if (url && (ctrlKey || metaKey)) {
        window.open(url, '_blank');
        return;
      }
      if (url && anchor) {
        anchor.click();
      }
    };
    this.handleKeyUp = event => {
      const {
        onClick = noop,
        context: {
          selectMode
        }
      } = this.props;
      const {
        key
      } = event;
      if (key === 'Enter' && this.props.url && !selectMode) {
        onClick();
      }
    };
    this.handleActionsClick = () => {
      this.setState(({
        actionsMenuVisible
      }) => ({
        actionsMenuVisible: !actionsMenuVisible
      }));
    };
    this.handleCloseRequest = () => {
      this.setState({
        actionsMenuVisible: false
      });
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const selected = isSelected(nextProps.id, nextProps.context.selectedItems);
    if (prevState.selected === selected) {
      return null;
    }
    return {
      selected
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const {
      children: nextChildren,
      context: {
        selectedItems: nextSelectedItems,
        ...restNextContext
      },
      ...restNextProps
    } = nextProps;
    const {
      children,
      context: {
        selectedItems,
        ...restContext
      },
      ...restProps
    } = this.props;
    const nextSelectMode = nextProps.context.selectMode;
    return !isEqual(this.state, nextState) || this.props.context.selectMode !== nextSelectMode || !nextProps.context.selectMode && (!isEqual(restProps, restNextProps) || !isEqual(restContext, restNextContext));
  }
  render() {
    const {
      children,
      url,
      external,
      media,
      shortcutActions,
      ariaControls,
      ariaExpanded,
      persistActions = false,
      accessibilityLabel,
      name,
      context: {
        selectable,
        selectMode,
        hasBulkActions,
        loading,
        resourceName
      },
      i18n,
      features: {
        polarisSummerEditions2023
      },
      verticalAlignment,
      dataHref,
      breakpoints,
      onMouseOver
    } = this.props;
    const {
      actionsMenuVisible,
      focused,
      focusedInner,
      selected
    } = this.state;
    let ownedMarkup = null;
    let handleMarkup = null;
    const itemPaddingInline = polarisSummerEditions2023 ? '3' : {
      xs: '4',
      sm: '5'
    };
    const itemPaddingBlock = '3';
    const gapBetweenCheckboxAndMedia = polarisSummerEditions2023 ? '3' : '4';
    const gapBetweenOwnedAndChildren = polarisSummerEditions2023 ? '3' : '5';
    if (selectable) {
      const checkboxAccessibilityLabel = name || accessibilityLabel || i18n.translate('Polaris.Common.checkbox');
      handleMarkup = /*#__PURE__*/React.createElement("div", {
        className: ResourceItem$1.default.CheckboxWrapper,
        onClick: stopPropagation,
        onChange: this.handleLargerSelectionArea
      }, /*#__PURE__*/React.createElement(UseId, null, id => /*#__PURE__*/React.createElement(Checkbox.Checkbox, {
        id: id,
        label: checkboxAccessibilityLabel,
        labelHidden: true,
        checked: selected,
        disabled: loading,
        bleedInlineStart: itemPaddingInline,
        bleedInlineEnd: media ? gapBetweenCheckboxAndMedia : gapBetweenOwnedAndChildren,
        bleedBlockStart: itemPaddingBlock,
        bleedBlockEnd: itemPaddingBlock,
        fill: true,
        labelClassName: ResourceItem$1.default.CheckboxLabel
      })));
    }
    if (media || selectable) {
      ownedMarkup = /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
        gap: gapBetweenCheckboxAndMedia,
        blockAlign: media && selectable ? 'center' : getAlignment(verticalAlignment)
      }, handleMarkup, media);
    }
    const className = css.classNames(ResourceItem$1.default.ResourceItem, focused && ResourceItem$1.default.focused, selectable && ResourceItem$1.default.selectable, selected && ResourceItem$1.default.selected, selectMode && ResourceItem$1.default.selectMode, persistActions && ResourceItem$1.default.persistActions, focusedInner && ResourceItem$1.default.focusedInner);
    const listItemClassName = css.classNames(ResourceItem$1.default.ListItem, focused && !focusedInner && ResourceItem$1.default.focused, hasBulkActions && ResourceItem$1.default.hasBulkActions);
    let actionsMarkup = null;
    let disclosureMarkup = null;
    if (shortcutActions && !loading) {
      if (persistActions) {
        actionsMarkup = breakpoints?.lgUp ? /*#__PURE__*/React.createElement("div", {
          className: ResourceItem$1.default.Actions,
          onClick: stopPropagation
        }, /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, null, utils.buttonsFrom(shortcutActions, {
          plain: true,
          primary: polarisSummerEditions2023
        }))) : null;
        const disclosureAccessibilityLabel = name ? i18n.translate('Polaris.ResourceList.Item.actionsDropdownLabel', {
          accessibilityLabel: name
        }) : i18n.translate('Polaris.ResourceList.Item.actionsDropdown');
        disclosureMarkup = !selectMode && breakpoints?.lgDown ? /*#__PURE__*/React.createElement("div", {
          onClick: stopPropagation
        }, /*#__PURE__*/React.createElement(Popover.Popover, {
          activator: /*#__PURE__*/React.createElement(Button.Button, {
            accessibilityLabel: disclosureAccessibilityLabel,
            onClick: this.handleActionsClick,
            plain: true,
            primary: polarisSummerEditions2023,
            icon: polarisIcons.HorizontalDotsMinor
          }),
          onClose: this.handleCloseRequest,
          active: actionsMenuVisible
        }, /*#__PURE__*/React.createElement(ActionList.ActionList, {
          items: shortcutActions
        }))) : null;
      } else if (breakpoints?.lgUp) {
        actionsMarkup = /*#__PURE__*/React.createElement("div", {
          className: ResourceItem$1.default.Actions,
          onClick: stopPropagation
        }, /*#__PURE__*/React.createElement(Box.Box, {
          position: "absolute",
          insetBlockStart: "4",
          insetInlineEnd: "5"
        }, /*#__PURE__*/React.createElement(ButtonGroup.ButtonGroup, {
          segmented: true
        }, utils.buttonsFrom(shortcutActions, {
          size: 'slim'
        }))));
      }
    }
    const containerMarkup = /*#__PURE__*/React.createElement(Box.Box, {
      id: this.props.id,
      position: "relative",
      paddingInlineStart: itemPaddingInline,
      paddingInlineEnd: itemPaddingInline,
      paddingBlockStart: itemPaddingBlock,
      paddingBlockEnd: itemPaddingBlock,
      zIndex: "var(--pc-resource-item-content-stacking-order)"
    }, /*#__PURE__*/React.createElement(HorizontalGrid.HorizontalGrid, {
      columns: {
        xs: '1fr auto'
      }
    }, /*#__PURE__*/React.createElement(HorizontalGrid.HorizontalGrid, {
      columns: {
        xs: media || selectable ? 'auto 1fr' : '1fr'
      },
      gap: gapBetweenOwnedAndChildren
    }, ownedMarkup, /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
      blockAlign: getAlignment(verticalAlignment)
    }, /*#__PURE__*/React.createElement(Box.Box, {
      width: "100%",
      padding: "0"
    }, children))), actionsMarkup, disclosureMarkup));
    const tabIndex = loading ? -1 : 0;
    const ariaLabel = accessibilityLabel || i18n.translate('Polaris.ResourceList.Item.viewItem', {
      itemName: name || resourceName && resourceName.singular || ''
    });
    const accessibleMarkup = url ? /*#__PURE__*/React.createElement(UseId, null, id => /*#__PURE__*/React.createElement(UnstyledLink.UnstyledLink, {
      "aria-describedby": this.props.id,
      "aria-label": ariaLabel,
      className: ResourceItem$1.default.Link,
      url: url,
      external: external,
      tabIndex: tabIndex,
      id: id,
      ref: this.overlayRef
    })) : /*#__PURE__*/React.createElement("button", {
      className: ResourceItem$1.default.Button,
      "aria-label": ariaLabel,
      "aria-controls": ariaControls,
      "aria-expanded": ariaExpanded,
      onClick: this.handleClick,
      tabIndex: tabIndex,
      ref: this.buttonOverlay
    });
    return /*#__PURE__*/React.createElement("li", {
      className: listItemClassName,
      "data-href": dataHref
    }, /*#__PURE__*/React.createElement("div", {
      className: ResourceItem$1.default.ItemWrapper
    }, /*#__PURE__*/React.createElement("div", {
      ref: this.setNode,
      className: className,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyUp: this.handleKeyUp,
      onMouseOver: onMouseOver,
      onMouseOut: this.handleMouseOut,
      "data-href": url
    }, accessibleMarkup, containerMarkup)));
  }
}
function noop() {}
function stopPropagation(event) {
  event.stopPropagation();
}
function isSelected(id, selectedItems) {
  return Boolean(selectedItems && (Array.isArray(selectedItems) && selectedItems.includes(id) || selectedItems === types.SELECT_ALL_ITEMS));
}
function ResourceItem(props) {
  const breakpoints$1 = breakpoints.useBreakpoints();
  const features = hooks.useFeatures();
  return /*#__PURE__*/React.createElement(BaseResourceItem, Object.assign({}, props, {
    breakpoints: breakpoints$1,
    context: React.useContext(context.ResourceListContext),
    i18n: hooks$1.useI18n(),
    features: features
  }));
}
function getAlignment(alignment) {
  switch (alignment) {
    case 'leading':
      return 'start';
    case 'trailing':
      return 'end';
    case 'center':
      return 'center';
    case 'fill':
      return 'stretch';
    case 'baseline':
      return 'baseline';
    default:
      return 'start';
  }
}
function UseId(props) {
  const id = React.useId();
  return props.children(id);
}

exports.ResourceItem = ResourceItem;

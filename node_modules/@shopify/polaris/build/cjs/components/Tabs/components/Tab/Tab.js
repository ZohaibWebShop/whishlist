'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var focus = require('../../../../utilities/focus.js');
var breakpoints = require('../../../../utilities/breakpoints.js');
var Tabs = require('../../Tabs.scss.js');
var DuplicateModal = require('./components/DuplicateModal/DuplicateModal.js');
var RenameModal = require('./components/RenameModal/RenameModal.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var hooks$1 = require('../../../../utilities/features/hooks.js');
var Icon = require('../../../Icon/Icon.js');
var Modal = require('../../../Modal/Modal.js');
var Popover = require('../../../Popover/Popover.js');
var ActionList = require('../../../ActionList/ActionList.js');
var HorizontalStack = require('../../../HorizontalStack/HorizontalStack.js');
var Text = require('../../../Text/Text.js');
var UnstyledLink = require('../../../UnstyledLink/UnstyledLink.js');
var UnstyledButton = require('../../../UnstyledButton/UnstyledButton.js');
var Badge = require('../../../Badge/Badge.js');

const Tab = /*#__PURE__*/React.forwardRef(({
  content,
  accessibilityLabel,
  badge,
  id,
  panelID,
  url,
  onAction,
  actions,
  disabled,
  isModalLoading,
  icon,
  siblingTabHasFocus,
  measuring,
  focused,
  selected,
  onToggleModal,
  onTogglePopover,
  viewNames,
  tabIndexOverride,
  onFocus
}, ref) => {
  const i18n = hooks.useI18n();
  const [popoverActive, setPopoverActive] = React.useState(false);
  const [activeModalType, setActiveModalType] = React.useState(null);
  const {
    mdDown
  } = breakpoints.useBreakpoints();
  const {
    polarisSummerEditions2023: se23
  } = hooks$1.useFeatures();
  const wasSelected = React.useRef(selected);
  const panelFocused = React.useRef(false);
  const node = React.useRef(null);
  React.useEffect(() => {
    onTogglePopover(popoverActive);
  }, [popoverActive, onTogglePopover]);
  React.useEffect(() => {
    onToggleModal(Boolean(activeModalType));
  }, [activeModalType, onToggleModal]);
  React.useEffect(() => {
    return () => {
      onToggleModal(false);
      onTogglePopover(false);
    };
  }, [onToggleModal, onTogglePopover]);

  // A tab can start selected when it is moved from the disclosure dropdown into the main list, so we need to send focus from the tab to the panel on mount and update
  React.useEffect(() => {
    if (measuring) {
      return;
    }

    // Because of timing issues with the render, we may still have the old, in-disclosure version of the tab that has focus. Check for this as a second indicator of focus
    const itemHadFocus = focused || document.activeElement && document.activeElement.id === id;

    // If we just check for selected, the panel for the active tab will be focused on page load, which we don’t want
    if (itemHadFocus && selected && panelID != null && !panelFocused.current) {
      focusPanelID(panelID);
      panelFocused.current = true;
    }
    if (selected && !wasSelected.current && panelID != null) {
      focusPanelID(panelID);
    } else if (focused && node.current != null && activeModalType == null && !disabled) {
      focus.focusFirstFocusableNode(node.current);
    }
    wasSelected.current = selected;
  }, [focused, id, content, measuring, panelID, selected, activeModalType, disabled]);
  let tabIndex;
  if (selected && !siblingTabHasFocus && !measuring) {
    tabIndex = 0;
  } else if (focused && !measuring) {
    tabIndex = 0;
  } else {
    tabIndex = -1;
  }
  if (tabIndexOverride != null) {
    tabIndex = tabIndexOverride;
  }
  const renameAction = actions?.find(action => action.type === 'rename');
  const duplicateAction = actions?.find(action => action.type === 'duplicate');
  const deleteAction = actions?.find(action => action.type === 'delete');
  const togglePopoverActive = React.useCallback(() => {
    if (!actions?.length) {
      return;
    }
    setPopoverActive(popoverActive => !popoverActive);
  }, [actions]);
  const handleClick = React.useCallback(() => {
    if (disabled) {
      return;
    }
    if (selected) {
      togglePopoverActive();
    } else {
      onAction?.();
    }
  }, [selected, onAction, togglePopoverActive, disabled]);
  const handleModalOpen = type => {
    setActiveModalType(type);
  };
  const handleModalClose = () => {
    setActiveModalType(null);
  };
  const handleSaveRenameModal = React.useCallback(async value => {
    await renameAction?.onPrimaryAction?.(value);
    setTimeout(() => {
      if (node.current) {
        focus.focusFirstFocusableNode(node.current);
      }
    }, 250);
  }, [renameAction]);
  const handleConfirmDeleteView = React.useCallback(async () => {
    await deleteAction?.onPrimaryAction?.(content);
    handleModalClose();
  }, [deleteAction, content]);
  const handleSaveDuplicateModal = React.useCallback(async duplicateName => {
    await duplicateAction?.onPrimaryAction?.(duplicateName);
  }, [duplicateAction]);
  const actionContent = {
    rename: {
      icon: polarisIcons.InfoMinor,
      content: i18n.translate('Polaris.Tabs.Tab.rename')
    },
    duplicate: {
      icon: polarisIcons.DuplicateMinor,
      content: i18n.translate('Polaris.Tabs.Tab.duplicate')
    },
    edit: {
      icon: polarisIcons.EditMinor,
      content: i18n.translate('Polaris.Tabs.Tab.edit')
    },
    'edit-columns': {
      icon: polarisIcons.Columns3Minor,
      content: i18n.translate('Polaris.Tabs.Tab.editColumns')
    },
    delete: {
      icon: polarisIcons.DeleteMinor,
      content: i18n.translate('Polaris.Tabs.Tab.delete'),
      destructive: true
    }
  };
  const formattedActions = actions?.map(({
    type,
    onAction,
    onPrimaryAction,
    ...additionalOptions
  }) => {
    const isModalActivator = !type.includes('edit');
    return {
      ...actionContent[type],
      ...additionalOptions,
      onAction: () => {
        onAction?.(content);
        togglePopoverActive();
        if (isModalActivator) {
          handleModalOpen(type);
        }
      }
    };
  });
  const handleKeyDown = React.useCallback(event => {
    if (event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }, [handleClick]);
  const tabContainerClassNames = css.classNames(Tabs.default.TabContainer, selected && Tabs.default.Underline);
  const urlIfNotDisabledOrSelected = disabled || selected ? undefined : url;
  const BaseComponent = urlIfNotDisabledOrSelected ? UnstyledLink.UnstyledLink : UnstyledButton.UnstyledButton;
  const tabClassName = css.classNames(Tabs.default.Tab, icon && Tabs.default['Tab-iconOnly'], popoverActive && Tabs.default['Tab-popoverActive'], selected && Tabs.default['Tab-active'], selected && actions?.length && Tabs.default['Tab-hasActions']);
  const badgeStatusSelected = !se23 ? 'success' : undefined;
  const badgeMarkup = badge ? /*#__PURE__*/React.createElement(Badge.Badge, {
    status: selected ? badgeStatusSelected : 'new'
  }, badge) : null;
  const disclosureMarkup = selected && actions?.length ? /*#__PURE__*/React.createElement("div", {
    className: css.classNames(Tabs.default.IconWrap)
  }, /*#__PURE__*/React.createElement(Icon.Icon, {
    source: se23 ? polarisIcons.ChevronDownMinor : polarisIcons.CaretDownMinor
  })) : null;
  const se23LabelVariant = mdDown && se23 ? 'bodyLg' : 'bodySm';
  const labelVariant = mdDown ? 'bodyMd' : 'bodySm';
  const activator = /*#__PURE__*/React.createElement(BaseComponent, {
    id: id,
    className: tabClassName,
    tabIndex: tabIndex,
    "aria-selected": selected,
    "aria-controls": panelID,
    "aria-label": accessibilityLabel,
    role: tabIndexOverride == null ? 'tab' : undefined,
    disabled: disabled,
    url: urlIfNotDisabledOrSelected,
    onFocus: onFocus,
    onMouseUp: focus.handleMouseUpByBlurring,
    onClick: handleClick,
    onKeyDown: handleKeyDown
  }, /*#__PURE__*/React.createElement(HorizontalStack.HorizontalStack, {
    gap: "2",
    align: "center",
    blockAlign: "center",
    wrap: false
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: se23 ? se23LabelVariant : labelVariant,
    fontWeight: se23 ? 'medium' : 'semibold'
  }, icon ?? content), badgeMarkup), disclosureMarkup);
  const isPlainButton = !selected || !actions?.length;
  const renameModal = renameAction ? /*#__PURE__*/React.createElement(RenameModal.RenameModal, {
    name: content,
    open: activeModalType === 'rename',
    onClose: handleModalClose,
    onClickPrimaryAction: handleSaveRenameModal,
    isModalLoading: isModalLoading,
    viewNames: viewNames
  }) : null;
  const duplicateModal = duplicateAction ? /*#__PURE__*/React.createElement(DuplicateModal.DuplicateModal, {
    open: activeModalType === 'duplicate',
    name: i18n.translate('Polaris.Tabs.Tab.copy', {
      name: content
    }),
    onClose: handleModalClose,
    onClickPrimaryAction: handleSaveDuplicateModal,
    isModalLoading: isModalLoading,
    viewNames: viewNames || []
  }) : null;
  const deleteModal = deleteAction ? /*#__PURE__*/React.createElement(Modal.Modal, {
    open: activeModalType === 'delete',
    onClose: handleModalClose,
    primaryAction: {
      content: i18n.translate('Polaris.Tabs.Tab.deleteModal.delete'),
      onAction: handleConfirmDeleteView,
      destructive: true,
      disabled: isModalLoading
    },
    secondaryActions: [{
      content: i18n.translate('Polaris.Tabs.Tab.deleteModal.cancel'),
      onAction: handleModalClose
    }],
    title: i18n.translate('Polaris.Tabs.Tab.deleteModal.title'),
    instant: true
  }, /*#__PURE__*/React.createElement(Modal.Modal.Section, null, i18n.translate('Polaris.Tabs.Tab.deleteModal.description', {
    viewName: content
  }))) : null;
  const markup = isPlainButton || disabled ? activator : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Popover.Popover, {
    active: popoverActive,
    activator: activator,
    autofocusTarget: "first-node",
    onClose: togglePopoverActive
  }, /*#__PURE__*/React.createElement("div", {
    className: Tabs.default.ActionListWrap
  }, /*#__PURE__*/React.createElement(ActionList.ActionList, {
    actionRole: "menuitem",
    items: formattedActions
  }))), renameModal, duplicateModal, deleteModal);
  if (icon) {
    return markup;
  }
  return /*#__PURE__*/React.createElement("li", {
    className: tabContainerClassNames,
    ref: mergeRefs([node, ref]),
    role: "presentation"
  }, markup);
});
Tab.displayName = 'Tab';
function focusPanelID(panelID) {
  const panel = document.getElementById(panelID);
  if (panel) {
    panel.focus({
      preventScroll: true
    });
  }
}
function mergeRefs(refs) {
  return node => {
    for (const ref of refs) {
      if (ref != null) {
        ref.current = node;
      }
    }
  };
}

exports.Tab = Tab;

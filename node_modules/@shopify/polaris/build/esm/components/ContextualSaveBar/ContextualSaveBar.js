import { memo, useEffect } from 'react';
import { useFrame } from '../../utilities/frame/hooks.js';

const ContextualSaveBar = /*#__PURE__*/memo(function ContextualSaveBar({
  message,
  saveAction,
  discardAction,
  alignContentFlush,
  fullWidth,
  contextControl,
  secondaryMenu
}) {
  const {
    setContextualSaveBar,
    removeContextualSaveBar
  } = useFrame();
  useEffect(() => {
    setContextualSaveBar({
      message,
      saveAction,
      discardAction,
      alignContentFlush,
      fullWidth,
      contextControl,
      secondaryMenu
    });
  }, [message, saveAction, discardAction, alignContentFlush, setContextualSaveBar, fullWidth, contextControl, secondaryMenu]);
  useEffect(() => {
    return removeContextualSaveBar;
  }, [removeContextualSaveBar]);
  return null;
});

export { ContextualSaveBar };

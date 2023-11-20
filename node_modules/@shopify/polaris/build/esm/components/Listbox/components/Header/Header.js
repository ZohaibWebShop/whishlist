import React from 'react';
import { useSection } from '../Section/hooks.js';
import { Box } from '../../../Box/Box.js';
import { Text } from '../../../Text/Text.js';

function Header({
  children
}) {
  const sectionId = useSection() || '';
  const content = typeof children === 'string' ? /*#__PURE__*/React.createElement(Box, {
    paddingBlockStart: "2",
    paddingInlineStart: "4",
    paddingBlockEnd: "2",
    paddingInlineEnd: "4"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "headingXs",
    color: "subdued"
  }, children)) : children;
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    id: sectionId
  }, content);
}

export { Header };

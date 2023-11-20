import React from 'react';
import type { BorderWidthScale, ColorBorderAlias } from '@shopify/polaris-tokens';
export interface DividerProps {
    /**
     * Divider border color
     * @default 'border-subdued'
     */
    borderColor?: ColorBorderAlias | 'transparent';
    /**
     * Divider border width
     * @default '1'
     */
    borderWidth?: BorderWidthScale;
}
export declare const Divider: ({ borderColor, borderWidth, }: DividerProps) => React.JSX.Element;
//# sourceMappingURL=Divider.d.ts.map
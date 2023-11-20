import React from 'react';
import type { IconSource } from '../../types';
type Color = 'base' | 'subdued' | 'critical' | 'interactive' | 'warning' | 'highlight' | 'success' | 'primary' | 'magic';
export interface IconProps {
    /** The SVG contents to display in the icon (icons should fit in a 20 × 20 pixel viewBox) */
    source: IconSource;
    /** Set the color for the SVG fill */
    color?: Color;
    /** @deprecated Use the Box component to create a backdrop */
    backdrop?: boolean;
    /** Descriptive text to be read to screenreaders */
    accessibilityLabel?: string;
}
export declare function Icon({ source, color, backdrop, accessibilityLabel }: IconProps): React.JSX.Element;
export {};
//# sourceMappingURL=Icon.d.ts.map
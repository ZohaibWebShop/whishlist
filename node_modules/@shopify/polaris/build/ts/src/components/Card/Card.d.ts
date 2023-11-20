import type { BreakpointsAlias, ColorBackgroundAlias, SpaceScale } from '@shopify/polaris-tokens';
import React from 'react';
import type { ResponsiveProp } from '../../utilities/css';
type Spacing = ResponsiveProp<SpaceScale>;
export interface CardProps {
    children?: React.ReactNode;
    /** Background color
     * @default 'bg'
     */
    background?: ColorBackgroundAlias;
    /** The spacing around the card
     * @default {xs: '4', sm: '5'}
     * @example
     * padding='4'
     * padding={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
     */
    padding?: Spacing;
    /** Border radius value above a set breakpoint */
    roundedAbove?: BreakpointsAlias;
}
export declare const Card: ({ children, background, padding, roundedAbove, }: CardProps) => React.JSX.Element;
export {};
//# sourceMappingURL=Card.d.ts.map
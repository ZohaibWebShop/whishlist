import React from 'react';
import type { Experimental } from '../../types';
type Size = 'extraSmall' | 'small' | 'medium' | 'large' | Experimental<'xl' | '2xl'>;
type Shape = 'square' | 'round';
export declare const STYLE_CLASSES: readonly ["one", "two", "three", "four", "five"];
export interface AvatarProps {
    /**
     * Size of avatar
     * @default 'medium'
     */
    size?: Size;
    /**
     * Shape of avatar
     * @default 'round'
     */
    shape?: Shape;
    /** The name of the person */
    name?: string;
    /** Initials of person to display */
    initials?: string;
    /** Whether the avatar is for a customer */
    customer?: boolean;
    /** URL of the avatar image which falls back to initials if the image fails to load */
    source?: string;
    /** Callback fired when the image fails to load  */
    onError?(): void;
    /** Accessible label for the avatar image */
    accessibilityLabel?: string;
}
export declare function Avatar({ name, source, onError, initials, customer, size, shape, accessibilityLabel, }: AvatarProps): React.JSX.Element;
export {};
//# sourceMappingURL=Avatar.d.ts.map
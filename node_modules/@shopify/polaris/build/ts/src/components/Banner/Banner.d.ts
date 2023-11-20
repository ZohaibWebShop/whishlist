import React from 'react';
import type { Action, DisableableAction, LoadableAction } from '../../types';
import type { IconProps } from '../Icon';
export type BannerStatus = 'success' | 'info' | 'warning' | 'critical';
export interface BannerProps {
    /** Title content for the banner. */
    title?: string;
    /** Status icon to display in the banner. Use only major icons */
    icon?: IconProps['source'];
    /** Renders the banner without a status icon. */
    hideIcon?: boolean;
    /** Sets the status of the banner. */
    status?: BannerStatus;
    /** The child elements to render in the banner. */
    children?: React.ReactNode;
    /** Action for banner */
    action?: DisableableAction & LoadableAction;
    /** Action | Displays a secondary action */
    secondaryAction?: Action;
    /** Callback when banner is dismissed */
    onDismiss?(): void;
    /** Disables screen reader announcements when changing the content of the banner */
    stopAnnouncements?: boolean;
}
export declare const Banner: React.ForwardRefExoticComponent<BannerProps & React.RefAttributes<BannerHandles>>;
interface BannerAttributes {
    iconColor: IconProps['color'];
    defaultIcon: IconProps['source'];
    ariaRoleType: 'status' | 'alert';
}
export declare function useBannerAttributes(status: BannerProps['status']): BannerAttributes;
export interface BannerHandles {
    focus(): void;
}
export {};
//# sourceMappingURL=Banner.d.ts.map
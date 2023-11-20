import type { PropsWithChildren } from 'react';
import React from 'react';
import type { ColorTextAlias } from '@shopify/polaris-tokens';
import type { BoxProps } from '../../../Box';
import type { BannerProps } from '../../Banner';
interface BannerLayoutProps {
    backgroundColor: BoxProps['background'];
    textColor: ColorTextAlias;
    bannerTitle: React.ReactNode;
    bannerIcon: React.ReactNode;
    actionButtons: React.ReactNode;
    dismissButton: React.ReactNode;
}
export declare function BannerExperimental({ status, icon, hideIcon, onDismiss, action, secondaryAction, title, children, }: BannerProps): React.JSX.Element;
export declare function DefaultBanner({ backgroundColor, textColor, bannerTitle, bannerIcon, actionButtons, dismissButton, children, }: PropsWithChildren<BannerLayoutProps>): React.JSX.Element;
export declare function InlineIconBanner({ backgroundColor, bannerIcon, actionButtons, dismissButton, children, }: PropsWithChildren<Omit<BannerLayoutProps, 'textColor' | 'bannerTitle'>>): React.JSX.Element;
export declare function WithinContentContainerBanner({ backgroundColor, textColor, bannerTitle, bannerIcon, actionButtons, dismissButton, children, }: PropsWithChildren<BannerLayoutProps>): React.JSX.Element;
export {};
//# sourceMappingURL=BannerExperimental.d.ts.map
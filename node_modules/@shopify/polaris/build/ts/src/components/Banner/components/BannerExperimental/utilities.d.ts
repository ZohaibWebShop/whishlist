import type { ColorBackgroundAlias, ColorIconAlias, ColorTextAlias } from '@shopify/polaris-tokens';
import type { BannerStatus } from '../../Banner';
import type { IconSource } from '../../../../types';
interface BannerColorAliases {
    background: ColorBackgroundAlias;
    text: ColorTextAlias;
    icon: ColorIconAlias | ColorTextAlias;
}
interface BannerAttributes {
    withinPage: BannerColorAliases;
    withinContentContainer: BannerColorAliases;
    icon: IconSource;
}
export declare const bannerAttributes: {
    [key in BannerStatus]: BannerAttributes;
};
export {};
//# sourceMappingURL=utilities.d.ts.map
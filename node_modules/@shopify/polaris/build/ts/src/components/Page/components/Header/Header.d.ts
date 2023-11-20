import React from 'react';
import type { DestructableAction, DisableableAction, IconableAction, LoadableAction, MenuActionDescriptor, MenuGroupDescriptor, TooltipAction } from '../../../../types';
import type { BreadcrumbsProps } from '../../../Breadcrumbs';
import type { PaginationProps } from '../../../Pagination';
import type { TitleProps } from './components';
interface PrimaryAction extends DestructableAction, DisableableAction, LoadableAction, IconableAction, TooltipAction {
    /** Provides extra visual weight and identifies the primary action in a set of buttons */
    primary?: boolean;
}
export interface HeaderProps extends TitleProps {
    /** Visually hide the title */
    titleHidden?: boolean;
    /** Primary page-level action */
    primaryAction?: PrimaryAction | React.ReactNode;
    /** Page-level pagination */
    pagination?: PaginationProps;
    /** A back action link */
    backAction?: BreadcrumbsProps['backAction'];
    /** Collection of secondary page-level actions */
    secondaryActions?: MenuActionDescriptor[] | React.ReactNode;
    /** Collection of page-level groups of secondary actions */
    actionGroups?: MenuGroupDescriptor[];
    /** @deprecated Additional navigation markup */
    additionalNavigation?: React.ReactNode;
    additionalMetadata?: React.ReactNode | string;
    /** Callback that returns true when secondary actions are rolled up into action groups, and false when not */
    onActionRollup?(hasRolledUp: boolean): void;
}
export declare function Header({ title, subtitle, titleMetadata, additionalMetadata, titleHidden, primaryAction, pagination, additionalNavigation, backAction, secondaryActions, actionGroups, compactTitle, onActionRollup, }: HeaderProps): React.JSX.Element;
export {};
//# sourceMappingURL=Header.d.ts.map
import React from 'react';
import type { ButtonProps } from '../../../Button';
export interface FilterButtonProps {
    onClick: () => void;
    label: string;
    icon?: ButtonProps['icon'];
    disabled?: boolean;
    children?: React.ReactNode;
}
export declare function FilterButton({ onClick, label, icon, disabled, children, }: FilterButtonProps): React.JSX.Element;
//# sourceMappingURL=FilterButton.d.ts.map
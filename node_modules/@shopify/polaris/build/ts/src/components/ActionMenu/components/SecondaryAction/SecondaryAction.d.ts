import React from 'react';
import type { ButtonProps } from '../../../Button';
interface SecondaryAction extends ButtonProps {
    helpText?: React.ReactNode;
    onAction?(): void;
    getOffsetWidth?(width: number): void;
}
export declare function SecondaryAction({ children, destructive, helpText, onAction, getOffsetWidth, ...rest }: SecondaryAction): React.JSX.Element;
export {};
//# sourceMappingURL=SecondaryAction.d.ts.map
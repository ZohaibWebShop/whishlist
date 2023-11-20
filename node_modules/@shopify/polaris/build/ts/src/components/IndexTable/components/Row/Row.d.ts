import React from 'react';
type RowStatus = 'success' | 'subdued' | 'critical';
export interface RowProps {
    children: React.ReactNode;
    id: string;
    selected?: boolean;
    position: number;
    subdued?: boolean;
    status?: RowStatus;
    disabled?: boolean;
    onNavigation?(id: string): void;
    onClick?(): void;
}
export declare const Row: React.NamedExoticComponent<RowProps>;
export {};
//# sourceMappingURL=Row.d.ts.map
import React from 'react';
export interface SearchFieldProps {
    onChange: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onClear?: () => void;
    focused?: boolean;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    borderlessQueryField?: boolean;
}
export declare function SearchField({ onChange, onClear, onFocus, onBlur, focused, value, placeholder, disabled, borderlessQueryField, }: SearchFieldProps): React.JSX.Element;
//# sourceMappingURL=SearchField.d.ts.map
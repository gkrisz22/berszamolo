import { useState } from 'react';
// Plusz pont
export const useStorage = (defaultValue: any) => {
    const [value, setValue] = useState(() => {
        const v = localStorage.getItem('salary-calculator');
        return v ? JSON.parse(v) : defaultValue;
    });

    const setStoredValue = (v: any) => {
        setValue(v);
        localStorage.setItem('salary-calculator', JSON.stringify(v));
    }

    return [value, setStoredValue];
}
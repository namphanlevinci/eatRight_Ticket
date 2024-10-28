import { useTheme } from 'context/themeContext';
import React from 'react';

export default function RadioBtnNoneSelected() {
    const { theme } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
        >
            <rect
                x="1"
                y="1"
                width="24"
                height="24"
                rx="12"
                stroke={theme.pRIMARY6Primary}
                strokeWidth="2"
            />
        </svg>
    );
}

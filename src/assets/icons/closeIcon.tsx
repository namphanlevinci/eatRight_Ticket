import { useTheme } from 'context/themeContext';
import React from 'react';

export default function CloseXIcon() {
    const { theme } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
        >
            <path
                d="M30 10L10 30M10 10L30 30"
                stroke={theme.tEXTPrimary}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

import { useTheme } from 'context/themeContext';
import React from 'react';

export default function KitchenStationIcon({
    isSelected,
}: {
    isSelected: boolean;
}) {
    const { theme } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M9 21V18H2V16H9C9.55 16 10.021 16.196 10.413 16.588C10.805 16.98 11.0007 17.4507 11 18V21H9ZM13 21V18C13 17.45 13.196 16.9793 13.588 16.588C13.98 16.1967 14.4507 16.0007 15 16H22V18H15V21H13ZM6 15C5.16667 15 4.45833 14.7083 3.875 14.125C3.29167 13.5417 3 12.8333 3 12V8H21V12C21 12.8333 20.7083 13.5417 20.125 14.125C19.5417 14.7083 18.8333 15 18 15H6ZM6 13H18C18.2833 13 18.521 12.904 18.713 12.712C18.905 12.52 19.0007 12.2827 19 12V10H5V12C5 12.2833 5.096 12.521 5.288 12.713C5.48 12.905 5.71733 13.0007 6 13ZM3 7V5H9V4C9 3.71667 9.096 3.47933 9.288 3.288C9.48 3.09667 9.71733 3.00067 10 3H14C14.2833 3 14.521 3.096 14.713 3.288C14.905 3.48 15.0007 3.71733 15 4V5H21V7H3Z"
                fill={isSelected ? theme.pRIMARY6Primary : theme.tEXTPrimary}
            />
        </svg>
    );
}

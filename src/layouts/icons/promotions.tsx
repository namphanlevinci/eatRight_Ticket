import { useTheme } from 'context/themeContext';
import React from 'react';

export default function PromotionsIcon() {
    const { theme } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
        >
            <path
                d="M16.3267 14.666H16.3517H16.3267ZM16.3334 24.666H16.3584H16.3334ZM9.66675 19.666H23.0001H9.66675Z"
                fill={theme.textTitle}
            />
            <path
                d="M16.3267 14.666H16.3517M16.3334 24.666H16.3584M9.66675 19.666H23.0001"
                stroke={theme.textTitle}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M27.1667 6.33301C28.5475 6.33301 29.6667 7.4523 29.6667 8.83301C29.6667 10.2137 28.5475 11.333 27.1667 11.333C25.786 11.333 24.6667 10.2137 24.6667 8.83301C24.6667 7.4523 25.786 6.33301 27.1667 6.33301Z"
                stroke={theme.textTitle}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.62331 16.5731C0.951641 18.4398 0.916641 21.2565 2.44997 23.2398C5.42832 27.1061 8.89367 30.5715 12.76 33.5498C14.7433 35.0831 17.56 35.0481 19.4266 33.3765C24.4726 28.8629 29.2141 24.0201 33.62 18.8798C34.0648 18.3686 34.3387 17.7311 34.4033 17.0565C34.6766 14.0631 35.2416 5.4398 32.9 3.0998C30.5583 0.759803 21.9366 1.32314 18.9433 1.59814C18.2687 1.66277 17.6312 1.93665 17.12 2.38147C11.9798 6.78682 7.13695 11.5278 2.62331 16.5731Z"
                stroke={theme.textTitle}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

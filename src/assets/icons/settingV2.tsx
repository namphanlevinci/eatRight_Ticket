import { useTheme } from 'context/themeContext';
import React from 'react';

export default function SettingV2Icon() {
    const { theme } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="34"
            viewBox="0 0 32 34"
            fill="none"
        >
            <path
                d="M31.3834 20.9502C31.0598 20.4502 30.5999 19.9502 30.0037 19.6335C29.5268 19.4002 29.2202 19.0168 28.9477 18.5668C28.0791 17.1335 28.59 15.2502 30.0378 14.4002C31.7411 13.4502 32.2861 11.3335 31.2982 9.6835L30.157 7.71683C29.1862 6.06683 27.0571 5.4835 25.3709 6.45016C23.872 7.25016 21.9473 6.71683 21.0787 5.30016C20.8061 4.8335 20.6528 4.3335 20.6869 3.8335C20.738 3.1835 20.5336 2.56683 20.227 2.06683C19.5968 1.0335 18.4556 0.333496 17.1952 0.333496H14.7936C13.5502 0.366829 12.409 1.0335 11.7788 2.06683C11.4552 2.56683 11.2679 3.1835 11.3019 3.8335C11.336 4.3335 11.1827 4.8335 10.9102 5.30016C10.0415 6.71683 8.11683 7.25016 6.63499 6.45016C4.93173 5.4835 2.81968 6.06683 1.83179 7.71683L0.690602 9.6835C-0.280257 11.3335 0.264787 13.4502 1.95102 14.4002C3.39879 15.2502 3.90977 17.1335 3.05814 18.5668C2.76858 19.0168 2.46199 19.4002 1.98508 19.6335C1.40597 19.9502 0.894994 20.4502 0.622472 20.9502C-0.00773537 21.9835 0.0263299 23.2835 0.656537 24.3668L1.83179 26.3668C2.46199 27.4335 3.63725 28.1002 4.86359 28.1002C5.4427 28.1002 6.12401 27.9335 6.66905 27.6002C7.09487 27.3168 7.60585 27.2168 8.16792 27.2168C9.85415 27.2168 11.2679 28.6002 11.3019 30.2502C11.3019 32.1668 12.8689 33.6668 14.8447 33.6668H17.1611C19.1199 33.6668 20.6869 32.1668 20.6869 30.2502C20.738 28.6002 22.1517 27.2168 23.8379 27.2168C24.383 27.2168 24.894 27.3168 25.3368 27.6002C25.8819 27.9335 26.5461 28.1002 27.1423 28.1002C28.3516 28.1002 29.5268 27.4335 30.157 26.3668L31.3493 24.3668C31.9625 23.2502 32.0136 21.9835 31.3834 20.9502Z"
                fill={theme.tEXTPrimary}
            />
            <path
                opacity="0.4"
                d="M16.0199 21.717C13.3458 21.717 11.1826 19.6336 11.1826 17.017C11.1826 14.4003 13.3458 12.3003 16.0199 12.3003C18.694 12.3003 20.806 14.4003 20.806 17.017C20.806 19.6336 18.694 21.717 16.0199 21.717Z"
                fill={theme.nEUTRALPrimary}
            />
        </svg>
    );
}

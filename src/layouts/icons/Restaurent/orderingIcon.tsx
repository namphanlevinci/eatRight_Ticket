import { useTheme } from 'context/themeContext';
import React from 'react';

export default function OrderingIcon({ isSelected }: { isSelected: boolean }) {
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
                d="M7 6.99993V4.99993C7.00001 4.42081 7.16765 3.85407 7.48266 3.36812C7.79768 2.88218 8.24662 2.49779 8.77529 2.26138C9.30395 2.02496 9.88975 1.94661 10.462 2.03578C11.0342 2.12496 11.5683 2.37785 12 2.76393C12.4317 2.37785 12.9658 2.12496 13.538 2.03578C14.1103 1.94661 14.696 2.02496 15.2247 2.26138C15.7534 2.49779 16.2023 2.88218 16.5173 3.36812C16.8324 3.85407 17 4.42081 17 4.99993V6.99993H18.5C18.8978 6.99993 19.2794 7.15797 19.5607 7.43927C19.842 7.72058 20 8.10211 20 8.49993V18.5049C20 19.4319 19.6318 20.3208 18.9763 20.9763C18.3209 21.6317 17.4319 21.9999 16.505 21.9999H8C6.93913 21.9999 5.92172 21.5785 5.17157 20.8284C4.42143 20.0782 4 19.0608 4 17.9999V8.49993C4 8.10211 4.15804 7.72058 4.43934 7.43927C4.72064 7.15797 5.10218 6.99993 5.5 6.99993H7ZM13.635 20.4999C13.2283 19.9141 13.0102 19.2181 13.01 18.5049V8.49993H5.5V17.9999C5.5 18.3282 5.56466 18.6533 5.6903 18.9566C5.81594 19.26 6.00009 19.5356 6.23223 19.7677C6.46438 19.9998 6.73998 20.184 7.04329 20.3096C7.34661 20.4353 7.6717 20.4999 8 20.4999H13.635ZM11.5 6.99993V4.99993C11.5 4.60211 11.342 4.22058 11.0607 3.93927C10.7794 3.65797 10.3978 3.49993 10 3.49993C9.60218 3.49993 9.22064 3.65797 8.93934 3.93927C8.65804 4.22058 8.5 4.60211 8.5 4.99993V6.99993H11.5ZM13 6.99993H15.5V4.99993C15.5 4.69117 15.4048 4.38992 15.2272 4.1373C15.0497 3.88468 14.7985 3.693 14.508 3.58843C14.2175 3.48386 13.9018 3.4715 13.604 3.55302C13.3062 3.63454 13.0408 3.80598 12.844 4.04393C12.945 4.34393 13 4.66593 13 4.99993V6.99993ZM14.51 18.5049C14.51 19.034 14.7202 19.5415 15.0943 19.9156C15.4685 20.2897 15.9759 20.4999 16.505 20.4999C17.0341 20.4999 17.5415 20.2897 17.9157 19.9156C18.2898 19.5415 18.5 19.034 18.5 18.5049V8.49993H14.51V18.5049Z"
                fill={isSelected ? theme.pRIMARY6Primary : theme.tEXTPrimary}
            />
        </svg>
    );
}

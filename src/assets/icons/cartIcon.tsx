import React from 'react';

export default function CartIcon({
    isDisabled = false,
}: {
    isDisabled?: boolean;
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M3.5 3.14844H5.49656L8.14988 14.3805C8.40674 15.4664 9.42351 16.1981 10.5347 16.0949L17.472 15.4518C18.4761 15.3584 19.3246 14.6676 19.6184 13.7024L21.4505 7.6981C21.6704 6.98101 21.1294 6.25614 20.3793 6.26295L6.32943 6.37679"
                fill={isDisabled ? '#CCCCCC' : 'black'}
            />
            <path
                d="M3.5 3.14844H5.49656L8.14988 14.3805C8.40674 15.4664 9.42351 16.1981 10.5347 16.0949L17.472 15.4518C18.4761 15.3584 19.3246 14.6676 19.6184 13.7024L21.4505 7.6981C21.6704 6.98101 21.1294 6.25614 20.3793 6.26295L6.32943 6.37679"
                stroke={isDisabled ? '#CCCCCC' : 'black'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.38767 20.3468V20.4649M9.86644 20.3722C9.86644 20.6381 9.65067 20.8537 9.38473 20.8537C9.11879 20.8537 8.90332 20.6381 8.90332 20.3722C8.90332 20.1062 9.11879 19.8906 9.38473 19.8906C9.65067 19.8906 9.86644 20.1062 9.86644 20.3722Z"
                stroke={isDisabled ? '#CCCCCC' : 'black'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18.5986 20.3468V20.4649M19.0774 20.3722C19.0774 20.6381 18.8616 20.8537 18.5957 20.8537C18.3297 20.8537 18.1143 20.6381 18.1143 20.3722C18.1143 20.1062 18.3297 19.8906 18.5957 19.8906C18.8616 19.8906 19.0774 20.1062 19.0774 20.3722Z"
                stroke={isDisabled ? '#CCCCCC' : 'black'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

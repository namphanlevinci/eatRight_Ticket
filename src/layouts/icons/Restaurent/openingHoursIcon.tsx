import React from 'react';

export default function OpeningHoursIcon({
    isSelected,
}: {
    isSelected: boolean;
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
                d="M17 3.33989C18.5202 4.21758 19.7826 5.47997 20.6603 7.00017C21.538 8.52038 22 10.2448 22 12.0002C22 13.7556 21.5379 15.48 20.6602 17.0002C19.7825 18.5204 18.5201 19.7828 16.9999 20.6605C15.4797 21.5381 13.7552 22.0002 11.9998 22.0001C10.2445 22.0001 8.52002 21.538 6.99984 20.6603C5.47965 19.7826 4.21729 18.5202 3.33963 17C2.46198 15.4797 1.99996 13.7553 2 11.9999L2.005 11.6759C2.061 9.94888 2.56355 8.26585 3.46364 6.79089C4.36373 5.31592 5.63065 4.09934 7.14089 3.25977C8.65113 2.42021 10.3531 1.98629 12.081 2.00033C13.8089 2.01437 15.5036 2.47589 17 3.33989ZM12 5.99989C11.7348 5.99989 11.4804 6.10525 11.2929 6.29279C11.1054 6.48032 11 6.73468 11 6.99989V11.9999C11 12.2651 11.1054 12.5195 11.2929 12.707C11.4804 12.8945 11.7348 12.9999 12 12.9999H15.5C15.7652 12.9999 16.0196 12.8945 16.2071 12.707C16.3946 12.5195 16.5 12.2651 16.5 11.9999C16.5 11.7347 16.3946 11.4803 16.2071 11.2928C16.0196 11.1052 15.7652 10.9999 15.5 10.9999H13V6.99989C13 6.75496 12.91 6.51856 12.7473 6.33552C12.5845 6.15249 12.3603 6.03555 12.117 6.00689L12 5.99989Z"
                fill={isSelected ? '#FF9D00' : '#333741'}
            />
        </svg>
    );
}

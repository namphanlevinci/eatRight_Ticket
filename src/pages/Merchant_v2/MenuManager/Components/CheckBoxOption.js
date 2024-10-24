/* eslint-disable react/display-name */
import { Row } from 'antd';
import { useState, forwardRef, useImperativeHandle } from 'react';

/**
 * @type {React.FC<{
 *   name?: string;
 *   ref?: React.Ref<CustomModalHandle>;
 *   customStyle?: any;
 *   onChange?: (value: boolean) => void;
 * }>}
 */

const CheckBoxOption = forwardRef(
    ({ name = '', customStyle, onChange }, ref) => {
        const [checked, setChecked] = useState(false);

        const handleChange = () => {
            setChecked(!checked);
            if (onChange) {
                onChange(!checked);
            }
        };

        useImperativeHandle(ref, () => ({
            getValue: () => {
                return checked;
            },
            setValue: (isboolean) => {
                setChecked(isboolean);
            },
        }));

        return (
            <Row
                ref={ref}
                align={'middle'}
                style={{
                    cursor: 'pointer',
                    gap: 16,
                    marginTop: 16,
                    ...customStyle,
                }}
                onClick={handleChange}
            >
                {checked ? <IconCheck /> : <IconUnCheck />} {name}
            </Row>
        );
    },
);

export default CheckBoxOption;

const IconUnCheck = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
        >
            <path
                opacity="0.4"
                d="M11.0428 4H22.2892C26.22 4 28.6666 6.77492 28.6666 10.7018V21.2981C28.6666 25.2251 26.22 28 22.2878 28H11.0428C7.11203 28 4.66663 25.2251 4.66663 21.2981V10.7018C4.66663 6.77492 7.12371 4 11.0428 4Z"
                fill="#F0FEE7"
                stroke="#389E0D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const IconCheck = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
        >
            <path
                d="M19.5558 11.8618L19.5557 11.8618L14.4598 16.9589L12.4402 14.9404C11.8543 14.3545 10.9057 14.3545 10.3198 14.9404C9.73383 15.5264 9.73383 16.4763 10.3198 17.0622L13.3984 20.1409C13.6918 20.4343 14.0753 20.5807 14.46 20.5807C14.8437 20.5807 15.227 20.434 15.5202 20.1409L21.6775 13.9835C22.2635 13.3976 22.2635 12.4477 21.6775 11.8618C21.0916 11.2758 20.1417 11.2758 19.5558 11.8618ZM10.376 3.83398H21.6226C23.6077 3.83398 25.233 4.52879 26.3632 5.71114C27.4953 6.89546 28.1666 8.6073 28.1666 10.7033V21.3006C28.1666 23.3959 27.495 25.107 26.3627 26.2909C25.2322 27.4728 23.6065 28.1673 21.6213 28.1673H10.376C8.39155 28.1673 6.76654 27.4728 5.63654 26.291C4.50468 25.1071 3.83331 23.396 3.83331 21.3006V10.7033C3.83331 8.6073 4.50471 6.89544 5.63661 5.71111C6.76662 4.52876 8.39162 3.83398 10.376 3.83398Z"
                fill="#389E0D"
                stroke="#389E0D"
            />
        </svg>
    );
};

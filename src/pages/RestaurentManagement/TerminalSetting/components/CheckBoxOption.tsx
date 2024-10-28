/* eslint-disable react/display-name */
import { Row } from 'antd';
import { Text } from 'components/atom/Text';

const CheckBoxOption = ({
    name = '',
    isChecked,
    onChange,
}: {
    name?: string;
    isChecked?: boolean;
    onChange?: (checked: boolean) => void;
}) => {
    const handleChange = () => {
        if (onChange) {
            onChange(!isChecked);
        }
    };

    return (
        <Row
            align={'middle'}
            style={{ cursor: 'pointer', gap: 16, marginBlock: 20 }}
            onClick={handleChange}
        >
            {isChecked ? <IconCheck /> : <IconUnCheck />}
            <Text style={{ fontWeight: '600' }}>{name}</Text>
        </Row>
    );
};

export default CheckBoxOption;

const IconUnCheck = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
        >
            <rect
                x="0.75"
                y="0.75"
                width="24.5"
                height="24.5"
                rx="3.25"
                stroke="#389E0D"
                strokeWidth="1.5"
            />
        </svg>
    );
};

const IconCheck = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
        >
            <rect width="26" height="26" rx="4" fill="#389E0D" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.6265 7.36967C21.8657 7.60618 22 7.92691 22 8.26132C22 8.59574 21.8657 8.91647 21.6265 9.15297L12.0647 18.6059C11.9384 18.7308 11.7884 18.8299 11.6232 18.8976C11.4581 18.9652 11.2812 19 11.1024 19C10.9237 19 10.7467 18.9652 10.5816 18.8976C10.4165 18.8299 10.2665 18.7308 10.1401 18.6059L5.38945 13.9101C5.26761 13.7938 5.17043 13.6546 5.10357 13.5007C5.03671 13.3469 5.00152 13.1814 5.00005 13.0139C4.99858 12.8465 5.03085 12.6804 5.095 12.5254C5.15914 12.3704 5.25386 12.2296 5.37364 12.1112C5.49342 11.9928 5.63585 11.8991 5.79263 11.8357C5.94941 11.7723 6.11739 11.7404 6.28678 11.7418C6.45617 11.7433 6.62356 11.7781 6.7792 11.8442C6.93484 11.9103 7.07561 12.0064 7.19329 12.1268L11.102 15.991L19.8218 7.36967C19.9403 7.25248 20.0809 7.15951 20.2358 7.09608C20.3906 7.03265 20.5566 7 20.7242 7C20.8917 7 21.0577 7.03265 21.2125 7.09608C21.3674 7.15951 21.508 7.25248 21.6265 7.36967Z"
                fill="white"
            />
        </svg>
    );
};

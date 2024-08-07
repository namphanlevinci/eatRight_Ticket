import React, { useState } from 'react';
import { Input, InputProps } from 'antd';
import styled from 'styled-components';
import { useTheme } from 'context/themeContext';

interface PhoneNumberValue {
    phoneNumber?: string;
}

interface PhoneNumberInputProps {
    id?: string;
    value?: PhoneNumberValue;
    onChange?: (value: PhoneNumberValue) => void;
    placeholder?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = (props) => {
    const { id, value = {}, onChange } = props;
    const [phoneNumber, setPhoneNumber] = useState('');

    const formatPhoneNumber = (phone: string) => {
        const cleaned = ('' + phone).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
        if (match) {
            return [match[1], match[2], match[3]].filter(Boolean).join(' ');
        }
        return phone;
    };

    const triggerChange = (changedValue: { phoneNumber?: string }) => {
        onChange?.({ phoneNumber, ...value, ...changedValue });
    };

    const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhoneNumber = formatPhoneNumber(e.target.value);
        if (!('phoneNumber' in value)) {
            setPhoneNumber(newPhoneNumber);
        }
        triggerChange({ phoneNumber: newPhoneNumber });
    };

    return (
        <span id={id}>
            <DarkInput
                type="text"
                value={value.phoneNumber || phoneNumber}
                onChange={onPhoneNumberChange}
                style={{ width: '100%', height: '56px' }}
                maxLength={12}
                placeholder={props.placeholder}
            />
        </span>
    );
};

export default PhoneNumberInput;

const getTextColor = (props: { theme: any }) => props.theme.fieldTextIcon;
const getBackgroundColor = (props: { theme: any }) => props.theme.nEUTRALBase;
export const DarkInputDefault = styled(Input)`
    &::placeholder {
        color: #808080;
        opacity: 1;
        font-size: 14px;
    }
    background: ${getBackgroundColor};
    border: 0px;
    height: 56px;
    color: ${getTextColor};
`;
const DarkInput = (props: InputProps) => {
    const { theme } = useTheme();

    return (
        <DarkInputDefault theme={theme} {...props}>
            {props.children}
        </DarkInputDefault>
    );
};

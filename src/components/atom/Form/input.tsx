import { FormItem } from 'components/atom/Form/Item';
import React from 'react';
import { Rule } from 'antd/es/form';
export default function InputForm({
    label,
    name,
    placeholder,
    rule,
    required = true,
    ...props
}: {
    label: string;
    name: string;
    placeholder: string;
    rule?: Rule[];
    required?: boolean;
} & InputProps) {
    return (
        <div style={{ position: 'relative' }}>
            <FormItem
                label={label}
                name={name}
                rules={
                    rule
                        ? rule
                        : [
                              {
                                  required: true,
                              },
                          ]
                }
                required={required}
            >
                <DarkInput
                    {...props}
                    placeholder={placeholder}
                    style={{ paddingRight: 50, ...props.style }}
                />
            </FormItem>
        </div>
    );
}

import { Input, InputProps } from 'antd';
import { useTheme } from 'context/themeContext';
import styled from 'styled-components';
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

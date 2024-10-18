import { FormItem } from 'components/atom/Form/Item';
import React from 'react';
import { Rule } from 'antd/es/form';
import PhoneNumberInput from '../Input/inputPhoneNumber';
export default function InputPhoneNumberForm({
    label,
    name,
    rule,
    placeholder,
    required = true,
    disabled = false,
}: {
    label: string;
    name: string;
    placeholder: string;
    rule?: Rule[];
    required?: boolean;
    disabled?: boolean;
}) {
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
                                  message: `Field is required`,
                              },
                          ]
                }
                required={required}
            >
                <PhoneNumberInput
                    placeholder={placeholder}
                    disabled={disabled}
                />
            </FormItem>
        </div>
    );
}

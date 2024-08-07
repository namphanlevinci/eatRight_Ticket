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
}: {
    label: string;
    name: string;
    placeholder: string;
    rule?: Rule[];
    required?: boolean;
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
                              },
                          ]
                }
                required={required}
            >
                <PhoneNumberInput placeholder={placeholder} />
            </FormItem>
        </div>
    );
}

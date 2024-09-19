import { FormItem } from 'components/atom/Form/Item';
import React from 'react';
import { Rule } from 'antd/es/form';
import { useTheme } from 'context/themeContext';
import { DatePicker } from 'antd';
export default function DatePickerForm({
    label,
    name,
    rule,
    required = true,
    disabled,
}: {
    label: string;
    name: string;
    placeholder: string;
    rule?: Rule[];
    required?: boolean;
    disabled?: boolean;
}) {
    const { theme } = useTheme();
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
                                  required: required,
                              },
                          ]
                }
                required={required}
            >
                <DatePicker
                    style={{
                        width: '100%',
                        height: 56,
                        background: theme.nEUTRALBase,
                        border: 0,
                    }}
                    disabled={disabled}
                    format={'YYYY-MM-DD'}
                />
            </FormItem>
        </div>
    );
}

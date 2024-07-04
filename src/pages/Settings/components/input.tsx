import { FormItem } from 'components/atom/Form/Item';
import { DarkInput } from 'components/atom/Input';
import React from 'react';
import { Rule } from 'antd/es/form';
export default function Input({
    label,
    name,
    placeholder,
    rule,
}: {
    label: string;
    name: string;
    placeholder: string;
    rule?: Rule[];
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
                required={false}
            >
                <DarkInput
                    placeholder={placeholder}
                    style={{ paddingRight: 50 }}
                />
            </FormItem>
        </div>
    );
}

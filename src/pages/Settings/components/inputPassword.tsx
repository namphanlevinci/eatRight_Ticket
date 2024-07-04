import { FormItem } from 'components/atom/Form/Item';
import { DarkInput } from 'components/atom/Input';
import React from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Rule } from 'antd/es/form';
export default function InputPassword({
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
    const [passwordVisible, setPasswordVisible] = React.useState(false);
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
                                  message: 'Please input your password!',
                              },
                          ]
                }
                required={false}
            >
                <DarkInput
                    placeholder={placeholder}
                    type={passwordVisible ? 'text' : 'password'}
                    style={{ paddingRight: 50 }}
                />
            </FormItem>
            <div
                style={{
                    position: 'absolute',
                    right: 20,
                    cursor: 'pointer',
                    top: 63,
                }}
                onClick={() => setPasswordVisible(!passwordVisible)}
            >
                {passwordVisible ? (
                    <EyeOutlined style={{ color: '#E5E5E5', fontSize: 20 }} />
                ) : (
                    <EyeInvisibleOutlined
                        style={{ color: '#E5E5E5', fontSize: 20 }}
                    />
                )}
            </div>
        </div>
    );
}

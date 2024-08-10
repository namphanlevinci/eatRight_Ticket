import { FormItem } from 'components/atom/Form/Item';
import React from 'react';
import { Rule } from 'antd/es/form';
import { useTheme } from 'context/themeContext';
import { SelectCustom } from '../Select';
import { SelectProps } from 'antd';
export default function SelectForm({
    label,
    name,
    placeholder,
    rule,
    required = true,
    options,
    ...props
}: {
    label: string;
    name: string;
    placeholder: string;
    rule?: Rule[];
    required?: boolean;
} & SelectProps) {
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
                                  required: true,
                              },
                          ]
                }
                required={required}
            >
                <SelectCustom
                    {...props}
                    placeholder={placeholder}
                    style={{
                        background: theme.nEUTRALBase,
                        borderRadius: 8,
                        height: 56,
                    }}
                    options={options}
                    suffixIcon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16.9425 20.9425C16.6924 21.1924 16.3534 21.3329 15.9998 21.3329C15.6463 21.3329 15.3072 21.1924 15.0571 20.9425L7.51447 13.3998C7.38713 13.2768 7.28555 13.1297 7.21567 12.967C7.14579 12.8043 7.10901 12.6294 7.10747 12.4523C7.10593 12.2753 7.13967 12.0997 7.20671 11.9359C7.27375 11.772 7.37276 11.6231 7.49795 11.4979C7.62314 11.3728 7.77201 11.2738 7.93587 11.2067C8.09973 11.1397 8.2753 11.1059 8.45234 11.1075C8.62938 11.109 8.80434 11.1458 8.96701 11.2157C9.12968 11.2855 9.27681 11.3871 9.39981 11.5145L15.9998 18.1145L22.5998 11.5145C22.8513 11.2716 23.1881 11.1372 23.5377 11.1402C23.8873 11.1433 24.2217 11.2835 24.4689 11.5307C24.7161 11.7779 24.8563 12.1123 24.8594 12.4619C24.8624 12.8115 24.728 13.1483 24.4851 13.3998L16.9425 20.9425Z"
                                fill="#4A505C"
                            />
                        </svg>
                    }
                />
            </FormItem>
        </div>
    );
}

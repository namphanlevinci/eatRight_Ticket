import Select from 'react-select';
import React, { useImperativeHandle } from 'react';

interface optionProps {
    value: string | null | undefined;
    label: string | null | undefined;
}

interface ChildProps {
    options: optionProps[];
    placeholder: string;
    onChangeOptions: (item: any) => void;
}

export interface ChildComponentRef {
    getValue: () => string | null | undefined;
}

const ChildComponent = React.forwardRef<ChildComponentRef, ChildProps>(
    ({ options, placeholder, onChangeOptions }: ChildProps, ref) => {
        const [selectedOption, setSelectedOption] = React.useState<
            optionProps | null | undefined
        >();
        const customStyles = {
            container: (provided: any) => ({
                ...provided,
                width: 154,
                marginRight: 16,
                outline: 'none',
            }),
            control: (base: any) => ({
                ...base,
                border: '1px solid #dddddd',
                boxShadow: 'none',
                background: 'transparent',
                height: 56,
            }),
            menuList: (base: any) => ({
                ...base,
                padding: 0,
                color: '#ffffff',
                fontSize: 18,
                background: 'transparent',
            }),
            menu: (base: any) => ({
                ...base,
                padding: 0,
                color: '#ffffff',
                fontSize: 18,
                background: '#333',
            }),
            singleValue: (provided: any) => ({
                ...provided,
                color: '#ffffff',
                fontSize: 18,
            }),
            option: (base: any, { isFocused }: any) => {
                return {
                    ...base,
                    backgroundColor: isFocused ? '#eeeeee' : 'transparent',
                    color: isFocused ? '#333' : '#ffffff',
                };
            },
            placeholder: (defaultStyles: any) => {
                return {
                    ...defaultStyles,
                    color: '#ffffff',
                    fontSize: 18,
                };
            },
        };

        const onChangeOption = (item: any) => {
            setSelectedOption(item);
            onChangeOptions(item);
        };

        useImperativeHandle(ref, () => ({
            getValue: () => selectedOption?.value ?? null,
        }));

        return (
            <Select
                defaultValue={selectedOption}
                onChange={(item: any) => onChangeOption(item)}
                options={options}
                placeholder={placeholder}
                styles={customStyles}
                components={{
                    IndicatorSeparator: () => null,
                }}
                isSearchable={false}
            />
        );
    },
);

ChildComponent.displayName = 'ChildComponent';

export default ChildComponent;

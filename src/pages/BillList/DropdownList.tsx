import Select from 'react-select';
import React, { useImperativeHandle } from 'react';
import { useTheme } from 'context/themeContext';

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
        const { theme } = useTheme();
        const customStyles = {
            container: (provided: any) => ({
                ...provided,
                width: 154,
                marginRight: 16,
                outline: 'none',
                color: theme.tEXTPrimary,
            }),
            control: (base: any) => ({
                ...base,
                color: theme.tEXTPrimary,
                border: `1px solid ${theme.nEUTRALLine}`,
                boxShadow: 'none',
                background: theme.nEUTRALBase,
                height: 56,
            }),
            menuList: (base: any) => ({
                ...base,
                padding: 0,
                color: theme.tEXTPrimary,
                fontSize: 18,
                background: 'transparent',
            }),
            menu: (base: any) => ({
                ...base,
                padding: 0,
                color: theme.tEXTPrimary,
                fontSize: 18,
                background: theme.nEUTRALLine,
            }),
            singleValue: (provided: any) => ({
                ...provided,
                color: theme.tEXTPrimary,
                fontSize: 18,
            }),
            option: (base: any, { isFocused }: any) => {
                return {
                    ...base,
                    backgroundColor: isFocused
                        ? theme.pRIMARY6Primary
                        : 'transparent',
                    color: isFocused ? theme.pRIMARY1 : theme.tEXTPrimary,
                };
            },
            placeholder: (defaultStyles: any) => {
                return {
                    ...defaultStyles,
                    color: theme.tEXTPrimary,
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

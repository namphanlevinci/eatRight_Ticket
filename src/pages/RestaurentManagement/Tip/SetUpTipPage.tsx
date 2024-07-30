import { useQuery } from '@apollo/client';
import { Input, Select, Switch } from 'antd';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import { GET_TIPS } from 'graphql/tips/tips';
import { RowStyled } from 'pages/BillDetail/styled';
import React, { useEffect } from 'react';
import styled from 'styled-components';

export default function SetUpTipPage() {
    const TypeList = [
        {
            value: 'percent',
            label: '% percentage',
        },
        {
            value: 'fixed',
            label: '$ dollar note',
        },
    ];
    const [isTax, setIsTax] = React.useState(false);
    const [type, setType] = React.useState(TypeList[0]);
    const handleChange = (value: { value: string; label: string }) => {
        setType(value);
    };
    const [inputValue, setInputValue] = React.useState({
        value1: '15',
        value2: '20',
        value3: '25',
    });
    const { theme } = useTheme();
    const { data } = useQuery(GET_TIPS);
    useEffect(() => {
        if (data?.tipRestaurant) {
            const tip_option = data?.tipRestaurant?.tip_option;
            const include_tax_in_tip = data?.tipRestaurant?.include_tax_in_tip;
            setIsTax(include_tax_in_tip);
            let inputList;
            if (tip_option) {
                if (type.value === 'percent') {
                    inputList = tip_option.find((item: any) => {
                        return item.type === 'percent';
                    });
                } else {
                    inputList = tip_option.find((item: any) => {
                        return item.type === 'fixed';
                    });
                }
                if (inputList?.amount_option) {
                    const object = inputList?.amount_option.reduce(
                        (
                            acc: { [x: string]: any },
                            cur: number,
                            index: number,
                        ) => {
                            acc[`value${index + 1}`] = cur.toString();
                            return acc;
                        },
                        {} as { [key: string]: string },
                    );
                    setInputValue(object);
                }
            }
        }
    }, [data, type]);
    return (
        <Container>
            <RowStyled>
                <Text>Include tax in tip</Text>
                <Switch value={isTax} onChange={(value) => setIsTax(value)} />
            </RowStyled>

            <Text style={{ marginTop: 16, marginBottom: 8 }}>
                Variable tip / Custom tip
            </Text>
            <Select
                labelInValue
                defaultValue={type}
                style={{
                    width: '100%',
                    height: 56,
                    color: theme.fieldTextIcon,
                }}
                size="large"
                onChange={handleChange}
                options={[
                    {
                        value: 'percent',
                        label: '% percent',
                    },
                    {
                        value: 'dollar',
                        label: '$ dollar note',
                    },
                ]}
            />
            <RowStyled style={{ gap: 20, marginTop: 20, marginBottom: 40 }}>
                <InputStyled
                    value={inputValue.value1}
                    onChange={(e) =>
                        setInputValue({
                            ...inputValue,
                            value1: e.target.value,
                        })
                    }
                    prefix={type.value === 'percent' ? '%' : '$'}
                />
                <InputStyled
                    value={inputValue.value2}
                    onChange={(e) =>
                        setInputValue({
                            ...inputValue,
                            value2: e.target.value,
                        })
                    }
                    prefix={type.value === 'percent' ? '%' : '$'}
                />
                <InputStyled
                    value={inputValue.value3}
                    onChange={(e) =>
                        setInputValue({
                            ...inputValue,
                            value3: e.target.value,
                        })
                    }
                    prefix={type.value === 'percent' ? '%' : '$'}
                />
            </RowStyled>
            <ButtonPrimary
                title="Save"
                onClick={() => {
                    console.log('save');
                }}
            />
        </Container>
    );
}
const getTextColor = (props: { theme: any }) => props.theme.fieldTextIcon;
const getBackgroundColor = (props: { theme: any }) =>
    props.theme.fieldBackground;
const getPrimaryColor = (props: { theme: any }) => props.theme.pRIMARY6Primary;
const InputStyled = styled(Input)`
    background: ${getBackgroundColor} !important;
    flex: 1;
    height: 56px;
    color: ${getTextColor} !important;
    text-align: center;
    .ant-input-prefix {
        width: 40%;
        justify-content: ${(props) => (props.prefix === '%' ? 'start' : 'end')};
    }
    flex-direction: ${(props) =>
        props.prefix === '%' ? 'row-reverse' : 'row'};
    .ant-input {
        text-align: ${(props) => (props.prefix !== '%' ? 'start' : 'end')};
        margin-right: 5px;
    }
`;

const Container = styled.div`
    padding-right: 36px;
    .ant-switch-checked {
        background: ${getPrimaryColor} !important;
    }
    .ant-switch.ant-switch-checked .ant-switch-handle {
        inset-inline-start: calc(100% - 20px);
    }
    && .ant-select-selector {
        background: ${getBackgroundColor};
        border-radius: 8px;
        border: none;
        color: ${getTextColor};
        overflow: hidden;
    }
    .ant-select-arrow {
        color: ${getTextColor} !important;
    }
    .ant-select-selection-item {
        color: ${getTextColor} !important;
    }
`;

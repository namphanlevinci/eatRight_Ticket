import { Input, Select, Switch } from 'antd';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import { RowStyled } from 'pages/BillDetail/styled';
import React from 'react';
import styled from 'styled-components';
import { Colors } from 'themes/colors';

export default function SetUpTipPage() {
    const TypeList = [
        {
            value: 'percentage',
            label: '% percentage',
        },
        {
            value: 'dollar',
            label: '$ dollar note',
        },
    ];
    const [isTax, setIsTax] = React.useState(true);
    const [type, setType] = React.useState(TypeList[0]);
    const handleChange = (value: { value: string; label: string }) => {
        setType(value);
    };
    const [inputValue, setInputValue] = React.useState({
        value1: '15',
        value2: '20',
        value3: '25',
    });
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
                style={{ width: '100%', height: 56, color: Colors.white }}
                size="large"
                onChange={handleChange}
                options={[
                    {
                        value: 'percentage',
                        label: '% percentage',
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
                    prefix={type.value === 'percentage' ? '%' : '$'}
                />
                <InputStyled
                    value={inputValue.value2}
                    onChange={(e) =>
                        setInputValue({
                            ...inputValue,
                            value2: e.target.value,
                        })
                    }
                    prefix={type.value === 'percentage' ? '%' : '$'}
                />
                <InputStyled
                    value={inputValue.value3}
                    onChange={(e) =>
                        setInputValue({
                            ...inputValue,
                            value3: e.target.value,
                        })
                    }
                    prefix={type.value === 'percentage' ? '%' : '$'}
                />
            </RowStyled>
            <ButtonPrimary
                title="Save"
                onClick={() => {
                    console.log('save');
                }}
                backgroundColor="#CC7D00"
            />
        </Container>
    );
}

const InputStyled = styled(Input)`
    background: #161b26 !important;
    flex: 1;
    height: 56px;
    color: ${Colors.white} !important;
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
        background: ${Colors.primary} !important;
    }
    .ant-switch.ant-switch-checked .ant-switch-handle {
        inset-inline-start: calc(100% - 20px);
    }
    && .ant-select-selector {
        background: #161b26;
        border-radius: 8px;
        border: none;
        color: ${Colors.white};
        overflow: hidden;
    }
    .ant-select-arrow {
        color: ${Colors.white};
    }
    .ant-select-selection-item {
        color: ${Colors.white} !important;
    }
`;

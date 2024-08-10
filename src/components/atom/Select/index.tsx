import { SelectProps, Select } from 'antd';
import { useTheme } from 'context/themeContext';
import styled from 'styled-components';
const getTextColor = (props: { theme: any }) => props.theme.fieldTextIcon;
const getBackgroundColor = (props: { theme: any }) => props.theme.nEUTRALBase;
export const SelectStyled = styled(Select)`
    &::placeholder {
        color: #808080;
        opacity: 1;
        font-size: 14px;
    }
    background: ${getBackgroundColor};
    border: 0px;
    height: 56px;
    color: ${getTextColor};
    .ant-select-selector {
        background: ${getBackgroundColor} !important;
        border: 0px !important;
    }
`;

export const SelectCustom = (props: SelectProps) => {
    const { theme } = useTheme();

    return (
        <SelectStyled theme={theme} {...props}>
            {props.children}
        </SelectStyled>
    );
};

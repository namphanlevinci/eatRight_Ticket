import { Input, InputProps } from 'antd';
import { useTheme } from 'context/themeContext';
import styled from 'styled-components';
const getTextColor = (props: { theme: any }) => props.theme.fieldTextIcon;
const getBackgroundColor = (props: { theme: any }) =>
    props.theme.fieldBackground;
export const DarkInputDefault = styled(Input)`
    &::placeholder {
        color: #808080;
        opacity: 1;
        font-size: 14px;
    }
    background: ${getBackgroundColor};
    border: 0px;
    height: 50px;
    color: ${getTextColor};
`;
export const DarkInput = (props: InputProps) => {
    const { theme } = useTheme();

    return (
        <DarkInputDefault theme={theme} {...props}>
            {props.children}
        </DarkInputDefault>
    );
};

import { Form } from 'antd';
import styled from 'styled-components';
const getTextColor = (props: { theme: any }) => props.theme.fieldTextIcon;
export const FormItem = styled(Form.Item)`
    label {
        color: ${getTextColor} !important;
        font-size: 16px !important;
    }
    margin-bottom: 12px;
`;

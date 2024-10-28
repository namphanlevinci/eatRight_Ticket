import { Form } from 'antd';
import styled from 'styled-components';
const getTextColor = (props: { theme: any }) => props.theme.fieldTextIcon;
export const FormItem = styled(Form.Item)`
    label {
        color: ${getTextColor} !important;
        font-size: 16px !important;
        font-weight: 600;
    }
    .ant-form-item-required {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        margin-inline-end: 0px;
    }
    label.ant-form-item-required::after {
        margin-inline-end: 0px;
    }
    margin-bottom: 12px;
`;

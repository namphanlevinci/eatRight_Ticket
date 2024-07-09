import { Col, Switch } from 'antd';
import styled from 'styled-components';

export const ColStyled = styled(Col)`
    @media (max-width: 768px) {
        width: 100% !important;
        align-items: center;
    }
`;

export const SwitchStyled = styled(Switch)`
    .ant-switch-handle {
        width: 48px;
        height: 46px;
    }
    .ant-switch-handle::before {
        background: #ff9d00;
    }
`;

import { Input } from 'antd';
import styled from 'styled-components';

export const DarkInput = styled(Input)`
    &::placeholder {
        color: #808080;
        opacity: 1;
        font-size: 14px;
    }
    background: #191919;
    border: 0px;
    height: 50px;
    color: #fff;
`;

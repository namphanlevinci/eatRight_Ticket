import { Popover } from 'antd';
import styled from 'styled-components';

export const CustomPopover = styled(Popover)`
    .ant-popover-inner {
        background-color: #4b3718 !important;
    }
    background-color: #4b3718 !important;
`;

export const NotiTitle = styled.div`
    font-weight: 700;
    font-size: 22px;
    color: #cc7d00;
`;

export const NotificationItem = styled.div`
    padding: 20px;
    padding-left: 8px;
    display: flex;
    cursor: pointer;
    border-bottom: 1px solid #ffca75;
    align-items: flex-start;
`;

export const AnnaBellStyle = styled.div`
    height: 40px;
    width: 60px;
    border-radius: 3000px;
    background-color: #cc7d00;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-right: 10px;
`;

export const SwitchContainer = styled.div`
    .ant-switch-handle {
        height: 26px;
        width: 26px;
        border-radius: 100px;
        overflow: hidden;
    }
    .ant-switch-checked {
        .ant-switch-handle {
            inset-inline-start: calc(100% - 30px);
        }
    }
`;

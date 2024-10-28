import React from 'react';
import TerminalSetupPage from './TerminalSetupPage';
import { Collapse } from 'antd';
import styled from 'styled-components';
import NonCashAdjustment from './NonCashAdjustment';

export default function index() {
    return (
        <Container>
            <Collapse
                items={[
                    {
                        key: '1',
                        label: 'Payment Terminal',
                        children: <TerminalSetupPage />,
                    },
                ]}
                ghost
            />
            <div style={{ height: 24 }} />
            <Collapse
                items={[
                    {
                        key: '2',
                        label: 'Non-Cash Adjustment',
                        children: <NonCashAdjustment />,
                    },
                ]}
                ghost
            />
        </Container>
    );
}

const Container = styled.div`
    padding-inline: 16px;
    .ant-collapse-header-text {
        font-size: 18px;
        font-weight: 600;
    }
    .ant-collapse-header {
        flex-direction: row-reverse;
    }
    .ant-collapse-content-active {
        background-color: transparent;
        border: none;
    }
    .ant-collapse {
        border: none;
        background-color: transparent;
    }
`;

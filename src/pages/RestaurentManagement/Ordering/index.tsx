import { Collapse } from 'antd';
import styled from 'styled-components';
import TableOrdering from './TableOrdering';

export default function OrderingPage() {
    return (
        <Container>
            <Collapse
                items={[
                    {
                        key: '1',
                        label: 'Table Ordering',
                        children: <TableOrdering />,
                    },
                ]}
                ghost
                defaultActiveKey={['1']}
            />
            <div style={{ height: 24 }} />
        </Container>
    );
}

const Container = styled.div`
    padding-inline: 16px;
    .ant-collapse {
        max-width: 600px;
    }
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

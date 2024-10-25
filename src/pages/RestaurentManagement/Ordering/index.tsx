import styled from 'styled-components';
import TableOrdering from './TableOrdering';
import { Text } from 'components/atom/Text';
import AutoCloseOrder from './AutoCloseOrder';

export default function OrderingPage() {
    return (
        <Container>
            <Text style={{ fontSize: 24, fontWeight: '600' }}>
                Ordering Setting
            </Text>
            <Divider />
            <TableOrdering />
            <Divider />
            <AutoCloseOrder />
        </Container>
    );
}

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #a0cff2;
    margin-top: 20px;
    margin-bottom: 20px;
`;
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

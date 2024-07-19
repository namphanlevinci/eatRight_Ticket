import { Layout } from 'antd';
import ArrowLeftIcon from 'assets/icons/arrowLeft';
import { Text } from 'components/atom/Text';
import { useNavigate } from 'react-router';

export const RenderHeader = () => {
    const { Header } = Layout;
    const navigation = useNavigate();
    return (
        <Header
            style={{
                height: '56',
                display: 'flex',
                alignItems: 'center',
                background: 'transparent',
                justifyContent: 'flex-start',
                paddingInline: 0,
            }}
        >
            <div
                onClick={() => navigation(-1)}
                style={{ display: 'flex ', alignItems: 'center' }}
            >
                <ArrowLeftIcon />
            </div>
            <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 20 }}>
                Payment
            </Text>
        </Header>
    );
};

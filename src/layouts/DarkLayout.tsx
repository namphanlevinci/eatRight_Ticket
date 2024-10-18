import { useTheme } from 'context/themeContext';
import Header from './Header';
import { Layout } from 'antd';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import HeaderV2 from './Header_v2';

type Props = {
    children: React.ReactNode;
    isFooter?: boolean;
};

export const DarkLayout = ({ children, isFooter = true }: Props) => {
    const { theme } = useTheme();
    const { isMerchant } = useSelector((state: RootState) => state.auth);
    return (
        <Layout
            style={{
                backgroundColor: theme.nEUTRALPrimary,
                minHeight: '100vh',
                paddingTop: 64,
                paddingBottom: !isFooter ? 0 : 100,
            }}
        >
            {isMerchant ? <HeaderV2 /> : <Header />}
            <div style={{ width: '100%' }}>{children}</div>
            {isFooter && <Footer />}
        </Layout>
    );
};

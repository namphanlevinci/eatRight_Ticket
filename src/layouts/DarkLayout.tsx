import { useTheme } from 'context/themeContext';
import Header from './Header';
import { Layout } from 'antd';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import HeaderV2 from './Header_v2';
import { useMemo } from 'react';
import { useLocation } from 'react-router';

type Props = {
    children: React.ReactNode;
};

export const DarkLayout = ({ children }: Props) => {
    const { theme } = useTheme();
    const location = useLocation();
    const { isMerchant, isTableView } = useSelector(
        (state: RootState) => state.auth,
    );

    const isHomePage = useMemo(() => location.pathname === '/', []);

    return (
        <Layout
            style={{
                backgroundColor: theme.nEUTRALPrimary,
                minHeight: '100vh',
                paddingTop: 64,
                paddingBottom: 100,
            }}
        >
            {isMerchant && isTableView && isHomePage ? (
                <HeaderV2 />
            ) : (
                <Header />
            )}
            <div style={{ width: '100%' }}>{children}</div>
            <Footer />
        </Layout>
    );
};

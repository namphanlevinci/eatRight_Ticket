import { DarkLayout } from './DarkLayout';
import { Col, Layout, Row } from 'antd';
import { RestaurentManageButton } from 'components/atom/Button/RestaurentManageButton';
import { Text } from 'components/atom/Text';
import { BASE_ROUTER } from 'constants/router';
import SearchTable from 'pages/Home/components/Search';
import React from 'react';
import { useLocation } from 'react-router';
import { Colors } from 'themes/colors';

type Props = {
    children: React.ReactNode;
};

export default function RestaurentManagementLayout(props: Props) {
    const { children } = props;
    const location = useLocation();

    return (
        <DarkLayout>
            {/* <Text>Restaurant management</Text> */}
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 20,
                }}
            >
                <Layout
                    style={{
                        background: 'rgba(31, 36, 47, 1)',
                        maxWidth: 673,
                        minHeight: '80vh',
                        borderRadius: 8,
                        boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.08)',
                    }}
                >
                    <Row style={{ marginTop: 36 }}>
                        <Col style={{ width: 260 }}>
                            <div
                                style={{
                                    minHeight: 300,
                                }}
                            >
                                <SearchTable />
                                <RestaurentManageButton
                                    title="Profile"
                                    isSelected={
                                        location.pathname ===
                                        BASE_ROUTER.SETTINGS
                                    }
                                />
                                <RestaurentManageButton
                                    title="Password & PIN"
                                    isSelected={
                                        location.pathname ===
                                        BASE_ROUTER.SETTINGS_PASSWORD
                                    }
                                    to={BASE_ROUTER.SETTINGS_PASSWORD}
                                />
                            </div>
                            <Text>App settings</Text>
                            {/* <SettingButton title="Status" />
                        <SettingButton title="Printers" />
                        <SettingButton title="Status" /> */}
                        </Col>
                        <Col style={{ paddingLeft: 30, flex: 1 }}>
                            {children}
                        </Col>
                    </Row>
                </Layout>
            </div>
        </DarkLayout>
    );
}

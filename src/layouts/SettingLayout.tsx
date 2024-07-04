import { DarkLayout } from './DarkLayout';
import { Col, Layout, Modal, Row } from 'antd';
import { SettingButton } from 'components/atom/Button/SettingButton';
import { Text } from 'components/atom/Text';
import { BASE_ROUTER } from 'constants/router';
import { updateStatusLogout } from 'features/auth/authSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Colors } from 'themes/colors';

type Props = {
    children: React.ReactNode;
};

const config = {
    title: 'Are you sure to logout ?',
    content: <></>,
    centered: true,
};
export default function SettingLayout(props: Props) {
    const { children } = props;
    const location = useLocation();
    const [modal, contextHolder] = Modal.useModal();
    const dispatch = useDispatch();
    return (
        <DarkLayout>
            {contextHolder}
            <Layout style={{ background: Colors.black, padding: 16 }}>
                <Text style={{ fontSize: 24 }}>Settings</Text>

                <Row style={{ marginTop: 36 }}>
                    <Col style={{ width: 260 }}>
                        <div
                            style={{
                                minHeight: 300,
                            }}
                        >
                            <Text>Account settings</Text>
                            <SettingButton
                                title="Profile"
                                isSelected={
                                    location.pathname === BASE_ROUTER.SETTINGS
                                }
                            />
                            <SettingButton
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
                        <SettingButton
                            title="Printers"
                            isSelected={
                                location.pathname ===
                                BASE_ROUTER.SETTINGS_PRINTER
                            }
                            to={BASE_ROUTER.SETTINGS_PRINTER}
                        />
                        <SettingButton
                            title="Logout"
                            isWarning
                            onClick={async () => {
                                const confirmed = await modal.confirm(config);
                                if (confirmed) {
                                    dispatch(updateStatusLogout());
                                }
                            }}
                        />
                    </Col>
                    <Col style={{ paddingLeft: 30, flex: 1 }}>{children}</Col>
                </Row>
            </Layout>
        </DarkLayout>
    );
}

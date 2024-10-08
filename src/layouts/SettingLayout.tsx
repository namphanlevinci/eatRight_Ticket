import { DarkLayout } from './DarkLayout';
import { Col, Layout, Modal, Row } from 'antd';
import { SettingButton } from 'components/atom/Button/SettingButton';
import { Text } from 'components/atom/Text';
import { BASE_ROUTER } from 'constants/router';
import { useTheme } from 'context/themeContext';
import { updateStatusLogout } from 'features/auth/authSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router';

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
    const { theme } = useTheme();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isSelected = location.pathname.includes('/settings/');
    return (
        <DarkLayout>
            {contextHolder}
            <Layout style={{ background: theme.nEUTRALPrimary, padding: 16 }}>
                <Row style={{ marginTop: 36 }}>
                    {isSelected && isMobile ? (
                        <></>
                    ) : (
                        <Col style={{ width: isMobile ? '100%' : 260 }}>
                            <div
                                style={{
                                    minHeight: 300,
                                }}
                            >
                                <Text>Account settings</Text>
                                <SettingButton
                                    title="Profile"
                                    isSelected={
                                        location.pathname ===
                                        BASE_ROUTER.SETTINGS_PROFILE
                                    }
                                    to={BASE_ROUTER.SETTINGS_PROFILE}
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
                                    const confirmed =
                                        await modal.confirm(config);
                                    if (confirmed) {
                                        dispatch(updateStatusLogout());
                                    }
                                }}
                            />
                        </Col>
                    )}
                    {(isSelected || !isMobile) && (
                        <Col
                            style={{ paddingLeft: isMobile ? 0 : 30, flex: 1 }}
                        >
                            {children}
                        </Col>
                    )}
                </Row>
            </Layout>
        </DarkLayout>
    );
}

export const ArrawLeftIcon = () => {
    const { theme } = useTheme();
    return (
        <svg
            width="23"
            height="19"
            viewBox="0 0 23 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="Iconly/Light-Outline/Arrow---Left">
                <g id="Arrow---Left">
                    <path
                        id="Combined-Shape"
                        d="M22.6667 9.36581C22.6667 9.87207 22.2905 10.2905 21.8024 10.3567L21.6667 10.3658L4.088 10.365L10.4386 16.6897C10.83 17.0794 10.8314 17.7126 10.4417 18.1039C10.0874 18.4597 9.53195 18.4932 9.13985 18.2036L9.02748 18.107L0.960815 10.075C0.909227 10.0236 0.86442 9.96801 0.826389 9.9093C0.815649 9.89163 0.804714 9.87355 0.79435 9.85511C0.784815 9.83931 0.776199 9.82289 0.76807 9.8063C0.756783 9.78215 0.745752 9.7572 0.735737 9.73175C0.7276 9.71212 0.720806 9.69304 0.714609 9.6738C0.707241 9.64994 0.700083 9.62451 0.693926 9.5987C0.689348 9.58068 0.685722 9.56333 0.68256 9.54592C0.678114 9.52001 0.674328 9.4932 0.671627 9.46607C0.669296 9.44538 0.667892 9.42488 0.667116 9.40436C0.666916 9.39192 0.666664 9.37889 0.666664 9.36581L0.667164 9.32707C0.667931 9.30744 0.669271 9.28783 0.671188 9.26827L0.666664 9.36581C0.666664 9.3027 0.672508 9.24096 0.683687 9.1811C0.686279 9.1668 0.689369 9.15213 0.692789 9.13751C0.699892 9.10741 0.708101 9.07842 0.717554 9.05C0.722193 9.03588 0.727598 9.02079 0.733376 9.00582C0.74506 8.97573 0.757763 8.94704 0.771736 8.9191C0.778227 8.90597 0.785498 8.89221 0.79311 8.8786C0.805607 8.85639 0.818481 8.83528 0.832094 8.8147C0.8417 8.80014 0.852335 8.78499 0.863441 8.77007L0.872095 8.75855C0.899036 8.72335 0.928265 8.68999 0.959557 8.6587L0.960756 8.65777L9.02742 0.624439C9.41875 0.234724 10.0519 0.236035 10.4416 0.627367C10.7959 0.983123 10.827 1.53874 10.5358 1.92962L10.4387 2.04158L4.09066 8.36501L21.6667 8.36581C22.2189 8.36581 22.6667 8.81352 22.6667 9.36581Z"
                        fill={theme.pRIMARY6Primary}
                    />
                </g>
            </g>
        </svg>
    );
};

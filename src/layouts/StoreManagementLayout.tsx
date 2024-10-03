import { DarkLayout } from './DarkLayout';
import { Col, Layout, Row } from 'antd';
import { RestaurentManageButton } from 'components/atom/Button/RestaurentManageButton';
import { BASE_ROUTER } from 'constants/router';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import SearchSettings from './components/Search';
// import GeneralIcon from './icons/Restaurent/general_icon';
// import LocationIcon from './icons/Restaurent/locationIcon';
// import OpeningHoursIcon from './icons/Restaurent/openingHoursIcon';
import TipIcon from './icons/tipIcon';
import { useTheme } from 'context/themeContext';
import KitchenStationIcon from './icons/Restaurent/kitchen_station_icon';
import { Link } from 'react-router-dom';
import { ArrawLeftIcon } from './SettingLayout';
import { Text } from 'components/atom/Text';
import PaymentIcon from './icons/Restaurent/payment_icon';
import GeneralIcon from './icons/Restaurent/general_icon';

type Props = {
    children: React.ReactNode;
};

export default function RestaurentManagementLayout(props: Props) {
    const { children } = props;
    const location = useLocation();
    const paths = [
        {
            title: 'General',
            path: BASE_ROUTER.RESTAURENT_MANAGER,
            icon: (
                <GeneralIcon
                    isSelected={
                        location.pathname === BASE_ROUTER.RESTAURENT_MANAGER
                    }
                />
            ),
        },
        // {
        //     title: 'Location',
        //     path: BASE_ROUTER.RESTAURENT_Location,
        //     icon: (
        //         <LocationIcon
        //             isSelected={
        //                 location.pathname === BASE_ROUTER.RESTAURENT_Location
        //             }
        //         />
        //     ),
        // },
        // {
        //     title: 'Opening Hours',
        //     path: BASE_ROUTER.RESTAURENT_Opening,
        //     icon: (
        //         <OpeningHoursIcon
        //             isSelected={
        //                 location.pathname === BASE_ROUTER.RESTAURENT_Opening
        //             }
        //         />
        //     ),
        // },
        // {
        //     title: 'Reservation',
        //     path: BASE_ROUTER.RESTAURENT_RESERVATION,
        //     icon: (
        //         <ReservationIcon
        //             isSelected={
        //                 location.pathname === BASE_ROUTER.RESTAURENT_RESERVATION
        //             }
        //         />
        //     ),
        // },
        {
            title: 'Kitchen Station',
            path: BASE_ROUTER.RESTAURENT_KITCHEN_STATION,
            icon: (
                <KitchenStationIcon
                    isSelected={
                        location.pathname ===
                        BASE_ROUTER.RESTAURENT_KITCHEN_STATION
                    }
                />
            ),
        },
        {
            title: 'Tip',
            path: BASE_ROUTER.RESTAURENT_Tip,
            icon: (
                <TipIcon
                    isSelected={
                        location.pathname === BASE_ROUTER.RESTAURENT_Tip
                    }
                />
            ),
        },
        {
            title: 'Payment',
            path: BASE_ROUTER.RESTAURENT_TERMINAL,
            icon: (
                <PaymentIcon
                    isSelected={
                        location.pathname === BASE_ROUTER.RESTAURENT_TERMINAL
                    }
                />
            ),
        },
    ];
    const { theme } = useTheme();
    const navigation = useNavigate();
    const Breadcrumb = () => {
        const isSelected = location.pathname.includes('/restaurent/');
        const array = location.pathname.split('/');

        return (
            <Row style={{ padding: '0 20px', gap: 16, alignItems: 'center' }}>
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        navigation(-1);
                    }}
                >
                    <ArrawLeftIcon />
                </div>
                {isSelected && (
                    <Link to={BASE_ROUTER.RESTAURENT_MANAGER}>
                        <Row align={'middle'} style={{ gap: 16 }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: theme.pRIMARY6Primary,
                                }}
                            >
                                Settings
                            </Text>
                        </Row>
                    </Link>
                )}
                {array.map((path, index) => {
                    return index > 1 ? (
                        <Link to={array.slice(0, index + 1).join('/')}>
                            <Row
                                key={index}
                                style={{ gap: 10, marginLeft: 10 }}
                            >
                                <Text>/</Text>{' '}
                                <Text
                                    style={{
                                        color:
                                            array.length - 1 > index
                                                ? theme.pRIMARY6Primary
                                                : theme.tEXTPrimary,
                                    }}
                                >
                                    {NameObject[array[index]]}
                                </Text>
                            </Row>
                        </Link>
                    ) : (
                        <></>
                    );
                })}
            </Row>
        );
    };
    return (
        <DarkLayout>
            {/* <Text>Restaurant management</Text> */}
            <Breadcrumb />
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 20,
                    padding: '0 20px',
                }}
            >
                <Layout
                    style={{
                        maxWidth: '100%',
                        minHeight: '80vh',
                    }}
                >
                    <Row
                        style={{
                            marginTop: 36,
                            height: '100%',
                            paddingBottom: 20,
                        }}
                    >
                        <Col
                            style={{
                                width: 260,
                                height: '100%',
                            }}
                        >
                            <div
                                style={{
                                    height: '100%',
                                }}
                            >
                                <SearchSettings />
                                <div style={{ marginTop: 20 }} />
                                {paths.map((item, index) => (
                                    <RestaurentManageButton
                                        key={index}
                                        title={item.title}
                                        isSelected={
                                            location.pathname === item.path
                                        }
                                        icon={item.icon}
                                        to={item.path}
                                    />
                                ))}
                            </div>
                        </Col>
                        <Col
                            style={{
                                padding: 20,
                                flex: 1,
                                background: theme.pRIMARY1,
                                border: `1px solid ${theme.pRIMARY2}`,
                                borderRadius: 8,
                                boxShadow:
                                    '0px 4px 8px 0px rgba(0, 0, 0, 0.08)',
                            }}
                        >
                            {children}
                        </Col>
                    </Row>
                </Layout>
            </div>
        </DarkLayout>
    );
}

const NameObject: any = {
    kitchenStation: 'Kitchen Station',
    Detail: 'Detail',
    tip: 'Tip',
    reservation: 'Reservation',
};

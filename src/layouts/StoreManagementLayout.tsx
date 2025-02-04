import { DarkLayout } from './DarkLayout';
import { Col, Layout, Row } from 'antd';
import { RestaurentManageButton } from 'components/atom/Button/RestaurentManageButton';
import { BASE_ROUTER } from 'constants/router';
import React from 'react';
import { useLocation } from 'react-router';
import SearchSettings from './components/Search';
// import GeneralIcon from './icons/Restaurent/general_icon';
// import LocationIcon from './icons/Restaurent/locationIcon';
// import OpeningHoursIcon from './icons/Restaurent/openingHoursIcon';
import TipIcon from './icons/tipIcon';
import { useTheme } from 'context/themeContext';
import KitchenStationIcon from './icons/Restaurent/kitchen_station_icon';

import PaymentIcon from './icons/Restaurent/payment_icon';
import GeneralIcon from './icons/Restaurent/general_icon';
import OrderingIcon from './icons/Restaurent/orderingIcon';

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
        {
            title: 'Ordering',
            path: BASE_ROUTER.RESTAURENT_ORDERING,
            icon: (
                <OrderingIcon
                    isSelected={
                        location.pathname === BASE_ROUTER.RESTAURENT_ORDERING
                    }
                />
            ),
        },
    ];
    const { theme } = useTheme();

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

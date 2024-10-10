import { Col, Layout, Row } from 'antd';
import AvatarUpdate from 'components/atom/Avartar';
import { ButtonSelect } from 'components/atom/Button/ButtonSelect';
import Header from 'components/atom/Header/header';
import { Text } from 'components/atom/Text';
import { BASE_ROUTER } from 'constants/router';
import React from 'react';
import CustomerGeneral from './components/CustomerGeneral';
import CustomerOrder from './components/CustomerOrder';
import { useMediaQuery } from 'react-responsive';

export default function CustomerDetail() {
    const [selected, setSelected] = React.useState('General');
    const [customerInfo, setCustomerInfo] = React.useState({
        name: '',
        status: 0,
        group_id: 0,
    });
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return (
        <Layout
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                background: 'transparent',
                gap: 20,
                padding: 20,
            }}
        >
            <Row style={isMobile ? { flexDirection: 'column' } : {}}>
                <Col style={{ width: 260 }}>
                    <Row>
                        <Col>
                            <AvatarUpdate />
                        </Col>
                        <Col
                            style={{
                                marginLeft: 20,
                                justifyContent: 'space-between',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Text style={{ fontSize: 17, fontWeight: '600' }}>
                                {customerInfo.name}
                            </Text>

                            <Text
                                style={{
                                    fontSize: 15,
                                }}
                            >
                                Group {customerInfo.group_id}
                            </Text>
                            <Text>
                                {customerInfo.status ? 'Active' : 'Inactive'}
                            </Text>
                        </Col>
                    </Row>
                    <ButtonSelect
                        title="General"
                        isSelected={selected === 'General'}
                        onClick={() => setSelected('General')}
                    />
                    <ButtonSelect
                        title="Orders & Reservations"
                        // isSelected={selected === 'Orders & Reservations'}
                        // onClick={() => setSelected('Orders & Reservations')}
                    />
                </Col>
                <Col style={{ flex: 1, paddingLeft: 20 }}>
                    {selected === 'General' && (
                        <CustomerGeneral setCustomerInfo={setCustomerInfo} />
                    )}
                    {selected === 'Orders & Reservations' && <CustomerOrder />}
                </Col>
            </Row>
        </Layout>
    );
}

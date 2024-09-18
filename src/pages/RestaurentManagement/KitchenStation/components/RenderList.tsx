import { useLazyQuery } from '@apollo/client';
import { Col, Row, Spin } from 'antd';
import { Text } from 'components/atom/Text';
import { BASE_ROUTER } from 'constants/router';
import { GET_LIST_KITCHEN_STATION } from 'containers/Kitchen/printer';
import { useTheme } from 'context/themeContext';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
type PrinterInfo = {
    id: string;
    restaurant_id: number;
    name: string;
    printer_id: number;
};
export default function RenderList() {
    const [onGetList, { loading, data }] = useLazyQuery(
        GET_LIST_KITCHEN_STATION,
    );

    useEffect(() => {
        onGetList({
            fetchPolicy: 'no-cache',
        });
    }, []);
    const { theme } = useTheme();
    const navigation = useNavigate();
    const goDetail = (printer: PrinterInfo) => {
        navigation(
            `${BASE_ROUTER.RESTAURENT_KITCHEN_STATION_DETAIL}?id=${printer.id}&name=${printer.name}&printer_id=${printer.printer_id}`,
        );
    };
    return (
        <>
            <Row>
                <Col span={12}>
                    <Text style={{ fontSize: 17, fontWeight: '700' }}>
                        Station name
                    </Text>
                </Col>
                <Col span={12}>
                    <Text style={{ fontSize: 17, fontWeight: '700' }}>
                        Linked Printer
                    </Text>
                </Col>
            </Row>
            {loading ? (
                <Spin />
            ) : (
                data?.getKitchenStations?.map(
                    (item: PrinterInfo, index: number) => (
                        <Row
                            key={index}
                            style={{ marginTop: 16, cursor: 'pointer' }}
                            onClick={() => {
                                goDetail(item);
                            }}
                        >
                            <Col span={12}>
                                <Text
                                    style={{
                                        color: theme.pRIMARY6Primary,
                                        fontWeight: '600',
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </Col>
                            <Col span={12}>
                                <Text>{item.printer_id}</Text>
                            </Col>
                        </Row>
                    ),
                )
            )}
        </>
    );
}

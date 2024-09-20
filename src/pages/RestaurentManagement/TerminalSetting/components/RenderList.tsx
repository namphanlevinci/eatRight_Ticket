import { useLazyQuery } from '@apollo/client';
import { Col, Row, Spin } from 'antd';
import { Text } from 'components/atom/Text';
import { BASE_ROUTER } from 'constants/router';
import { GET_TERMINALS_LIST } from 'graphql/Terminal';
import { useTheme } from 'context/themeContext';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
type PosTerminal = {
    entity_id: string;

    name: string;
    status: boolean;
};
export default function RenderList() {
    const [onGetList, { loading, data }] = useLazyQuery(GET_TERMINALS_LIST);

    useEffect(() => {
        onGetList({
            fetchPolicy: 'no-cache',
        });
    }, []);
    const { theme } = useTheme();
    const navigation = useNavigate();
    const goDetail = (pos: PosTerminal) => {
        navigation(
            `${BASE_ROUTER.RESTAURENT_TERMINAL_DETAIL}?id=${pos.entity_id}`,
        );
    };
    return (
        <>
            <Row>
                <Col span={16}>
                    <Text style={{ fontSize: 17, fontWeight: '700' }}>
                        Payment Terminals
                    </Text>
                </Col>
            </Row>
            {loading ? (
                <Spin />
            ) : (
                data?.getPosDevices?.items?.map(
                    (item: PosTerminal, index: number) => (
                        <Row
                            key={index}
                            style={{ marginTop: 16, cursor: 'pointer' }}
                            onClick={() => {
                                goDetail(item);
                            }}
                        >
                            <Col span={16}>
                                <Text
                                    style={{
                                        color: theme.pRIMARY6Primary,
                                        fontWeight: '600',
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </Col>
                        </Row>
                    ),
                )
            )}
        </>
    );
}

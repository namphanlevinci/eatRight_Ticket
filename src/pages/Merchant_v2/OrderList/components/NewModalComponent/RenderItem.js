import { Col, Row } from 'antd';
import Tag from '../Tag';
import React from 'react';
import { capitalizeFirstLetter } from 'utils/renderText';

export default function RenderItem({ item }) {
    return (
        <Row style={{ gap: 10, marginBottom: 16 }}>
            <Col style={{ minWidth: 40 }}>
                <Tag
                    type={item?.serving_status}
                    title={capitalizeFirstLetter(item?.serving_status || 'new')}
                />
            </Col>
            <Col style={{ minWidth: 40 }}>{item?.qty}x</Col>
            <Col style={{ flex: 1 }}>{item?.name}</Col>
            <Col style={{ minWidth: 80 }}>${item?.price?.toFixed(2)}</Col>
            <Col style={{ minWidth: 80 }}>
                ${(item?.price * item?.qty)?.toFixed(2)}
            </Col>
        </Row>
    );
}

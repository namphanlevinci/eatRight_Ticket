import { Col, Row } from 'antd';
import Tag from '../Tag';
import React from 'react';
import { capitalizeFirstLetter } from 'utils/renderText';

export default function RenderItemDining({ item }) {
    return (
        <Row style={{ gap: 10, marginBottom: 16 }}>
            <Col style={{ minWidth: 40 }}>
                <Tag
                    type={item?.status || 'new'}
                    title={capitalizeFirstLetter(item?.status || 'new')}
                />
            </Col>
            <Col style={{ minWidth: 40 }}>{item?.quantity}x</Col>
            <Col style={{ flex: 1 }}>{item?.product?.name}</Col>
            <Col style={{ minWidth: 80 }}>
                ${item?.prices?.price?.value?.toFixed(2)}
            </Col>
            <Col style={{ minWidth: 80 }}>
                ${(item?.prices?.price?.value * item?.quantity)?.toFixed(2)}
            </Col>
        </Row>
    );
}

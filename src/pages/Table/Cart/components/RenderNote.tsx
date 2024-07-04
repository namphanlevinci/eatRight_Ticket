import { Col, Row } from 'antd';
import { Text } from 'components/atom/Text';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Colors } from 'themes/colors';

export default function RenderNote({ note }: { note: string }) {
    const ismobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    return (
        <Row
            style={{
                height: 40,
            }}
            align={'middle'}
            justify={'space-between'}
        >
            <Col
                md={{
                    span: 14,
                }}
                xs={{
                    span: 24,
                }}
                style={{
                    paddingLeft: ismobile ? 0 : 100,
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        color: Colors.blueInfo,
                    }}
                >
                    {' '}
                    ● Note: {note}
                </Text>
            </Col>
            <Col
                md={{
                    span: 10,
                }}
                xs={{
                    span: 24,
                }}
                style={{
                    paddingRight: ismobile ? 0 : 116,
                }}
            >
                {''}
            </Col>
        </Row>
    );
}

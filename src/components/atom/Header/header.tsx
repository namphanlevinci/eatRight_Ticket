import { Row } from 'antd';
import { useTheme } from 'context/themeContext';
import { ArrawLeftIcon } from 'layouts/SettingLayout';
import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../Text';

export default function Header({
    rootUrl,
    rootTitle,
    title,
}: {
    rootUrl: string;
    rootTitle: string;
    title: string;
}) {
    const { theme } = useTheme();
    return (
        <Row style={{ gap: 20 }}>
            <Link to={rootUrl}>
                <Row align={'middle'} style={{ gap: 16 }}>
                    <ArrawLeftIcon />
                    <Text
                        style={{
                            fontSize: 16,
                            color: theme.pRIMARY6Primary,
                        }}
                    >
                        {rootTitle}
                    </Text>
                </Row>
            </Link>
            <Text>/</Text>
            <Text>{title}</Text>
        </Row>
    );
}

import { notification, Switch, Tooltip } from 'antd';
import { Text } from 'components/atom/Text';
import { RowStyled } from 'pages/BillDetail/styled';
import React, { useEffect } from 'react';
import QuestionIcon from 'assets/icons/questionIcon';

export default function RestaurentGeneralPage() {
    const [isTableView, setIsTableView] = React.useState(false);
    const [isOpenPrice, setOpenPrice] = React.useState(false);

    useEffect(() => {
        setIsTableView(
            JSON.parse(localStorage.getItem('isTableView') || 'false'),
        );
    }, []);

    const handleSetDefaultTableView = (value: boolean) => {
        setIsTableView(value);
        notification.success({
            message: 'Success',
            description: 'Set default table view successfully',
        });

        localStorage.setItem('isTableView', JSON.stringify(value));
    };

    const handleSetOpenPrice = (value: boolean) => {
        setOpenPrice(value);
        localStorage.setItem('isOpenPrice', JSON.stringify(value));
    };

    return (
        <div style={{ padding: 16 }}>
            <div
                style={{
                    borderBottom: '1px solid #dddddd',
                    paddingBottom: 16,
                    marginBottom: 16,
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: 600 }}>
                    Restaurant General
                </Text>
            </div>

            <RowStyled
                style={{
                    borderBottom: '1px solid #dddddd',
                    paddingBottom: 16,
                    marginBottom: 16,
                }}
            >
                <Text>Default Table View</Text>
                <Switch
                    value={isTableView}
                    onChange={(value) => handleSetDefaultTableView(value)}
                />
            </RowStyled>
            <RowStyled
                style={{
                    borderBottom: '1px solid #dddddd',
                    paddingBottom: 16,
                    marginBottom: 16,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Text>Open Pricing for All Items</Text>
                    <div
                        style={{
                            position: 'relative',
                            marginLeft: 16,
                            marginTop: 5,
                            cursor: 'pointers',
                        }}
                    >
                        <QuestionIcon />
                    </div>
                </div>
                <Switch
                    value={isOpenPrice}
                    onChange={(value) => handleSetOpenPrice(value)}
                />
            </RowStyled>
        </div>
    );
}

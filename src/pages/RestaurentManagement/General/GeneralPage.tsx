import { notification, Switch } from 'antd';
import { Text } from 'components/atom/Text';
import { RowStyled } from 'pages/BillDetail/styled';
import React, { useEffect } from 'react';

export default function RestaurentGeneralPage() {
    const [isTableView, setIsTableView] = React.useState(false);
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
    return (
        <div style={{ padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>
                Restaurant General
            </Text>

            <RowStyled style={{ maxWidth: 600 }}>
                <Text>Default Table View</Text>
                <Switch
                    value={isTableView}
                    onChange={(value) => handleSetDefaultTableView(value)}
                />
            </RowStyled>
        </div>
    );
}

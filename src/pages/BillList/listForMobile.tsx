import { Row } from 'antd';
import { Text } from 'components/atom/Text';
import React from 'react';
import dayjs from 'dayjs';
import { useTheme } from 'context/themeContext';
import { ConvertStatusText, TableStatus } from '.';
import { useNavigate } from 'react-router';
import { BASE_ROUTER } from 'constants/router';
export default function ListBillForMobile({ listOrders }: { listOrders: any }) {
    const RenderRow = ({
        value,
        title,
        textStyle,
    }: {
        value: any;
        title: string;
        textStyle?: React.CSSProperties;
    }) => {
        return (
            <Row style={{ marginBottom: 12 }}>
                <Text style={{ fontWeight: '600', width: 100 }}>{title}</Text>
                <Text style={textStyle}>{value}</Text>
            </Row>
        );
    };
    const { theme } = useTheme();
    const getColor = (status: TableStatus) => {
        switch (status) {
            case TableStatus.Cancelled:
                return theme.eRROR2Default;
            case TableStatus.Complete:
                return theme.sUCCESS2Default;
            case TableStatus.Failed:
                return theme.eRROR2Default;
            case TableStatus.Processing:
                return theme.pRIMARY6Primary;
            case TableStatus.UnPaid:
                return theme.wARNING2Default;
        }
    };
    const navigation = useNavigate();
    return (
        <div>
            {listOrders.map((item: any, index: number) => (
                <div
                    key={index}
                    style={{
                        padding: 16,
                        background:
                            index % 2 === 0
                                ? theme.nEUTRALBase
                                : theme.nEUTRALLine,
                    }}
                    onClick={() =>
                        navigation(
                            `${BASE_ROUTER.BILL_DETAIL}?orderId=${item.id}`,
                        )
                    }
                >
                    <RenderRow value={`#${item?.order_number}`} title="Order" />
                    <RenderRow
                        value={dayjs(item?.created_at).format('DD/MM/YYYY')}
                        title="Date"
                    />
                    <RenderRow
                        value={dayjs(item?.created_at).format('HH:mm A')}
                        title="Time"
                    />
                    <RenderRow value={item?.table} title="Table" />
                    <RenderRow
                        value={`$${item?.total?.grand_total?.value}`}
                        title="Total"
                        textStyle={{
                            fontWeight: '600',
                            color: theme.tEXTPrimary,
                        }}
                    />
                    <RenderRow
                        value={ConvertStatusText(item?.status)}
                        title="Status"
                        textStyle={{
                            fontWeight: '600',
                            color: getColor(item?.status),
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

import { Row } from 'antd';
import { Text } from 'components/atom/Text';
import React from 'react';
import { useTheme } from 'context/themeContext';
import { useNavigate } from 'react-router';
import { BASE_ROUTER } from 'constants/router';
import { formatPhoneNumber } from 'utils/number';
import dayjs from 'dayjs';
export default function ListCustomerForMobile({
    listOrders,
}: {
    listOrders: any;
}) {
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
                            `${BASE_ROUTER.CUSTOMER_Detail}?customerId=${item?.id}`,
                        )
                    }
                >
                    <RenderRow
                        value={`${item?.firstname + ' ' + item?.lastname}`}
                        title="Name"
                    />
                    <RenderRow
                        value={
                            item?.date_of_birth
                                ? dayjs(item?.date_of_birth).format(
                                      'MM/DD/YYYY',
                                  )
                                : '-'
                        }
                        title="D.o.B"
                    />
                    <RenderRow
                        value={item?.gender === 1 ? 'Male' : 'Female'}
                        title="Gender"
                    />
                    <RenderRow
                        value={formatPhoneNumber(item?.phone_number)}
                        title="Phone"
                    />
                    <RenderRow value={item?.email} title="Email" />
                    <RenderRow
                        value={`${
                            item?.status === 1
                                ? 'Active'
                                : item?.status === 2
                                  ? 'Blacklisted'
                                  : 'Inactive'
                        }`}
                        title="Status"
                        textStyle={{
                            fontWeight: '600',
                            color:
                                item?.status === 1
                                    ? theme.sUCCESS2Default
                                    : theme.eRROR2Default,
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

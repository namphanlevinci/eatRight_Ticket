import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_LIST_ORDER_DINING } from '../../graphql/merchant/orderList';
import { getRandomInt, statusConvert } from './constant';
import { QuoteType, OrderType, RenderListType } from './IType';
export const useHomeScreen = () => {
    const [isLoadingApp, setIsLoadingApp] = useState(false);
    const [reload, setReload] = useState(false);
    const [refundOrderList, setRefundOrderList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [apiGetListDining] = useLazyQuery(GET_LIST_ORDER_DINING);
    const [diningQuoteList, setDiningQuoteList] = useState<QuoteType[]>([]);
    const [diningOrderList, setDiningOrderList] = useState<OrderType[]>([]);
    const [renderList, setRenderList] = useState<RenderListType[]>([]);
    const getOrderList = async () => {
        setIsLoadingApp(true);
        apiGetListDining().then((res) => {
            if (res.data) {
                console.log('res.data', res?.data?.merchantOrderDashboard);
                setDiningQuoteList(res?.data?.merchantOrderDashboard?.quotes);
                setDiningOrderList(res?.data?.merchantOrderDashboard?.orders);
            }
        });
        setIsLoadingApp(false);
    };
    useEffect(() => {
        getOrderList();
    }, []);
    useEffect(() => {
        if (diningQuoteList || diningOrderList) {
            const listQuote = diningQuoteList.map(
                (obj) =>
                    obj && {
                        ...obj,
                        type: 'dining-quotes',
                        uniqueId: getRandomInt(1, 100000) + obj?.cart_id,
                        status: statusConvert[
                            obj?.serving_status as keyof typeof statusConvert
                        ],
                        id: obj?.cart_id,
                    },
            );
            try {
                const tableGroups: any = {};

                listQuote.forEach((order) => {
                    const tableName = order?.table || '1';
                    if (!tableGroups[tableName]) {
                        tableGroups[tableName] = [];
                    }
                    tableGroups[tableName].push(order);
                });

                Object.keys(tableGroups).length > 0 &&
                    Object.keys(tableGroups)?.forEach((tableName) => {
                        const orders = tableGroups[tableName];
                        if (orders.length > 1) {
                            orders.forEach((order: any, index: any) => {
                                if (order) {
                                    order.table = `${tableName}-${index + 1}`;
                                }
                            });
                        }
                    });
            } catch (error) {
                console.log(error);
            }

            const listOrders = diningOrderList.map((obj) => ({
                ...obj,
                type: 'dining-orders',
                uniqueId: getRandomInt(1, 100000) + parseInt(obj?.order_number),
                status:
                    obj?.order_source === 'DINING'
                        ? statusConvert[
                              obj?.serving_status as keyof typeof statusConvert
                          ]
                        : statusConvert[
                              obj?.status as keyof typeof statusConvert
                          ],
            }));

            const newList = [...listQuote, ...listOrders].sort(
                (a, b) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime(),
            );
            setRenderList(newList as never[]);
        }
    }, [diningQuoteList, diningOrderList]);
    return {
        isLoadingApp,
        reload,
        refundOrderList,
        searchValue,
        setSearchValue,
        setReload,
        setRefundOrderList,
        diningQuoteList,
        diningOrderList,
        renderList,
    };
};

import { useLazyQuery } from '@apollo/client';
import { GET_LIST_ORDER_COMPLETED } from 'graphql/merchant/orderList';
import _ from 'lodash';
import { useEffect, useState } from 'react';

export const useOrderCompleted = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [listCompletedOrder, setListCompletedOrder] = useState([]);
    const [loading2, setLoading2] = useState(false);
    const [totalComplete, setTotalComplete] = useState(0);
    const [apiGetCompletedOrder] = useLazyQuery(GET_LIST_ORDER_COMPLETED);
    const getListCompleteOrder = async ({ page }: { page: number }) => {
        setLoading2(true);
        apiGetCompletedOrder({
            variables: {
                currentPage: page,
            },
        })
            .then((res: any) => {
                if (!res.errors && res.data) {
                    const list = res.data.merchantOrderCompleteDashboard.orders;
                    const concatList: any = _.uniqBy(
                        [...listCompletedOrder, ...list],
                        'order_number',
                    );
                    setListCompletedOrder(concatList);
                    setTotalComplete(
                        res.data.merchantOrderCompleteDashboard.total_count,
                    );
                }
            })
            .finally(() => {
                setLoading2(false);
            });
    };
    useEffect(() => {
        getListCompleteOrder({
            page: currentPage,
        });
    }, [currentPage]);
    return {
        currentPage,
        setCurrentPage,
        loading2,
        totalComplete,
        listCompletedOrder,
    };
};

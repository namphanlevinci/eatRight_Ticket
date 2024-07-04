import { useLazyQuery } from '@apollo/client';
import {
    EnumCustomerOrderSortableField,
    SortEnum,
} from 'graphql/orders/order.type';
import { GET_ORDERS } from 'graphql/orders/order';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import { GET_ALL_TABLE } from 'graphql/table/table';
import { ChildComponentRef } from './DropdownList';
import { useRef } from 'react';

export const useBillList = () => {
    const [getBillList, { data, loading }] = useLazyQuery(GET_ORDERS, {
        fetchPolicy: 'cache-and-network',
    });
    const [pageSize, setPageSize] = useState(10);
    const [current_page, setCurrentPage] = useState(1);
    const [billList, setBillList] = useState([]);
    const [table, setTable] = useState<string | number | null | undefined>(
        null,
    );
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [date, setDate] = useState<any>(null);
    const [dataTable, setDataTable] = useState<any>([]);
    const { restaurant_id } = useSelector((state: RootState) => state.auth);
    const [onGetTable] = useLazyQuery(GET_ALL_TABLE);

    const refYear = useRef<ChildComponentRef>(null);
    const refMonth = useRef<ChildComponentRef>(null);
    const refDay = useRef<ChildComponentRef>(null);
    const refTable = useRef<ChildComponentRef>(null);

    const handleGetBillList = async () => {
        await getBillList({
            variables: {
                sort_field: EnumCustomerOrderSortableField.CREATED_AT,
                sort_direction: SortEnum.DESC,
                pageSize: pageSize,
                currentPage: current_page,
                filter: {
                    ...(table && { table_id: { eq: table } }),
                    ...(date && {
                        created_at: {
                            from: date?.from,
                            to: date?.to,
                        },
                    }),
                },
            },
        });
    };

    const onChangeDropdownList = (item: any, type: string) => {
        if (type == 'year') {
            setYear(item.value);
        }
        if (type == 'month') {
            setMonth(item.value);
        }
        if (type == 'date') {
            setDay(item.value);
        }
        if (type == 'table') {
            setTable(parseInt(item?.value));
        }
    };
    useEffect(() => {
        if (year && month && day) {
            const from = `${year}-${month}-${day} 00:00:00`;
            const to = `${year}-${month}-${day} 23:59:59`;
            setDate({
                from,
                to,
            });
        }
    }, [year, month, day]);
    useEffect(() => {
        onGetTable({
            variables: {
                storeId: restaurant_id,
            },
            onCompleted: (res) => {
                setDataTable(
                    res?.getTablesByStore?.map?.((dt: any) => ({
                        value: dt?.id?.toString?.(),
                        label: dt?.name,
                    })) ?? [],
                );
            },
        });
    }, []);

    useEffect(() => {
        handleGetBillList();
    }, [pageSize, current_page]);

    useEffect(() => {
        setBillList(data?.merchantOrders?.items ?? []);
    }, [data?.merchantOrders?.items]);

    return {
        listOrders: billList,
        total_count: data?.merchantOrders?.total_count,
        setPageSize,
        pageSize,
        setCurrentPage,
        current_page,
        loading,
        setTable,
        setDate,
        dataTable,
        handleGetBillList,
        onChangeDropdownList,
        refYear,
        refMonth,
        refDay,
        refTable,
    };
};

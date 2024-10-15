import { useLazyQuery } from '@apollo/client';
import { emitter } from 'graphql/client';
import {
    DATA_ALL_TABLE,
    GET_ALL_TABLE,
    GET_ALL_TABLE_Floor,
    TTable,
} from 'graphql/table/table';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export const useGetAllTable = ({ cache }: { cache?: boolean }) => {
    const { restaurant_id, floor } = useSelector(
        (state: RootState) => state.auth,
    );
    const [onGetTable, { data, loading, refetch }] =
        useLazyQuery<DATA_ALL_TABLE>(GET_ALL_TABLE);

    const [onGetTableFloor, { data: data2, loading: loading2 }] =
        useLazyQuery(GET_ALL_TABLE_Floor);
    const [floorActive, setFloorActive] = useState<number>(-1);
    const [tableList, setTableList] = useState<TTable[]>([]);
    const [counterTable, setCounterTable] = useState<any>();
    const [searchText, setSearchText] = useState('');
    const fetchTableData = () => {
        if (restaurant_id) {
            if (floor && floor?.length > 0 && floorActive !== -1) {
                onGetTableFloor({
                    variables: {
                        storeId: restaurant_id,
                        floorId: floor[floorActive].id,
                    },
                    fetchPolicy: cache ? 'cache-only' : 'cache-and-network',
                });
            } else {
                onGetTable({
                    variables: {
                        storeId: restaurant_id,
                    },
                    fetchPolicy: cache ? 'cache-only' : 'cache-and-network',
                });
            }
        }
    };

    const handleActiveFloor = (floorId: number) => {
        setFloorActive(floorId);
    };

    useEffect(() => {
        fetchTableData();
        emitter.on('updateTable', () => {
            fetchTableData();
        });
        return () => {
            emitter.off('updateTable');
        };
    }, [restaurant_id, floorActive]);
    useEffect(() => {
        if (searchText !== '') {
            setFloorActive(-1);
        }
    }, [searchText]);
    useEffect(() => {
        let tableData = data?.getTablesByStore;
        if (data?.getTablesByStore) {
            localStorage.setItem(
                'tableData',
                JSON.stringify(data?.getTablesByStore),
            );
        } else {
            const tableDataString = localStorage.getItem('tableData');
            if (tableDataString) {
                tableData = JSON.parse(tableDataString);
            } else {
                refetch();
            }
        }
        if (floorActive !== -1 && searchText === '') {
            tableData = data2?.getTablesByStore;
        }
        if (tableData && Array.isArray(tableData)) {
            const counterTable = tableData?.find(
                (data: any) => data?.is_counter == 1,
            );
            const tableNormal = tableData?.filter(
                (data: any) => data?.is_counter != 1,
            );
            let tableList = tableNormal;
            if (searchText) {
                tableList = tableNormal.filter((table: any) =>
                    table?.name
                        ?.toLowerCase()
                        .includes(searchText.toLowerCase()),
                );
            }
            const tempTableList = new Array(100).fill(null);
            const mergedTables = tempTableList.reduce((acc, _, index) => {
                if (index < tableList.length) {
                    acc.push(tableList[index]);
                } else {
                    acc.push(null);
                }
                return acc;
            }, []);
            setTableList(mergedTables);

            if (counterTable) {
                setCounterTable(counterTable);
                localStorage.setItem(
                    'counterTable',
                    JSON.stringify(counterTable),
                );
            }
        }
    }, [
        data?.getTablesByStore,
        searchText,
        data2?.getTablesByStore,
        floorActive,
    ]);
    return {
        data: tableList,
        loading: loading || loading2,
        counterTable,
        setSearchText,
        tables: data?.getTablesByStore,
        handleActiveFloor,
        floorActive,
    };
};

import React, { useEffect } from 'react';
import { Layout, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetAllTable } from './useTable';
import {
    ContainerTable,
    ContainerTableHeader,
    ContainerTableBody,
} from './styled';
import { BASE_ROUTER } from 'constants/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import Floors from './components/Floors';
// import WaitingListButton from './components/WaitingListButton';
import Tables from './components/Tables';
import { EStatusTable } from 'graphql/table/table';
const { Content } = Layout;

const MerchantTableView: React.FC = () => {
    const navigation = useNavigate();
    const { searchText, filterTable, merchantFilterTable } = useSelector(
        (state: RootState) => state.global,
    );
    const { loadingTable, data, floorActive, handleActiveFloor } =
        useGetAllTable({
            cache: false,
        });
    const { floor: floors, isTableView } = useSelector(
        (state: RootState) => state.auth,
    );
    useEffect(() => {
        if (!isTableView) {
            navigation(BASE_ROUTER.MERCHANT_ORDERLIST);
        }
    }, [isTableView]);
    const renderContent = () => {
        return (
            <Spin spinning={loadingTable}>
                <ContainerTable
                    style={{ background: '#f4f4f4', paddingBottom: 80 }}
                >
                    <ContainerTableHeader>
                        <Floors
                            floorActive={floorActive}
                            floors={floors}
                            onFloorActive={handleActiveFloor}
                        />
                        {/* <WaitingListButton
                            count={41}
                            onClick={() => console.log('Clicked')}
                        /> */}
                    </ContainerTableHeader>
                    <ContainerTableBody>
                        {data?.length ? (
                            <Tables
                                tables={data?.filter((d) => {
                                    let check = false;
                                    if (merchantFilterTable) {
                                        const {
                                            isAvailable = true,
                                            isDinning = true,
                                            isReserve = true,
                                        } = merchantFilterTable;

                                        // Nếu cả 3 đều được mở (tất cả đều là true)
                                        if (
                                            isAvailable &&
                                            isDinning &&
                                            isReserve
                                        ) {
                                            check = true;
                                        }

                                        // Nếu chỉ có một hoặc một vài cờ được mở, lọc dữ liệu dựa vào điều kiện cụ thể
                                        if (
                                            isAvailable &&
                                            d?.status === EStatusTable.AVAILABLE
                                        ) {
                                            check = true;
                                        }

                                        if (
                                            isDinning &&
                                            d?.status === EStatusTable.DINING
                                        ) {
                                            check = true;
                                        }
                                        if (
                                            isReserve &&
                                            d?.status === EStatusTable.RESERVED
                                        ) {
                                            check = true;
                                        }
                                    } else {
                                        check = true;
                                    }

                                    if (!check) {
                                        return false;
                                    }
                                    const matchesNotNull = d?.id;
                                    const matchesName = d?.name
                                        ?.toLowerCase()
                                        .includes(
                                            searchText?.table?.toLowerCase(),
                                        );
                                    if (filterTable === undefined) {
                                        return matchesNotNull && matchesName;
                                    }

                                    const matchesStatus =
                                        filterTable === EStatusTable.ALL
                                            ? true
                                            : +d?.status === filterTable;
                                    return (
                                        matchesNotNull &&
                                        matchesName &&
                                        matchesStatus
                                    );
                                })}
                            />
                        ) : (
                            <div>Not found any table</div>
                        )}
                    </ContainerTableBody>
                </ContainerTable>
            </Spin>
        );
    };

    return (
        <Layout
            style={{
                backgroundColor: '#fafafa',
                minHeight: '100vh',
            }}
        >
            <Content
                style={{
                    paddingTop: 16,
                    backgroundColor: '#fafafa',
                }}
            >
                {renderContent()}
            </Content>
        </Layout>
    );
};

export default MerchantTableView;

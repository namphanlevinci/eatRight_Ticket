import React from 'react';
import { Divider, Layout, Pagination } from 'antd';
import { Colors } from 'themes/colors';
import {
    StyledTitle,
    ContainerPaginationText,
    StyledColumn,
    StyledColumnContainer,
    StyledSearch,
} from './styled';
import DropdownList from './DropdownList';
import {
    getYears,
    getMonths,
    getDays,
    // getFloors,
    // getArea,
} from './mocks';
import { useBillList } from './useBillList';
import { formatNumberWithCommas } from 'utils/format';
import SearchIcon from 'assets/icons/search';
import { BASE_ROUTER } from 'constants/router';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import LoadingModal from 'components/modal/loadingModal';

const { Content } = Layout;

enum TableStatus {
    Failed = 'Payment Failed',
    UnPaid = 'Pending Payment',
    Paid = 'Complete',
    Cancelled = 'Cancelled',
    Complete = 'Complete',
    Processing = 'Processing',
}

const convertStatusText = (status: TableStatus) => {
    switch (status) {
        case TableStatus.Failed:
            return 'Payment Failed';
        case TableStatus.Cancelled:
            return 'Cancelled';
        case TableStatus.Paid:
            return 'Paid';
        case TableStatus.Complete:
            return 'Paid';
        case TableStatus.UnPaid:
            return 'Pending Payment';
        case TableStatus.Processing:
            return 'Processing';
        default:
            return 'Unknown';
    }
};

const convertStatus = (status: TableStatus) => {
    switch (status) {
        case TableStatus.Failed:
            return (
                <StyledColumn
                    style={{
                        width: '100%',
                        opacity: 1,
                        fontWeight: 600,
                        color: '#EA4335',
                    }}
                >
                    {convertStatusText(status)}
                </StyledColumn>
            );
        case TableStatus.Cancelled:
            return (
                <StyledColumn
                    style={{
                        width: '100%',
                        opacity: 1,
                        fontWeight: 600,
                        color: '#EA4335',
                    }}
                >
                    {convertStatusText(status)}
                </StyledColumn>
            );
        case TableStatus.Paid:
            return (
                <StyledColumn
                    style={{
                        width: '100%',
                        opacity: 1,
                        fontWeight: 600,
                        color: '#00fc43',
                    }}
                >
                    {convertStatusText(status)}
                </StyledColumn>
            );
        case TableStatus.Complete:
            return (
                <StyledColumn
                    style={{
                        width: '100%',
                        opacity: 1,
                        fontWeight: 600,
                        color: '#00fc43',
                    }}
                >
                    {convertStatusText(status)}
                </StyledColumn>
            );
        case TableStatus.UnPaid:
            return (
                <StyledColumn
                    style={{
                        width: '100%',
                        opacity: 1,
                        fontWeight: 600,
                        color: '#FBBC05',
                    }}
                >
                    {convertStatusText(status)}
                </StyledColumn>
            );
        case TableStatus.Processing:
            return (
                <StyledColumn
                    style={{
                        width: '100%',
                        opacity: 1,
                        fontWeight: 600,
                        color: '#056bfb',
                    }}
                >
                    {convertStatusText(status)}
                </StyledColumn>
            );
        default:
            return <></>;
    }
};

const BillList: React.FC = () => {
    const navigation = useNavigate();
    const {
        listOrders,
        pageSize,
        setPageSize,
        setCurrentPage,
        current_page,
        total_count,
        dataTable,
        handleGetBillList,
        refYear,
        refMonth,
        refDay,
        refTable,
        onChangeDropdownList,
        loading,
    } = useBillList();

    return (
        <Layout style={{ backgroundColor: Colors.black, minHeight: '100vh' }}>
            <LoadingModal showLoading={loading} />
            <Content style={{ margin: '0 16px' }}>
                <Divider style={{ background: Colors.grey3 }} />
                <StyledTitle>
                    Bill
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: 20,
                        }}
                    >
                        <div style={{ display: 'flex' }}>
                            <DropdownList
                                ref={refYear}
                                options={getYears()}
                                placeholder="Year"
                                onChangeOptions={(item: any) =>
                                    onChangeDropdownList(item, 'year')
                                }
                            />
                            <DropdownList
                                options={getMonths()}
                                placeholder="Month"
                                ref={refMonth}
                                onChangeOptions={(item: any) =>
                                    onChangeDropdownList(item, 'month')
                                }
                            />
                            <DropdownList
                                ref={refDay}
                                options={getDays()}
                                placeholder="Date"
                                onChangeOptions={(item: any) =>
                                    onChangeDropdownList(item, 'date')
                                }
                            />
                        </div>

                        <StyledSearch onClick={handleGetBillList}>
                            <p>Filter</p>
                            <SearchIcon />
                        </StyledSearch>
                    </div>
                    <div style={{ display: 'flex', marginTop: 50 }}>
                        {/* <DropdownList
                            options={getFloors()}
                            placeholder="Floor"
                        />
                        <DropdownList options={getArea()} placeholder="Area" /> */}
                        <DropdownList
                            options={dataTable}
                            placeholder="Table"
                            ref={refTable}
                            onChangeOptions={(item: any) =>
                                onChangeDropdownList(item, 'table')
                            }
                        />
                    </div>
                </StyledTitle>
                <ContainerPaginationText>
                    <div />
                </ContainerPaginationText>
                <div>
                    <StyledColumnContainer>
                        <StyledColumn style={{ width: '100%' }}>
                            Order
                        </StyledColumn>
                        <StyledColumn style={{ width: '100%' }}>
                            Status
                        </StyledColumn>
                        <StyledColumn
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            Table
                        </StyledColumn>
                        <StyledColumn style={{ width: '100%' }}>
                            Total
                        </StyledColumn>

                        <StyledColumn style={{ width: '100%' }}>
                            Date
                        </StyledColumn>
                    </StyledColumnContainer>
                    {listOrders?.map((dt: any, index: number) => (
                        <StyledColumnContainer
                            key={dt.id}
                            style={{
                                background:
                                    index % 2 === 0 ? '#191919' : '#0D0D0D',
                            }}
                            onClick={() =>
                                navigation(
                                    `${BASE_ROUTER.BILL_DETAIL}?orderId=${dt.id}`,
                                )
                            }
                        >
                            <StyledColumn
                                style={{ width: '100%' }}
                            >{`# ${dt.order_number}`}</StyledColumn>
                            <StyledColumn style={{ width: '100%' }}>
                                {convertStatus(dt.status)}
                            </StyledColumn>
                            <StyledColumn
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                }}
                            >
                                {dt.table}
                            </StyledColumn>
                            <StyledColumn
                                style={{
                                    opacity: 1,
                                    fontWeight: 600,
                                    width: '100%',
                                }}
                            >
                                {formatNumberWithCommas(dt.grand_total)}
                            </StyledColumn>

                            <StyledColumn style={{ width: '100%' }}>
                                {dt.created_at}
                            </StyledColumn>
                        </StyledColumnContainer>
                    ))}
                </div>
                <ContainerPaginationText>
                    <div />
                    <StyledPagination
                        total={total_count}
                        pageSize={pageSize}
                        current={current_page}
                        onChange={(page) => {
                            setCurrentPage(page);
                        }}
                        onShowSizeChange={(current, size) => {
                            setPageSize(size);
                        }}
                        showSizeChanger
                        showTotal={(total) => `Total ${total} items`}
                    />
                </ContainerPaginationText>
            </Content>
        </Layout>
    );
};

export default BillList;

export const StyledPagination = styled(Pagination)`
    .ant-pagination-total-text {
        color: ${Colors.white} !important;
        font-size: 18px;
    }
    .ant-pagination-item {
        height: 48px;
        width: 48px;
        padding-top: 8px;
        background: ${Colors.black};
        color: ${Colors.white};
    }
    .ant-pagination-item a {
        color: ${Colors.white} !important;
    }
    .ant-pagination-item-link span {
        color: ${Colors.white};
    }
    .ant-pagination-item-active {
        border-color: ${Colors.white} !important;
    }
`;

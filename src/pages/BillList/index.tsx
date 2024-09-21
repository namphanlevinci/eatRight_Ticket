import React from 'react';
import { DatePicker, Divider, Layout, Pagination } from 'antd';
import { Colors } from 'themes/colors';
import {
    StyledTitle,
    ContainerPaginationText,
    StyledColumn,
    StyledColumnContainer,
    StyledSearch,
} from './styled';
import DropdownList from './DropdownList';
import { useBillList } from './useBillList';
import { formatNumberWithCommas } from 'utils/format';
import SearchIcon from 'assets/icons/search';
import { BASE_ROUTER } from 'constants/router';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import LoadingModal from 'components/modal/loadingModal';
import { useTheme } from 'context/themeContext';
import { useMediaQuery } from 'react-responsive';
import ListBillForMobile from './listForMobile';

const { Content } = Layout;

export enum TableStatus {
    Failed = 'Payment Failed',
    UnPaid = 'Pending Payment',
    Paid = 'Complete',
    Cancelled = 'Cancelled',
    Complete = 'Complete',
    Processing = 'Processing',
    Received = 'Received',
}

export const ConvertStatusText = (status: TableStatus) => {
    switch (status) {
        case TableStatus.Failed:
            return 'Payment Failed';
        case TableStatus.Cancelled:
            return 'Cancelled';
        case TableStatus.Paid:
            return 'Paid';
        case TableStatus.Complete:
            return 'Paid';
        case TableStatus.Received:
            return 'Received';
        case TableStatus.UnPaid:
            return 'Pending Payment';
        case TableStatus.Processing:
            return 'Processing';
        default:
            return status;
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
                    {ConvertStatusText(status)}
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
                    {ConvertStatusText(status)}
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
                    {ConvertStatusText(status)}
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
                    {ConvertStatusText(status)}
                </StyledColumn>
            );
        case TableStatus.Received:
            return (
                <StyledColumn
                    style={{
                        width: '100%',
                        opacity: 1,
                        fontWeight: 600,
                        color: 'var(--info-2-default)',
                    }}
                >
                    {ConvertStatusText(status)}
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
                    {ConvertStatusText(status)}
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
                    {ConvertStatusText(status)}
                </StyledColumn>
            );
        default:
            return (
                <StyledColumn
                    style={{
                        width: '100%',
                        opacity: 1,
                        fontWeight: 600,
                        color: 'var(--info-2-default)',
                    }}
                >
                    {status}
                </StyledColumn>
            );
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
        refTable,
        onChangeDropdownList,
        loading,
        setDate,
    } = useBillList();
    const { theme } = useTheme();
    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });
    const { RangePicker } = DatePicker;
    return (
        <Layout
            style={{
                backgroundColor: theme.nEUTRALPrimary,
                minHeight: '100vh',
            }}
        >
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
                            gap: 20,
                        }}
                    >
                        <RangePicker
                            onChange={(value, dateString) => {
                                const from = `${dateString[0]} 00:00:00`;
                                const to = `${dateString[1]} 23:59:59`;
                                setDate({
                                    from,
                                    to,
                                });
                            }}
                            style={{ width: isMobile ? 'auto' : 600 }}
                        />
                        <StyledSearch
                            onClick={handleGetBillList}
                            style={{ background: theme.pRIMARY6Primary }}
                        >
                            <p>Filter</p>
                            <SearchIcon color={theme.nEUTRALPrimary} />
                        </StyledSearch>
                    </div>
                    <div style={{ display: 'flex', marginTop: 50 }}>
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
                <ContainerPaginationText
                    style={{ background: theme.nEUTRALPrimary }}
                >
                    <div />
                </ContainerPaginationText>
                {isMobile ? (
                    <ListBillForMobile listOrders={listOrders} />
                ) : (
                    <div>
                        <StyledColumnContainer
                            style={{
                                background: theme.pRIMARY1,
                                border: `1px solid ${theme.pRIMARY2}`,
                            }}
                        >
                            <StyledColumn
                                style={{
                                    width: '100%',
                                    color: theme.tEXTPrimary,
                                }}
                            >
                                Order
                            </StyledColumn>
                            <StyledColumn
                                style={{
                                    width: '100%',
                                    color: theme.tEXTPrimary,
                                }}
                            >
                                Status
                            </StyledColumn>
                            <StyledColumn
                                style={{
                                    width: '100%',
                                    color: theme.tEXTPrimary,
                                }}
                            >
                                Method
                            </StyledColumn>
                            <StyledColumn
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    color: theme.tEXTPrimary,
                                }}
                            >
                                Table
                            </StyledColumn>
                            <StyledColumn
                                style={{
                                    width: '100%',
                                    color: theme.tEXTPrimary,
                                }}
                            >
                                Total
                            </StyledColumn>

                            <StyledColumn
                                style={{
                                    width: '100%',
                                    color: theme.tEXTPrimary,
                                }}
                            >
                                Date
                            </StyledColumn>
                        </StyledColumnContainer>
                        {listOrders?.map((dt: any, index: number) => (
                            <StyledColumnContainer
                                key={dt.id}
                                style={{
                                    background:
                                        index % 2 === 0
                                            ? theme.nEUTRALBase
                                            : theme.nEUTRALLine,
                                }}
                                onClick={() =>
                                    navigation(
                                        `${BASE_ROUTER.BILL_DETAIL}?orderId=${dt.id}`,
                                    )
                                }
                            >
                                <StyledColumn
                                    style={{
                                        width: '100%',
                                        color: theme.tEXTPrimary,
                                    }}
                                >{`# ${dt.order_number}`}</StyledColumn>
                                <StyledColumn
                                    style={{
                                        width: '100%',
                                        color: theme.tEXTPrimary,
                                    }}
                                >
                                    {convertStatus(dt.status)}
                                </StyledColumn>
                                <StyledColumn
                                    style={{
                                        width: '100%',
                                        color: theme.tEXTPrimary,
                                    }}
                                >
                                    {dt?.payment_method}
                                </StyledColumn>
                                <StyledColumn
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        color: theme.tEXTPrimary,
                                    }}
                                >
                                    {dt.table}
                                </StyledColumn>
                                <StyledColumn
                                    style={{
                                        opacity: 1,
                                        fontWeight: 600,
                                        width: '100%',
                                        color: theme.tEXTPrimary,
                                    }}
                                >
                                    {formatNumberWithCommas(dt.grand_total)}
                                </StyledColumn>

                                <StyledColumn
                                    style={{
                                        width: '100%',
                                        color: theme.tEXTPrimary,
                                    }}
                                >
                                    {dt.created_at}
                                </StyledColumn>
                            </StyledColumnContainer>
                        ))}
                    </div>
                )}
                <ContainerPaginationText
                    style={{ background: theme.nEUTRALPrimary }}
                >
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
                        theme={theme}
                        style={{
                            width: '100%',
                        }}
                    />
                </ContainerPaginationText>
            </Content>
        </Layout>
    );
};

export default BillList;

const getPanigationtTotalTextColor = (props: { theme: any }) =>
    props.theme.tEXTPrimary;
const getPanigationtItemPagination = (props: { theme: any }) =>
    props.theme.nEUTRALPrimary;
export const StyledPagination = styled(Pagination)`
    align-items: center;
    .ant-pagination-total-text {
        color: ${getPanigationtTotalTextColor} !important;
        font-size: 18px;
    }
    .ant-pagination-item {
        height: 48px;
        width: 48px;
        padding-top: 8px;
        background: ${getPanigationtItemPagination};
        color: ${getPanigationtTotalTextColor};
    }
    .ant-pagination-item a {
        color: ${getPanigationtTotalTextColor} !important;
    }
    .ant-pagination-item-link span {
        color: ${getPanigationtTotalTextColor};
    }
    .ant-pagination-item-active {
        border-color: ${getPanigationtTotalTextColor} !important;
    }
`;

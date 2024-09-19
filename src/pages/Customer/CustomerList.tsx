import React from 'react';
import { Divider, Layout, Pagination, Row } from 'antd';
import { Colors } from 'themes/colors';

import { BASE_ROUTER } from 'constants/router';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import LoadingModal from 'components/modal/loadingModal';
import { useTheme } from 'context/themeContext';
import { useMediaQuery } from 'react-responsive';
import {
    ContainerPaginationText,
    StyledColumn,
    StyledColumnContainer,
} from 'pages/BillList/styled';
import { useCustomerList } from './useCustomerList';
import { ArrawLeftIcon } from 'layouts/SettingLayout';
import { Text } from 'components/atom/Text';
import { Link } from 'react-router-dom';
import SearchSettings from 'layouts/components/Search';
import _ from 'lodash';
import { formatPhoneNumber } from 'utils/number';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import ListCustomerForMobile from './listCustomerForMobile';
import { formatPhoneNumberByUSA } from 'utils/format';
import dayjs from 'dayjs';

// import ListBillForMobile from './listForMobile';

const { Content } = Layout;

const CustomerList: React.FC = () => {
    console.log('CustomerList');
    const navigation = useNavigate();
    const { theme } = useTheme();
    const {
        isMerchant,
        listOrders,
        pageSize,
        setPageSize,
        setCurrentPage,
        current_page,
        total_count,
        loading,
        setSearch,
    } = useCustomerList();
    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });
    const debouncedSetSearch = _.debounce((value: string) => {
        setSearch(value);
    }, 500);
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
                <Row
                    style={{ gap: 20 }}
                    align={'middle'}
                    justify={'space-between'}
                >
                    <Row>
                        <Link to={BASE_ROUTER.HOME}>
                            <Row align={'middle'} style={{ gap: 16 }}>
                                <ArrawLeftIcon />
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: theme.pRIMARY6Primary,
                                    }}
                                >
                                    Home
                                </Text>
                            </Row>
                        </Link>
                        <Text>/</Text>
                        <Text>Customer List</Text>
                    </Row>
                    <Row
                        align={'middle'}
                        style={isMobile ? { width: '100%' } : {}}
                    >
                        <SearchSettings
                            placeholder="name or last 4 number"
                            onChangeText={(value: string) =>
                                debouncedSetSearch(value)
                            }
                            width={isMobile ? '100%' : '300px'}
                        />
                        <ButtonPrimary
                            title="New Customer"
                            onClick={() => navigation(BASE_ROUTER.CUSTOMER_NEW)}
                            width={isMobile ? '100%' : '200px'}
                            marginTop={isMobile ? '16px' : '0px'}
                            height="48px"
                        />
                    </Row>
                </Row>
                <ContainerPaginationText
                    style={{ background: theme.nEUTRALPrimary }}
                >
                    <div />
                </ContainerPaginationText>
                {isMobile ? (
                    <ListCustomerForMobile listOrders={listOrders} />
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
                                    width: '10%',
                                    color: theme.tEXTPrimary,
                                }}
                            >
                                No
                            </StyledColumn>
                            <StyledColumn
                                style={{
                                    width: '30%',
                                    color: theme.tEXTPrimary,
                                }}
                            >
                                Name
                            </StyledColumn>
                            <StyledColumn
                                style={{
                                    width: '15%',
                                    color: theme.tEXTPrimary,
                                }}
                            >
                                D.o.B
                            </StyledColumn>
                            <StyledColumn
                                style={{
                                    width: '10%',
                                    color: theme.tEXTPrimary,
                                }}
                            >
                                Gender
                            </StyledColumn>

                            <StyledColumn
                                style={{
                                    width: '15%',
                                    color: theme.tEXTPrimary,
                                }}
                            >
                                Phone
                            </StyledColumn>
                            <StyledColumn
                                style={{
                                    width: '25%',
                                    color: theme.tEXTPrimary,
                                }}
                            >
                                Email
                            </StyledColumn>
                            <StyledColumn
                                style={{
                                    width: '10%',
                                    color: theme.tEXTPrimary,
                                }}
                            >
                                Group
                            </StyledColumn>
                            <StyledColumn
                                style={{
                                    width: '10%',
                                    color: theme.tEXTPrimary,
                                }}
                            >
                                Status
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
                                        `${BASE_ROUTER.CUSTOMER_Detail}?customerId=${dt.id}`,
                                    )
                                }
                            >
                                <StyledColumn
                                    style={{
                                        width: '10%',
                                        color: theme.tEXTPrimary,
                                    }}
                                >{`# ${dt?.id}`}</StyledColumn>

                                <StyledColumn
                                    style={{
                                        width: '30%',
                                        color: theme.tEXTPrimary,
                                    }}
                                >
                                    {dt?.firstname + ' ' + dt?.lastname}
                                </StyledColumn>
                                <StyledColumn
                                    style={{
                                        opacity: 1,
                                        fontWeight: 600,
                                        width: '15%',
                                        color: theme.tEXTPrimary,
                                    }}
                                >
                                    {dt?.date_of_birth
                                        ? dayjs(dt?.date_of_birth).format(
                                              'MM-DD-YYYY',
                                          )
                                        : '-'}
                                </StyledColumn>
                                <StyledColumn
                                    style={{
                                        opacity: 1,
                                        fontWeight: 600,
                                        width: '10%',
                                        color: theme.tEXTPrimary,
                                    }}
                                >
                                    {dt?.gender === 1 ? 'Male' : 'Female'}
                                </StyledColumn>

                                <StyledColumn
                                    style={{
                                        width: '15%',
                                        color: theme.tEXTPrimary,
                                    }}
                                >
                                    {isMerchant
                                        ? formatPhoneNumberByUSA(
                                              dt.phone_number,
                                          )
                                        : formatPhoneNumber(dt.phone_number)}
                                </StyledColumn>
                                <StyledColumn
                                    style={{
                                        width: '25%',
                                        color: theme.tEXTPrimary,
                                    }}
                                >
                                    {dt.email}
                                </StyledColumn>
                                <StyledColumn
                                    style={{
                                        width: '10%',
                                        color: theme.tEXTPrimary,
                                    }}
                                >
                                    {dt?.group ? 'Group' : 'Normal'}
                                </StyledColumn>
                                <StyledColumn
                                    style={{
                                        width: '10%',
                                        color:
                                            dt?.status === 1
                                                ? theme.pRIMARY6Primary
                                                : theme.eRROR2Default,
                                    }}
                                >
                                    {dt?.status === 1
                                        ? 'Active'
                                        : dt?.status === 2
                                          ? 'Blacklist'
                                          : 'Inactive'}
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

export default CustomerList;

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

import { Col, Layout, Popover, Row, Spin, Switch } from 'antd';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';
import { useLazyQuery } from '@apollo/client';
import { USER_INFO } from 'graphql/auth/login';
import { useDispatch } from 'react-redux';
import {
    changeModeTableView,
    updateCustomerInfo,
    updateFloor,
} from 'features/auth/authSlice';
import { GET_RESTAURANT } from 'graphql/auth/restaurent';
import BellIcon from 'assets/icons_v2/BellIcon';
import blackNoti from 'assets/icons/black-noti.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import { format } from 'date-fns';
import { GET_NOTIFICATION } from 'graphql/notification';
import {
    NotiTitle,
    NotificationItem,
    AnnaBellStyle,
    SwitchContainer,
} from './styled';
import HomeIcon from 'assets/icons_v2/HomeIcon';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useMemo, useState } from 'react';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import { Colors } from 'themes/colors';
import ButtonV2 from './components/Button';
import DrawerMenuV2 from './components/DrawerMenu_v2';
import FilterV2 from './components/Filter_v2';
import SearchV2 from './components/Search_v2';

const HeaderV2 = () => {
    const location = useLocation();
    const { isLogged, isMerchant, isTableView, counterTable } = useSelector(
        (state: RootState) => state.auth,
    );
    const [onGetInfo] = useLazyQuery(USER_INFO);
    const [onGetRestaurent] = useLazyQuery(GET_RESTAURANT);
    const [getNotification] = useLazyQuery(GET_NOTIFICATION);
    // const [onOpenCashier] = useMutation(OPEN_CASHIER);
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const { theme } = useTheme();
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    const [listNotifications, setListNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadMore, setLoadMore] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [isOpenNoti, setOpenNoti] = useState(false);

    const showOnHeader = useMemo(() => {
        const isTablePage =
            location.pathname === BASE_ROUTER.MERCHANT_TABLEVIEW;
        const isOrderPage =
            location.pathname === BASE_ROUTER.MERCHANT_ORDERLIST;
        const allowPageShowHeader = isTablePage || isOrderPage;

        const showNewOrder = isMerchant && !isMobile && allowPageShowHeader;
        const showCasier = isMerchant && !isMobile;
        const showFilter = isMerchant && !isMobile && isOrderPage;
        const showSearch = isMerchant && !isMobile;
        return {
            newOrder: showNewOrder,
            cashier: showCasier,
            filter: showFilter,
            search: showSearch,
        };
    }, [location, isMerchant, isMobile]);

    console.log(showOnHeader);

    useEffect(() => {
        const isTokenValidated =
            sessionStorage.getItem('isTokenValidated') === 'true';
        if (!isTokenValidated && isLogged) {
            onGetInfo({ fetchPolicy: 'no-cache' }).then((res) => {
                if (res?.data?.getMerchantInfo) {
                    dispatch(updateCustomerInfo(res?.data?.getMerchantInfo));
                    sessionStorage.setItem('isTokenValidated', 'true');
                    localStorage.setItem(
                        'store_view_code',
                        res?.data?.getMerchantInfo?.store_view_code,
                    );
                    if (window?.ReactNativeWebView) {
                        window.ReactNativeWebView.postMessage(
                            JSON.stringify({
                                type: 'StoreCode',
                                code: res?.data?.getMerchantInfo
                                    ?.restaurant_code,
                            }),
                        );
                    }
                }
            });
            onGetRestaurent({ fetchPolicy: 'no-cache' }).then((res) => {
                if (res?.data?.restaurantInfo) {
                    dispatch(updateFloor(res?.data?.restaurantInfo.floor));
                }
            });
        }
    }, [isLogged]);

    const notificationListFirstPage = () => {
        getNotification({
            fetchPolicy: 'cache-and-network',
            variables: {
                pageSize: 10,
                currentPage: 1,
            },
        }).then((res) => {
            setListNotifications(
                res.data?.getMerchantNotificationList?.items ?? [],
            );
        });
    };

    const handleOpenChangeNoti = (newOpen: boolean) => {
        setOpenNoti(newOpen);
        newOpen && notificationListFirstPage();
    };

    const getMoreNoties = (page: number) => {
        getNotification({
            fetchPolicy: 'no-cache',
            variables: {
                pageSize: 10,
                currentPage: page,
            },
        }).then((res) => {
            const moreNoties =
                res?.data?.getMerchantNotificationList?.items || [];
            setListNotifications(listNotifications.concat(moreNoties));
            setTotalPages(
                res?.data?.getMerchantNotificationList?.page_info?.total_pages,
            );
        });
    };

    const loadMore = () => {
        if (currentPage < totalPages && !isLoadMore) {
            setLoadMore(true);
            setCurrentPage(currentPage + 1);
            getMoreNoties(currentPage + 1);
        }
    };

    const notificationTitle = (
        <Row style={{ borderBottom: '1px solid #ffca75', paddingBottom: 8 }}>
            <Col flex="auto">
                <NotiTitle>Notification</NotiTitle>
            </Col>
        </Row>
    );

    const notificatonContent = () => (
        <InfiniteScroll
            dataLength={listNotifications?.length}
            next={loadMore}
            hasMore={true}
            height={500}
            loader={
                isLoadMore ? (
                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                        <Spin size="small" style={{ color: 'pink' }} />
                    </div>
                ) : (
                    <></>
                )
            }
            style={{ width: 300 }}
        >
            {listNotifications?.map?.((item: any, idx: number) => (
                <NotificationItem key={idx}>
                    <AnnaBellStyle>
                        <img
                            style={{
                                cursor: 'pointer',
                                width: '30px',
                                height: '30px',
                            }}
                            src={blackNoti}
                            alt="blackNoti"
                        />
                    </AnnaBellStyle>
                    <div className="content-right" style={{ width: 330 }}>
                        <span
                            style={{
                                display: 'inline-block',
                                whiteSpace: 'break-spaces',
                                overflow: 'visible',
                                color: '#384052',
                            }}
                        >
                            Table {item?.title} - {item?.content}
                        </span>
                        <p
                            style={{
                                color: '#384052',
                                fontSize: 13,
                                marginTop: 3,
                            }}
                        >
                            {format(
                                new Date(item?.created_date),
                                'hh:mm a dd/MM/yyy',
                            )}
                        </p>
                    </div>
                </NotificationItem>
            ))}
        </InfiniteScroll>
    );

    const openCashier = () => {
        // onOpenCashier()
        //     .then((res) => {
        //         if (res) {
        //             notification.success({
        //                 message: 'Open Cashier Successful',
        //                 description:
        //                     'Please wait for few seconds to open Cashier',
        //             });
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        if (window?.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
                JSON.stringify({
                    type: 'openCashier',
                }),
            );
        }
    };

    const onToggleView = () => {
        dispatch(changeModeTableView());
        if (!isTableView) {
            navigation(BASE_ROUTER.MERCHANT_TABLEVIEW);
        } else {
            navigation(BASE_ROUTER.MERCHANT_ORDERLIST);
        }
    };
    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    zIndex: 1000,
                }}
            >
                <Layout.Header
                    style={{
                        padding: 0,
                        display: 'flex',
                        paddingRight: 0,
                        alignItems: 'center',
                        minHeight: 72,
                        background: theme.nEUTRALPrimary,
                        justifyContent: 'space-between',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Added box-shadow
                    }}
                >
                    <Row align="middle">
                        <Link
                            to={
                                isMerchant
                                    ? isTableView
                                        ? BASE_ROUTER.MERCHANT_TABLEVIEW
                                        : BASE_ROUTER.MERCHANT_ORDERLIST
                                    : BASE_ROUTER.HOME
                            }
                            style={{
                                cursor: 'pointer',
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: Colors.teal,
                                    height: 72,
                                    width: 72,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <HomeIcon color="white" />
                            </div>
                        </Link>
                        {isLogged && isMerchant && !isMobile && (
                            <SwitchContainer
                                style={{
                                    display: 'flex',
                                    marginLeft: 16,
                                    alignItems: 'center',
                                }}
                            >
                                <>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: Colors.grey3,
                                            fontWeight: 600,
                                            marginRight: 8,
                                        }}
                                    >
                                        Table View
                                    </Text>

                                    <Switch
                                        id="switchBtnTeal"
                                        defaultChecked={isTableView}
                                        onChange={() => {
                                            onToggleView();
                                        }}
                                        style={{
                                            marginLeft: 5,
                                            height: 32,
                                            width: 72,
                                        }}
                                    />
                                </>
                            </SwitchContainer>
                        )}
                    </Row>
                    <Row style={{ gap: 16 }} align={'middle'}>
                        {isLogged && (
                            <>
                                {showOnHeader.newOrder && (
                                    <ButtonV2
                                        style={{
                                            backgroundColor: Colors.teal,
                                        }}
                                        onClick={() =>
                                            navigation(
                                                `${BASE_ROUTER.TABLE}?tableId=${counterTable?.id}`,
                                            )
                                        }
                                    >
                                        New Order
                                    </ButtonV2>
                                )}
                                {showOnHeader.cashier && (
                                    <ButtonV2 onClick={() => openCashier()}>
                                        Open Cashier
                                    </ButtonV2>
                                )}
                                {showOnHeader.filter && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: 13,
                                            backgroundColor: theme.nEUTRALLine,
                                            borderRadius: 6,
                                        }}
                                    >
                                        <FilterV2 />
                                    </div>
                                )}
                                {showOnHeader.search && <SearchV2 />}
                                <Popover
                                    content={notificatonContent}
                                    title={notificationTitle}
                                    trigger="click"
                                    open={isOpenNoti}
                                    onOpenChange={handleOpenChangeNoti}
                                    overlayInnerStyle={{
                                        background: '#fff',
                                    }}
                                    placement={
                                        isMobile ? 'bottom' : 'bottomRight'
                                    }
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: 8,
                                            backgroundColor: theme.nEUTRALLine,
                                            borderRadius: 6,
                                        }}
                                    >
                                        <BellIcon />
                                    </div>
                                </Popover>
                                <DrawerMenuV2 />
                            </>
                        )}
                    </Row>
                </Layout.Header>
            </div>
        </>
    );
};

export default HeaderV2;

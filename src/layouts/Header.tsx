import { Button, Col, Layout, Popover, Row, Spin, Switch } from 'antd';

import { Link, useNavigate } from 'react-router-dom';
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
import BellIcon from 'assets/icons/bell';
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
import DrawerMenu from './components/DrawerMenu';
import HomeIcon from 'assets/icons/homeIcon';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';

const Header = () => {
    const { isLogged, isMerchant, isTableView } = useSelector(
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
        navigation(BASE_ROUTER.MERCHANT_ORDERLIST);
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
                        paddingRight: 20,
                        alignItems: 'center',
                        height: 56,
                        background: theme.nEUTRALPrimary,
                        paddingInline: 16,
                        justifyContent: 'space-between',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Added box-shadow
                    }}
                >
                    <Link
                        to={BASE_ROUTER.HOME}
                        style={{
                            cursor: 'pointer',
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        <HomeIcon />
                        <span style={{ fontSize: 20 }}>Home</span>
                    </Link>
                    <Row style={{ gap: 10 }} align={'middle'}>
                        {/* <BellIcon />
                            <HelpIcon /> */}
                        {/* <Button onClick={toggleTheme} title="Change Theme" /> */}
                        {isLogged && (
                            <>
                                {isMerchant && (
                                    <Row align={'middle'} style={{ gap: 30 }}>
                                        {!isMobile && (
                                            <Button
                                                type="primary"
                                                onClick={() => openCashier()}
                                            >
                                                <Text
                                                    style={{
                                                        color: theme.nEUTRALPrimary,
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    Open Cashier
                                                </Text>
                                            </Button>
                                        )}
                                        <SwitchContainer
                                            style={{
                                                display: 'flex',
                                                marginRight: 16,
                                                alignItems: 'center',
                                            }}
                                        >
                                            {!isMobile && (
                                                <>
                                                    <Text
                                                        style={{ fontSize: 18 }}
                                                    >
                                                        Table View
                                                    </Text>

                                                    <Switch
                                                        defaultChecked={
                                                            isTableView
                                                        }
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
                                            )}
                                        </SwitchContainer>
                                    </Row>
                                )}
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
                                        }}
                                    >
                                        <BellIcon />
                                    </div>
                                </Popover>
                                <DrawerMenu />
                            </>
                        )}
                    </Row>
                </Layout.Header>
            </div>
        </>
    );
};

export default Header;

import {
    Button,
    Col,
    Layout,
    notification,
    Popover,
    Row,
    Spin,
    Switch,
} from 'antd';
import { Text } from 'components/atom/Text';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Colors } from 'themes/colors';
import Logo from 'assets/logos/logo.png';
import LogoMerchant from 'assets/logos/merchantLogo.png';
// import HelpIcon from 'assets/icons/help';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';
import { useLazyQuery, useMutation } from '@apollo/client';
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
import { useTheme } from 'context/themeContext';
import { useMediaQuery } from 'react-responsive';
import { OPEN_CASHIER } from 'graphql/printer';

type Props = {
    children: React.ReactNode;
};

export const DarkLayout = (props: Props) => {
    const { children } = props;
    const {
        isLogged,
        firstname,
        lastname,
        restaurant_address,
        restaurant_name,
        isMerchant,
        isTableView,
    } = useSelector((state: RootState) => state.auth);
    const [onGetInfo] = useLazyQuery(USER_INFO);
    const [onGetRestaurent] = useLazyQuery(GET_RESTAURANT);
    const [getNotification] = useLazyQuery(GET_NOTIFICATION);
    const [onOpenCashier] = useMutation(OPEN_CASHIER);
    const dispatch = useDispatch();

    const { Header, Footer } = Layout;

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

    const [isOnline, setIsOnline] = useState(window.navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

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

    const notiTitle = (
        <Row style={{ borderBottom: '1px solid #ffca75', paddingBottom: 8 }}>
            <Col flex="auto">
                <NotiTitle>Notification</NotiTitle>
            </Col>
        </Row>
    );

    const noti = () => (
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

    const { theme } = useTheme();
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const openCashier = () => {
        onOpenCashier()
            .then((res) => {
                if (res) {
                    notification.success({
                        message: 'Open Cashier Successful',
                        description:
                            'Please wait for few seconds to open Cashier',
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const navigation = useNavigate();
    const onToggleView = () => {
        dispatch(changeModeTableView());
        navigation(BASE_ROUTER.MERCHANT_PAGE);
    };
    return (
        <Layout
            style={{
                backgroundColor: theme.nEUTRALPrimary,
                minHeight: '100vh',
                paddingTop: 64,
                paddingBottom: 100,
            }}
        >
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    zIndex: 1000,
                }}
            >
                <Header
                    style={{
                        padding: 0,
                        display: 'flex',
                        paddingRight: 20,
                        alignItems: 'center',
                        height: 56,
                        background: theme.nEUTRALPrimary,
                        paddingInline: 16,
                        justifyContent: 'space-between',
                    }}
                >
                    <Link
                        to={BASE_ROUTER.HOME}
                        style={{ cursor: 'pointer', height: 36 }}
                    >
                        {isMerchant ? (
                            <img src={LogoMerchant} style={{ height: 36 }} />
                        ) : (
                            <img src={Logo} style={{ height: 36 }} />
                        )}
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
                                    content={noti}
                                    title={notiTitle}
                                    trigger="click"
                                    open={isOpenNoti}
                                    onOpenChange={handleOpenChangeNoti}
                                    overlayInnerStyle={{
                                        background: '#fff',
                                    }}
                                    placement="bottomRight"
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
                </Header>
            </div>

            <div style={{ width: '100%' }}>{children}</div>
            {isLogged && !isMobile && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                        zIndex: 1000,
                    }}
                >
                    <Footer
                        style={{
                            textAlign: 'center',
                            background: theme.nEUTRALPrimary,
                            paddingInline: 16,
                            paddingBlock: isMobile ? 10 : 16,
                        }}
                    >
                        <Row justify={'space-between'}>
                            <Col style={{ textAlign: 'left' }}>
                                <Text style={{ fontWeight: '600' }}>
                                    {firstname} {lastname}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        marginTop: isMobile ? 0 : 6,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {restaurant_name} {'-'} {restaurant_address}
                                </Text>
                            </Col>
                            <Col
                                style={
                                    isMobile
                                        ? {
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              width: '100%',
                                              alignItems: 'center',
                                          }
                                        : {}
                                }
                            >
                                <Text
                                    style={{
                                        color: isOnline
                                            ? Colors.green
                                            : Colors.red,
                                        fontWeight: '600',
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                    >
                                        <circle
                                            cx="6"
                                            cy="6"
                                            r="6"
                                            fill={
                                                isOnline
                                                    ? Colors.green
                                                    : Colors.red
                                            }
                                        />
                                    </svg>{' '}
                                    {isOnline ? 'Connect' : 'Disconnect'}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: '400',
                                        color: Colors.grey5,
                                        marginTop: 5,
                                    }}
                                >
                                    {' '}
                                    Version 0.1.1.1
                                </Text>
                            </Col>
                        </Row>
                    </Footer>
                </div>
            )}
        </Layout>
    );
};

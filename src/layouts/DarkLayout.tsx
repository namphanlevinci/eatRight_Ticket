import { Col, Layout, Popover, Row, Spin } from 'antd';
import { Text } from 'components/atom/Text';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Colors } from 'themes/colors';
import Logo from 'assets/logos/logo.png';
import BoardMenuIcon from 'assets/icons/boardMenu';
// import HelpIcon from 'assets/icons/help';
import { Link, useLocation } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';
import { useLazyQuery } from '@apollo/client';
import { USER_INFO } from 'graphql/auth/login';
import { useDispatch } from 'react-redux';
import { updateCustomerInfo, updateFloor } from 'features/auth/authSlice';
import TableSimpleIcon from 'assets/icons/tableSimple';
import ReceiptBillIcon from 'assets/icons/receiptBill';
import SettingIcon from 'assets/icons/setting';
import TableSimpleDarkIcon from 'assets/icons/tableSimple-dark';
import ReceiptBillDarkIcon from 'assets/icons/receiptBillDark';
import SettingDarkIcon from 'assets/icons/setting-dark';
import { GET_RESTAURANT } from 'graphql/auth/restaurent';
import BellIcon from 'assets/icons/bell';
import blackNoti from 'assets/icons/black-noti.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import { format } from 'date-fns';
import { GET_NOTIFICATION } from 'graphql/notification';
import { NotiTitle, NotificationItem, AnnaBellStyle } from './styled';

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
    } = useSelector((state: RootState) => state.auth);
    const [onGetInfo] = useLazyQuery(USER_INFO);
    const [onGetRestaurent] = useLazyQuery(GET_RESTAURANT);
    const [getNotification] = useLazyQuery(GET_NOTIFICATION);

    const dispatch = useDispatch();

    const { Header, Footer } = Layout;
    const [open, setOpen] = useState(false);

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

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const handleOpenChangeNoti = (newOpen: boolean) => {
        setOpenNoti(newOpen);
        newOpen && notificationListFirstPage();
    };

    const MenuData = [
        {
            title: 'Table',
            icon: <TableSimpleIcon />,
            iconSelect: <TableSimpleDarkIcon />,
            to: BASE_ROUTER.HOME,
        },
        {
            title: 'Receipts',
            icon: <ReceiptBillIcon />,
            iconSelect: <ReceiptBillDarkIcon />,
            to: BASE_ROUTER.BILL,
        },
        {
            title: 'Settings',
            icon: <SettingIcon />,
            iconSelect: <SettingDarkIcon />,
            to: BASE_ROUTER.SETTINGS,
        },
    ];
    const location = useLocation();
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

    const content = () => {
        return (
            <div style={{ width: 226 }}>
                {MenuData.map((item, index) => {
                    return (
                        <Link to={item.to} key={index}>
                            <Row
                                style={{
                                    height: 64,
                                    gap: 16,
                                    paddingInline: 10,
                                    background:
                                        location.pathname === item.to
                                            ? Colors.primary
                                            : 'transparent',
                                    borderRadius: 16,
                                }}
                                align={'middle'}
                            >
                                {location.pathname === item.to
                                    ? item.iconSelect
                                    : item.icon}{' '}
                                <Text
                                    style={{
                                        color:
                                            location.pathname === item.to
                                                ? Colors.black
                                                : Colors.white,
                                        fontWeight: '600',
                                    }}
                                >
                                    {item.title}
                                </Text>
                            </Row>
                        </Link>
                    );
                })}
            </div>
        );
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
                                color: 'white',
                            }}
                        >
                            Table {item?.title} - {item?.content}
                        </span>
                        <p
                            style={{
                                color: '#fafafa',
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

    return (
        <Layout
            style={{
                backgroundColor: Colors.black,
                minHeight: '100vh',
                paddingTop: isLogged ? 64 : 0,
                paddingBottom: isLogged ? 100 : 0,
            }}
        >
            {isLogged && (
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
                            background: 'black',
                            paddingInline: 16,
                            justifyContent: 'space-between',
                        }}
                    >
                        <Link
                            to={BASE_ROUTER.HOME}
                            style={{ cursor: 'pointer', height: 36 }}
                        >
                            <img src={Logo} style={{ height: 36 }} />
                        </Link>
                        <Row style={{ gap: 10 }} align={'middle'}>
                            {/* <BellIcon />
                            <HelpIcon /> */}
                            <Popover
                                content={noti}
                                title={notiTitle}
                                trigger="click"
                                open={isOpenNoti}
                                onOpenChange={handleOpenChangeNoti}
                                overlayInnerStyle={{ background: '#4B3718' }}
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
                            <Popover
                                content={content}
                                trigger="click"
                                open={open}
                                onOpenChange={handleOpenChange}
                                overlayInnerStyle={{ background: '#4B3718' }}
                                placement="bottomRight"
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <BoardMenuIcon />
                                </div>
                            </Popover>
                        </Row>
                    </Header>
                </div>
            )}
            <div style={{ width: '100%' }}>{children}</div>
            {isLogged && (
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
                            background: Colors.black,
                            paddingInline: 16,
                            paddingBlock: 16,
                        }}
                    >
                        <Row justify={'space-between'}>
                            <Col style={{ textAlign: 'left' }}>
                                <Text style={{ fontWeight: '600' }}>
                                    {firstname} {lastname}
                                </Text>
                                <Text style={{ fontSize: 14, marginTop: 6 }}>
                                    {restaurant_name} {'-'} {restaurant_address}
                                </Text>
                            </Col>
                            <Col>
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

/* eslint-disable no-undef */
import { CheckOutlined } from '@ant-design/icons';
import { Badge, Popover, Row, Col, Switch, Button } from 'antd';

import moment from 'dayjs';
import React, { useState, useEffect } from 'react';
import iconNoti from '../assets/noti.png';
import blackNoti from '../assets/black-noti.png';
import { useNavigate } from 'react-router-dom';
// import { ConfirmLogoutModal } from '../../components/Modal/ModalConfirmLogout';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin } from 'antd';

import './index.scss';
import InputSearch from './SearchInput';
import DrawerMenu from 'layouts/components/DrawerMenu';
import { useSelector } from 'react-redux';
import { BASE_ROUTER } from 'constants/router';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import { SwitchContainer } from 'layouts/styled';
import { useMediaQuery } from 'react-responsive';
import { OPEN_CASHIER } from 'graphql/printer';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_NOTIFICATION } from 'graphql/notification';
import { changeModeTableView } from 'features/auth/authSlice';
import { useDispatch } from 'react-redux';
import HomeIconMerchant from '../assets/icons/homeIconMerchant';

function Header(props) {
    const { setSearchValue, isSearch } = props;
    const history = useNavigate();
    const [listNotifications, setListNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadMore, setLoadMore] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUnread, setTotalUnread] = useState(0);
    const { is_dine_in, isTableView } = useSelector((state) => state.auth);
    const calTime = (created_date) => {
        return moment(created_date).format('h:mm A, DD/MM/yyyy');
    };

    const makeReadAllNotification = () => {
        apiMakeReadAllNotification().then((res) => {
            if (res.data && !res.errors) {
                const temp = [...listNotifications];
                for (let i = 0; i < temp.length; i++) {
                    temp[i].is_read = 1;
                }
                setListNotifications(temp);
                setTotalUnread(0);
            } else {
                alert(res?.errors?.[0]?.message);
            }
        });
    };

    const styleNotificationItem = (is_read) => {
        if (is_read === 1) {
            return {
                opacity: 0.8,
                height: '100px',
                padding: '20px',
                display: 'flex',
                cursor: 'pointer',
                borderBottom: '1px solid #eeeeee',
                alignItems: 'center',
            };
        }
        return {
            height: '100px',
            padding: '20px',
            display: 'flex',
            cursor: 'pointer',
            borderBottom: '1px solid #eeeeee',
            alignItems: 'center',
        };
    };

    const iconStyle = (is_read) => {
        if (is_read === 0) {
            return {
                height: '48px',
                width: '48px',
                borderRadius: '300px',
                backgroundColor: '#FFC522',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                marginRight: 20,
            };
        }
        return {
            height: '48px',
            width: '48px',
            borderRadius: '300px',
            backgroundColor: '#C9C9C9',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            marginRight: 20,
        };
    };
    const [apiGetNotificationList] = useLazyQuery(GET_NOTIFICATION);
    const getMoreNoties = (page) => {
        apiGetNotificationList({
            variables: {
                type: 'merchant',
                currentPage: page,
            },
        }).then((res) => {
            if (res.data && !res.errors) {
                const moreNoties =
                    res?.data?.getMerchantNotificationList?.items || [];
                setListNotifications(listNotifications.concat(moreNoties));
                setTotalPages(
                    res?.data?.getMerchantNotificationList?.page_info
                        ?.total_pages,
                );
            }
            setLoadMore(false);
        });
    };
    useEffect(() => {
        getMoreNoties(currentPage);
    }, []);
    const loadMore = () => {
        if (currentPage < totalPages && !isLoadMore) {
            setLoadMore(true);
            setCurrentPage(currentPage + 1);
            getMoreNoties(currentPage + 1);
        }
    };

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
        >
            {listNotifications?.map?.((item, idx) => (
                <div
                    key={idx}
                    style={styleNotificationItem(item.is_read)}
                    onClick={() => {
                        console.log('123');
                    }}
                >
                    <div style={iconStyle(item.is_read)}>
                        <img
                            style={{
                                cursor: 'pointer',
                                width: '40px',
                                height: '40px',
                            }}
                            src={blackNoti}
                            alt=""
                        />
                    </div>
                    <div className="content-right" style={{ width: 330 }}>
                        <span
                            style={{
                                display: 'inline-block',
                                whiteSpace: 'break-spaces',
                                overflow: 'visible',
                                color: '#000',
                            }}
                        >
                            {item.content}
                        </span>
                        <p style={{ color: '#ccc' }}>
                            {calTime(item.created_date)}
                        </p>
                    </div>
                </div>
            ))}
        </InfiniteScroll>
    );

    const { theme } = useTheme();
    const title = (
        <Row>
            <Col flex="auto">
                <div className="notification-title">Notification</div>
            </Col>
            <Col flex="40px">
                <CheckOutlined
                    onClick={makeReadAllNotification}
                    style={{
                        fontSize: 28,
                        color: '#0A8D87',
                        cursor: 'pointer',
                    }}
                />
            </Col>
        </Row>
    );
    const [onOpenCashier] = useMutation(OPEN_CASHIER);
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
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const dispatch = useDispatch();
    return (
        <>
            <div className="header">
                <Row
                    align={'middle'}
                    justify={'space-between'}
                    style={{ width: '100%', paddingInline: 16 }}
                >
                    <div
                        className="header-left"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            color: 'var(--primary-6)',
                        }}
                    >
                        <div
                            onClick={() => {
                                isTableView
                                    ? history(BASE_ROUTER.HOME)
                                    : history(BASE_ROUTER.MERCHANT_PAGE);
                            }}
                            style={{
                                borderRadius: 300,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: '#F1F3F7',
                                padding: 5,
                            }}
                        >
                            <HomeIconMerchant />
                        </div>
                        <span style={{ fontSize: 20 }}>Home</span>
                    </div>
                    <div className="header-right" style={{ gap: 10 }}>
                        {isSearch && (
                            <InputSearch
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                                placeholder={
                                    is_dine_in
                                        ? 'Order Number Or Table'
                                        : 'Order Number'
                                }
                            />
                        )}
                        <Row style={{ gap: 30 }}>
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
                            {is_dine_in ? (
                                <SwitchContainer
                                    style={{
                                        display: 'flex',
                                        marginRight: 16,
                                        alignItems: 'center',
                                    }}
                                >
                                    {!isMobile && (
                                        <>
                                            <Text style={{ fontSize: 18 }}>
                                                Table View
                                            </Text>

                                            <Switch
                                                defaultChecked={isTableView}
                                                onChange={() => {
                                                    history(BASE_ROUTER.HOME);
                                                    dispatch(
                                                        changeModeTableView(),
                                                    );
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
                            ) : (
                                <></>
                            )}
                        </Row>
                        {/* <button
              style={{ marginRight: 25 }}
              className="header-btn"
              onClick={() => history.push("/shipper")}
            >
              SHIPPER
            </button> */}
                        <Popover
                            title={title}
                            content={noti}
                            placement="bottomRight"
                            className="dropdown-noti"
                            trigger="click"
                        >
                            <Badge
                                count={totalUnread ?? 0}
                                style={{
                                    backgroundColor: '#FFC522',
                                    color: '#000',
                                    borderColor: '#FFC522',
                                    fontWeight: 'bold',
                                    top: '5px',
                                    right: '2px',
                                }}
                            >
                                <img
                                    style={{ cursor: 'pointer', height: 40 }}
                                    src={iconNoti}
                                    alt=""
                                />
                            </Badge>
                        </Popover>
                        <DrawerMenu />
                    </div>
                </Row>
            </div>
            {/* <ConfirmLogoutModal
                isShowConfirmLogout={isShowConfirmLogout}
                closeModalConfirmLogout={() => setIsShowConfirmLogout(false)}
            /> */}
        </>
    );
}

export default Header;

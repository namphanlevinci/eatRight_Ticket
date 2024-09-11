/* eslint-disable no-undef */
import { CheckOutlined } from '@ant-design/icons';
import { Badge, Popover, Row, Col, Switch } from 'antd';

import moment from 'dayjs';
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo/logo.png';
import iconNoti from '../assets/noti.png';
import blackNoti from '../assets/black-noti.png';
import { useNavigate } from 'react-router-dom';
// import { ConfirmLogoutModal } from '../../components/Modal/ModalConfirmLogout';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin } from 'antd';

import './index.scss';
// import {
//     apiGetNotificationList,
//     apiMakeReadAllNotification,
// } from '../../apis/Notification';
// import { apiGetListOrderRefund, apiGetMerchantInfo } from "apis/Order";
import InputSearch from './SearchInput';
import DrawerMenu from '../DrawerMenu';
const urlWaiter = process.env.REACT_APP_WAITER_URL;
function Header(props) {
    const { reload, setSearchValue } = props;
    const history = useNavigate();
    const [isShowConfirmLogout, setIsShowConfirmLogout] = useState(false);
    // const [refundOrderList, setRefundOrderList] = useState([]);
    const [listNotifications, setListNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadMore, setLoadMore] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUnread, setTotalUnread] = useState(0);
    const [merchantInfo, setMerchantInfo] = useState();

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

    // const getMoreNoties = (page) => {
    //     apiGetNotificationList({
    //         type: 'merchant',
    //         currentPage: page,
    //     }).then((res) => {
    //         if (res.data && !res.errors) {
    //             const moreNoties =
    //                 res?.data?.getMerchantNotificationList?.items || [];
    //             setListNotifications(listNotifications.concat(moreNoties));
    //             setTotalPages(
    //                 res?.data?.getMerchantNotificationList?.page_info
    //                     ?.total_pages,
    //             );
    //             // setTotalUnread(res?.data?.notifications?.total_unread);
    //         }
    //         setLoadMore(false);
    //     });
    // };

    const loadMore = () => {
        if (currentPage < totalPages && !isLoadMore) {
            setLoadMore(true);
            setCurrentPage(currentPage + 1);
            getMoreNoties(currentPage + 1);
        }
    };

    const noti = () => (
        // <InfiniteScroll
        //     dataLength={listNotifications?.length}
        //     next={loadMore}
        //     hasMore={true}
        //     height={500}
        //     loader={
        //         isLoadMore ? (
        //             <div style={{ textAlign: 'center', marginTop: 20 }}>
        //                 <Spin size="small" style={{ color: 'pink' }} />
        //             </div>
        //         ) : (
        //             <></>
        //         )
        //     }
        // >
        //     {listNotifications?.map?.((item, idx) => (
        //         <div
        //             key={idx}
        //             style={styleNotificationItem(item.is_read)}
        //             onClick={() => {}}
        //         >
        //             <div style={iconStyle(item.is_read)}>
        //                 <img
        //                     style={{
        //                         cursor: 'pointer',
        //                         width: '40px',
        //                         height: '40px',
        //                     }}
        //                     src={blackNoti}
        //                     alt=""
        //                 />
        //             </div>
        //             <div className="content-right" style={{ width: 330 }}>
        //                 <span
        //                     style={{
        //                         display: 'inline-block',
        //                         whiteSpace: 'break-spaces',
        //                         overflow: 'visible',
        //                         color: '#000',
        //                     }}
        //                 >
        //                     {item.content}
        //                 </span>
        //                 <p style={{ color: '#ccc' }}>
        //                     {calTime(item.created_date)}
        //                 </p>
        //             </div>
        //         </div>
        //     ))}
        // </InfiniteScroll>
        <></>
    );
    const handleSignOut = () => {
        setIsShowConfirmLogout(true);
    };

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
    const setLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('i18nextLng', lang);
        getListNotifications();
    };
    return (
        <>
            <div className="header">
                <div className="container-box header-inner">
                    <div className="header-left">
                        <img
                            style={{ cursor: 'pointer' }}
                            className="header-logo"
                            src={logo}
                            alt={'logo'}
                            onClick={() => history.push('/')}
                        />
                    </div>
                    <div className="header-right">
                        <InputSearch
                            onChangeText={setSearchValue}
                            placeholder={
                                merchantInfo?.is_dine_in
                                    ? 'Order Number Or Table'
                                    : 'Order Number'
                            }
                        />
                        {merchantInfo?.is_dine_in ? (
                            <div style={{ display: 'flex', marginRight: 16 }}>
                                <div>Table View</div>
                                <Switch
                                    onChange={() => {
                                        const url = `${urlWaiter}?token=${localStorage.getItem(
                                            'access_token',
                                        )}&from=merchant`;
                                        window.location.href = url;
                                    }}
                                    style={{ marginLeft: 5 }}
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                        <button
                            style={{ marginRight: 25 }}
                            className="header-btn"
                            onClick={() => history.push('/history')}
                        >
                            Order History
                        </button>
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
                </div>
            </div>
            {/* <ConfirmLogoutModal
                isShowConfirmLogout={isShowConfirmLogout}
                closeModalConfirmLogout={() => setIsShowConfirmLogout(false)}
            /> */}
        </>
    );
}

export default Header;

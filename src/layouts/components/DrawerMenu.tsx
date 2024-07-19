import React, { useState } from 'react';
import { Drawer, Modal } from 'antd';
import BoardMenuIcon from 'assets/icons/boardMenu';

import StoreIcon from 'layouts/icons/storeIcon';
import MenuManagerIcon from 'layouts/icons/menuManagerIcon';
import PromotionsIcon from 'layouts/icons/promotions';
import AccountIcon from 'layouts/icons/accountIcon';
import ReceiptBillIcon from 'assets/icons/receiptBill';
import SettingIcon from 'assets/icons/setting';
import { BASE_ROUTER } from 'constants/router';
import { useNavigate } from 'react-router';
import { Header, RenderItem, RenderLogout } from './components';
import { useDispatch } from 'react-redux';
import { updateStatusLogout } from 'features/auth/authSlice';
export default function DrawerMenu() {
    const [open, setOpen] = useState(false);
    const navigation = useNavigate();
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const MenuData = [
        {
            title: 'Go Merchant',
            icon: <StoreIcon />,
            to: `http://localhost:3000/home?token=${localStorage.getItem('token')}`,
        },
        {
            title: 'Restaurent Manager',
            icon: <StoreIcon />,
            to: BASE_ROUTER.RESTAURENT_MANAGER,
        },
        {
            title: 'Menu Manager',
            icon: <MenuManagerIcon />,
            to: BASE_ROUTER.RESTAURENT_MANAGER,
        },
        {
            title: 'Promotions',
            icon: <PromotionsIcon />,
            to: BASE_ROUTER.RESTAURENT_MANAGER,
        },
        {
            title: 'Customers Information',
            icon: <AccountIcon />,
            to: BASE_ROUTER.RESTAURENT_MANAGER,
        },
        {
            title: 'Receipt Bill',
            icon: <ReceiptBillIcon />,
            to: BASE_ROUTER.BILL,
        },
        {
            title: 'Settings',
            icon: <SettingIcon />,
            to: BASE_ROUTER.SETTINGS,
        },
    ];
    const [modal, contextHolder] = Modal.useModal();
    const dispatch = useDispatch();
    const onLogout = async () => {
        const confirmed = await modal.confirm({
            title: 'Are you sure to logout ?',
            content: <></>,
            centered: true,
        });
        if (confirmed) {
            dispatch(updateStatusLogout());
        }
    };
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
                onClick={showDrawer}
            >
                <BoardMenuIcon />
            </div>
            {contextHolder}
            <Drawer
                title="Basic Drawer"
                onClose={onClose}
                open={open}
                styles={{
                    header: {
                        display: 'none',
                    },
                    body: {
                        background: 'rgba(31, 36, 47, 1)',
                        padding: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    },
                }}
            >
                <div style={{ flex: 1, overflow: 'auto' }}>
                    <Header
                        onClose={onClose}
                        onLogo={() => {
                            navigation(BASE_ROUTER.HOME);
                        }}
                    />
                    {MenuData.map((item, index) => (
                        <RenderItem
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            onPress={() => {
                                if (item.title === 'Go Merchant') {
                                    window.location.href = item.to;
                                    return;
                                }
                                navigation(item.to);
                            }}
                        />
                    ))}
                </div>
                <RenderLogout onPress={onLogout} />
            </Drawer>
        </>
    );
}

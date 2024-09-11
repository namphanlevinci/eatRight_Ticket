/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Drawer } from 'antd';
import { RenderItem, RenderLogout, Header } from './components/components';
import BoardMenuIcon from './assets/icons/boardMenu';
import { useNavigate } from 'react-router-dom';
import { ConfirmLogoutModal } from './components/Modal/ModalConfirmLogout';
import MenuManagerIcon from './assets/icons/menuManagerIcon';
import CustomerIcon from './assets/icons/customerIcon';
const BASE_ROUTER = {
    Menu: '/menu',
    HOME: '/',
};
const urlWaiter = process.env.REACT_APP_WAITER_URL;
export default function DrawerMenu() {
    const [open, setOpen] = useState(false);
    // const { isLightMode, toggleMode } = useContext(ThemeContext);
    const navigation = useNavigate();
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const MenuData = [
        {
            title: 'Menu Manager',
            icon: <MenuManagerIcon />,
            to: BASE_ROUTER.Menu,
        },
        {
            title: 'Customer Infomation',
            icon: <CustomerIcon />,
            to: `${urlWaiter}customer/list?token=${localStorage.getItem(
                'access_token',
            )}&from=merchant`,
            isGo: true,
        },
    ];
    const [isShowConfirmLogout, setIsShowConfirmLogout] = useState(false);
    const onLogout = async () => {
        setIsShowConfirmLogout(true);
    };
    return (
        <>
            <ConfirmLogoutModal
                isShowConfirmLogout={isShowConfirmLogout}
                closeModalConfirmLogout={() => setIsShowConfirmLogout(false)}
            />
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    marginLeft: 20,
                    paddingBottom: 2,
                }}
                onClick={showDrawer}
            >
                <BoardMenuIcon />
            </div>
            <Drawer
                title="Basic Drawer"
                onClose={onClose}
                open={open}
                bodyStyle={{
                    background: 'var(--form-background)',
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
                headerStyle={{ display: 'none' }}
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
                                if (item?.isGo) {
                                    window.location.href = item.to;
                                    return;
                                }
                                navigation(item.to);
                            }}
                            color={'var(--text-primary)'}
                        />
                    ))}
                </div>
                <RenderLogout onPress={onLogout} />
            </Drawer>
        </>
    );
}

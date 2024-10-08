import React from 'react';
import ic_back from '../../../Merchant/assets/icon/icon_back.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.scss';
import { BASE_ROUTER } from 'constants/router';

const MenuBar = ({ title = '' }) => {
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();

    const menuBar = [
        {
            key: 'menuManager/menu',
            title: 'Menus',
            path: BASE_ROUTER.MENU_PAGE,
        },
        {
            key: 'menuManager/category',
            title: 'Categories',
            path: BASE_ROUTER.CATEGORY_PAGE,
        },
        {
            key: 'menuManager/item',
            title: 'Items',
            path: BASE_ROUTER.ITEM_PAGE,
        },
    ];

    return (
        <div className="header-bottom">
            <h3 className="header-bottom-left">&nbsp;</h3>
            <div className="header-bottom-right">
                {menuBar.map((menu) => {
                    const isActive = pathname?.includes?.(menu.key);
                    return (
                        <div
                            onClick={() => navigate(menu.path)}
                            style={
                                isActive
                                    ? {
                                          borderBottom: '2px solid #389E0D',
                                      }
                                    : {}
                            }
                            className="header-bottom-right-item"
                            key={menu.key}
                        >
                            {menu.title}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MenuBar;

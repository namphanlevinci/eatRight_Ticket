import { BASE_ROUTER } from 'constants/router';
import { Suspense, useEffect, useState } from 'react';
import {
    Route,
    Routes,
    useNavigate,
    useSearchParams,
    useLocation,
} from 'react-router-dom';
import Container from 'containers/index';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import PrivateRoute from './PrivateRoute';
import { Page404 } from 'pages/404';
import { emitter } from 'graphql/client';
import { App, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import {
    updateIsTerminalPrinter,
    updateRestaurantConfig,
    updateStatusLogin,
    updateStatusLoginForMerchant,
    updateStatusLogout,
} from 'features/auth/authSlice';
import _ from 'lodash';
import { LoadingScreen } from './LoadingSpin';
import {
    GET_MERCHANT_CONFIG,
    GET_MERCHANT_RESTAURANT_CONFIG,
} from 'graphql/setups';
import {
    GET_CONFIG_PRINTER,
    LIST_PRINTER_DEVICES,
    SELECT_PRINTER_DEVICE,
    SELECT_TERMINAL_PRINTER_DEVICE_MERCHANT,
} from 'graphql/printer';
import { useLazyQuery, useMutation } from '@apollo/client';
import MerchantRoute from './MerchantRoute';
export const BaseRouter = () => {
    const { notification } = App.useApp();
    const dispatch = useDispatch();
    const { error } = Modal;
    const [needLogout, setNeedLogout] = useState(false);
    const [noStore, setNoStore] = useState(false);
    const { isLogged, isMerchant } = useSelector(
        (state: RootState) => state.auth,
    );
    const [urlParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const sendReactNativeLogout = () => {
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
                JSON.stringify({ type: 'logout' }),
            );
        }
    };
    const [onGetPrinterConfig] = useLazyQuery(GET_CONFIG_PRINTER);
    useEffect(() => {
        if (isMerchant) {
            document.title = 'EatRight Merchant';
            const link = document.querySelector(
                "link[rel='icon']",
            ) as HTMLLinkElement;
            if (link) {
                link.href = '/merchant.ico';
            }
        } else {
            document.title = 'EatRight Waiter';
            const link = document.querySelector(
                "link[rel='icon']",
            ) as HTMLLinkElement;
            if (link) {
                link.href = '/favicon.ico';
            }
        }
    }, [isMerchant]);

    // get token on params
    useEffect(() => {
        const token = urlParams.get('token');
        const from = urlParams.get('from');
        const tableId = urlParams.get('tableId');
        if (token) {
            localStorage.setItem('token', token);
            if (from === 'merchant') {
                dispatch(
                    updateStatusLoginForMerchant({
                        isTableView: JSON.parse(
                            localStorage.getItem('isTableView') || 'false',
                        ),
                    }),
                );
            } else {
                dispatch(updateStatusLogin());
                sendReactNativeLogout();
            }

            const { pathname } = location;
            if (tableId) {
                navigate(`${pathname}?tableId=${tableId}`);
            } else {
                navigate(pathname);
            }
        }
    }, []);

    useEffect(() => {
        const handleErrorMessages = _.debounce((error: any) => {
            notification.error({
                message: 'Error',
                description: error,
                placement: 'topRight',
                duration: 8,
            });
            console.log(error);
        }, 500);

        emitter.on('error', handleErrorMessages);
        // Lắng nghe sự kiện logoutError
        emitter.on('logout', () => {
            console.log('logout,123');
            setNeedLogout(true);
        });
        emitter.on('Store_not_existed', () => {
            setNoStore(true);
        });
    }, []);
    useEffect(() => {
        if (noStore) {
            error({
                title: 'Error',
                content: 'Your account not from any store !',
                onOk: () => {
                    setNeedLogout(false);
                    dispatch(updateStatusLogout());
                    Modal.destroyAll();
                },
                centered: true,
            });
        }
    }, [noStore]);
    const [onSetPrinterDevice] = useMutation(SELECT_PRINTER_DEVICE);
    const [onGetListPrinterDevice] = useLazyQuery(LIST_PRINTER_DEVICES);
    const [onSetPrinter] = useMutation(SELECT_TERMINAL_PRINTER_DEVICE_MERCHANT);
    const handleSelectPrinter = (id: string, printerName: string) => {
        onSetPrinterDevice({
            variables: {
                printer_id: id,
            },
        })
            .then(() => {
                notification.success({
                    message: 'Success',
                    description: 'Set up printer successfully',
                });
                localStorage.setItem('printer_id', id);
            })
            .catch(() => {
                console.log('error');
            });
        onSetPrinter({
            variables: {
                pos_id: id,
                is_used_terminal: false,
            },
        }).finally(() => {
            emitter.emit('printer_name', printerName);
            dispatch(updateIsTerminalPrinter(false));
        });
    };
    useEffect(() => {
        if (!isLogged) {
            return;
        }
        onGetPrinterConfig().then((res: any) => {
            dispatch(
                updateIsTerminalPrinter(
                    res?.data?.merchantGetPrinterConfig?.is_used_terminal ||
                        false,
                ),
            );
        });
        const handleMessage = (event: any) => {
            if (!window?.ReactNativeWebView) {
                return;
            }
            try {
                const data = JSON.parse(event.data);
                notification.success({
                    message: 'Connected Printer successfully',
                    description: data.data.deviceName,
                });
                localStorage.setItem('printer_name', data.data.deviceName);

                onGetListPrinterDevice({ fetchPolicy: 'no-cache' }).then(
                    (res: any) => {
                        const list = res?.data?.merchantGetListDevice?.prints;
                        const printer = list.find(
                            (item: any) =>
                                item?.printer_name == data.data.deviceName,
                        );
                        handleSelectPrinter(printer?.id, data.data.deviceName);
                    },
                );
            } catch (error) {
                console.log('error');
            }
        };

        window.addEventListener('message', handleMessage);
        document.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
            document.removeEventListener('message', handleMessage);
        };
    }, [isLogged]);
    useEffect(() => {
        if (needLogout) {
            console.log('needLogout', needLogout);
        }
        if (needLogout && isLogged) {
            const onLogout = () => {
                setNeedLogout(false);
                dispatch(updateStatusLogout());
                sendReactNativeLogout();
                Modal.destroyAll();
            };
            console.log('need show modal logout please');
            error({
                title: 'Session Expired',
                content: 'Please log in again!',
                onOk: () => {
                    onLogout();
                },
                onCancel: () => {
                    onLogout();
                },
                onClose: () => {
                    onLogout();
                },
                centered: true,
            });
        }
    }, [needLogout]);
    const [onGetRestaurantConfig] = useLazyQuery(
        GET_MERCHANT_RESTAURANT_CONFIG,
    );
    const [onGetConfig] = useLazyQuery(GET_MERCHANT_CONFIG);
    useEffect(() => {
        if (isLogged) {
            setNeedLogout(false);
            onGetRestaurantConfig({ fetchPolicy: 'no-cache' }).then(
                (res: any) => {
                    if (res.data) {
                        dispatch(
                            updateRestaurantConfig({
                                isOpenPrice:
                                    res?.data?.merchantGetRestaurantConfig
                                        ?.open_pricing,
                                isAutoConfirmItem:
                                    res?.data?.merchantGetRestaurantConfig
                                        ?.auto_confirm_item,
                            }),
                        );
                    }
                },
            );
            onGetConfig({ fetchPolicy: 'no-cache' }).then((res: any) => {
                if (res.data) {
                    dispatch(
                        updateRestaurantConfig({
                            isPrintKitchenCopy:
                                res?.data?.merchantGetConfig
                                    ?.print_kitchen_copy,
                        }),
                    );
                }
            });
        }
    }, [isLogged]);
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Routes>
                <Route path={BASE_ROUTER.LOGIN} element={<Container.Login />} />
                <Route
                    path={BASE_ROUTER.REQUEST_ACCOUNT}
                    element={<Container.RequestAccount />}
                />
                <Route
                    path={BASE_ROUTER.FORGOT_PASSWORD}
                    element={<Container.ForgotPassword />}
                />
                <Route
                    path={BASE_ROUTER.HOME}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.TABLE}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.Table />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.ABOUT}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.About />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.TABLE_BILL}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.TableBill />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.TABLE_BILL_CHECKOUT}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.TableSplitBill />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.TABLE_Order}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.TableOrder />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.BILL_DETAIL}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.BillDetail />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.SETTINGS}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.Settings />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.SETTINGS_PROFILE}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.SettingsProfile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.BILL}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.BillList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.SETTINGS_PASSWORD}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.SettingsPassword />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.SETTINGS_PRINTER}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.PrinterSetup />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.CUSTOMER_NEW}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.NewCustomer />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.CUSTOMER_LIST}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.ListCustomer />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.CUSTOMER_Detail}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.CustomerDetail />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.RESTAURENT_MANAGER}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.RestaurentGeneral />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.RESTAURENT_RESERVATION}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.RestaurentReservation />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.RESTAURENT_KITCHEN_STATION}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.KitchenStationReservation />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.RESTAURENT_KITCHEN_STATION_DETAIL}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.KitchenStationDetailReservation />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.RESTAURENT_TERMINAL}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.Terminal />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.RESTAURENT_TERMINAL_DETAIL}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.TerminalDetail />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.RESTAURENT_Tip}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.RestaurentTip />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.RESTAURENT_ORDERING}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.RestaurentOrdering />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.MERCHANT_TABLEVIEW}
                    element={
                        <MerchantRoute
                            isAuthenticated={isLogged}
                            isMerchant={isMerchant}
                        >
                            <Container.Merchant.TableView />
                        </MerchantRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.MERCHANT_ORDERLIST}
                    element={
                        <MerchantRoute
                            isAuthenticated={isLogged}
                            isMerchant={isMerchant}
                        >
                            <Container.Merchant.OrderList />
                        </MerchantRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.MERCHANT_BATCH_HISTORY}
                    element={
                        <MerchantRoute
                            isAuthenticated={isLogged}
                            isMerchant={isMerchant}
                        >
                            <Container.Merchant.BatchHistory />
                        </MerchantRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.MERCHANT_SETTLE}
                    element={
                        <MerchantRoute
                            isAuthenticated={isLogged}
                            isMerchant={isMerchant}
                        >
                            <Container.Merchant.Settle />
                        </MerchantRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.MERCHANT_TRANSACTIONS}
                    element={
                        <MerchantRoute
                            isAuthenticated={isLogged}
                            isMerchant={isMerchant}
                        >
                            <Container.Merchant.Transactions />
                        </MerchantRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.MERCHANT_SALES_REPORT}
                    element={
                        <MerchantRoute
                            isAuthenticated={isLogged}
                            isMerchant={isMerchant}
                        >
                            <Container.Report />
                        </MerchantRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.MERCHANT_REPORT_BY_PAYMENT}
                    element={
                        <MerchantRoute
                            isAuthenticated={isLogged}
                            isMerchant={isMerchant}
                        >
                            <Container.ReportByPayment />
                        </MerchantRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.MENU_PAGE_NEW}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.Menu_Detail_Page />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.MENU_PAGE_EDIT}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.Menu_Detail_Page />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.CATEGORY_PAGE_NEW}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.CategoryPage_DETAIL />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.CATEGORY_PAGE_EDIT}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.CategoryPage_DETAIL />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.ITEM_PAGE_EDIT}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.ItemPage_DETAIL />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.MENU_PAGE}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.MenuPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.CATEGORY_PAGE}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.CategoryPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.ITEM_PAGE}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.ItemPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.ITEM_PAGE_NEW}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.ItemPage_DETAIL />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.RECEIPTS}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.ReceiptsContainer />
                        </PrivateRoute>
                    }
                />
                <Route path={'*'} element={<Page404 />} />
            </Routes>
        </Suspense>
    );
};

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
    updateStatusLogin,
    updateStatusLoginForMerchant,
    updateStatusLogout,
} from 'features/auth/authSlice';
import _ from 'lodash';
import { LoadingScreen } from './LoadingSpin';
export const BaseRouter = () => {
    const { notification } = App.useApp();
    const dispatch = useDispatch();
    const { error } = Modal;
    const [needLogout, setNeedLogout] = useState(false);
    const [noStore, setNoStore] = useState(false);
    const { isLogged } = useSelector((state: RootState) => state.auth);
    const [urlParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    // get token on params
    useEffect(() => {
        const token = urlParams.get('token');
        const from = urlParams.get('from');
        const tableId = urlParams.get('tableId');
        if (token) {
            localStorage.setItem('token', token);
            if (from === 'merchant') {
                dispatch(updateStatusLoginForMerchant());
            } else {
                dispatch(updateStatusLogin());
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
            });
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
    useEffect(() => {
        if (needLogout) {
            console.log('needLogout', needLogout);
        }
        if (needLogout && isLogged) {
            console.log('need show modal logout please');
            error({
                title: 'Session Expired',
                content: 'Please log in again!',
                onOk: () => {
                    setNeedLogout(false);
                    dispatch(updateStatusLogout());
                    Modal.destroyAll();
                },
                centered: true,
            });
        }
    }, [needLogout]);
    useEffect(() => {
        if (isLogged) {
            setNeedLogout(false);
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
                    path={BASE_ROUTER.MERCHANT_PAGE}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.MerchantPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.BATCH_HISTORY}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.BatchHistory />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.SETTLE}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.Settle />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.TRANSACTIONS}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.Transactions />
                        </PrivateRoute>
                    }
                />
                <Route path={'*'} element={<Page404 />} />
            </Routes>
        </Suspense>
    );
};

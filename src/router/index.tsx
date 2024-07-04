import { BASE_ROUTER } from 'constants/router';
import { Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from 'containers/index';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import PrivateRoute from './PrivateRoute';
import { Page404 } from 'pages/404';
import { emitter } from 'graphql/client';
import { App, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { updateStatusLogout } from 'features/auth/authSlice';
import _ from 'lodash';
export const BaseRouter = () => {
    const { notification } = App.useApp();
    const dispatch = useDispatch();
    const { error } = Modal;
    const [needLogout, setNeedLogout] = useState(false);
    const { isLogged } = useSelector((state: RootState) => state.auth);
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
    }, []);

    useEffect(() => {
        if (needLogout) {
            console.log('needLogout', needLogout);
        }
        if (needLogout && isLogged) {
            console.log('need show modal logout please');
            error({
                title: 'Error',
                content: 'Token is expried !',
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
        <Suspense fallback={'loading'}>
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
                <Route path={'*'} element={<Page404 />} />
            </Routes>
        </Suspense>
    );
};

import { BASE_ROUTER } from 'constants/router';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from 'containers/index';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import PrivateRoute from './PrivateRoute';
import { Page404 } from 'pages/404';
import _ from 'lodash';
import { LoadingScreen } from './LoadingSpin';

export const BaseRouter = () => {
    const { isLogged } = useSelector((state: RootState) => state.auth);

    return (
        <Suspense fallback={<LoadingScreen />}>
            <Routes>
                <Route path={BASE_ROUTER.LOGIN} element={<Container.Login />} />
                <Route
                    path={BASE_ROUTER.REQUEST_ACCOUNT}
                    element={<Container.RequestAccount />}
                />
                <Route
                    path={BASE_ROUTER.HOME}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.Ticket />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={BASE_ROUTER.TICKET}
                    element={
                        <PrivateRoute isAuthenticated={isLogged}>
                            <Container.Ticket />
                        </PrivateRoute>
                    }
                />
                <Route path={'*'} element={<Page404 />} />
            </Routes>
        </Suspense>
    );
};

import { lazy } from 'react';

export const containers = {
    Home: lazy(() => import('containers/Home')),
    Login: lazy(() => import('containers/Login')),
    Ticket: lazy(() => import('containers/Ticket')),
    RequestAccount: lazy(() => import('containers/RequestAccount')),
};

export default containers;

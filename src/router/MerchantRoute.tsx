import { BASE_ROUTER } from 'constants/router';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface IProps {
    isAuthenticated: boolean;
    isMerchant: boolean;
    children: ReactNode;
}

const MerchantRoute = ({ isAuthenticated, isMerchant, children }: IProps) => {
    if (!isAuthenticated) {
        return <Navigate to={BASE_ROUTER.LOGIN} />;
    }
    if (!isMerchant) {
        return <Navigate to={BASE_ROUTER.HOME} />;
    }

    return <>{children}</>;
};

export default MerchantRoute;

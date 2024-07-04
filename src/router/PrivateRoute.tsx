import { BASE_ROUTER } from 'constants/router';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, children }: any) => {
    return isAuthenticated ? children : <Navigate to={BASE_ROUTER.LOGIN} />;
};

export default PrivateRoute;

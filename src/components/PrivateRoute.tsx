import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
    isAuth?: boolean;
    children?: ReactNode;
    redirectTo?: string;
}

const PrivateRoute = ({ isAuth,children, redirectTo = '/'}: PrivateRouteProps) => {
    
    if (!isAuth) {
      return <Navigate to={redirectTo} />;
    }
    return children ? children : <Outlet/>;
}

export default PrivateRoute
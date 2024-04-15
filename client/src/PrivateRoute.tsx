import { Navigate, RouteProps } from 'react-router-dom';
import { isAuthenticated } from './shared/services/auth';

export function PrivateRoute({ children }: RouteProps): JSX.Element {
	return <>{isAuthenticated() ? children : <Navigate to='/login' />}</>;
}

export default PrivateRoute;

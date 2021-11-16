import { UserRole } from 'enums/userRole.enum';
import { isAuth } from 'helpers/auth';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { RootState } from 'store/store';

const PrivateRoute = ({
  children,
  path,
  render,
  userType = 'normal',
}: RouteProps & { userType?: 'normal' | 'business' | 'unauthorized' }) => {
  const role = useSelector((state: RootState) => state.user?.role);

  if (
    (userType === 'business' && role === UserRole.Standard) ||
    (userType !== 'unauthorized' && !isAuth()) ||
    (userType === 'unauthorized' && isAuth())
  )
    return <Redirect to="/" />;

  if (render)
    return (
      <Route path={path} render={render}>
        {children}
      </Route>
    );

  return <Route path={path}>{children}</Route>;
};

export default PrivateRoute;

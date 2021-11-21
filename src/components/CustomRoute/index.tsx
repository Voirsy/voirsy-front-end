import { UserRole } from 'enums/userRole.enum';
import { UserType } from 'enums/userType.enum';
import { isAuth } from 'helpers/auth';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { RootState } from 'store/store';

const PrivateRoute = ({ children, path, render, userType = UserType.Normal }: RouteProps & { userType?: UserType }) => {
  const role = useSelector((state: RootState) => state.user?.role);

  if (
    (userType === UserType.Business && role === UserRole.Standard) ||
    (userType !== UserType.Unauthorized && !isAuth()) ||
    (userType === UserType.Unauthorized && isAuth())
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

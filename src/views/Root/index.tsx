import DeleteAccount from 'views/DeleteAccount';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from 'views/Home';
import ChangePassword from 'views/ChangePassword';
import EditAccount from 'views/EditAccount';
import MainTemplate from 'templates/Main';
import Login from 'views/Login';
import SalonsTemplate from 'templates/Salons';
import Edit from 'views/Admin/Details';
import Portfolio from 'views/Admin/Portfolio';
import Schedule from 'views/Admin/Schedule';
import Favorites from 'views/Favorites';
import Salon from 'views/Salon';
import Header from 'components/Header';
import CustomRoute from 'components/CustomRoute';
import { UserType } from 'enums/userType.enum';
import { Suspense } from 'react';
import CreateSalonForm from 'views/Admin/CreateSalonForm';

const Root = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Suspense fallback="loading">
      <MainTemplate>
        <Switch>
          <CustomRoute userType={UserType.Unauthorized} path="/login">
            <Login />
          </CustomRoute>
          <CustomRoute
            path="/profile"
            render={({ match: { url } }) => (
              <>
                <Header />
                <Switch>
                  <Route path={`${url}/edit`}>
                    <EditAccount />
                  </Route>
                  <Route path={`${url}/password`}>
                    <ChangePassword />
                  </Route>
                  <Route path={`${url}/delete`}>
                    <DeleteAccount />
                  </Route>
                  <Route path={`${url}/favorites`}>
                    <Favorites />
                  </Route>
                  <Route path="*">
                    <Redirect to={`${url}/edit`} />
                  </Route>
                </Switch>
              </>
            )}
          />

          <CustomRoute
            userType={UserType.Business}
            path="/salons"
            render={({ match: { url } }) => (
              <>
                <Header />
                <Switch>
                  <Route path={`${url}/:salonId/calendar`}>
                    <SalonsTemplate>
                      <Schedule />
                    </SalonsTemplate>
                  </Route>
                  <Route path={`${url}/:salonId/portfolio`}>
                    <SalonsTemplate>
                      <Portfolio />
                    </SalonsTemplate>
                  </Route>
                  <Route path={`${url}/create-salon`}>
                    <CreateSalonForm />
                  </Route>
                  <Route path={[`${url}/:salonId/details`]}>
                    <SalonsTemplate>
                      <Edit />
                    </SalonsTemplate>
                  </Route>
                  <Route path="*">
                    <SalonsTemplate></SalonsTemplate>
                  </Route>
                </Switch>
              </>
            )}
          />

          <Route
            path="/"
            render={({ match: { url } }) => (
              <>
                <Header />
                <Home />
                <Switch>
                  <Route path={`${url}:salonId/reviews`}>
                    <Salon />
                  </Route>
                  <Route path={`${url}:salonId/portfolio`}>
                    <Salon />
                  </Route>
                  <CustomRoute path={`${url}:salonId/reservation/:serviceId`}>
                    <Salon />
                  </CustomRoute>
                  <Route path={[`${url}:salonId`, `${url}:salonId/information`]}>
                    <Salon />
                  </Route>
                </Switch>
              </>
            )}
          />
        </Switch>
      </MainTemplate>
    </Suspense>
  </Router>
);

export default Root;

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from 'components/Header';
import DeleteAccount from 'views/DeleteAccount';
import Home from 'views/Home';
import ChangePassword from 'views/ChangePassword';
import EditAccount from 'views/EditAccount';
import MainTemplate from 'templates/Main';
import Login from 'views/Login';
import SalonsTemplate from 'templates/Salons';
import Edit from 'views/Admin/Edit';
import Portfolio from 'views/Admin/Portfolio';
import Schedule from 'views/Admin/Schedule';
import CustomRoute from 'components/CustomRoute';
import { UserType } from 'enums/userType.enum';
import Salon from '../Salon';

const Root = () => (
  <Router>
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
                  <p>Favorites</p>
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
                <Route path={`${url}/:salonId/schedule`}>
                  <SalonsTemplate>
                    <Schedule />
                  </SalonsTemplate>
                </Route>
                <Route path={`${url}/:salonId/portfolio`}>
                  <SalonsTemplate>
                    <Portfolio />
                  </SalonsTemplate>
                </Route>
                <Route path={`${url}/add/:step`}>
                  <p>Add salon</p>
                </Route>
                <Route path={[`${url}/:salonId/edit`]}>
                  <SalonsTemplate>
                    <Edit />
                  </SalonsTemplate>
                </Route>
                <Route path="*">
                  <SalonsTemplate>
                    <span>Loading...</span>
                  </SalonsTemplate>
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
                  <Salon pageType="reviews" />
                </Route>
                <Route path={`${url}:salonId/portfolio`}>
                  <Salon pageType="portfolio" />
                </Route>
                <CustomRoute path={`${url}:salonId/reservation`}>
                  <Salon pageType="reservation" />
                </CustomRoute>
                <Route path={[`${url}:salonId`, `${url}:salonId/information`]}>
                  <Salon pageType="information" />
                </Route>
              </Switch>
            </>
          )}
        />
      </Switch>
    </MainTemplate>
  </Router>
);

export default Root;

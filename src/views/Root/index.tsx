import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from 'components/Header';
import DeleteAccount from 'views/DeleteAccount';
import Home from 'views/Home';
import ChangePassword from 'views/ChangePassword';
import EditAccount from 'views/EditAccount';
import MainTemplate from 'templates/Main';
import Login from 'views/Login';

const Root = () => (
  <Router>
    <MainTemplate>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route
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
                <Route path="*">
                  <Redirect to="/edit" />
                </Route>
              </Switch>
            </>
          )}
        />

        <Route
          path="/salons"
          render={({ match: { url } }) => (
            <>
              <Header />
              <Switch>
                <Route path={`${url}/:salonId/schedule`}>
                  <p>Schedule</p>
                </Route>
                <Route path={`${url}/:salonId/portfolio`}>
                  <p>Portfolio</p>
                </Route>
                <Route path={`${url}/add/:step`}>
                  <p>Add salon</p>
                </Route>
                <Route path={`${url}/:salonId/edit`}>
                  <p>Edit</p>
                </Route>
                <Route path="*">
                  <p>All salons</p>
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
                  <p>The salon reviews</p>
                </Route>
                <Route path={`${url}:salonId/portfolio`}>
                  <p>The salon portfolio</p>
                </Route>
                <Route path={`${url}:salonId/reservation`}>
                  <p>Reservation</p>
                </Route>
                <Route path={[`${url}:salonId`, `${url}:salonId/information`]}>
                  <p>Information about salon</p>
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

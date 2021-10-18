import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from 'components/Header';
import theme from 'theme';
import EditProfile from 'views/EditProfile';
import Home from 'views/Home';

const Root = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/login">
          <p>Login</p>
        </Route>
        <Route path="/signin">
          <p>Sign in</p>
        </Route>
        <Route path="/signup">
          <p>Sign up</p>
        </Route>

        <Route
          path="/profile"
          render={({ match: { url } }) => (
            <>
              <Header />
              <Switch>
                <Route path={`${url}/edit`}>
                  <EditProfile />
                </Route>
                <Route path={`${url}/password`}>
                  <p>Change password</p>
                </Route>
                <Route path={`${url}/delete`}>
                  <p>Delete account</p>
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
    </ThemeProvider>
  </Router>
);

export default Root;

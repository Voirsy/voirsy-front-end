import { Grid, Typography } from '@mui/material';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import SignInForm from './Components/SignInForm';
import SignUpForm from './Components/SignUpForm';
import { CustomContainer } from './login.styles';

const Login = () => {
  const { path } = useRouteMatch();
  return (
    <CustomContainer>
      <Grid container justifyContent="center">
        <Grid item xs={12} container justifyContent="center" rowSpacing={10}>
          <Typography variant="h3" component="h1">
            Voirsy
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} container justifyContent="center">
          <Switch>
            <Route exact path={'/login'}>
              <LoginForm />
            </Route>
            <Route path={`${path}/signin`}>
              <SignInForm />
            </Route>
            <Route path={`${path}/signup`}>
              <SignUpForm />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </CustomContainer>
  );
};

export default Login;

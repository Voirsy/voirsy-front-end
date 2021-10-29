import { AppBar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/store';
import { CustomToolbar, CustomButton } from './header.styles';
import { isAuth } from 'helpers/auth';

const Header = () => {
  const [translation] = useTranslation();
  const fullname = useSelector((state: RootState) => state.user?.fullname);

  return (
    <AppBar color="transparent" elevation={0} position="static">
      <CustomToolbar>
        <Typography variant="h4" component="h1">
          {translation('header:title')}
        </Typography>
        {isAuth() ? (
          fullname
        ) : (
          <Link to="/login">
            <CustomButton variant="contained" color="primary" disableElevation>
              {translation('header:button.signin')}
            </CustomButton>
          </Link>
        )}
      </CustomToolbar>
    </AppBar>
  );
};

export default Header;

import { MenuOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Theme, Typography, useMediaQuery } from '@mui/material';
import ProfileNavigation from 'components/ProfileNavigation';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/store';
import { CustomToolbar, CustomButton } from './header.styles';
import { isAuth } from 'helpers/auth';

const Header = () => {
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [translation] = useTranslation();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fullname = useSelector((state: RootState) => state.user?.fullname);

  return (
    <>
      <AppBar
        color="transparent"
        elevation={0}
        position="relative"
        sx={{ zIndex: (theme) => ({ md: theme.zIndex.drawer + 1, sm: 1 }) }}
      >
        <CustomToolbar>
          <Typography variant="h4" component="h1">
            {translation('header:title')}
          </Typography>
          <div>
            {isAuth() ? (
              <>
                {fullname}
                {pathname.startsWith('/profile') && !hidden ? (
                  <IconButton onClick={() => setIsMenuOpen(true)}>
                    <MenuOutlined />
                  </IconButton>
                ) : null}
              </>
            ) : (
              <Link to="/login">
                <CustomButton variant="contained" color="primary" disableElevation>
                  {translation('header:button.signin')}
                </CustomButton>
              </Link>
            )}
          </div>
        </CustomToolbar>
      </AppBar>
      {pathname.startsWith('/profile') && (
        <ProfileNavigation handleClose={() => setIsMenuOpen(false)} isMenuOpen={isMenuOpen} />
      )}
    </>
  );
};

export default Header;

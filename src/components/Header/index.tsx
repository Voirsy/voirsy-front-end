import { MenuOutlined } from '@mui/icons-material';
import { IconButton, Theme, Typography, useMediaQuery } from '@mui/material';
import ProfileNavigation from 'components/ProfileNavigation';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/store';
import { CustomToolbar, CustomButton, CustomAppBar } from './header.styles';
import { isAuth } from 'helpers/auth';
import AdminPanelNavigation from 'components/AdminPanelNavigation';

const Header = () => {
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [translation] = useTranslation();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fullname = useSelector((state: RootState) => state.user?.fullname);

  return (
    <>
      <CustomAppBar color="transparent" elevation={0} position="relative">
        <CustomToolbar>
          <Typography variant="h4" component="h1">
            {translation('header:title')}
          </Typography>
          <div>
            {isAuth() ? (
              <>
                {fullname}
                {(pathname.startsWith('/profile') || pathname.startsWith('/salons')) && !hidden ? (
                  <IconButton onClick={() => setIsMenuOpen(true)}>
                    <MenuOutlined />
                  </IconButton>
                ) : (
                  <>
                    <Link to="/salons">S</Link>
                    <Link to="/profile/edit">P</Link>
                  </>
                )}
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
      </CustomAppBar>
      {isAuth() && pathname.startsWith('/profile') && (
        <ProfileNavigation handleClose={() => setIsMenuOpen(false)} isMenuOpen={isMenuOpen} />
      )}
      {isAuth() && pathname.startsWith('/salons') && (
        <AdminPanelNavigation handleClose={() => setIsMenuOpen(false)} isMenuOpen={isMenuOpen} />
      )}
    </>
  );
};

export default Header;

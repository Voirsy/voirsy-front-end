import { MenuOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Theme, Typography, useMediaQuery } from '@mui/material';
import ProfileNavigation from 'components/ProfileNavigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { CustomToolbar, CustomButton } from './header.styles';

const Header = () => {
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [translation] = useTranslation();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            {!pathname.startsWith('/profile') && (
              <CustomButton variant="contained" color="primary" disableElevation>
                {translation('header:button.signin')}
              </CustomButton>
            )}
            {pathname.startsWith('/profile') && !hidden && (
              <IconButton onClick={() => setIsMenuOpen(true)}>
                <MenuOutlined />
              </IconButton>
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

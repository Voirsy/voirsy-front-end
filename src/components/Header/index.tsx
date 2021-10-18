import { AppBar, Typography } from '@mui/material';
import ProfileNavigation from 'components/ProfileNavigation';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { CustomToolbar, CustomButton } from './header.styles';

const Header = () => {
  const [translation] = useTranslation();
  const { pathname } = useLocation();

  return (
    <AppBar color="transparent" elevation={0} position="static">
      <CustomToolbar>
        <Typography variant="h4" component="h1">
          {translation('header:title')}
        </Typography>
        {pathname.startsWith('/profile') ? (
          <ProfileNavigation />
        ) : (
          <CustomButton variant="contained" color="primary" disableElevation>
            {translation('header:button.signin')}
          </CustomButton>
        )}
      </CustomToolbar>
    </AppBar>
  );
};

export default Header;

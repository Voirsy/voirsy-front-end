import { AppBar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomToolbar, CustomButton } from './header.styles';

const Header = () => {
  const [t] = useTranslation();

  return (
    <AppBar color="transparent" elevation={0} position="static">
      <CustomToolbar>
        <Typography variant="h4" component="h1">
          {t('header:title')}
        </Typography>
        <CustomButton variant="contained" color="primary" disableElevation>
          {t('header:button.signin')}
        </CustomButton>
      </CustomToolbar>
    </AppBar>
  );
};

export default Header;

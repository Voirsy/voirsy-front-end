import { AppBar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomToolbar, CustomButton } from './header.styles';

const Header = () => {
  const [translation] = useTranslation();

  return (
    <AppBar color="transparent" elevation={0} position="static">
      <CustomToolbar>
        <Typography variant="h4" component="h1">
          {translation('header:title')}
        </Typography>
        <CustomButton variant="contained" color="primary" disableElevation>
          {translation('header:button.signin')}
        </CustomButton>
      </CustomToolbar>
    </AppBar>
  );
};

export default Header;

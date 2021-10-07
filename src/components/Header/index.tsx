import { AppBar, Typography } from '@mui/material';
import { CustomToolbar, CustomButton } from './header.styles';

const Header = () => (
  <AppBar color="transparent" elevation={0} position="static">
    <CustomToolbar>
      <Typography variant="h4" component="h1">
        Voirsy
      </Typography>
      <CustomButton variant="contained" color="primary" disableElevation>
        Sign In
      </CustomButton>
    </CustomToolbar>
  </AppBar>
);

export default Header;

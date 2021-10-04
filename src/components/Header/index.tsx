import { AppBar, Toolbar } from '@mui/material';
import { CustomTypography, CustomButton } from './header.styles';

const Header = () => (
  <AppBar color="transparent" elevation={0} position="static">
    <Toolbar>
      <CustomTypography variant="h4">Voirsy</CustomTypography>
      <CustomButton variant="contained" color="primary" disableElevation={true}>
        Sign In
      </CustomButton>
    </Toolbar>
  </AppBar>
);

export default Header;

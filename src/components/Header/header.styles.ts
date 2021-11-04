import { styled } from '@mui/system';
import { AppBar, Button, Toolbar } from '@mui/material';

export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  zIndex: 1,

  [theme.breakpoints.up('md')]: {
    zIndex: (theme.zIndex as any).drawer + 1,
  },
}));

export const CustomToolbar = styled(Toolbar)(() => ({
  justifyContent: 'space-between',
}));

export const CustomButton = styled(Button)(() => ({
  color: '#fff',
}));

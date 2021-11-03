import { styled } from '@mui/system';
import { AppBar, Button, Toolbar } from '@mui/material';

export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  zIndex: (theme.zIndex as any).drawer,

  [theme.breakpoints.up('md')]: {
    zIndex: 1,
  },
}));

export const CustomToolbar = styled(Toolbar)(() => ({
  justifyContent: 'space-between',
}));

export const CustomButton = styled(Button)(() => ({
  color: '#fff',
}));

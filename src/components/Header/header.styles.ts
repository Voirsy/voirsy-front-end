/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from '@mui/system';
import { AppBar, Button, IconButton, Toolbar } from '@mui/material';

export const CustomAppBar = styled(AppBar)(({ theme }) => ({
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

export const CustomMenuButton = styled(IconButton)(() => ({
  paddingLeft: 0,
  paddingRight: 20,
}));

export const CustomAvatarButton = styled(IconButton)(() => ({
  padding: 0,
}));

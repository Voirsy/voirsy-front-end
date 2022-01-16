/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from '@mui/system';
import { AppBar, Button, IconButton, MenuItem, Toolbar, Typography } from '@mui/material';
import theme from 'theme';
import { Link, LinkProps } from 'react-router-dom';

export const CustomAppBar = styled(AppBar)(() => ({
  zIndex: 1,

  [theme.breakpoints.up('md')]: {
    zIndex: (theme.zIndex as any).drawer + 1,
  },
}));

export const CustomToolbar = styled(Toolbar)(() => ({
  justifyContent: 'space-between',
}));

export const CustomButton = styled(Button)<Partial<LinkProps>>(() => ({
  color: '#fff',
  textDecoration: 'none',
}));

export const CustomMenuButton = styled(IconButton)(() => ({
  paddingLeft: 0,
  paddingRight: theme.spacing(2.5),
}));

export const CustomAvatarButton = styled(IconButton)(() => ({
  padding: 0,
}));

export const CustomAuthorName = styled(Typography)(() => ({
  marginRight: theme.spacing(1),
  height: 'fit-content',
  color: theme.palette.grey[500],
}));

export const CustomMenuItem = styled(MenuItem)<Partial<LinkProps>>(() => ({
  paddingRight: theme.spacing(3),
}));

export const CustomPageTitle = styled(Link)`
  text-decoration: none;
  color: ${theme.palette.text.primary};
`;

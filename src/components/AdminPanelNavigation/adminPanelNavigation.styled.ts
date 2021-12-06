import { styled } from '@mui/system';
import { Card, colors, Drawer, Paper, Toolbar } from '@mui/material';
import theme from 'theme';

export const CustomToolbar = styled(Toolbar)(() => ({
  justifyContent: 'flex-end',
}));

export const CustomDrawer = styled(Drawer)(() => ({
  [theme.breakpoints.down('md')]: {
    '.MuiDrawer-paper': {
      width: '100%',
    },
  },

  '.MuiDrawer-paper': {
    border: 0,
  },
}));

export const CustomCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active }) => ({
  padding: theme.spacing(1),
  '& a': {
    textDecoration: 'none',
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
  },
}));

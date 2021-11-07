import { styled } from '@mui/system';
import { Card, Drawer, Toolbar } from '@mui/material';

export const CustomToolbar = styled(Toolbar)(() => ({
  justifyContent: 'flex-end',
}));

export const CustomDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    '.MuiDrawer-paper': {
      width: '100%',
    },
  },

  '.MuiDrawer-paper': {
    border: 0,
  },
}));

export const CustomCard = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.common.white,

  '& a': {
    textDecoration: 'none',
    color: theme.palette.common.white,
  },
}));

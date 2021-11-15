import { styled } from '@mui/system';
import { Card, Drawer, Toolbar } from '@mui/material';
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

export const CustomCard = styled(Card)(() => ({
  background: theme.palette.primary.main,

  '& a': {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
  },
}));

export const CustomAddSalonCard = styled(CustomCard)(() => ({
  background: theme.palette.grey[100],
  textTransform: 'uppercase',

  '& a': {
    textDecoration: 'none',
    color: theme.palette.grey[700],
  },

  '& svg': {
    width: '36px',
    height: '36px',
  },
}));

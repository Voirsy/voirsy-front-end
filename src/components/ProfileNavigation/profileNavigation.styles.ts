import { styled } from '@mui/system';
import { Drawer, List, Toolbar } from '@mui/material';

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

export const CustomList = styled(List)(({ theme }) => ({
  '& > a': {
    color: theme.palette.text.primary,
    [theme.breakpoints.up('md')]: {
      width: '100%',
      padding: '8px 40px',
    },
  },

  '& > .selected': {
    color: theme.palette.primary.main,

    '& svg': {
      fill: theme.palette.primary.main,
    },
  },
}));

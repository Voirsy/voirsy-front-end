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
  [theme.breakpoints.up('md')]: {
    paddingTop: 70,
  },

  '& > a': {
    color: theme.palette.text.primary,
    [theme.breakpoints.up('md')]: {
      width: '100%',
      padding: '8px 40px',
      '&:not(:last-of-type)': {
        marginBottom: 10,
      },
    },
  },

  '& > .selected': {
    color: theme.palette.primary.main,
  },

  '& > .selected svg': {
    fill: theme.palette.primary.main,
  },
}));

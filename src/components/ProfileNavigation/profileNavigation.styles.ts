import { styled } from '@mui/system';
import { Drawer, List, Toolbar } from '@mui/material';

export const CustomToolbar = styled(Toolbar)(() => ({
  justifyContent: 'flex-end',
}));

export const CustomDrawer = styled(Drawer)(() => ({
  '.MuiDrawer-paper': {
    width: '100%',
  },
}));

export const CustomList = styled(List)(({ theme }) => ({
  '& > a': {
    color: theme.palette.text.primary,
  },

  '& > .selected': {
    color: theme.palette.primary.main,
  },

  '& > .selected svg': {
    fill: theme.palette.primary.main,
  },
}));

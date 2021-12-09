import { styled } from '@mui/system';
import { Fab } from '@mui/material';
import theme from 'theme';

export const CustomFab = styled(Fab)(() => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
}));

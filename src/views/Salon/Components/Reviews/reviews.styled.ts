import { styled } from '@mui/system';
import { Fab, Paper } from '@mui/material';
import theme from 'theme';

export const CustomFab = styled(Fab)(() => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
}));

export const ReviewCard = styled(Paper)(() => ({
  padding: theme.spacing(2),
  height: `calc(100% - ${theme.spacing(4)})`,
}));

import { styled } from '@mui/system';
import { Box, Fab, Paper } from '@mui/material';
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

export const CustomModal = styled(Box)(() => ({
  position: 'absolute',
  zIndex: theme.zIndex.modal + 1,
  background: 'white',
  bottom: 0,
  left: 0,
  right: 0,
  borderTop: `1px solid ${theme.palette.grey['300']}`,
  padding: theme.spacing(2),
}));

import { styled } from '@mui/system';
import { Box } from '@mui/material';
import theme from 'theme';

export const CustomWrapper = styled(Box)(() => ({
  position: 'absolute',
  inset: 0,
  padding: '25px',
  width: '100%',
  maxWidth: '1000px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  overflowY: 'auto',
  overflowX: 'hidden',

  [theme.breakpoints.up('md')]: {
    top: theme.spacing(4),
    bottom: theme.spacing(4),
    left: '50%',
    transform: 'translateX(-50%)',
  },

  ':focus-visible': {
    outline: 'none',
  },
}));

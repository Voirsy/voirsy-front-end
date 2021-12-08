import { styled } from '@mui/system';
import { Box, IconButton, Typography } from '@mui/material';
import theme from 'theme';
import { LinkProps } from 'react-router-dom';

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

export const CustomLink = styled(IconButton)<Partial<LinkProps>>(() => ({
  alignSelf: 'center',
  width: '48px',
  height: '48px',
  padding: '2px',
  '> svg': {
    fontSize: '46px',
  },
}));

export const CustomSalonName = styled(Typography)(() => ({
  fontSize: '28px',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  maxWidth: '100%',
}));

export const CustomSalonAddress = styled(Typography)(() => ({
  fontSize: '14px',
  color: theme.palette.text.primary,
}));

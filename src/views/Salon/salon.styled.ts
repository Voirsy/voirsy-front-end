import { styled } from '@mui/system';
import { Box, IconButton, Typography } from '@mui/material';
import theme from 'theme';
import { LinkProps } from 'react-router-dom';

export const CustomWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  inset: 0,
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
  padding: '2px',

  '> svg': {
    fontSize: '34px',
  },

  [theme.breakpoints.up('md')]: {
    '> svg': {
      fontSize: '46px',
    },
  },
}));

export const CustomSalonName = styled(Typography)(() => ({
  fontSize: '18px',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,

  [theme.breakpoints.up('md')]: {
    fontSize: '28px',
  },
}));

export const CustomSalonAddress = styled(Typography)(() => ({
  color: theme.palette.text.primary,

  [theme.breakpoints.up('md')]: {
    fontSize: '14px',
  },
}));

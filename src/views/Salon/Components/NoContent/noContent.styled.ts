import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import theme from 'theme';

export const Text = styled(Typography)(() => ({
  fontSize: theme.typography.h3.fontSize,
  color: theme.palette.grey['400'],
  textAlign: 'center',
}));

export const IconWrapper = styled('div')(() => ({
  svg: {
    width: '80px',
    height: '80px',
    fill: theme.palette.grey['400'],
  },
}));

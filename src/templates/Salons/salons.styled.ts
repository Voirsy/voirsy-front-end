/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, styled } from '@mui/system';
import theme from 'theme';

export const CustomEditHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const CustomSalonsNavigation = styled(Box)(() => ({
  display: 'none',

  [theme.breakpoints.up('md')]: {
    display: 'block',
    minWidth: '250px',
    maxWidth: '250px',
  },
}));

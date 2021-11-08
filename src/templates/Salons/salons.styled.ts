/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, styled } from '@mui/system';
import theme from 'theme';

export const CustomBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,

  [theme.breakpoints.up('sm')]: {
    height: `calc(100vh - ${(theme.mixins.toolbar['@media (min-width:600px)'] as any).minHeight}px)`,
  },

  '@media (orientation: landscape)': {
    height: `calc(100vh - ${
      (theme.mixins.toolbar['@media (min-width:0px) and (orientation: landscape)'] as any).minHeight
    }px)`,
  },
}));

export const CustomEditHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

export const CustomSalonsNavigation = styled(Box)(() => ({
  display: 'none',

  [theme.breakpoints.up('md')]: {
    display: 'block',
    maxWidth: '250px',
  },
}));

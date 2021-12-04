import { FormControl, styled, Typography } from '@mui/material';
import theme from 'theme';

export const CustomInputLabel = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isOpen' })<{
  isOpen: boolean;
}>(({ isOpen }) => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(1),
  color: isOpen ? theme.palette.background.paper : theme.palette.text.primary,
  textTransform: 'uppercase',

  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(2),
  },
}));

export const CustomFormControl = styled(FormControl, { shouldForwardProp: (prop) => prop !== 'isOpen' })<{
  isOpen: boolean;
}>(({ isOpen }) => ({
  flexGrow: 1,
  minWidth: '130px',
  borderRadius: theme.shape.borderRadius,
  background: isOpen ? theme.palette.primary.main : theme.palette.background.paper,
  'svg *': {
    fill: isOpen ? theme.palette.background.paper : theme.palette.text.primary,
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '140px',
  },
}));

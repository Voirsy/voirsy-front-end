import { FormControl, styled, Typography } from '@mui/material';
import theme from 'theme';

export const InputWrapper = styled('div')(() => ({
  boxSizing: 'border-box',
  height: '40px',
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '400px',
  },
  div: {
    flexGrow: 1,
  },
  button: {
    margin: `0 ${theme.spacing(1)}`,
  },
}));

export const CustomInputLabel = styled(Typography)(() => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
  color: theme.palette.background.paper,
}));

export const CustomFormControl = styled(FormControl)(() => ({
  width: '120px',
  background: theme.palette.primary.main,
  fieldset: {
    borderColor: theme.palette.primary.main,
  },
  'svg *': {
    fill: theme.palette.background.paper,
  },
}));

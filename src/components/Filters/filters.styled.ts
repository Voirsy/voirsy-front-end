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
  div: {
    flexGrow: 1,
  },
  button: {
    margin: `0 ${theme.spacing(1)}`,
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '400px',
  },
}));

export const CustomInputLabel = styled(Typography)<{ isPrimary?: boolean }>(({ isPrimary }) => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
  color: isPrimary ? theme.palette.background.paper : theme.palette.text.primary,
  textTransform: 'uppercase',
}));

export const CustomFormControl = styled(FormControl)<{ isPrimary?: boolean }>(({ isPrimary }) => ({
  flexGrow: 1,
  borderRadius: theme.shape.borderRadius,
  background: isPrimary ? theme.palette.primary.main : theme.palette.background.paper,
  fieldset: {
    borderColor: isPrimary ? theme.palette.primary.main : theme.palette.grey[400],
  },
  'svg *': {
    fill: isPrimary ? theme.palette.background.paper : theme.palette.text.primary,
  },
  [theme.breakpoints.up('sm')]: {
    width: '140px',
  },
}));

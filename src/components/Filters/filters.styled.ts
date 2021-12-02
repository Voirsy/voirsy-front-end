import { styled } from '@mui/material';
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
  ':focus-within': {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '400px',
  },
}));

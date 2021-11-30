import { styled } from '@mui/material';
import theme from 'theme';

export const InputWrapper = styled('div')(() => ({
  height: '36px',
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: '5px',
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

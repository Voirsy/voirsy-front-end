import { Button } from '@mui/material';
import { styled } from '@mui/system';
import theme from 'theme';

export const CustomForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flexGrow: 1,
}));

export const CustomButton = styled(Button)(() => ({
  marginTop: theme.spacing(2),
}));

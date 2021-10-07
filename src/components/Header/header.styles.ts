import { styled } from '@mui/system';
import { Button, Toolbar } from '@mui/material';

export const CustomToolbar = styled(Toolbar)(() => ({
  justifyContent: 'space-between',
}));

export const CustomButton = styled(Button)(() => ({
  color: '#fff',
}));

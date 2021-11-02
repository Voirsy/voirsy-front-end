import { Container } from '@mui/material';
import { styled } from '@mui/system';

export const CustomContainer = styled(Container)(() => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

import { Grid } from '@mui/material';
import { styled } from '@mui/system';

export const CustomImg = styled('img')(() => ({
  width: '90%',
  height: '100%',
}));

export const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
}));

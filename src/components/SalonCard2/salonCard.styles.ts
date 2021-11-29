import { Paper } from '@mui/material';
import { styled } from '@mui/system';

export const CustomImg = styled('img')(() => ({
  width: '100%',
  height: '100%',
}));

export const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

import { Paper } from '@mui/material';
import { styled } from '@mui/system';
import theme from 'theme';

export const CustomPaper = styled(Paper)(() => ({
  padding: theme.spacing(1),
  flexGrow: 1,
}));

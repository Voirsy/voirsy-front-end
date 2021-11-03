import { alpha, Button } from '@mui/material';
import { styled } from '@mui/system';
import { LinkProps } from 'react-router-dom';

export const CustomButton = styled(Button)<LinkProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  borderColor: alpha(theme.palette.common.black, 0.23),
  '&:hover': {
    borderColor: alpha(theme.palette.common.black, 0.23),
  },
}));

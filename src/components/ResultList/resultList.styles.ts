import { Box, Container, TextField } from '@mui/material';
import { styled } from '@mui/system';

export const CustomContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export const CustomSelect = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset, .MuiSelect-select': {
      borderRadius: 30,
    },
  },
}));

export const CustomBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

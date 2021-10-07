import { alpha, Button, Chip, Grid, styled, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';

export const CustomTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: 30,
    },
  },
}));

export const CustomLocationButton = styled(Button)(() => ({
  height: '40px',
  justifyContent: 'space-between',
  borderRadius: 30,
  color: alpha('#000', 0.87),
  borderColor: grey[400],
}));

export const CustomChipContainer = styled(Grid)(() => ({
  overflowX: 'auto',
}));

export const CustomChip = styled(Chip)(({ theme }) => ({
  flexGrow: 1,
  margin: theme.spacing(0, 0.5),
}));

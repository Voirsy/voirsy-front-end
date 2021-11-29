import { Card, Chip, styled } from '@mui/material';
import theme from 'theme';

export const CustomCard = styled(Card)`
  width: 320px;
  position: relative;
`;

export const Rating = styled(Chip)(() => ({
  position: 'absolute',
  background: theme.palette.background.paper,
  top: '10px',
  left: '10px',

  '.MuiChip-icon': {
    color: theme.palette.warning.light,
  },
}));

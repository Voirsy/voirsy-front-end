import { Card, CardContent, Chip, IconButton, styled } from '@mui/material';
import theme from 'theme';

export const CustomCard = styled(Card)`
  width: 320px;
  position: relative;
`;

export const CustomCardContent = styled(CardContent)`
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

export const HeartButton = styled(IconButton)(() => ({
  position: 'absolute',
  background: theme.palette.background.paper,
  top: `-${theme.spacing(3)}`,
  right: theme.spacing(2),
  boxShadow: theme.shadows[6],

  ':hover': {
    backgroundColor: theme.palette.background.paper,
  },
}));

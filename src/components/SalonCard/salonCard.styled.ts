import { Card, CardContent, Chip, IconButton, styled } from '@mui/material';
import theme from 'theme';
import { SalonType } from 'enums/salonType.enum';

export const CustomCard = styled(Card)`
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

export const SalonTypeChip = styled(Chip)<{ salonType: SalonType }>(({ salonType }) => ({
  backgroundColor: theme.palette.salonType[salonType],
  color: theme.palette.getContrastText(theme.palette.text.primary),
}));

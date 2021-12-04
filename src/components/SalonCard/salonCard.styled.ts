import { Card, CardContent, Chip, IconButton, styled } from '@mui/material';
import theme from 'theme';
import { Link } from 'react-router-dom';

export const CustomCard = styled(Card)`
  position: relative;
`;

export const CustomCardContent = styled(CardContent)`
  position: relative;

  :last-child {
    padding-bottom: ${theme.spacing(2)};
  }
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

export const CustomLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,

  ':hover': {
    color: theme.palette.text.secondary,
  },
}));

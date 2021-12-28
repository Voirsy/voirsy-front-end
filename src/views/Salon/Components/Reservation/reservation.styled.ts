import { styled } from '@mui/system';
import { Paper } from '@mui/material';
import theme from 'theme';

export const Checkbox = styled('input')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  margin: 0,
  opacity: 0,
  cursor: 'pointer',
}));

export const Tile = styled(Paper, { shouldForwardProp: (prop) => prop !== 'isActive' })<{
  isActive: boolean;
}>(({ isActive }) => ({
  width: '140px',
  padding: theme.spacing(1.5),
  position: 'relative',
  background: isActive ? theme.palette.primary.main : 'translate',
  color: isActive ? theme.palette.getContrastText(theme.palette.text.primary) : theme.palette.text.primary,
}));

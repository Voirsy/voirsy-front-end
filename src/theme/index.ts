import { colors, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#66e0ff',
      main: '#19aed4',
      dark: '#007ea3',
      contrastText: colors.grey[50],
    },
    secondary: {
      light: '#fa70ab',
      main: '#c43d7c',
      dark: '#8f0050',
      contrastText: '#fff',
    },
    text: {
      primary: colors.grey[900],
      secondary: colors.grey[600],
    },
  },
});

export default theme;

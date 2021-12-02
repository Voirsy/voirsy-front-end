import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#66e0ff',
      main: '#19aed4',
      dark: '#007ea3',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fa70ab',
      main: '#c43d7c',
      dark: '#8f0050',
      contrastText: '#fff',
    },
  },
});

export default theme;

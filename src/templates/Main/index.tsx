import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';
import theme from 'theme';

const Main = ({ children }: { children: ReactNode }) => (
  <SnackbarProvider>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </LocalizationProvider>
  </SnackbarProvider>
);

export default Main;

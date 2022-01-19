import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';
import AuthTemplate from 'templates/Auth';
import theme from 'theme';
import { useTranslation } from 'react-i18next';
import { AvailableLocales, locales } from '../../config/locales';

const Main = ({ children }: { children: ReactNode }) => {
  const [, i18n] = useTranslation();

  const lng = i18n.language as AvailableLocales;

  return (
    <AuthTemplate>
      <SnackbarProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={locales[lng]}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </LocalizationProvider>
      </SnackbarProvider>
    </AuthTemplate>
  );
};

export default Main;

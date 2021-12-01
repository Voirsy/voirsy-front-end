import { createTheme } from '@mui/material';
import { SalonType } from 'enums/salonType.enum';

declare module '@mui/material/styles' {
  interface Palette {
    salonType: {
      [key in SalonType]: string;
    };
  }
  interface PaletteOptions {
    salonType?: {
      [key in SalonType]?: string;
    };
  }
}

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
    salonType: {
      Barbers: '#FF7F11',
      Beauticians: '#D6A2AD',
      Hairdressers: '#7371FC',
      Tattooists: '#B80C09',
    },
  },
});

export default theme;

import { createTheme, ThemeOptions } from '@mui/material';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#822434',
      contrastText: '#fdca2f',
    },
    secondary: {
      main: '#255062',
    },
  },
  typography: {
    fontFamily: '"Courier Prime", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: 'secondary',
      },
    },
  },
};

export const lightTheme = createTheme(themeOptions);
export const darkTheme = createTheme(themeOptions);

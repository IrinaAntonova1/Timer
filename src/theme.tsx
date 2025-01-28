// src/theme.ts
import { createTheme } from '@mui/material/styles';

// Настраиваем кастомную тему
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Зеленый
    },
    secondary: {
      main: '#f44336', // Красный
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
  },
});

export default theme;

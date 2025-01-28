import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Импорт кастомной темы
import Timer from './Timer'; // Подключаем твой компонент

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>  {/* Оборачиваем компонент в ThemeProvider */}
      <Timer />
    </ThemeProvider>
  );
};

export default App;

import React, { useState, useRef, useEffect } from 'react';
import { Button, Typography, Box, TextField, Alert } from '@mui/material';

const Timer: React.FC = () => {
  // Стейт для секундомера
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Стейт для таймера с обратным отсчетом
  const [minutes, setMinutes] = useState<string>(''); // Теперь minutes — это строка
  const [seconds, setSeconds] = useState<string>(''); // Теперь seconds — это строка
  const [countdownTime, setCountdownTime] = useState<number>(0); // countdownTime — это число
  const [error, setError] = useState<string>(''); // Ошибка
  const [isCountdownRunning, setIsCountdownRunning] = useState(false); // Запущен ли таймер

  const countdownRef = useRef<number | null>(null);

  // Обработчик изменения минут
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 2) value = value.slice(0, 2); // Ограничиваем ввод двух цифр
    if (Number(value) > 59) value = '59'; // Ограничиваем минуты до 59

    setMinutes(value);
    setError('');
  };

  // Обработчик изменения секунд
  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 2) value = value.slice(0, 2); // Ограничиваем ввод двух цифр
    if (Number(value) > 59) value = '59'; // Ограничиваем секунды до 59

    setSeconds(value);
    setError('');
  };

  // Преобразуем время в секунды
  useEffect(() => {
    if (minutes && seconds) {
      const minutesInSeconds = Number(minutes) * 60;
      const secondsValue = Number(seconds);
      setCountdownTime(minutesInSeconds + secondsValue);
    }
  }, [minutes, seconds]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const resetTimer = () => {
    if (!isRunning) {
      setTime(0);
    }
  };

  const startCountdown = () => {
    if (countdownTime > 0 && !isCountdownRunning) {
      setIsCountdownRunning(true);
      countdownRef.current = setInterval(() => {
        setCountdownTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdownRef.current!);
            setIsCountdownRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const pauseCountdown = () => {
    if (isCountdownRunning) {
      setIsCountdownRunning(false);
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    }
  };

  const resetCountdown = () => {
    if (!isCountdownRunning) {
      setCountdownTime(0);
      setMinutes('');
      setSeconds('');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 2 }}>
      {/* Секундомер */}
      <Typography variant="h3" color="primary">
        {new Date(time * 1000).toISOString().slice(11, 19)}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={isRunning ? pauseTimer : startTimer}>
          {isRunning ? 'Пауза' : 'Старт'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={resetTimer} disabled={isRunning}>
          Сброс
        </Button>
      </Box>

      {/* Таймер с обратным отсчетом */}
      <Typography variant="h4" color="secondary" sx={{ marginTop: 4 }}>
        Таймер с обратным отсчетом
      </Typography>

      {/* Поля для ввода минут и секунд */}
      <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
        <TextField
          label="Минуты"
          value={minutes}
          onChange={handleMinutesChange}
          variant="outlined"
          slotProps={{
            input: {
              inputProps: {
                max: 59,
                min: 0,
                type: 'number',
              },
            },
          }}
          sx={{ width: '100px' }}
        />
        <TextField
          id="seconds-input"
          label="Секунды"
          value={seconds}
          onChange={handleSecondsChange}
          variant="outlined"
          slotProps={{
            input: {
              inputProps: {
                max: 59,
                min: 0,
                type: 'number',
              },
            },
          }}
          sx={{ width: '100px' }}
        />
      </Box>

      {/* Отображаем оставшееся время */}
      <Typography variant="h5">
        {new Date(countdownTime * 1000).toISOString().slice(11, 19)}
      </Typography>

      {/* Если есть ошибка, показываем Alert */}
      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={startCountdown}
          disabled={countdownTime <= 0 || isCountdownRunning} // Блокируем кнопку, если время = 0 или таймер уже запущен
        >
          Старт
        </Button>
        <Button variant="outlined" color="secondary" onClick={pauseCountdown} disabled={!isCountdownRunning}>
          Пауза
        </Button>
        <Button variant="outlined" color="secondary" onClick={resetCountdown} disabled={isCountdownRunning}>
          Сброс
        </Button>
      </Box>
    </Box>
  );
};

export default Timer;

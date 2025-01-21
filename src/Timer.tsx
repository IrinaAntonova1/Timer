import React, { useState, useEffect } from 'react';
import './Timer.css'; // Импортируем стили

const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(0); // Текущее время
  const [isRunning, setIsRunning] = useState<boolean>(false); // Состояние таймера (запущен или остановлен)

  // Функция для запуска таймера
  const startTimer = () => {
    setIsRunning(true);
  };

  // Функция для паузы таймера
  const pauseTimer = () => {
    setIsRunning(false);
  };

  // Функция для сброса времени
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  // useEffect для обновления времени каждую секунду
  useEffect(() => {
    let timer: number;

    if (isRunning) {
      timer = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div className="timer-container">
      <h1>Время: {time} секунд</h1>
      <div>
        <button onClick={isRunning ? pauseTimer : startTimer} disabled={isRunning && time === 0}>
          {isRunning ? 'Пауза' : time === 0 ? 'Старт' : 'Продолжить'}
        </button>
        <button onClick={resetTimer} disabled={isRunning}>
          Сброс
        </button>
      </div>
    </div>
  );
};

export default Timer;


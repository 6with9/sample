import React, { useState, useRef } from 'react';
import './PomodoroTimer.css';

const POMODORO_SECONDS = 25 * 60;

function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setSecondsLeft(POMODORO_SECONDS);
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  // 半円ゲージ用
  const percent = 1 - secondsLeft / POMODORO_SECONDS;
  const radius = 60;
  const circumference = Math.PI * radius;
  const progress = percent * circumference;

  return (
    <div className="pomodoro-timer">
      <h3>ポモドーロタイマー</h3>
      <div className="gauge-container">
        <svg width="140" height="80" viewBox="0 0 140 80">
          {/* 背景の半円 */}
          <path
            d="M 10 70 A 60 60 0 0 1 130 70"
            fill="none"
            stroke="#444"
            strokeWidth="12"
          />
          {/* 進捗の半円 */}
          <path
            d="M 10 70 A 60 60 0 0 1 130 70"
            fill="none"
            stroke="#ff6b6b"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: 'stroke-dashoffset 0.5s linear' }}
          />
        </svg>
        <div className="time">{minutes}:{seconds}</div>
      </div>
      <div className="controls">
        <button onClick={startTimer} disabled={isRunning}>スタート</button>
        <button onClick={pauseTimer} disabled={!isRunning}>一時停止</button>
        <button onClick={resetTimer}>リセット</button>
      </div>
    </div>
  );
}

export default PomodoroTimer;
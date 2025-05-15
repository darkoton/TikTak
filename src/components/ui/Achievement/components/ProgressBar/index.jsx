'use client'
import style from './style.module.scss'
import { useState, useEffect } from 'react'

const ProgressBar = ({ onAnimationEnd }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 6000; // 6 секунд
    const intervalTime = 30;
    const decrement = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev - decrement;
        if (next <= 0) {
          clearInterval(interval);
          setTimeout(() => onAnimationEnd(), 0);
          return 0;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onAnimationEnd]);

  return <div
    className={style.progress}
    style={{
      width: `${progress}%`,
    }}
  ></div>
}

export default ProgressBar
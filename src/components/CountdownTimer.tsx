"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  duration: number;
  onComplete?: () => void;
}

export default function CountdownTimer({
  duration,
  onComplete,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.5) {
          clearInterval(timer);
          onComplete?.();
          return 0;
        }
        console.log(prev);
        return prev - 0.5;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [duration, onComplete]);

  const progress = (timeLeft / duration) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-linear"
        style={{ width: `${progress}%` }}
      >
        <span className="sr-only">{timeLeft} seconds remaining</span>
      </div>
    </div>
  );
}

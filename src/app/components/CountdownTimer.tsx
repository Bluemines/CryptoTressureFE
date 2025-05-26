import React, { useEffect, useState } from "react";

interface TrialFundTimeLeft {
  days: number;
  hours: number;
  mins: number;
  secs: number;
  isExpired: boolean;
}

interface CountdownTimerProps {
  timeLeft: TrialFundTimeLeft;
  onExpire?: () => void; // optional callback when timer expires
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeLeft, onExpire }) => {
  const totalInitialSeconds =
    timeLeft?.days * 86400 +
    timeLeft?.hours * 3600 +
    timeLeft?.mins * 60 +
    timeLeft?.secs;

  const [secondsLeft, setSecondsLeft] = useState(totalInitialSeconds);

  useEffect(() => {
    // if expired initially or zero seconds, do nothing
    if (timeLeft.isExpired || totalInitialSeconds <= 0) {
      onExpire?.();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft.isExpired, totalInitialSeconds, onExpire]);

  // calculate days, hours, mins, secs from secondsLeft
  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const mins = Math.floor((secondsLeft % 3600) / 60);
  const secs = secondsLeft % 60;

  return (
    <div>
      {secondsLeft > 0 ? (
        <span>
          {days}d : {hours}h : {mins}m : {secs}s
        </span>
      ) : (
        <span>Expired</span>
      )}
    </div>
  );
};

export default CountdownTimer;

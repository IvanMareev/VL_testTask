import { useState, useEffect } from 'react';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function useRelativeTime(date: Date): string {
  const [relativeTime, setRelativeTime] = useState<string>('');

  useEffect(() => {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - date.getTime();

    if (timeDifference < MINUTE) {
      setRelativeTime('just now');
    } else if (timeDifference < HOUR) {
      const minutes = Math.floor(timeDifference / MINUTE);
      setRelativeTime(`${minutes} minute${minutes !== 1 ? 's' : ''} ago`);
    } else if (timeDifference < DAY) {
      const hours = Math.floor(timeDifference / HOUR);
      setRelativeTime(`${hours} hour${hours !== 1 ? 's' : ''} ago`);
    } else {
      const days = Math.floor(timeDifference / DAY);
      if (days === 1) {
        setRelativeTime('yesterday');
      } else {
        setRelativeTime(`${days} days ago`);
      }
    }
  }, [date]);

  return relativeTime;
}

export default useRelativeTime;

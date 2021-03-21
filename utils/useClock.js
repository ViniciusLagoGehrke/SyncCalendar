import { useState, useEffect } from 'react';

export default function useClock (timeZone) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(() => new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const options = {timeZone: timeZone, timeZoneName: 'short', hour12: false}
  return time.toLocaleTimeString([], options);
}
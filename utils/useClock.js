import { useState, useEffect } from 'react';

export default function useClock (initialTime = new Date(), timeZone = "Europe/London") {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(() => new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return time.toLocaleTimeString('en-US',{timeZone});
}
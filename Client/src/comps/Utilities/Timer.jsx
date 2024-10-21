import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  return <div>Time remaining: {seconds} seconds</div>;
}

export default Timer;

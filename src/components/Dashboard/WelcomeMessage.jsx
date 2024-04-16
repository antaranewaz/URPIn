import { useEffect, useState } from "react";

const WelcomeMessage = () => {
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const currentTime = new Date().getHours();
    let newTimeOfDay;

    if (currentTime >= 5 && currentTime < 12) {
      newTimeOfDay = "Morning";
    } else if (currentTime >= 12 && currentTime < 17) {
      newTimeOfDay = "Afternoon";
    } else {
      newTimeOfDay = "Evening";
    }

    setTimeOfDay(newTimeOfDay);
  }, []);

  return (
    <div>
      <h1>Good {timeOfDay}, Alice!</h1>
    </div>
  );
}

export default WelcomeMessage
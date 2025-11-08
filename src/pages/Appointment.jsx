import React, { useEffect } from "react";
import { Website } from "../components";

const Appointment = () => {
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Trigger a second run
    if (trigger === 0) {
      setTrigger(1);
    }
  }, [trigger]);
  return (
    <>
      <Website />
    </>
  );
};

export default Appointment;

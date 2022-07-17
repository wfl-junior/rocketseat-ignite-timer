import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import { useCyclesContext } from "..";
import { CountdownContainer, Separator } from "./styles";

export const Countdown: React.FC = () => {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const { activeCycle, markActiveCycleAsFinished, resetActiveCycle } =
    useCyclesContext();

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        console.log("interval", activeCycle.id);

        const secondsPassed = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        );

        setAmountSecondsPassed(secondsPassed);

        if (secondsPassed >= activeCycle.minutesAmount * 60) {
          markActiveCycleAsFinished();
          resetActiveCycle();
        }
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [activeCycle, markActiveCycleAsFinished, resetActiveCycle]);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = minutesAmount.toString().padStart(2, "0");
  const seconds = secondsAmount.toString().padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} | Ignite Timer`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>

      <Separator>:</Separator>

      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
};

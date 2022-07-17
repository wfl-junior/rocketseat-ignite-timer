import { differenceInSeconds } from "date-fns";
import { useEffect } from "react";
import { useCyclesContext } from "../../../contexts/CyclesContext";
import { CountdownContainer, Separator } from "./styles";

const originalTitle = document.title;

export const Countdown: React.FC = () => {
  const {
    activeCycle,
    amountSecondsPassed,
    setAmountSecondsPassed,
    finishActiveCycle,
  } = useCyclesContext();

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        const secondsPassed = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        );

        setAmountSecondsPassed(secondsPassed);

        if (secondsPassed >= activeCycle.minutesAmount * 60) {
          finishActiveCycle();
        }
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [activeCycle, finishActiveCycle]);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = minutesAmount.toString().padStart(2, "0");
  const seconds = secondsAmount.toString().padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} | ${originalTitle}`;
    } else {
      document.title = originalTitle;
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

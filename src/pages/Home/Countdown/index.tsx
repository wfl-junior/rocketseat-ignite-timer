import { CountdownContainer, Separator } from "./styles";

interface CountdownProps {}

export const Countdown: React.FC<CountdownProps> = () => (
  <CountdownContainer>
    <span>{minutes[0]}</span>
    <span>{minutes[1]}</span>

    <Separator>:</Separator>

    <span>{seconds[0]}</span>
    <span>{seconds[1]}</span>
  </CountdownContainer>
);

import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInSeconds } from "date-fns";
import { HandPalm, Play } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { Countdown } from "./Countdown";
import { NewCycleForm } from "./NewCycleForm";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle extends NewCycleFormData {
  id: string;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export const Home: React.FC = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 5,
    },
  });

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

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
          setCycles(cycles => {
            return cycles.map(cycle => {
              if (cycle.id === activeCycle.id) {
                return {
                  ...cycle,
                  finishedDate: new Date(),
                };
              }

              return cycle;
            });
          });

          setActiveCycleId(null);
        }
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [activeCycle]);

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

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      ...data,
      id: Date.now().toString(),
      startDate: new Date(),
    };

    setCycles(cycles => [...cycles, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);

    reset();
  }

  function handleInterruptCycle() {
    setCycles(cycles => {
      return cycles.map(cycle => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          };
        }

        return cycle;
      });
    });

    setActiveCycleId(null);
    setAmountSecondsPassed(0);
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
};

import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";
import { Countdown } from "./Countdown";
import { CyclesContextProvider } from "./CyclesContext";
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

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export interface Cycle extends NewCycleFormData {
  id: string;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export const Home: React.FC = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<Cycle["id"] | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 5,
    },
  });

  const resetActiveCycle = useCallback(() => {
    setActiveCycleId(null);
  }, []);

  const markActiveCycleAsFinished = useCallback(() => {
    setCycles(cycles => {
      return cycles.map(cycle => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedDate: new Date(),
          };
        }

        return cycle;
      });
    });
  }, [activeCycleId]);

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch("task");
  const isSubmitDisabled = !task;

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

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

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContextProvider
          value={{
            activeCycle,
            cycles,
            markActiveCycleAsFinished,
            resetActiveCycle,
            amountSecondsPassed,
            setAmountSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CyclesContextProvider>

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

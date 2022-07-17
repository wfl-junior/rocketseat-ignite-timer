import { HandPalm, Play } from "phosphor-react";
import { createContext, useCallback, useContext, useState } from "react";
import { Countdown } from "./Countdown";
import { NewCycleForm, NewCycleFormData } from "./NewCycleForm";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

export interface Cycle extends NewCycleFormData {
  id: string;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CycleContextData {
  activeCycle?: Cycle;
  cycles: Cycle[];
  markActiveCycleAsFinished: () => void;
  resetActiveCycle: () => void;
}

const CyclesContext = createContext({} as CycleContextData);
export const useCyclesContext = () => useContext(CyclesContext);

export const Home: React.FC = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<Cycle["id"] | null>(null);

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

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            cycles,
            markActiveCycleAsFinished,
            resetActiveCycle,
          }}
        >
          <NewCycleForm />
          <Countdown />
        </CyclesContext.Provider>

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

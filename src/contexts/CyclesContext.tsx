import React, { createContext, useCallback, useContext, useState } from "react";
import { Cycle, NewCycleFormData } from "../pages/Home";

interface CreateCycleData extends NewCycleFormData {}

interface CycleContextData {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  amountSecondsPassed: number;
  setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>;
  finishActiveCycle: () => void;
  createNewCycle: (newCycleData: CreateCycleData) => void;
  interruptActiveCycle: () => void;
}

const CyclesContext = createContext({} as CycleContextData);
export const useCyclesContext = () => useContext(CyclesContext);

interface CyclesContextProviderProps {
  children: React.ReactNode;
}

export const CyclesContextProvider: React.FC<CyclesContextProviderProps> = ({
  children,
}) => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<Cycle["id"] | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const finishActiveCycle = useCallback(() => {
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

    setActiveCycleId(null);
  }, [activeCycleId]);

  const createNewCycle: CycleContextData["createNewCycle"] = useCallback(
    newCycleData => {
      const newCycle: Cycle = {
        ...newCycleData,
        id: Date.now().toString(),
        startDate: new Date(),
      };

      setCycles(cycles => [...cycles, newCycle]);
      setActiveCycleId(newCycle.id);
      setAmountSecondsPassed(0);
    },
    [],
  );

  const interruptActiveCycle = useCallback(() => {
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
  }, [activeCycleId]);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        amountSecondsPassed,
        setAmountSecondsPassed,
        finishActiveCycle,
        createNewCycle,
        interruptActiveCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};

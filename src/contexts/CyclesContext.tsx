import { differenceInSeconds } from "date-fns";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Cycle, NewCycleFormData } from "../pages/Home";
import {
  addNewCycleAction,
  finishActiveCycleAction,
  interruptActiveCycleAction,
} from "../reducers/cycles/actions";
import { cyclesReducer } from "../reducers/cycles/reducer";

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

const cyclesStorageKey = "@ignite-timer:cycles-state-0.1.0";

interface CyclesContextProviderProps {
  children: React.ReactNode;
}

export const CyclesContextProvider: React.FC<CyclesContextProviderProps> = ({
  children,
}) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    initialState => {
      const existingCyclesStorage = localStorage.getItem(cyclesStorageKey);

      if (existingCyclesStorage) {
        return JSON.parse(existingCyclesStorage);
      }

      return initialState;
    },
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const finishActiveCycle = useCallback(() => {
    dispatch(finishActiveCycleAction());
  }, []);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
    if (activeCycle) {
      const secondsPassed = differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate),
      );

      if (secondsPassed >= activeCycle.minutesAmount * 60) {
        finishActiveCycle();
      }

      return secondsPassed;
    }

    return 0;
  });

  useEffect(() => {
    localStorage.setItem(cyclesStorageKey, JSON.stringify(cyclesState));
  }, [cyclesState]);

  const createNewCycle: CycleContextData["createNewCycle"] = useCallback(
    newCycleData => {
      dispatch(
        addNewCycleAction({
          ...newCycleData,
          id: Date.now().toString(),
          startDate: new Date(),
        }),
      );

      setAmountSecondsPassed(0);
    },
    [],
  );

  const interruptActiveCycle = useCallback(() => {
    dispatch(interruptActiveCycleAction());
    setAmountSecondsPassed(0);
  }, []);

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

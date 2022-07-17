import React, {
  createContext,
  useCallback,
  useContext,
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

interface CyclesContextProviderProps {
  children: React.ReactNode;
}

export const CyclesContextProvider: React.FC<CyclesContextProviderProps> = ({
  children,
}) => {
  const [{ cycles, activeCycleId }, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

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

  const finishActiveCycle = useCallback(() => {
    dispatch(finishActiveCycleAction());
  }, []);

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

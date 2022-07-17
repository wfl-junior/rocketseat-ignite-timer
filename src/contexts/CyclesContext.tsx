import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";
import { Cycle, NewCycleFormData } from "../pages/Home";
import { cyclesReducer } from "../reducers/cycles";

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

  const finishActiveCycle = useCallback(() => {
    dispatch({ type: "FINISH_CURRENT_CYCLE" });
  }, []);

  const createNewCycle: CycleContextData["createNewCycle"] = useCallback(
    newCycleData => {
      const newCycle: Cycle = {
        ...newCycleData,
        id: Date.now().toString(),
        startDate: new Date(),
      };

      dispatch({
        type: "ADD_NEW_CYCLE",
        payload: { newCycle },
      });

      setAmountSecondsPassed(0);
    },
    [],
  );

  const interruptActiveCycle = useCallback(() => {
    dispatch({ type: "INTERRUPT_ACTIVE_CYCLE" });
    setAmountSecondsPassed(0);
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

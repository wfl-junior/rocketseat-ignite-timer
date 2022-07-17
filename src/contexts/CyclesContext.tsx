import React, {
  createContext,
  Reducer,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";
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

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: Cycle["id"] | null;
}

type CyclesAction =
  | {
      type: "ADD_NEW_CYCLE";
      payload: {
        newCycle: Cycle;
      };
    }
  | {
      type: "INTERRUPT_ACTIVE_CYCLE";
    }
  | {
      type: "FINISH_CURRENT_CYCLE";
    };

interface CyclesContextProviderProps {
  children: React.ReactNode;
}

export const CyclesContextProvider: React.FC<CyclesContextProviderProps> = ({
  children,
}) => {
  const [{ cycles, activeCycleId }, dispatch] = useReducer<
    Reducer<CyclesState, CyclesAction>
  >(
    (state, action) => {
      switch (action.type) {
        case "ADD_NEW_CYCLE": {
          const { newCycle } = action.payload;

          return {
            ...state,
            cycles: [...state.cycles, newCycle],
            activeCycleId: newCycle.id,
          };
        }

        case "INTERRUPT_ACTIVE_CYCLE": {
          return {
            ...state,
            activeCycleId: null,
            cycles: state.cycles.map(cycle => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  interruptedDate: new Date(),
                };
              }

              return cycle;
            }),
          };
        }

        case "FINISH_CURRENT_CYCLE": {
          return {
            ...state,
            activeCycleId: null,
            cycles: state.cycles.map(cycle => {
              if (cycle.id === activeCycleId) {
                return {
                  ...cycle,
                  finishedDate: new Date(),
                };
              }

              return cycle;
            }),
          };
        }

        default: {
          return state;
        }
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  );

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

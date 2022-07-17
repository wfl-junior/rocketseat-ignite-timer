import { createContext, useContext } from "react";
import { Cycle } from ".";

interface CycleContextData {
  activeCycle?: Cycle;
  cycles: Cycle[];
  markActiveCycleAsFinished: () => void;
  resetActiveCycle: () => void;
  amountSecondsPassed: number;
  setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>;
}

const CyclesContext = createContext({} as CycleContextData);
export const useCyclesContext = () => useContext(CyclesContext);
export const CyclesContextProvider = CyclesContext.Provider;

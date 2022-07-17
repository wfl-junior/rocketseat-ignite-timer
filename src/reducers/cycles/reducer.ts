import { Cycle } from "../../pages/Home";
import { CyclesAction } from "./actions";

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: Cycle["id"] | null;
}

export const cyclesReducer: React.Reducer<CyclesState, CyclesAction> = (
  state,
  action,
) => {
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
          if (cycle.id === state.activeCycleId) {
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
};

import { produce } from "immer";
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

      return produce(state, draft => {
        draft.cycles.push(newCycle);
        draft.activeCycleId = newCycle.id;
      });
    }

    case "INTERRUPT_ACTIVE_CYCLE": {
      const activeCycleIndex = state.cycles.findIndex(
        cycle => cycle.id === state.activeCycleId,
      );

      if (activeCycleIndex < 0) {
        return state;
      }

      return produce(state, draft => {
        draft.activeCycleId = null;
        draft.cycles[activeCycleIndex].interruptedDate = new Date();
      });
    }

    case "FINISH_CURRENT_CYCLE": {
      const activeCycleIndex = state.cycles.findIndex(
        cycle => cycle.id === state.activeCycleId,
      );

      if (activeCycleIndex < 0) {
        return state;
      }

      return produce(state, draft => {
        draft.activeCycleId = null;
        draft.cycles[activeCycleIndex].finishedDate = new Date();
      });
    }

    default: {
      return state;
    }
  }
};

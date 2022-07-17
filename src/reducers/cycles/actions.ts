import { Cycle } from "../../pages/Home";

export type CyclesAction =
  | {
      type: "ADD_NEW_CYCLE";
      payload: {
        newCycle: Cycle;
      };
    }
  | { type: "INTERRUPT_ACTIVE_CYCLE" }
  | { type: "FINISH_CURRENT_CYCLE" };

export function addNewCycleAction(newCycle: Cycle): CyclesAction {
  return {
    type: "ADD_NEW_CYCLE",
    payload: { newCycle },
  };
}

export function finishActiveCycleAction(): CyclesAction {
  return { type: "FINISH_CURRENT_CYCLE" };
}

export function interruptActiveCycleAction(): CyclesAction {
  return { type: "INTERRUPT_ACTIVE_CYCLE" };
}

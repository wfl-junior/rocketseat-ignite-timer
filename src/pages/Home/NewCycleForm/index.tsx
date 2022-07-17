import { useFormContext } from "react-hook-form";
import { NewCycleFormData } from "..";
import { useCyclesContext } from "../../../contexts/CyclesContext";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export const NewCycleForm: React.FC = () => {
  const { activeCycle, cycles } = useCyclesContext();
  const { register } = useFormContext<NewCycleFormData>();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>

      <TaskInput
        type="text"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        disabled={!!activeCycle}
        autoComplete="off"
        {...register("task")}
      />

      <datalist id="task-suggestions">
        {cycles.map(cycle => (
          <option key={cycle.id}>{cycle.task}</option>
        ))}
      </datalist>

      <label htmlFor="minutesAmount">durante</label>

      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
};

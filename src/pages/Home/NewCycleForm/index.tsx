import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

interface NewCycleFormProps {}

export const NewCycleForm: React.FC<NewCycleFormProps> = () => (
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

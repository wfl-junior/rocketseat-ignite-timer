import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";
import { useCyclesContext } from "../../contexts/CyclesContext";
import { Countdown } from "./Countdown";
import { NewCycleForm } from "./NewCycleForm";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export interface Cycle extends NewCycleFormData {
  id: string;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export const Home: React.FC = () => {
  const { activeCycle, createNewCycle, interruptActiveCycle } =
    useCyclesContext();

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 5,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch("task");
  const isSubmitDisabled = !task;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptActiveCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
};

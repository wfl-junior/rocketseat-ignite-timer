import { Play } from "phosphor-react";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";

export const Home: React.FC = () => (
  <HomeContainer>
    <form onSubmit={e => e.preventDefault()}>
      <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>

        <TaskInput
          type="text"
          id="task"
          placeholder="Dê um nome para o seu projeto"
          list="task-suggestions"
        />

        <datalist id="task-suggestions">
          <option>Projeto 1</option>
          <option>Projeto 2</option>
          <option>Projeto 3</option>
          <option>Banana</option>
        </datalist>

        <label htmlFor="minutesAmount">durante</label>
        <MinutesAmountInput
          type="number"
          id="minutesAmount"
          placeholder="00"
          step={5}
          min={5}
          max={60}
        />

        <span>minutos.</span>
      </FormContainer>

      <CountdownContainer>
        <span>0</span>
        <span>0</span>

        <Separator>:</Separator>

        <span>0</span>
        <span>0</span>
      </CountdownContainer>

      <StartCountdownButton type="submit">
        <Play size={24} />
        Começar
      </StartCountdownButton>
    </form>
  </HomeContainer>
);

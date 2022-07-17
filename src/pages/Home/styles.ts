import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: ${({ theme }) => theme["gray-100"]};

  font-weight: 700;

  transition: background-color 100ms linear;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${({ theme }) => theme["green-500"]};

  &:enabled:hover {
    background-color: ${({ theme }) => theme["green-700"]};
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${({ theme }) => theme["red-500"]};

  &:enabled:hover {
    background-color: ${({ theme }) => theme["red-700"]};
  }
`;

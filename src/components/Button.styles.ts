import styled from "styled-components";
import { ButtonVariant } from "./Button";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 6.25rem;
  height: 2.5rem;
  border-radius: 4px;
  border: 0;
  margin: 8px;
  background-color: ${({ variant, theme }) => theme[variant]};
`;

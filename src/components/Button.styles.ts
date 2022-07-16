import styled from "styled-components";
import { ButtonVariant } from "./Button";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "purple",
  secondary: "orange",
  danger: "red",
  success: "green",
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 6.25rem;
  height: 2.5rem;
  background-color: ${({ variant }) => buttonVariants[variant]};
`;

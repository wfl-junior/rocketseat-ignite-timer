import { ButtonContainer } from "./Button.styles";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonProps {
  variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary" }) => (
  <ButtonContainer variant={variant}>Enviar</ButtonContainer>
);

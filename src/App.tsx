import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export const App: React.FC = () => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />

    <Button variant="primary" />
    <Button variant="secondary" />
    <Button variant="success" />
    <Button variant="danger" />
    <Button />
  </ThemeProvider>
);

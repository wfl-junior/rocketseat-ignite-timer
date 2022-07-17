import { ThemeProvider } from "styled-components";
import { CyclesContextProvider } from "./contexts/CyclesContext";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export const App: React.FC = () => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />

    <CyclesContextProvider>
      <Router />
    </CyclesContextProvider>
  </ThemeProvider>
);

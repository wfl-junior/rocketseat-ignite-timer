import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "./styles";

export const DefaultLayout: React.FC = () => (
  <LayoutContainer>
    <Header />
    <Outlet />
  </LayoutContainer>
);

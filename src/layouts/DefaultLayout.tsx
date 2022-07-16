import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const DefaultLayout: React.FC = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);

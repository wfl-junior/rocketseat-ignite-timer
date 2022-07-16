import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { HeaderContainer } from "./styles";

export const Header: React.FC = () => (
  <HeaderContainer>
    <img src={logo} alt="Logo do Ignite" />

    <nav>
      <NavLink to="/" title="Timer">
        <Timer size={24} />
      </NavLink>

      <NavLink to="/history" title="Histórico">
        <Scroll size={24} />
      </NavLink>
    </nav>
  </HeaderContainer>
);

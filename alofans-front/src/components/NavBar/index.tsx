// src/components/NavBar/index.tsx

import { useLocation, useNavigate } from "react-router-dom";
import NavBarItem from "./NavBarItem";
import * as S from "./styles";
import {
  goToHome,
  goToEvents,
  goToAlos,
  goToProfile,
} from "@/routers/Coordinator";
import { FaUser, FaRegUser } from "react-icons/fa"; // Importe os ícones desejados
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoHandRight, IoHandRightOutline } from "react-icons/io5";
import { LiaBullhornSolid } from "react-icons/lia";
import { ImBullhorn } from "react-icons/im";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme
import COLORS from "@/constants/colors";

const NavBar = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const navigate = useNavigate();
  const { theme } = useTheme(); // Acesse o tema atual

  return (
    <S.Footer theme={theme}> {/* Passe o tema como prop */}
      <S.NavItem onClick={() => goToHome(navigate)}>
        <S.ActiveItem $isActive={currentRoute === '/'} theme={theme}>
          <NavBarItem
            icon={
              currentRoute === "/" ? (
                <GoHomeFill size={30} color={theme === 'dark' ? COLORS.purple[200] : COLORS.white[100]} />
              ) : (
                <GoHome size={30} color={theme === 'dark' ? COLORS.white[100] : COLORS.white[100]} />
              )
            }
            text="Home"
            isActive={currentRoute === "/"} // Passando a prop isActive
            theme={theme} // Passe o tema como prop
          />
        </S.ActiveItem>
      </S.NavItem>
      <S.NavItem onClick={() => goToEvents(navigate)}>
        <S.ActiveItem $isActive={currentRoute === '/events'} theme={theme}>
          <NavBarItem
            icon={
              currentRoute === "/events" ? (
                <ImBullhorn size={25} color={theme === 'dark' ? COLORS.purple[200] : COLORS.white[100]} />
              ) : (
                <LiaBullhornSolid size={25} color={theme === 'dark' ? COLORS.white[100] : COLORS.white[100]} />
              )
            }
            text="Eventos"
            isActive={currentRoute === "/events"} // Passando a prop isActive
            theme={theme} // Passe o tema como prop
          />
        </S.ActiveItem>
      </S.NavItem>
      <S.NavItem onClick={() => goToAlos(navigate)}>
        <S.ActiveItem $isActive={currentRoute === '/alos'} theme={theme}>
          <NavBarItem
            icon={
              currentRoute === "/alos" ? (
                <IoHandRight size={25} color={theme === 'dark' ? COLORS.purple[200] : COLORS.white[100]} />
              ) : (
                <IoHandRightOutline size={25} color={theme === 'dark' ? COLORS.white[100] : COLORS.white[100]} />
              )
            }
            text="Alôs"
            isActive={currentRoute === "/alos"} // Passando a prop isActive
            theme={theme} // Passe o tema como prop
          />
        </S.ActiveItem>
      </S.NavItem>
      <S.NavItem onClick={() => goToProfile(navigate)}>
        <S.ActiveItem $isActive={currentRoute === '/profile'} theme={theme}>
          <NavBarItem
            icon={
              currentRoute === "/profile" ? (
                <FaUser size={25} color={theme === 'dark' ? COLORS.purple[200] : COLORS.white[100]} />
              ) : (
                <FaRegUser size={25} color={theme === 'dark' ? COLORS.white[100] : COLORS.white[100]} />
              )
            }
            text="Perfil"
            isActive={currentRoute === "/profile"} // Passando a prop isActive
            theme={theme} // Passe o tema como prop
          />
        </S.ActiveItem>
      </S.NavItem>
    </S.Footer>
  );
};

export default NavBar;
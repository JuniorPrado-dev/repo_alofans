//src/components/LayoutDashBoard/index.tsx

import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import { useEffect } from "react";
import { refreshUserData } from "@/services/users";
import { useAppDispatch } from "@/redux/hooks";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import styled from "styled-components";
import COLORS from "@/constants/colors"; // Importe as cores
import { device } from "@/utils/sizeDevices";

const LayoutContainer = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
  transition: background-color 0.3s ease; 
  
  @media ${device.desktop} { /* Ajuste o breakpoint conforme necessário */
    
  }

`;

const MainContent = styled.main`
  flex: 1;
`;

// Estilo para a NavBar que só aparece no Desktop
const DesktopNavBar = styled.div`
  display: none; /* Oculta por padrão */

  @media ${device.mobile} { /* Ajuste o breakpoint conforme necessário */
    display: block; /* Exibe apenas em telas maiores (Desktop) */
  }
`;

const LayoutDashBoard = () => {
  const { theme } = useTheme(); // Acesse o tema atual
  const dispatch = useAppDispatch();

  useEffect(() => {
    refreshUserData(dispatch);
  }, [dispatch]);

  return (
    <LayoutContainer theme={theme}>
      <MainContent>
        <Outlet />
      </MainContent>
      <DesktopNavBar>
        <NavBar />
      </DesktopNavBar>
    </LayoutContainer>
  );
};

export default LayoutDashBoard;
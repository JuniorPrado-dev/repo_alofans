//src/pages/AloPage/layout.tsx

import { Outlet } from "react-router-dom";
import styled from "styled-components";
import COLORS from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import { Theme } from "@/contexts/ThemeContext";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";
import useAuth from "@/hooks/useAuth";

const Container = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) =>
    theme === "dark" ? COLORS.black[800] : COLORS.white[100]};
  transition: background-color 0.3s ease;
`;

const Content = styled.main<{ theme: Theme }>`
  flex: 1;
  background-color: ${({ theme }) =>
    theme === "dark" ? COLORS.black[800] : COLORS.white[100]};
  transition: background-color 0.3s ease;
`;

const LayoutAlo = () => {
  useAuth()
  const { theme } = useTheme();

  return (
    <div>
      <HeaderWithBackButton />
      <Container id="LayoutAlo.Container" theme={theme}>
        <Content id="LayoutAlo.Content" theme={theme}>
          <Outlet />
        </Content>
      </Container>
    </div>
  );
};

export default LayoutAlo;

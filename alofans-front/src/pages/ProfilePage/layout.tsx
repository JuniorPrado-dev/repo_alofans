//src/pages/ProfilePage/layout

import { Outlet } from "react-router-dom";
import styled from "styled-components";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";
import COLORS from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import { Theme } from "@/contexts/ThemeContext";

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

const LayoutProfile = () => {
  const { theme } = useTheme();
  return (
    <div>
      <HeaderWithBackButton />
      <Container id="LayoutProfile.Container" theme={theme}>
        <Content id="LayoutProfile.Content" theme={theme}>
          <Outlet /> {/* Aqui serão renderizadas as páginas */}
        </Content>
      </Container>
    </div>
  );
};

export default LayoutProfile;

import { Outlet } from "react-router-dom";
import styled from "styled-components";
import COLORS from "@/constants/colors";
import { useEffect } from "react";
import { refreshUserData } from "@/services/users";
import { useAppDispatch } from "@/redux/hooks";
import { useTheme } from "@/contexts/ThemeContext";
import { Theme } from "@/contexts/ThemeContext";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";


const Container = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  transition: background-color 0.3s ease; 
`;

const Content = styled.main<{ theme: Theme }>`
  flex: 1;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; 
  transition: background-color 0.3s ease; 
`;


const LayoutEvents = () => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  useEffect(() => {
    refreshUserData(dispatch);
  }, []);

  return (
    <div>
      <HeaderWithBackButton />
      <Container id="LayoutEvents.Container" theme={theme}>
        <Content id="LayoutEvents.Content" theme={theme}>
          <Outlet /> {/* Aqui serão renderizadas as páginas */}
        </Content>

      </Container>
    </div>
  );
};

export default LayoutEvents;
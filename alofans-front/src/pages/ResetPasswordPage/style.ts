import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext";
import COLORS from "@/constants/colors";

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  min-height: 10vh; /* Garante que o contêiner ocupe toda a altura da viewport */
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  padding: 0px 0px;
`;

export const MainContent = styled.main`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3% 0%;
`;

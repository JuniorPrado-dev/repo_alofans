//src/components/NavBar/NavBarItem/styles.ts

import styled from "styled-components";
import { device } from '@/utils/sizeDevices'; // Importe o arquivo de breakpoints
import FONTS from "@/constants/fonts";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import COLORS from "@/constants/colors";

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.mobile} {
    /* Estilos para dispositivos móveis */
  }
`;

export const IconContainer = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; /* Ajuste o tamanho conforme necessário */
  height: 40px;


  @media ${device.mobile} {
    /* Estilos para dispositivos móveis */
  }
`;

export const Text = styled.p<{ $isActive: boolean; theme: Theme }>`
  font-size: 15px;
  color: ${({ $isActive, theme }) =>
    $isActive
      ? theme === 'dark'
        ? COLORS.purple[200] // Texto ativo no tema escuro
        : '#FFFFFF' // Texto ativo no tema claro
      : theme === 'dark'
      ? COLORS.purple[100] // Texto inativo no tema escuro
      : '#FFFFFF'}; // Texto inativo no tema claro
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "400")}; /* Peso da fonte condicional */
  font-family: ${FONTS.montSerrat};
`;
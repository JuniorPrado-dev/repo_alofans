//src/components/NavBar/styles.ts

import styled from 'styled-components';
import COLORS from '@/constants/colors';
import { device } from '@/utils/sizeDevices';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme

interface ThemeProps {
  theme: Theme;
}

export const Footer = styled.footer<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.white[1000] : COLORS.primary)}; /* Fundo escuro ou claro */
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.white[100])}; /* Texto claro ou escuro */
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 80px;
  height: 10vh;

  @media ${device.mobile} {
    width: 100%;
    min-height: 60px;
    height: 10vh;
    padding: 0 1rem;
  }
`;

interface ActiveItemProps {
  $isActive: boolean;
  theme: Theme; // Adicione o tema como prop
}

export const ActiveItem = styled.span<ActiveItemProps>`
  color: ${({ $isActive, theme }) =>
    $isActive
      ? theme === 'dark'
        ? COLORS.white[500] // Cor do item ativo no tema escuro
        : COLORS.white[500] // Cor do item ativo no tema claro
      : theme === 'dark'
      ? COLORS.white[300] // Cor do item inativo no tema escuro
      : COLORS.black[500]}; // Cor do item inativo no tema claro

  @media ${device.tablet} {
    /* Estilos para tablets */
  }
`;

export const NavItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.tablet} {
    /* Estilos para tablets */
  }
`;
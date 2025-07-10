//src/pages/UserRegistrationPage/index.tsx

import styled from 'styled-components';
import COLORS from '@/constants/colors';
import FONTS from '@/constants/fonts';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme
import { device } from '@/utils/sizeDevices';

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Usar viewport height em vez de min-height */
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  padding: 10px 20px;
  overflow: hidden; /* Impede rolagem no container principal */

  @media ${device.mobile} {
    padding: 0px 0px;
  }
`;

export const LogoContainer = styled.a`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 2; /* Garante que fique sobre a imagem */
`;

// Estilização da logo
export const Logo = styled.img`
  height: 30vh; /* Ajuste conforme necessário */
  width: auto;
  filter: invert(0.4);
  

  @media ${device.mobile} {
    display: none; /* Reduz um pouco no mobile */
  }
`;

export const CenterContainer = styled.div<ThemeProps>`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  padding-inline: 400px;
  margin-inline: 0px;
  overflow-y: auto; /* Habilita rolagem vertical */
  flex: 1; /* Ocupa todo o espaço disponível */
  height: calc(100vh - 250px); /* Altura total menos a margem superior */

  @media ${device.mobile} {
    margin-top: 10px; /* Ajuste para mobile */
    padding-inline: 6px;
    width: 100%;
    height: calc(100vh - 60px); /* Ajuste para mobile */
  }
`;

export const SelectorContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 90%;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.gray[500] : COLORS.black[500])}; 
  
  @media ${device.mobile} {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 50px;
    width: 100%;
    padding: 0px 0px 10px 0px;
    border-bottom: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.gray[500] : COLORS.black[500])}; 
  }
`;

interface SelectorButtonProps {
  $isSelected: boolean;
  theme: Theme;
}

export const SelectorButton = styled.button<SelectorButtonProps>`
  font-family: ${FONTS.montSerrat};
  background-color: transparent;
  font-size: 16px;
  font-weight: 600;
  color: ${({ $isSelected, theme }) =>
    $isSelected
      ? theme === 'dark'
        ? COLORS.purple[200] // Roxo no modo escuro
        : COLORS.purple[400] // Roxo no modo claro
      : theme === 'dark'
      ? COLORS.gray[200] // Cinza no modo escuro
      : COLORS.gray[200]}; // Cinza no modo claro
  border: none;
  cursor: pointer;
  
`;

export const MainContent = styled.main<ThemeProps>`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  padding-bottom: 20px; /* Espaço para o conteúdo no final */
  justify-content: center;

  @media ${device.mobile} {
    align-items: center;
    justify-content: center;
    padding-inline: 20px;
  }
`;
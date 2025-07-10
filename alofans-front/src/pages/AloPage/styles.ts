//src/pages/AloPage/styles.ts

import COLORS from "@/constants/colors";
import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import FONTS from "@/constants/fonts";
import { device } from "@/utils/sizeDevices";

interface ThemeProps {
  theme: Theme;
}

export const Separator = styled.div<ThemeProps>`
  width: 100%;
  height: 15vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
`;

export const ContainerBack = styled.div<ThemeProps>`
  /* transform: translateX(0%); */
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  position: sticky;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0vh;


  @media ${device.desktop} {
    display: none;
  }

  @media ${device.mobile} {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
    display: block;
    padding-bottom: 20px;
  }
`;

export const HeaderBack = styled.header<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  display: flex;
  justify-content: space-between; /* Alinha os itens nas extremidades */
  align-items: center; /* Centraliza verticalmente */
  width: 100%;
  
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])}; /* Fundo branco */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4); /* Sombra para destaque */

`;

export const Logo = styled.img<ThemeProps>`
  width: 40px;
  height: auto;
  filter: ${({ theme }) =>
    theme === 'dark'
      ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' // Logo branca no modo escuro
      : 'none'}; /* Logo original no modo claro */

`;

export const LocationContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Container = styled.div<ThemeProps>`
  overflow-y: scroll;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  height: 90vh;
    
`;

export const Header = styled.header<ThemeProps>`
  display: flex;
  justify-content: space-between; /* Alinha os itens nas extremidades */
  align-items: center; /* Centraliza verticalmente */
  width: 100%;
  padding: 0px 20px; /* Adiciona um padding para espaçamento */
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])}; /* Fundo branco */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Sombra para destaque */
`;

export const Title = styled.p<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  font-weight: 600;
  font-size: 22px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[1000])};
  padding: 22px 0px 10px;
  
`;

export const ButtonAloManager = styled.button<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[1000])};
  font-family: ${FONTS.montSerrat};
  font-weight: 700;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border: 2px solid;
  border-radius: 8px;
  cursor: pointer;
`;

export const TopContainer = styled.div<ThemeProps>`
  width: 100%;
  padding-inline: 16px;
`;

export const BotContainer = styled.div<ThemeProps>`
  width: 100%;
  height: 80vh;
  padding-inline: 16px;

  @media ${device.mobile} {
    width: 100%;
    height: 100%;
    padding-inline: 16px;
  }
`;

export const ButtonSendAlos = styled.button<ThemeProps>`
  margin-top: 10px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.primary : COLORS.purple.DEFAULT)}; /* Cor roxa no modo escuro e claro */
  color: ${COLORS.white[100]};
  font-family: ${FONTS.montSerrat};
  font-weight: 600;
  width: 100%;
  height: 50px;
  border: 0px solid;
  border-radius: 8px;
  cursor: pointer;  
`;

export const AloListMobile = styled.div<ThemeProps>`

  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  display: flex;
  overflow-y: auto;
  flex-wrap: wrap;
  
  gap: 10px;
  margin-top: 0px;
  height: none;  
    
  &::-webkit-scrollbar {
    display: none;
  }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */  
`;

// Estilos para o modo desktop
export const AloListDesktop = styled.div<ThemeProps>`  
  @media ${device.mobile} {
    display: none;
  }

  @media ${device.desktop} {
    display: grid; /* Layout de grade para desktop */
    grid-template-columns: repeat(3, 1fr); /* 3 colunas */
    gap: 60px; /* Espaçamento entre os eventos */
    flex-direction: column; /* Layout padrão (mobile) */
    padding-inline: 85px;
    overflow-y: auto;
    flex-wrap: wrap;
    margin-top: 40px;
    height: 70%;

  }
`;

export const DesktopContainer = styled.div<ThemeProps>`
  @media ${device.desktop} {
    height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
    
  }

  @media ${device.mobile} {
    display: none;
  }
`;

export const TabContainer = styled.div<ThemeProps>`
  @media ${device.desktop} {
    display: flex;
    justify-content: center;
    gap: 50px;
    padding-top: 50px;
    padding-bottom: 20px;
    padding-left: 85px;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
    justify-content: start;
  }

  @media ${device.mobile} {
    display: none;
  }
`;

interface TabButtonProps {
  $isActive: boolean;
  theme: Theme;
}

export const TabButton = styled.button<TabButtonProps>`
  @media ${device.desktop} {
    background-color: ${({ $isActive, theme }) =>
      $isActive
        ? theme === 'dark'
          ? COLORS.blue[400]
          : COLORS.blue[500]
        : COLORS.gray[400]};
    color: ${({ $isActive, theme }) =>
      $isActive
        ? COLORS.white[100]
        : theme === 'dark'
        ? COLORS.gray[100]
        : COLORS.gray[100]};
    font-family: ${FONTS.montSerrat};
    font-weight: 600;
    padding: 6px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    font-size: 22px;

  }

  @media ${device.mobile} {
    display: none;
  }
`;

export const ContentContainer = styled.div<ThemeProps>`
  @media ${device.desktop} {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};

  }

  @media ${device.mobile} {
    
  }
`;
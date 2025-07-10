

import COLORS from "@/constants/colors";
import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext";
import FONTS from "@/constants/fonts";
import { device } from "@/utils/sizeDevices";

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  overflow: auto;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  height: 120vh;
  width: 100%;
  margin-top: -10px;
  padding-top: 10px;

  @media ${device.mobile} {
    overflow: auto;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
    height: 90vh;
    width: 100%;
    margin-top: -15px;
    padding-top: 10px;
  }
`;

export const ContainerBack = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  min-height: 10vh;
  margin-bottom: 10px;
  margin-top: 10px;

  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    min-height: 10vh;
    margin-bottom: 10px;
    margin-top: 10px;
  }
`;

export const HeaderBack = styled.header<ThemeProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1px 20px;
  background-color: ${COLORS.white[300]};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  @media ${device.mobile} {
    display: flex;
    justify-content: space-between; /* Alinha os itens nas extremidades */
    align-items: center; /* Centraliza verticalmente */
    width: 100%;
    padding: 1px 20px; /* Adiciona um padding para espaçamento */
    background-color: ${COLORS.white[100]}; /* Fundo branco */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Sombra para destaque */
  }
`;

export const TypeContainer = styled.div<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  display: flex;
  justify-content: start;
  width: 100%;
  margin: 20px 0px;
  gap: 20px;
  padding-inline: 85px;
  flex-wrap: wrap;
  column-gap: 0px;
  padding-bottom: 0px;

  @media ${device.mobile} {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 20px 0px;
    gap: 20px;
    padding-inline: 30px;
    flex-wrap: wrap;
    column-gap: 0px;
    padding-bottom: 20px;
  }
`;

export const ButtonType = styled.button<{ $isActive: boolean; theme: Theme }>`
  background-color: ${({ $isActive, theme }) =>
    $isActive
      ? theme === 'dark'
        ? COLORS.purple[500]
        : COLORS.purple[500]
      : theme === 'dark'
      ? COLORS.black[800]
      : COLORS.gray[200]};
  color: ${({ $isActive, theme }) =>
    $isActive
      ? COLORS.white[100]
      : theme === 'dark'
      ? COLORS.white[100]
      : COLORS.black[900]};
  font-family: ${FONTS.montSerrat};
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 400)};
  padding: 8px 22px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-right: 40px;

  @media ${device.mobile} {
    background-color: ${({ $isActive, theme }) =>
      $isActive
        ? theme === 'dark'
          ? COLORS.purple[400]
          : COLORS.purple[400]
        : theme === 'dark'
        ? COLORS.black[700]
        : COLORS.gray[200]};
    color: ${({ $isActive, theme }) =>
      $isActive
        ? COLORS.white[100]
        : theme === 'dark'
        ? COLORS.white[100]
        : COLORS.black[900]};
    font-family: ${FONTS.montSerrat};
    font-weight: ${({ $isActive }) => ($isActive ? 600 : 400)};
    padding: 4px 14px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    margin-right: 0px;

    &:hover {
    transform: scale(1.05);
    }

    &:active {
      transform: scale(1);
    }
  }
  
`;

interface AloListProps extends ThemeProps {
  $isDesktop: boolean;
}

export const AloList = styled.div<AloListProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  display: ${({ $isDesktop }) => ($isDesktop ? "grid" : "flex")};
  grid-template-columns: ${({ $isDesktop }) => ($isDesktop ? "repeat(3, 1fr)" : "none")};
  gap: ${({ $isDesktop }) => ($isDesktop ? "50px" : "0px")};
  flex-wrap: wrap;
  justify-content: ${({ $isDesktop }) => ($isDesktop ? "space-around" : "center")};
  margin-top: 0px;
  height: 80vh;
  padding-inline: 85px;
  overflow-y: auto;
  padding-bottom: 240px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  @media ${device.mobile} {
    overflow-y: auto;
    flex-wrap: wrap;
    gap: 40px;
    margin-top: 0px;
    height: 150%;
    padding-inline: 30px;
    
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    padding-bottom: none;
  }
`;
// src/components/Location/style.ts
import { device } from '@/utils/sizeDevices';
import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme
import COLORS from '@/constants/colors'; // Importe as cores
import FONTS from '@/constants/fonts';

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  gap: 4px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
  padding-inline: 10px;

  @media ${device.mobile} {
    gap: 10px;
    padding-inline: 0px;
  }
`;

export const LocalIcon = styled.img<ThemeProps>`
  width: ${({ theme }) => (theme === 'dark' ? '14px' : '24px')}; 
  height: ${({ theme }) => (theme === 'dark' ? '18px' : '22px')}; 
  margin-right: ${({ theme }) => (theme === 'dark' ? '6.5px' : '-1px')};

  cursor: pointer;
  filter: ${({ theme }) =>
    theme === 'dark'
      ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' // Ícone branco no modo escuro
      : 'brightness(0) saturate(80%) invert(39%) sepia(20%) saturate(2345%) hue-rotate(240deg) brightness(97%) contrast(105%)'}; // Ícone primary no modo claro
  transition: filter 0.3s ease; /* Transição suave para o tema */
  color: #000;

  @media ${device.mobile} {

  }
`;

export const LocalInfo = styled.p<{ $isHome: boolean; theme: Theme }>`
  font-weight: 400;
  font-size: 14px;
  font-family: ${FONTS.montSerrat};
  color: ${({ $isHome, theme }) =>
    $isHome
      ? COLORS.white[100] // Texto branco no modo escuro ou claro (se for home)
      : theme === 'dark'
      ? COLORS.white[100] // Texto branco no modo escuro
      : COLORS.black[900]}; // Texto preto no modo claro
  transition: color 0.3s ease; /* Transição suave para o tema */

  @media ${device.mobile} {
    font-weight: 500;
    font-size: 18px;
  }
`;

export const Arrow = styled.img<ThemeProps>`
  width: 16px;
  cursor: pointer;
  filter: ${({ theme }) =>
    theme === 'dark'
      ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' // Ícone branco no modo escuro
      : 'brightness(0) saturate(80%) invert(39%) sepia(20%) saturate(2345%) hue-rotate(240deg) brightness(97%) contrast(105%)'}; // Ícone primary no modo claro
  transition: filter 0.3s ease; /* Transição suave para o tema */

  @media ${device.mobile} {
    width: 18px;
  }
`;
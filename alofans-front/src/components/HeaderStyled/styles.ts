// src/components/HeaderStyled/styles.ts

import FONTS from '@/constants/fonts';
import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext';
import COLORS from '@/constants/colors'; // Importe as cores
import { device } from '@/utils/sizeDevices';

interface ThemeProps {
  theme: Theme;
  isScrolled?: boolean;
}

export const Header = styled.header<ThemeProps>`
  width: 100%;
  

  @media ${device.mobile} {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  }
`;

export const TopContainerDesktop = styled.div<ThemeProps>`
  display: none;

  @media (min-width: 768px) {
    z-index: 10;
    width: 100%;
    height: auto;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 85px;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
    border-bottom: 3px solid ${({ theme }) => (theme === 'dark' ? COLORS.black[400] : COLORS.white[400])};
    opacity: ${({ isScrolled }) => (isScrolled ? 0.9 : 0.9)};
    
  }
`;

export const ContainerSpace = styled.div<ThemeProps>`
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[200])};
    display: flex;
    padding-top: 80px;  

  @media ${device.mobile} {
    display: none;
  }
`;

export const LogoContainer = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const TopContainerMobile = styled.div<ThemeProps>`
  display: none;

  @media ${device.mobile} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 16px;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
    border-bottom: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.black[400] : COLORS.black[400])};
  }
`;

export const Logo = styled.img<ThemeProps>`
  width: 40px; 
  height: auto;
  filter: ${({ theme }) =>
  theme === 'dark'
    ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' // Logo branca no modo escuro
    : 'none'}; 

  @media (min-width: 768px) {
    width: 55px; 
    height: auto;
    filter: ${({ theme }) =>
    theme === 'dark'
      ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' // Logo branca no modo escuro
      : 'none'};
  }
`;

export const LocationContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Container = styled.div<ThemeProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};

  @media (min-width: 768px) {
    display: none;
  }
`;

export const ProfileButtonTop = styled.button<ThemeProps>`
  display: none;

  @media (min-width: 768px) {
    background-color: transparent; /* Fundo transparente */
    border: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Borda sutil */
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Cor do texto */
    padding: 6px 12px; /* Padding menor para um botão modesto */
    border-radius: 4px; /* Bordas arredondadas */
    cursor: pointer;
    font-size: 14px; /* Fonte menor */
    font-family: ${FONTS.montSerrat};
    font-weight: 500;
    display: flex; /* Layout flexível para alinhar ícone e texto */
    align-items: center; /* Centraliza verticalmente */
    gap: 8px; /* Espaçamento entre ícone e texto */

    &:hover {
      background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo sutil ao passar o mouse */
      border-color: ${({ theme }) => (theme === 'dark' ? COLORS.primary : COLORS.secondary)}; /* Borda com cor temática ao passar o mouse */
      color: ${({ theme }) => (theme === 'dark' ? COLORS.primary : COLORS.secondary)}; /* Cor do texto ao passar o mouse */

      svg {
        color: ${({ theme }) => (theme === 'dark' ? COLORS.primary : COLORS.secondary)}; /* Cor do ícone ao passar o mouse */
      }
    }

    svg {
      color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Cor do ícone */
    }
  }
`;

export const ProfileContainer = styled.div<ThemeProps>`
  cursor: pointer;
  padding: 1px 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-family: ${FONTS.montSerrat};
  font-weight: 400;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])}; /* Texto branco no modo escuro, preto no modo claro */

  p {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
  }
`;

export const ProfileButton = styled.button<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.primary : COLORS.secondary)}; /* Cor de fundo com base no tema */
  color: ${COLORS.white[100]};
  border: none;
  padding: 2px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  font-family: ${FONTS.montSerrat};
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#7C4DFF' : '#ff4c4c')}; /* Efeito hover com base no tema */
  }
`;
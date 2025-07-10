// src/components/Profile/styles.ts

import COLORS from '@/constants/colors';
import FONTS from '@/constants/fonts';
import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme
import { device } from '@/utils/sizeDevices';

interface ThemeProps {
  theme: Theme;
}

export const Separator = styled.div<ThemeProps>`
  width: 100%;
  height: 10vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
`;

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
  max-height: 90vh; /* Ocupa a altura total da tela */
  overflow-y: auto; /* Habilita o scroll vertical */
`;

export const Title = styled.h1<ThemeProps>`
  font-size: 22px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto claro ou escuro */
  margin-bottom: 1px;
  margin-top: 1px;
  font-family: ${FONTS.montSerrat};
  font-weight: 600;
`;

export const Content = styled.div<ThemeProps>`
  margin-top: -18px;
  width: 100%;
  max-width: 600px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])}; /* Fundo escuro ou claro */
  padding: 50px 16px 50px 16px;
`;

export const ItemContainer = styled.div<ThemeProps>`
  margin-top: 8px;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#333' : '#f1f3f5')}; /* Cor de fundo ao passar o mouse */
    transform: translateY(-2px);
  }

  @media ${device.desktop} {
    padding-top: 0px;
  }

  @media ${device.mobile} {
    margin-top: 8px;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 8px;
    transition: background-color 0.3s, transform 0.2s;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => (theme === 'dark' ? '#333' : '#f1f3f5')}; /* Cor de fundo ao passar o mouse */
      transform: translateY(-2px);
    } 
  }
`;

export const ItemImage = styled.div<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? '#000' : '#9362d9')}; /* Cor do ícone */
  width: 3.5rem;
  height: 3.5rem;
  padding: 0.1rem;
  border-radius: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 30px;
    height: 30px;
    color: white; /* Define a cor do ícone como branca */
  }

  @media ${device.desktop} {
    background-color: ${({ theme }) => (theme === 'dark' ? '#000' : '#9362d9')}; /* Cor do ícone */
    width: 50px;
    height: 50px;
    padding: 14px;
    border-radius: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 30px;
      height: 30px;
      color: white; /* Define a cor do ícone como branca */
    }
  }
`;

export const ItemTitle = styled.p<ThemeProps>`
  font-size: 18px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : '#333')}; /* Texto claro ou escuro */
  margin-left: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;

  @media ${device.mobile} {
    font-size: 1.25rem;
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : '#333')}; /* Texto claro ou escuro */
    margin-left: 1rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }
`;

// Estilos para o modo desktop
export const DesktopContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 85px;
`;

export const MenuContainer = styled.div<ThemeProps>`
  margin-top: 20px;
  width: 290px;
  padding-top: 0px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  border-right: 2px solid ${({ theme }) => (theme === 'dark' ? COLORS.gray[200] : COLORS.gray[400])};
`;

export const ContentContainer = styled.div<ThemeProps>`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[900] : COLORS.white[100])};
`;
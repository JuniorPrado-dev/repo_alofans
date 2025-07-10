//src/components/Location/SelectLocation/style.ts

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
  transition: background-color 0.3s ease;

  @media ${device.mobile} {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])}; /* Fundo escuro ou claro */
    transition: background-color 0.3s ease; /* Transição suave para o tema */
  }
`;

export const LocalIcon = styled.img<ThemeProps>`
  @media ${device.mobile} {
    width: 10%;
    filter: ${({ theme }) => (theme === 'dark' ? 'brightness(0) invert(1)' : 'none')}; /* Ícone branco no modo escuro */
    transition: filter 0.3s ease; /* Transição suave para o tema */
  }
  @media ${device.desktop} {
    width: 10%;
    filter: ${({ theme }) => (theme === 'dark' ? 'brightness(0) invert(1)' : 'none')}; /* Ícone branco no modo escuro */
    transition: filter 0.3s ease; /* Transição suave para o tema */
  }
`;

export const SearchContainer = styled.div<ThemeProps>`
  @media ${device.mobile} {
    display: flex;
    gap: 10px;
    width: 80%;
    padding: 2px 10px;
    border-radius: 100px;
    border: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.gray[500] : COLORS.black[500])}; /* Borda escura ou clara */
    margin: 10px 0px;
    transition: border-color 0.3s ease; /* Transição suave para o tema */
  }
  @media ${device.desktop} {
    display: flex;
    gap: 10px;
    width: 80%;
    padding: 2px 10px;
    border-radius: 100px;
    border: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.gray[500] : COLORS.black[500])}; /* Borda escura ou clara */
    margin: 0px 0px;
    transition: border-color 0.3s ease; /* Transição suave para o tema */
  }
`;

export const SearchIcon = styled.img<ThemeProps>`
  @media ${device.mobile} {
    width: 10%;
    filter: ${({ theme }) => (theme === 'dark' ? 'brightness(0) invert(1)' : 'none')}; /* Ícone branco no modo escuro */
    transition: filter 0.3s ease; /* Transição suave para o tema */
  }

  @media ${device.desktop} {
    width: 10%;
    filter: ${({ theme }) => (theme === 'dark' ? 'brightness(0) invert(1)' : 'none')}; /* Ícone branco no modo escuro */
    transition: filter 0.3s ease; /* Transição suave para o tema */
  }
`;

export const SearchInput = styled.input<ThemeProps>`
    width: 80%;
    padding: 1px 5px;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    font-size: 25px;
    border-radius: 15px;
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};
    transition: color 0.3s ease;

  @media ${device.mobile} {
    width: 80%;
    padding: 1px 5px;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    font-size: 25px;
    border-radius: 15px;
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};
    transition: color 0.3s ease;
  }

`;

export const ItemContainer = styled.div<ThemeProps>`
  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    overflow-y: scroll;
    max-height: 45vh;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])}; /* Fundo escuro ou claro */
    transition: background-color 0.3s ease; /* Transição suave para o tema */
  }

  @media ${device.desktop} {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    overflow-y: scroll;
    max-height: 45vh;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
    transition: background-color 0.3s ease;
    width: 100%;
  }
`;

export const Item = styled.div<ThemeProps>`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.gray[200] : COLORS.black[500])}; /* Borda escura ou clara */
    padding: 60px 0px 40px 30px;
    transition: border-color 0.3s ease;

    @media ${device.mobile} {
      padding: 20px 30px;
    }

`;

export const ItemIcon = styled.img<ThemeProps>`
    width: 4%;
    filter: ${({ theme }) => (theme === 'dark' ? 'brightness(0) invert(1)' : 'none')}; /* Ícone branco no modo escuro */
    transition: filter 0.3s ease;

    @media ${device.mobile} {
      width: 8%;
      filter: ${({ theme }) => (theme === 'dark' ? 'brightness(0) invert(1)' : 'none')}; /* Ícone branco no modo escuro */
      transition: filter 0.3s ease; 
    }

`;

export const ItemInfo = styled.p<ThemeProps>`
    font-weight: 600;
    font-size: 22px;
    font-family: ${FONTS.montSerrat};
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
    transition: color 0.3s ease;
    padding-left: 10px;

    @media ${device.mobile} {
      font-size: large;
    }
`;
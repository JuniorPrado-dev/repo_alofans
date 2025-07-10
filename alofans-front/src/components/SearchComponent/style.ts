//src/components/SearchComponent
import styled from 'styled-components';
import { device } from '@/utils/sizeDevices'; // Importe o arquivo de breakpoints
import FONTS from '@/constants/fonts';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme
import COLORS from '@/constants/colors'; // Importe as cores

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  justify-content: center;
  transition: background-color 0.3s ease; /* Transição suave para o tema */
  padding-inline: 0px;

  @media ${device.mobile} {
    padding-bottom: 8px;
    padding-inline: 16px;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  }
`;

export const SearchContainer = styled.div<ThemeProps>`
  width: 100%;
  display: flex;
  padding: 0px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[700] : COLORS.white[300] )}; /* Cor de fundo dinâmica */
  transition: background-color 0.3s ease;

  @media ${device.mobile} {
    align-items: center;
    width: 100%;
    display: flex;
    padding: 0px 16px;
    border-radius: 100px;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[700] : '#d1d1d1')}; /* Cor de fundo dinâmica */
    transition: background-color 0.3s ease;  
  }
`;

export const SearchIcon = styled.img<ThemeProps>`
  width: 14px;
  filter: ${({ theme }) =>
    theme === 'dark'
      ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' // Ícone branco no modo escuro
      : 'none'}; // Ícone padrão no modo claro
  transition: filter 0.3s ease; /* Transição suave para o tema */

  @media ${device.mobile} {
    /* Estilos para dispositivos móveis */
  }
`;

export const SearchInput = styled.input<ThemeProps>`
  width: 100%;
  margin-bottom: 0px;
  padding: 8px 4px;
  background-color: rgba(255, 255, 255, 0);
  
  border: none;
  font-family: ${FONTS.montSerrat};
  font-weight: 400;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
  transition: color 0.3s ease; /* Transição suave para o tema */
  
  &::placeholder {
    font-size: 18px;
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Placeholder dinâmico */
  }
  &:focus{
    outline: none;
  }
`;
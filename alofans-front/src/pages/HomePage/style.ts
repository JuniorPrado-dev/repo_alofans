// src/pages/HomePage/style.ts

import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext';
import COLORS from '@/constants/colors';

interface ThemeProps {
  theme: Theme;
  isScrolled?: boolean;
}

export const Container = styled.div<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[200])};
  height: 100vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const MobileBanner = styled.div<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[200])};
  display: block; /* Mostrar no mobile */
  padding-bottom: 10.6vh;

  @media (min-width: 768px) {
    display: none; /* Ocultar no desktop */
  }
`;

export const DesktopBanner = styled.div<ThemeProps>`
  display: none; /* Ocultar no mobile */

  @media (min-width: 768px) {
    display: block; /* Mostrar no desktop */
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[200])};
  }
`;

export const BottonSeparator = styled.div<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[200])};
  width: 100%;
  height: 12vh;
  
`;
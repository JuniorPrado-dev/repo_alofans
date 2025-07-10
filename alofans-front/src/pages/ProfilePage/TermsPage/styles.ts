// src/pages/ProfilePage/TermsPage/styles.ts

import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import COLORS from "@/constants/colors"; // Importe as cores
import { device } from "@/utils/sizeDevices";

interface ThemeProps {
  theme: Theme;
}

export const Separator = styled.div<ThemeProps>`
  height: 10vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
`;

export const Container = styled.div<ThemeProps>`
  margin-top: 0px;
  flex: 1;
  width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
  border-radius: 0px;
  padding-inline: 16px;

  @media ${device.mobile} {
    margin-top: -15px;
    flex: 1;
    width: 100%;
    max-height: 100%;
    box-sizing: border-box;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
    border-radius: 0px;
    padding-inline: 16px;

  }
`;

export const Content = styled.div<ThemeProps>`
  padding-top: 0px;
  padding-bottom: 20vh;

  @media ${device.mobile} {
    padding-top: 20px;
    padding-bottom: 18vh;
  }
`;

export const Title = styled.p<ThemeProps>`
  font-size: 22px; 
  font-weight: 600;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])}; /* Texto branco no modo escuro, preto no modo claro */
  margin-bottom: 1rem;
  text-align: center;

  @media ${device.mobile} {
    font-size: 22px; 
    font-weight: 600;
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])}; /* Texto branco no modo escuro, preto no modo claro */
    margin-bottom: 1rem;
    text-align: center;
  }
`;

export const Text = styled.p<ThemeProps>`
  font-size: 1.25rem; 
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : COLORS.gray[500])}; /* Texto cinza claro no modo escuro, cinza escuro no modo claro */
  margin-bottom: 1rem;
`;

export const StyledParagraph = styled.p<ThemeProps>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
  margin-bottom: 0.5rem;
`;

export const Alert = styled.p<ThemeProps>`
  font-weight: bold;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.primary[500] : COLORS.black[900])}; /* Cor primária no modo escuro, preto no modo claro */
`;
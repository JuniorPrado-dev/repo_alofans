//src/components/TermsAndConditions/style.ts
import styled from 'styled-components';
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import COLORS from "@/constants/colors"; // Importe as cores

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  font-size: 14px;
  height: 90vh; /* 90% da altura da tela */
  overflow-y: auto; /* Permite rolagem se o conteúdo ultrapassar a altura do contêiner */
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
  transition: background-color 0.3s ease, color 0.3s ease; /* Transição suave para o tema */
`;

export const SectionTitle = styled.h3<ThemeProps>`
  font-size: 18px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
  margin-top: 20px;
  transition: color 0.3s ease; /* Transição suave para o tema */
`;

export const SectionContent = styled.p<ThemeProps>`
  font-size: 14px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : COLORS.black[700])}; /* Texto cinza claro no modo escuro, cinza escuro no modo claro */
  line-height: 1.6;
  text-align: justify;
  transition: color 0.3s ease; /* Transição suave para o tema */
`;

export const Button = styled.button<ThemeProps>`
  width: 100%;
  padding: 12px 20px;
  margin-top: 20px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.purple.DEFAULT : COLORS.blue[500])}; /* Cor roxa no modo escuro, azul no modo claro */
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.purple[500] : COLORS.blue[500])}; /* Cor roxa escura no modo escuro, azul escuro no modo claro */
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #b0c4de;
    color: #e0e0e0;
    cursor: not-allowed;
    transform: none;
  }
`;
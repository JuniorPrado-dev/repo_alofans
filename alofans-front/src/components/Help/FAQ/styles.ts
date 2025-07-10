// src/components/Help/FAQ/styles.ts
import COLORS from "@/constants/colors";
import FONTS from "@/constants/fonts";
import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme

interface ThemeProps {
  theme: Theme;
}

export const SafeArea = styled.div<ThemeProps>`

  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
`;

export const ScrollView = styled.div<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-bottom: 40px;
  width: 100%;

`;

export const Header = styled.div<ThemeProps>`
  padding-top: 3rem;
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  margin-top: 3rem;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
`;

export const Title = styled.h1<ThemeProps>`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : "#9362d9")}; /* Cor primária no modo escuro, roxo no modo claro */
`;

export const StickyHeader = styled.div<ThemeProps>`
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
  padding-bottom: 0.5rem;
`;

export const Subtitle = styled.h2<ThemeProps>`

  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.9rem;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
`;

export const Tabs = styled.div`

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

export const Tab = styled.button<{ active: boolean; theme: Theme }>`

  padding: 0.5rem 1rem;
  margin: 0.25rem;
  border-radius: 1rem;
  background-color: ${({ active, theme }) =>
    active
      ? theme === 'dark'
        ? COLORS.primary // Cor primária no modo escuro
        : "#9362d9" // Roxo no modo claro
      : theme === 'dark'
      ? COLORS.black[400] // Cor primária no modo escuro
        : COLORS.black[400]}; // Fundo claro para tabs inativas
  cursor: pointer;
  
`;

export const TabText = styled.span<{ active: boolean; theme: Theme }>`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ active, theme }) =>
    active
      ? COLORS.white[100] // Texto branco para tabs ativas
      : theme === 'dark'
      ? COLORS.white[100] // Texto branco no modo escuro
      : COLORS.white[100]}; // Texto preto no modo claro
`;

export const Content = styled.div<ThemeProps>`
  min-height: 190vh;
  width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
`;

export const FaqItem = styled.div<ThemeProps>`
  width: 100%;
  margin-bottom: 0.5rem;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[700] : COLORS.white[100])}; /* Fundo escuro ou claro */
`;

export const FaqQuestion = styled.div<ThemeProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.gray[500] : COLORS.gray[300])}; /* Borda escura ou clara */

  svg {
    width: 24px;
    height: 24px;
    fill: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])} !important; /* Ícone branco no modo escuro, preto no modo claro */
    stroke: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])} !important; /* Ícone branco no modo escuro, preto no modo claro */
  }
`;

export const QuestionText = styled.span<ThemeProps>`

  font-family: ${FONTS.montSerrat};
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
`;

export const AnswerText = styled.p<ThemeProps>`

  font-family: ${FONTS.montSerrat};
  font-size: 15px;
  font-weight: 400;
  padding: 0 20px 0.5rem 1rem;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : COLORS.gray[500])}; /* Texto cinza claro no modo escuro, cinza escuro no modo claro */
`;

export const ContactInfo = styled.div<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
`;

export const ContactTitle = styled.h2<ThemeProps>`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.black[100] : "#bf7373")}; /* Cor primária no modo escuro, vermelho no modo claro */
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const ContactEmail = styled.p<ThemeProps>`

  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2.5rem;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
`;
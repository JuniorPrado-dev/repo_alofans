//src/pages/EventsPage/AddEventPage/ResumeEvent/style.ts
import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import COLORS from "@/constants/colors"; // Importe as cores

interface ThemeProps {
  theme: Theme;
}

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

export const ModalContainer = styled.div<ThemeProps>`
  background: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 400px;
  transition: background-color 0.3s ease; /* Transição suave para o tema */
`;

export const Table = styled.div<ThemeProps>`
  margin-bottom: 20px;

  p {
    font-size: 18px;
    margin: 5px 0;
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
    transition: color 0.3s ease; /* Transição suave para o tema */
  }
`;

export const Title = styled.h2<ThemeProps>`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
  transition: color 0.3s ease; /* Transição suave para o tema */
`;
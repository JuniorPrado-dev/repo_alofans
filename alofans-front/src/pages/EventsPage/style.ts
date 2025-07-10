//src/pages/EventsPage/style.ts

import styled from "styled-components";
import FONTS from '@/constants/fonts';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo do tema
import COLORS from "@/constants/colors";

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  overflow-y: scroll;
  padding-inline: 0px;
`;

export const TopContainer = styled.div<ThemeProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 30px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  border-bottom: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.black[400] : COLORS.black[400])};
  margin-bottom: 11px;
`;

export const Logo = styled.img<ThemeProps>`
  width: 40px; /* Ajuste o tamanho da logo conforme necessário */
  height: auto;
  filter: ${({ theme }) =>
    theme === 'dark'
      ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' // Logo branca no modo escuro
      : 'none'}; /* Logo original no modo claro */
`;

export const LocationContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TypeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 16px;
`;

export const ButtonTypeTodos = styled.button<{ $isActive: boolean; theme: Theme }>`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? (theme === 'dark' ? COLORS.purple[300] : "#7e5bef") : (theme === 'dark' ? "#444" : "#ddd")};
  color: ${({ $isActive, theme }) =>
    $isActive ? "#ffffff" : (theme === 'dark' ? "#bbbbbb" : "#333")};
  font-family: ${FONTS.montSerrat};
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 400)};
  padding: 6px 12px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
`;

export const EventList = styled.div`
  padding-top: 20px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE e Edge */
  scrollbar-width: none; /* Firefox */
`;

export const ButtonTypeOnline = styled(ButtonTypeTodos)`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? (theme === 'dark' ? COLORS.red[400] : COLORS.red[400]) : (theme === 'dark' ? "#444" : "#ddd")};
`;

export const ButtonTypePresencial = styled(ButtonTypeTodos)`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? (theme === 'dark' ? COLORS.blue[400] : "#4c82ff") : (theme === 'dark' ? "#444" : "#ddd")};
`;

export const EventContainer = styled.div<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  width: 100%;
  padding: 14px 30px;
  padding-bottom: 220px;
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
`;

export const EventText = styled.p<ThemeProps>`
  font-weight: 600;
  font-size: 18px;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? "#ffffff" : "#333")};
`;

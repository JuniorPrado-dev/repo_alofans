//src/components/EventList/styles.ts

import COLORS from '@/constants/colors';
import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme
import { device } from '@/utils/sizeDevices';
import FONTS from '@/constants/fonts';

interface ThemeProps {
  theme: Theme;
}

export const Separator = styled.div<ThemeProps>`
  height: 5vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[200])};
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  

  @media ${device.mobile} {
    display: flex;
    align-items: center;
    justify-content: center; 
  }
`;

export const Container = styled.div<ThemeProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[200])};
  min-height: 15vh;
  height: auto;
  overflow: visible;
  padding: 20px 40px;
  margin: 0 auto;
  padding-bottom: 20vh;

  @media ${device.mobile} {
    min-height: 16vh;
    padding: 16px;
  }

  @media ${device.mobile_mini} {
    min-height: 200vh;
  }
`;

export const EventsContainer = styled.div<ThemeProps>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  justify-content: center;

  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 16px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const TypeContainer = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  margin-bottom: 16px;
  gap: 40px;
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

export const ButtonTypeOnline = styled(ButtonTypeTodos)`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? (theme === 'dark' ? COLORS.red[400] : COLORS.red[400]) : (theme === 'dark' ? "#444" : "#ddd")};
`;

export const ButtonTypePresencial = styled(ButtonTypeTodos)`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? (theme === 'dark' ? COLORS.blue[400] : "#4c82ff") : (theme === 'dark' ? "#444" : "#ddd")};
`;

export const BottonSeparator = styled.div<ThemeProps>`
  margin-left: 10px;
  margin-right: 10px;
  width: 1px;
  height: 24px;
  background-color: #ccc;
`;

export const NoEventWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 300px;
  text-align: center;
  grid-column: 1 / -1;
`;
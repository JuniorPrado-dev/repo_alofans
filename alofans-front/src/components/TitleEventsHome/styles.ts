//src/components/EventList/styles.ts

import COLORS from '@/constants/colors';
import FONTS from '@/constants/fonts';
import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme

interface ThemeProps {
  theme: Theme;
}

export const SectionContainer = styled.div<ThemeProps>`
  display: flex;
  margin-top: 40px;
  margin-inline: 16px;
  align-items: center;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[200])};

  @media (min-width: 768px) {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[200])};
    display: flex;
    align-items: start;
    gap: 0.75;
    margin-top: 0px;
    padding-top: 20px;
    margin-inline: 0px;
    padding-inline: 85px;
    margin-bottom: 0px;  
  }
`;

export const SectionText = styled.p<ThemeProps>`
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[1000])};
    font-size: 20px;
    font-weight: 600;
    font-family: ${FONTS.montSerrat};
    margin-left: 8px;
    margin-bottom: 0px;

  @media (min-width: 768px) {
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[1000])};
    font-size: 22px;
    font-weight: 600;
    font-family: ${FONTS.montSerrat};
    margin-left: 8px;
  }
`;
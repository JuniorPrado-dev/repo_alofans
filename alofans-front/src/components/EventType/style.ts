//src/components/EventType/style.ts

import FONTS from '@/constants/fonts';
import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme
import COLORS from '@/constants/colors';
import { device } from '@/utils/sizeDevices';

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  display: flex;
  align-items: start;
  justify-content: start;
  width: 100%;
  gap: 5px;
  margin-top: 5px;
  margin-left: -2px;
`;

export const Icon = styled.img`
  height: 10px;
  width: auto;
`;

export const Label = styled.p<ThemeProps>`
  font-size: 16px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  margin-top: -1px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])}; /* Texto claro ou escuro */
  
  @media ${device.desktop} {
    font-size: 22px;
  }
`;
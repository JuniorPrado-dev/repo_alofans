//src/components/wallet/styles.ts

import COLORS from '@/constants/colors';
import FONTS from '@/constants/fonts';
import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) =>
    theme === 'dark'
      ? 'linear-gradient(to right, #9163F2, #FF6B6B)' /* Gradiente escuro */
      : 'linear-gradient(to right, #9163F2, #FF6B6B)'}; /* Gradiente claro */
  width: 90%; /* w-4/5 */
  height: 220px; /* h-48 */
  padding: 16px; /* p-5 */
  border-radius: 0.5rem; /* rounded-lg */
  margin-top: 10px;
  margin-bottom: 100px;
`;

export const Balance = styled.p<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.white[100])}; /* Texto claro ou escuro */
  text-align: end;
  font-size: 18px;
  padding: 2px;
  font-weight: 600;
`;

export const pix_key = styled.p<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.white[100])}; /* Texto claro ou escuro */
  text-align: center; /* text-center */
  font-size: 18px; /* text-xl */
  padding-top: 40px; /* p-2 */
`;

export const Name = styled.p<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.white[100])}; /* Texto claro ou escuro */
  font-weight: 600;
  text-align: start; /* text-start */
  font-size: 18px; /* text-xl */
  padding: 0.5rem; /* p-2 */
`;
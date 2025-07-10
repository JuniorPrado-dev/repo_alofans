// src/components/Services/ServiceIcon/styles.ts

import COLORS from '@/constants/colors';
import FONTS from '@/constants/fonts';
import { device } from '@/utils/sizeDevices';
import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme

interface ThemeProps {
  theme: Theme;
}

export const IconContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;

  @media ${device.mobile} {
    gap: 8px; /* Adiciona um espaçamento entre os itens para telas menores */
  }
`;

export const IconImage = styled.img<ThemeProps>`
  margin-left: 6px;
  width: 20vw;
  height: auto;
  object-fit: cover;
  border-radius: 16px;
  max-width: 100%;

  @media ${device.tablet} {
    max-width: 28vw; /* Aumenta a largura máxima para telas menores */
    border-radius: 16px; /* Reduz o border-radius para telas menores */
  }
`;

export const IconText = styled.p<ThemeProps>`
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])}; /* Texto claro ou escuro */
  font-size: 16px;
  font-family: ${FONTS.montSerrat};
  font-weight: 400;
  text-align: center;
  white-space: pre-line;
  text-decoration: none; /* Remove underline */
  cursor: pointer;
  transition: color 0.3s ease;
  max-width: 28vw;
  margin-inline: 10px;
  margin-bottom: 4px;

  &:hover {
    color: #ff6b6b;
  }

  @media ${device.tablet} {
    max-width: 40vw; /* Aumenta a largura máxima para melhorar a legibilidade */
  }
`;
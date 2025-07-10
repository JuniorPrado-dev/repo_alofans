// components/FormField/style.ts

import COLORS from '@/constants/colors';
import FONTS from '@/constants/fonts';
import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme
import { device } from '@/utils/sizeDevices';

interface ButtonProps {
  $isDisabledd: boolean; // Use $isDisabledd em vez de disabled
  theme: Theme; // Adicione o tema como prop
  color?: string; // Adicione a propriedade de cor
}

export const Button = styled.button<ButtonProps>`
  width: 100%;
  padding: 14px 20px;
  margin-top: 40px;
  background-color: ${({ color }) => color}; // Usa a cor passada
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.white[100])}; // Cor do texto
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.$isDisabledd ? 'not-allowed' : 'pointer')};
  font-size: 18px;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.2s;
  font-family: ${FONTS.montSerrat};

  &:hover {
    background-color: ${({ color }) => `${color}CC`}; // Efeito hover com transparência
  }

  &:active {
    transform: ${(props) => (props.$isDisabledd ? 'none' : 'scale(0.98)')};
  }

  @media ${device.desktop} {
    margin-top: 20px;
  }
`;
// components/FormField/style.ts
import COLORS from '@/constants/colors';
import FONTS from '@/constants/fonts';
import { device } from '@/utils/sizeDevices';
import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;

  @media ${device.desktop} {
    margin-bottom: 20px;
  }
`;

export const SelectContainer = styled.div`
  position: relative;
  background-color: transparent;
`;

interface StyledSelectProps {
  disabled?: boolean;
  color?: string;
  theme: Theme;
}

export const StyledSelect = styled.select<StyledSelectProps>`
  text-align: start;
  align-items: center;
  width: 100%;
  padding: 14px 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.primary : COLORS.primary)}; /* Cor com base no tema */
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : COLORS.white[200])}; /* Texto claro ou escuro */
  font-family: ${FONTS.montSerrat};
  border: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.white[700] : COLORS.secondary)};
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  transition: background-color 0.3s, transform 0.2s;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => (theme === 'dark' ? COLORS.white[700] : COLORS.secondary)};
    box-shadow: ${({ theme }) => (theme === 'dark' ? COLORS.white[700] : COLORS.secondary)};
    outline: none;
  }

  &:disabled {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[500] : '#f2f2f2')};
    cursor: not-allowed;
  }

  option {
    padding: 12px;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[700] : COLORS.white[100])}; /* Fundo escuro ou claro para as opções */
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[500])}; /* Cor do texto branco ou preto */
  }

  /* Estilo para o placeholder (opção desabilitada) */
  option[value=""][disabled] {
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[500])};
  }
`;

export const ErrorText = styled.span<ThemeProps>`
  color: ${({ theme }) => (theme === 'dark' ? COLORS.red[400] : COLORS.white[100])};
  font-size: 14px;
  margin-top: 8px;
  display: block;

  @media ${device.mobile} {
    color: ${COLORS.red[400]};
  }
`;

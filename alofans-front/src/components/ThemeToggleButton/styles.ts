import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme
import COLORS from '@/constants/colors';

interface ButtonProps {
  theme: Theme;
}

export const Button = styled.button<ButtonProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[500] : COLORS.black[400])};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#444' : '#e0e0e0')};
  }
`;
//src/components/LoginForm/style.ts
import styled from 'styled-components';
import COLORS from '@/constants/colors';
import FONTS from '@/constants/fonts';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme
import { device } from '@/utils/sizeDevices';

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  transition: background-color 0.3s ease; /* Transição suave para o tema */
  margin-top: 0px;

  @media ${device.mobile} {
    
  }
`;

export const Title = styled.h1<ThemeProps>`
  font-size: 22px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[700])};
  font-weight: 600;
  text-align: center;
  font-family: ${FONTS.montSerrat};
  transition: color 0.3s ease;  
`;

export const FormStyled = styled.form<ThemeProps>`
  margin-left: -30px;
  width: 123%;

  @media ${device.mobile} {
    margin-left: 0px;
    width: 100%; 
  }

`;

export const ContainerInput = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -40px;

  @media ${device.desktop} {
    margin-top: -20px;
  }

  @media ${device.mobile} {
    margin-top: -20px;
  }
`;

export const SpaceButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -40px;

  @media ${device.desktop} {
    margin-top: -50px;
  }

  @media ${device.mobile} {
    margin-top: -40px;
  }
`;

export const Button = styled.button<ThemeProps>`
  width: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.purple.DEFAULT : COLORS.primary)}; /* Cor primária */
  color: ${COLORS.white}; /* Texto branco */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
  font-family: ${FONTS.montSerrat};
  margin-top: -40px;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.purple[500] : COLORS.secondary)}; /* Cor secundária no hover */
    transform: scale(1.03);
  }

  &:disabled {
    background-color: #b0c4de;
    color: #e0e0e0;
    cursor: not-allowed;
    transform: none;
  }
`;

export const LinkButton = styled.button<ThemeProps>`
  background: none;
  border: none;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.purple.DEFAULT : COLORS.primary)}; /* Cor primária */
  cursor: pointer;
  font-size: 14px;
  font-family: ${FONTS.montSerrat};
  transition: color 0.3s ease; /* Transição suave para o tema */

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => (theme === 'dark' ? COLORS.purple[500] : COLORS.secondary)}; /* Cor secundária no hover */
  }
`;

export const MidContainer = styled.div`
  width: 260px;
  margin-top: -20px;
  padding-top: 20px;

  @media ${device.mobile} {
    width: 100%;
    margin-top: -20px;
    padding-top: 20px;
    padding-inline: 0px;
  }
`;

export const ForgotPasswordLink = styled.div<ThemeProps>`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  text-align: center;
  font-size: 14px;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
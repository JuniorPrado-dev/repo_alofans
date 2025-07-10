//src/components/CheckLogin/styles.ts

import styled from 'styled-components';
import { Theme } from "@/contexts/ThemeContext";
import COLORS from "@/constants/colors";
import FONTS from '@/constants/fonts';
import { device } from '@/utils/sizeDevices';

interface ThemeProps {
  theme: Theme;
}

export const ContainerBack = styled.div<ThemeProps>`
  /* transform: translateX(0%); */
  position: sticky;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0vh;
  margin-bottom: 0px;
  
  @media ${device.mobile} {
    margin-bottom: 10px;
  }
`;

export const HeaderBack = styled.header<ThemeProps>`
  display: flex;
  justify-content: space-between; /* Alinha os itens nas extremidades */
  align-items: center; /* Centraliza verticalmente */
  width: 100%;
  
  background-color: ${COLORS.white[100]}; /* Fundo branco */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4); /* Sombra para destaque */

`;

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  
  @media ${device.mobile} {
    margin-top: -10px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between; /* Alinha os itens nas extremidades */
  align-items: center; /* Centraliza verticalmente */
  width: 100%;
  background-color: ${COLORS.white[100]}; /* Fundo branco */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Sombra para destaque */
`;

export const Image = styled.img<ThemeProps>`
  width: 350px;
  height: auto;
  margin-bottom: 60px;
  padding-top: 60px;
  
  @media ${device.mobile} {
    width: 300px;
    height: auto;
    margin-bottom: 60px;
    padding-top: 40px;
  }
`;

export const Button = styled.button<ThemeProps>`
    font-family: ${FONTS.montSerrat};
    font-weight: 600;
    font-size: 18px;
    padding: 10px;
    border-radius: 8px;
    background-color: ${COLORS.purple.DEFAULT};
    color: ${COLORS.white[100]};
    margin-bottom: 35vh;
    cursor: pointer;
    border: 0px solid #000;
    width: 300px;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.purple[500] : COLORS.purple[400])}; /* Cor roxa escura no modo escuro, azul escuro no modo claro */
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
  
  @media ${device.mobile} {
    margin-top: 50px;
    width: 80%
  }
`;
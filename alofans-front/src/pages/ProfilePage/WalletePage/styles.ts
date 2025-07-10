//src/pages/ProfilePage/WalletePage/styles.ts

import styled from "styled-components";
import COLORS from "@/constants/colors";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import FONTS from "@/constants/fonts";
import { device } from "@/utils/sizeDevices";

interface ThemeProps {
    theme: Theme;
}

export const ContainerUp = styled.div<ThemeProps>`
  padding: 0px 16px;
  width: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */


  @media ${device.mobile} {
    padding: 0px 16px;
    width: 100%;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
    margin-top: -15px;

    }

  `;

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0vh;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};

`;

export const TextContainer = styled.div<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  margin-bottom: 40px;
`;

export const Text = styled.p<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])}; /* Texto claro ou escuro */
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 0px;
  padding-inline: 30px;
  padding-top: 0px;
  font-family: ${FONTS.montSerrat};

  @media ${device.mobile} {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])}; /* Texto claro ou escuro */
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    margin-top: -10px;
    margin-bottom: 10px;
    padding-inline: 16px;
    padding-top: 20px;
    font-family: ${FONTS.montSerrat};
  }
`;

interface ButtonProps {
    $isActive: boolean;
    theme: Theme; // Adicione o tema como prop
}

export const Button = styled.button<ButtonProps>`
  background-color: ${({ $isActive, theme }) =>
        $isActive
            ? theme === 'dark'
                ? COLORS.primary // Cor do botão ativo no tema escuro
                : COLORS.primary // Cor do botão ativo no tema claro
            : theme === 'light'
                ? COLORS.primary // Cor do botão inativo no tema escuro
                : COLORS.primary}; // Cor do botão inativo no tema claro
  color: white;
  border: none;
  border-radius: 8px;
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'not-allowed')};
  pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')}; /* Desabilita o clique */

    padding: 10px 20px;
    font-size: 20px;
    font-weight: 600;
    margin-top: 0px;
    width: 90%;
    font-family: ${FONTS.montSerrat};

  @media ${device.mobile} {
    background-color: ${({ $isActive, theme }) =>
        $isActive
            ? theme === 'dark'
                ? COLORS.primary // Cor do botão ativo no tema escuro
                : COLORS.primary // Cor do botão ativo no tema claro
            : theme === 'light'
                ? COLORS.primary // Cor do botão inativo no tema escuro
                : COLORS.primary}; // Cor do botão inativo no tema claro
    color: white;
    border: none;
    border-radius: 8px;
    cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'not-allowed')};
    pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')}; /* Desabilita o clique */

      padding: 10px 16px;
      font-size: 20px;
      font-weight: 600;
      margin-top: 50px;
      width: 100%;
      font-family: ${FONTS.montSerrat}; 
  }
`;
//src/pages/ProfilePage/EditPage/styles.ts

import COLORS from "@/constants/colors";
import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import FONTS from "@/constants/fonts";
import { device } from "@/utils/sizeDevices";

interface ThemeProps {
  theme: Theme;
}

export const ContainerUp = styled.div<ThemeProps>`
  
  margin-top: 0px;
  padding-top: 0px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};

  @media ${device.mobile} {
    margin-top: -15px;
    padding-top: 20px;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  }
`;

export const Container = styled.div<ThemeProps>`
  flex: 1;
  padding-top: 0px;
  width: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`;

export const ProfileContainer = styled.div`

  /* Estilos adicionais podem ser adicionados aqui */
`;

export const Text = styled.p<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])}; /* Texto claro ou escuro */
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  margin-top: 0px;
  font-family: ${FONTS.montSerrat};
  padding-inline: 6vh;
`;
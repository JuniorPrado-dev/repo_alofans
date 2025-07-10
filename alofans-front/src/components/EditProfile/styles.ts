//src/components/EditProfile/styles.ts

import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import COLORS from "@/constants/colors";
import { device } from "@/utils/sizeDevices";
import FONTS from "@/constants/fonts";

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
`;

export const Form = styled.form<ThemeProps>`
  margin-top: 1vh;
  width: 100%;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[500])};
  padding-inline: 0px;
  

  p {
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[500])}; 
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const Button = styled.button<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.primary : COLORS.primary)};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.white[100])};
  border: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[500])};
  border-radius: 8px;
  padding: 10px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  font-size: 18px;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[900] : COLORS.white[200])};
  }

  &:active {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[500] : COLORS.white[400])};
  }

  &:focus {
    outline: none;
  }

  cursor: pointer;

  @media ${device.mobile}{
    min-width: 300px;
    margin-top: 50px;
  }

  @media ${device.tablet}{
    min-width: 300px;
    margin-top: 25px;
  }

`;
// src/pages/ProfilePage/HelpPage/styles.ts
import COLORS from "@/constants/colors";
import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import { device } from "@/utils/sizeDevices";

interface ThemeProps {
  theme: Theme;
}

export const Separator = styled.div<ThemeProps>`
  height: 40vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
`;

export const Container = styled.div<ThemeProps>`
  display: flex;
  width: 100%;
  height: 90vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  padding-inline: 10px;

  @media ${device.mobile} {
    margin-top: -10px;
    padding-bottom: 18%;
  }
`;

export const Text = styled.p<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])};
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  padding-top:30px;
  padding-bottom:10px;
  margin-top: -10px;
  margin-bottom: -1px;
  padding-inline: 6vh;
`;
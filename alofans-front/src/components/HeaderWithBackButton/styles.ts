//src/components/BackButton/styles.ts

import styled from "styled-components";
import COLORS from "@/constants/colors";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme corretamente
import { device } from "@/utils/sizeDevices";

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  padding-top: 10px;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
    border-bottom: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.black[400] : COLORS.black[400])};
    margin-bottom: 10px;
    padding-bottom: 10px;
    @media ${device.mobile} {
      margin-bottom:15px;
      border-bottom: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.black[400] : COLORS.black[200])};

  }
`;

export const Content = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  padding: 12px 0px;
  padding-inline: 16px;
`;

export const BackArrow = styled.img<ThemeProps>`
  margin-top: -3px;
  height: 16px;
  cursor: pointer;
  background-color: transparent;
  filter: ${({ theme }) =>
    theme === 'dark'
      ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
      : 'brightness(0.9) saturate(100%) invert(13%) sepia(90%) saturate(5000%) hue-rotate(260deg) brightness(80%) contrast(90%)'};
`;

export const Separator = styled.div<ThemeProps>`
  margin-top: 8px;
  width: 100%;
  z-index: 7;
  height: 1px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[200] : COLORS.black[500])};
`;

export const Logo = styled.img<ThemeProps>`
  width: 40px;
  height: auto;
  position: absolute;
  left: 50%;
  z-index: 7;
  transform: translateX(-50%);
  filter: ${({ theme }) =>
    theme === 'dark'
      ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
      : 'none'};
`;
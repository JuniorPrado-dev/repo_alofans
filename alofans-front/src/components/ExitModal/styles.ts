import styled from "styled-components";
import COLORS from "@/constants/colors";
import FONTS from "@/constants/fonts";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import { device } from "@/utils/sizeDevices";

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`

  @media ${device.desktop} {
    display: flex;
    flex-direction: column;
    margin: 20px;
    gap: 10px;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
    padding: 20px;
    border-radius: 8px;
  }

  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    margin: 0px;
    gap: 10px;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
    padding: 10px;
    border-radius: 8px;    
  }
`;

export const Title = styled.p<ThemeProps>`
  font-size: 1.75rem;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};
  font-family: ${FONTS.montSerrat};
`;

export const Text = styled.p<ThemeProps>`
  font-size: 1.25rem;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};
  font-family: ${FONTS.montSerrat};
`;

export const Buttons = styled.div`
  display: flex;
  gap: 30px;
  justify-content: flex-end;
  margin-top: 20px;
  font-family: ${FONTS.montSerrat};
`;

export const TextButton = styled.p<ThemeProps>`
  cursor: pointer;
  font-size: 1.25rem;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};
  font-family: ${FONTS.montSerrat};

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => (theme === 'dark' ? COLORS.purple[300] : COLORS.gray[500])};
  }
`;
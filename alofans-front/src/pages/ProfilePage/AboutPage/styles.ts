
import styled from 'styled-components';
import COLORS from '@/constants/colors';
import { Theme } from "@/contexts/ThemeContext";
import { device } from '@/utils/sizeDevices';


interface ThemeProps {
  theme: Theme;
}

export const Separator = styled.div<ThemeProps>`
  height: 10vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
`;

export const Container = styled.div<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-inline: 16px;
  padding-bottom: 20%;
  margin-top: -10px;

  @media ${device.mobile} {
    margin-top: -15px;
    padding-bottom: 18%;
  }
`;

export const Content = styled.div<ThemeProps>`
  padding-bottom: 2vh;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const Header = styled.h1<ThemeProps>`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])};
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const SubHeader = styled.h2<ThemeProps>`
  font-size: 1.5rem;
  font-weight: semi-bold;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[700])};
`;

export const Text = styled.p<ThemeProps>`
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[700])};
  font-size: 1.25rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;
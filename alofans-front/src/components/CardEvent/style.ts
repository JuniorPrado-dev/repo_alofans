// src/components/CardEvent/style.ts

import FONTS from '@/constants/fonts';
import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme
import COLORS from '@/constants/colors';
import { device } from '@/utils/sizeDevices';

interface ThemeProps {
  theme: Theme;
}

export const MobileCardEvent = styled.div`
  display: none; /* Mostrar no mobile */

  @media ${device.mobile} {
    display: block; /* Ocultar no desktop */
  }
`;

export const DesktopCardEvent = styled.div`
  display: block; /* Ocultar no mobile */

  @media ${device.mobile} {
    display: none; /* Mostrar no desktop */
  }
`;

export const Container = styled.div<ThemeProps>`
  position: relative;
  background-color: ${({ theme }) => (theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.9)")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#333")};
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => (theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)")};
  cursor: pointer;
  width: 100%;
  height: fit-content;
  max-height: 550px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    border: 1px solid ${({ theme }) => (theme === "dark" ? COLORS.purple[300] : COLORS.purple[200])};
  }
  
  @media ${device.mobile} {
    margin-bottom: 16px;
    background-color: ${({ theme }) => (theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.9)")};
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;

  &:hover {
    transform: scale(1.02);
  }

  @media ${device.mobile} {
    height: 180px;
  }
`;

export const ContentContainer = styled.div`
  padding: 10px;
`;

export const Title = styled.div<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  font-weight: 600;
  font-size: 18px;
  margin-bottom: -5px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[1000])};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 40px;

  @media ${device.mobile} {
    font-size: 1rem;
  }
`;

export const IfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

export const Info = styled.p<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  margin: 0;
  font-size: 16px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])};
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;

  svg {
    opacity: 0.8;
    font-size: 12px;
  }
`;

export const JustifyLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: start;

  @media ${device.mobile} {
    font-size: 0.9rem;
  }
`;
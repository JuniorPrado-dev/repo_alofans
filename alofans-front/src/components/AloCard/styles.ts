//src/components/AloCard/styles.ts
import styled from "styled-components";
import COLORS from "@/constants/colors";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import FONTS from "@/constants/fonts";
import { device } from "@/utils/sizeDevices";

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[900] : COLORS.white[100])};
  padding: 24px;
  border: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.white[600] : COLORS.white[800])};
  border-radius: 12px;
  box-shadow: 0 4px 6px ${({ theme }) => (theme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)')};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px ${({ theme }) => (theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.15)')};
  }

  @media ${device.mobile} {
    height: auto;
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 8px;
`;

export const Title = styled.h2<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.primary : COLORS.primary)};
  margin-bottom: 8px;
  letter-spacing: -0.5px;

`;

export const MessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
`;

export const Message = styled.p<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])};
  opacity: 0.9;
  margin: 0;
`;

export const StatusContainer = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background-color: ${({ theme }) => (theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)')};
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const StatusText = styled.span<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.secondary : COLORS.secondary)}; /* Texto branco no modo escuro, preto no modo claro */
`;

export const StatusColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

export const ButtonsContainerTwo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`;

export const ButtonsContainerOne = styled.div`
  cursor: pointer;
  
  
`;

export const Button = styled.button`
  font-family: ${FONTS.montSerrat};
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  color: ${COLORS.white[100]};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
  }
`;
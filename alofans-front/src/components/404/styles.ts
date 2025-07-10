import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext";
import FONTS from "@/constants/fonts";
import COLORS from "@/constants/colors";
import { device } from "@/utils/sizeDevices";

interface ContainerProps {
  theme: Theme;
}

interface ButtonProps {
  theme: Theme;
}

export const Container = styled.div<ContainerProps>`
  font-family: ${FONTS.montSerrat};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#1E1E1E" : "#FFFFFF"};
  padding: 0 10%;

  @media ${device.mobile} {
    padding-top: 25px;
    display: flow-root;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 50%;

  @media ${device.mobile} {
    max-width: 100%;
  }
`;

export const ErrorCode = styled.h1<ContainerProps>`
  font-family: ${FONTS.montSerrat};
  font-size: 48px;
  font-weight: bold;
  color: ${({ theme }) => (theme === "dark" ? "#FFFFFF" : "#333333")};
  margin-bottom: 40px;

  @media ${device.mobile} {
    margin-bottom: 25px;
  }
`;

export const Title = styled.h2<ContainerProps>`
  font-family: ${FONTS.montSerrat};
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => (theme === "dark" ? "#FFFFFF" : "#333333")};
  margin-bottom: 10px;
`;

export const Message = styled.p<ContainerProps>`
  font-family: ${FONTS.montSerrat};
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => (theme === "dark" ? "#CCCCCC" : "#777667")};
  margin-bottom: 40px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;

  @media ${device.mobile} {
    display: flow-root;
  }
`;

export const FilledButton = styled.button<ButtonProps>`
  font-family: ${FONTS.montSerrat};
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ theme }) =>
    theme === "dark" ? COLORS.purple[300] : "#6200EE"}; /* Cor roxa */
  color: #ffffff;

  &:hover {
    background-color: ${({ theme }) =>
      theme === "dark" ? "#3700B3" : "#3700B3"}; /* Cor roxa mais escura */
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media ${device.mobile} {
    margin-bottom: 25px;
    width: 100%;
  }
`;

export const OutlinedButton = styled.button<ButtonProps>`
  font-family: ${FONTS.montSerrat};
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  border: 2px solid
    ${({ theme }) => (theme === "dark" ? COLORS.purple[300] : "#6200EE")}; /* Cor roxa */
  border-radius: 8px;
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => (theme === "dark" ? COLORS.purple[300] : "#6200EE")}; /* Cor roxa */

  &:hover {
    background-color: ${({ theme }) =>
      theme === "dark" ? "#6200EE" : COLORS.secondary}; /* Cor roxa */
    color: ${({ theme }) => (theme === "dark" ? "#FFFFFF" : "#FFFFFF")}; /* Texto branco */
  }

  &:active {
    transform: scale(0.95);
  }

  @media ${device.mobile} {
    margin-bottom: 40px;
    width: 100%;
  }
`;

export const ImageContainer = styled.div`
  max-width: 50%;

  @media ${device.mobile} {
    max-width: 100%;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;
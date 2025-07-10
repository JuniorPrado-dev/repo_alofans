import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext";
import FONTS from "@/constants/fonts";
import { device } from "@/utils/sizeDevices";

interface ContainerProps {
  theme: Theme;
}

export const Container = styled.div<ContainerProps>`
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#1E1E1E" : "#ffffff"};
  border-radius: 10px;
  box-shadow: ${({ theme }) =>
    theme === "dark"
      ? "0 4px 8px rgba(255, 255, 255, 0.1)"
      : "0 4px 8px rgba(0, 0, 0, 0.1)"};
  margin: 10px;

  @media ${device.mobile} {
    flex-direction: column;
  }
`;

export const Image = styled.img`
  width: 45%;
  height: auto;
  margin-bottom: 0px;

  @media ${device.mobile} {
    width: 70%;
    height: auto;
    margin-bottom: 0px;
  }
`;

export const Message = styled.p<ContainerProps>`
  font-family: ${FONTS.montSerrat};
  font-size: 16px;
  color: ${({ theme }) => (theme === "dark" ? "#FFF" : "#000")};
  max-width: 500px;
  margin-left: 18px;
  margin-right: 18px;

  @media ${device.mobile} {
    font-size: 16px;
    padding-bottom: 80px;
    font-weight: 400;
  }
`;
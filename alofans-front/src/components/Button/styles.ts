import FONTS from "@/constants/fonts";
import { device } from "@/utils/sizeDevices";
import styled from "styled-components";


export const Pressable = styled.button<{ 
  isPressed: boolean;
  backgroundColor: string;
  disabled: boolean;
  border?: string;
  }>`

  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  margin-bottom: 10px;
  background-color: ${({ disabled, backgroundColor }) => (disabled ? '#8c8c8c' : backgroundColor)};
  opacity: ${({ isPressed }) => (isPressed ? 0.5 : 1)};
  border: ${({ border }) => border || 'none'};
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: 100%;

  @media ${device.desktop} {
    min-height: 0px;
    height: 50px;
  }
`;  

export const ButtonText = styled.span<{ textColor: string }>`
  font-size: ${16}px;
  font-weight: 700;
  font-family: ${FONTS.montSerrat};
  color: ${({ textColor }) => textColor};

  @media ${device.desktop} {
    font-size: ${18}px;
  }
`;
// src/pages/LoginPage/style.ts

import styled from "styled-components";
import COLORS from "@/constants/colors";
import { Theme } from "@/contexts/ThemeContext";
import { device } from "@/utils/sizeDevices";

interface ThemeProps {
  theme: Theme;
}

// Contêiner principal
export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  transition: background-color 0.3s ease;
  padding: 0px 0px;
  overflow-y: scroll;
  // padding: 0px 0px;
  

  @media ${device.mobile} {
    
  }
`;

export const LogoContainer = styled.a`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 2;

  @media ${device.mobile} {
    display: none;
  } 
`;

export const Logo = styled.img`
  height: 30vh;
  width: auto;
  
  @media ${device.mobile} {
    display: none;
  }
`;

export const Wrapper = styled.div<ThemeProps>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-top: -10px;

  @media ${device.mobile} {
    display: block;
    margin-top: 0px;
  }
`;

export const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('images/group.png');
  background-size: cover;
  background-position: center;
  z-index: 0;

  @media ${device.mobile} {
    display: none;
  }
`;

export const FormContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 65vh;
  padding: 20px;
  background: ${({ theme }) => (theme === 'dark' ? 'rgba(61, 61, 61, 0.75)' : 'rgba(255, 255, 255, 0.81)')}; /* Fundo escuro ou claro semitransparente */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 1; /* Garante que fique sobre a imagem */
  transition: background 0.3s ease; /* Transição suave para o tema */

  @media ${device.mobile} {
    padding: 0px;
    background: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
    max-width: 100vh;
    width: 100%;
    padding-inline: 16px;
    box-shadow: none;
    border-radius: 0;
    margin-bottom: 0vh;
    margin-top: 20px;
  }
`;
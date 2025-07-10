// src/pages/ProfilePage/DeletePage/styles.ts

import COLORS from "@/constants/colors";
import FONTS from "@/constants/fonts";
import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import { device } from "@/utils/sizeDevices";

interface ThemeProps {
  theme: Theme;
}

export const Separator = styled.div<ThemeProps>`
  height: 20vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
`;

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 30px;
  height: 100vh;
  overflow-y: auto;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
`;

export const Content = styled.div<ThemeProps>`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding-inline: 10px;
`;

export const Header = styled.h1<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])}; /* Texto branco no modo escuro, preto no modo claro */
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: -10px;
  margin-bottom: -1px;
  font-family: ${FONTS.montSerrat};

  @media ${device.mobile} {
    padding-top: 20px;
    padding-bottom: 20px;
    margin-top: -15px;
    margin-bottom: -1px;
    font-family: ${FONTS.montSerrat};
  }
`;

export const Text = styled.p<ThemeProps>`
  font-size: 20px;
  margin-top: 1.4rem;
  text-align: center;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
`;

export const Input = styled.input<ThemeProps>`
  align-items: center;
  width: 100%;
  padding: 1px;
  border: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.gray[500] : COLORS.gray[300])}; /* Borda escura ou clara */
  border-radius: 10px;
  margin-top: 20px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
`;

export const ErrorText = styled.p<ThemeProps>`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 0px;
  padding: 0px 20px;
`;

export const FormFieldContainer = styled.div`
  padding-inline: 0px;
  margin-bottom: 30px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div<ThemeProps>`
  width: 80%;
  padding: 20px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
  border-radius: 10px;
  text-align: center;
`;

export const ModalText = styled.p<ThemeProps>`
  font-size: 1rem;
  font-weight: semi-bold;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 16px;
`;
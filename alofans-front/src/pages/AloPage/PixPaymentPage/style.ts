//src/pages/AloPage/PixPaymentPage/style.ts

import COLORS from "@/constants/colors";
import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme


interface ThemeProps {
  theme: Theme;
}

export const KeyboardAvoidingView = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
`;
export const SafeArea = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  padding: 0px 16px;
  margin-top: -10px;
  overflow-y: auto;
  height: 100vh;

  @media (min-width: 768px) {
    padding: 0px 85px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.gray[100])};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => (theme === 'dark' ? COLORS.gray[500] : COLORS.gray[300])};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => (theme === 'dark' ? COLORS.gray[400] : COLORS.gray[400])};
  }

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) =>
    theme === 'dark' ? `${COLORS.gray[500]} ${COLORS.black[800]}` : `${COLORS.gray[300]} ${COLORS.white[100]}`};
`;

export const ScrollView = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

export const Container = styled.div<ThemeProps>`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 24vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  
  transition: background-color 0.3s ease;

  overflow-y: auto;

  @media (min-width: 768px) {
    padding-inline: 500px;
  }
`;

export const Title = styled.h1<ThemeProps>`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[500])}; /* Texto branco no modo escuro, preto no modo claro */
  margin-bottom: 20px;
  margin-top: 20px;
  transition: color 0.3s ease; /* Transição suave para o tema */
`;

export const ContainerPix = styled.div`
  display: contents;
  

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 60px;
  }
`;

export const PixImage = styled.img`
  width: 70%;
  height: auto;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: 25%;
    height: auto;
    margin-bottom: 20px;
  }
`;

export const CodeContainer = styled.div<ThemeProps>`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[700] : COLORS.white[100])}; /* Fundo escuro ou claro */
  border-radius: 8px;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;

  @media (min-width: 768px) {
    width: 70%;
  }
`;

export const CodeLabel = styled.p<ThemeProps>`
  font-size: 18px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
  margin-bottom: 10px;
  transition: color 0.3s ease; /* Transição suave para o tema */
`;

export const CodeText = styled.p<ThemeProps>`
  font-size: 16px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[600] : COLORS.white[100])}; /* Fundo escuro ou claro */
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease; /* Transição suave para o tema */
`;

export const ButtonContainer = styled.div<ThemeProps>`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
  margin-bottom: -10px;
  transition: background-color 0.3s ease; /* Transição suave para o tema */
`;
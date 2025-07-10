//src/components/Modal/style.ts
import { device } from '@/utils/sizeDevices';
import styled, { keyframes } from 'styled-components';
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import COLORS from "@/constants/colors"; // Importe as cores

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translate(-50%, -60%);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
    to {
        opacity: 0;
        transform: translate(-50%, -60%);
    }
`;

interface AnimationProps {
    $isClosing?: boolean;
    $fullHeight?: boolean;
    $fullWidth?: boolean;
    theme?: Theme; // Adicione a prop theme
}

export const Overlay = styled.div<AnimationProps>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    opacity: ${({ $isClosing }) => ($isClosing ? 0 : 1)};
    transition: opacity 0.3s ease;
`;

export const Container = styled.div<AnimationProps>`
    position: absolute;
    top: 50%; /* Posiciona o topo do modal no centro vertical */
    left: 50%; /* Posiciona a esquerda do modal no centro horizontal */
    transform: translate(-50%, -50%); /* Centraliza o modal */
    width: ${({ $fullWidth }) => ($fullWidth ? "95vw" : "600px")}; /* Largura do modal */
    height: ${({ $fullHeight }) => ($fullHeight ? "85vh" : "auto")}; /* Altura do modal */
    max-width: 1200px; /* Largura máxima */
    max-height: 90vh; /* Altura máxima */
    overflow-y: auto; /* Permite scroll vertical se o conteúdo for grande */
    z-index: 5;
    padding: 2rem; /* Espaçamento interno */
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])}; /* Fundo escuro ou claro */
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra para destacar o modal */
    transition: background-color 0.3s ease, color 0.3s ease; /* Transição suave para o tema */
    
    animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.5s ease-out;
    
    /* Oculta a barra de rolagem no Webkit (Chrome, Safari) */
    &::-webkit-scrollbar {
      display: none;
    }
    
    /* Oculta a barra de rolagem para navegadores compatíveis com scrollbar-width */
    scrollbar-width: none; /* Firefox */
    
    @media ${device.mobile} {
      max-width: 800px; 
      overflow-y: auto; 
      z-index: 5;
      padding: 20px 10px; 
      background-color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : COLORS.white[300])}; /* Fundo escuro ou claro */
      color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s ease, color 0.3s ease;
      width: ${({ $fullWidth }) => ($fullWidth ? "95vw" : "90vw")}; /* Largura do modal */
      height: ${({ $fullHeight }) => ($fullHeight ? "85vh" : "60vh")}; /* Altura do modal */
      max-height: 80vh; /* Altura máxima no mobile */
      animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.5s ease-out;
      
      /* Oculta a barra de rolagem no Webkit (Chrome, Safari) */
      &::-webkit-scrollbar {
        display: none;
      }

      /* Oculta a barra de rolagem para navegadores compatíveis com scrollbar-width */
      scrollbar-width: none; /* Firefox */
    }
`;

export const CloseButton = styled.button<AnimationProps>`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.red[500] : 'rgba(255, 0, 0, 0.8)')};
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 40px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.red[500] : 'rgba(255, 0, 0, 1)')}; /* Cor vermelha escura no modo escuro, vermelho no modo claro */
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : 'rgba(255, 255, 255, 0.7)')}; /* Contorno branco no modo escuro, branco claro no modo claro */
  }

  @media ${device.mobile} {
    
  }
  @media ${device.tablet} {
    
  }
`;
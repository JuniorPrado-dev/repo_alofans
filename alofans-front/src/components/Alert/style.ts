import FONTS from '@/constants/fonts';
import { device } from '@/utils/sizeDevices';
import styled, { keyframes } from 'styled-components';

// Animação para o alerta aparecer suavemente com um leve efeito de zoom
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const AlertWrapper = styled.div<{ $hasImage: boolean }>`
  width: ${({ $hasImage }) => ($hasImage ? 'auto' : '100%')};  // Ajuste de largura baseado na imagem
  min-height: 400px; // Altura mínima para desktop
  padding: 40px 20px;
  background-color:rgb(255, 255, 255);
  border-radius: 8px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-in-out;

  @media ${device.mobile} {
    width: 100%;
    min-height: 100px; // Altura mínima para mobile
    height: auto;
    padding: 30px 15px;
  }
`;

export const AlertImage = styled.img`
  width: auto;   /* Ajuste automático da largura */
  max-height: 40vw;
  margin-bottom: 16px;
  border-radius: 6px;  /* Opcional, para suavizar a borda da imagem */
`;

export const AlertTitle = styled.h2`
  font-size: 22px;
  font-family: "Montserrat", sans-serif;
  color: #333;
  text-align: center;
  margin: 0 0 14px 0;
  
  @media ${device.mobile} {
    font-family: ${FONTS.montSerrat};
    font-size: 20px;
    margin-top:30px;
    max-width: 90vw;
  }
`;

export const AlertContent = styled.p`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  color: #555;
  text-align: center;
  margin-bottom: 20px;

  @media ${device.mobile} {
    font-family: ${FONTS.montSerrat};
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  @media ${device.mobile} {
    flex-direction: column;
    gap: 8px;
  }
`;

export const AlertButton = styled.button`
  padding: 12px 24px;
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-family: ${FONTS.montSerrat};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  flex: 1;
  min-width: 160px;
  max-width: 200px;

  @media ${device.mobile} {
    max-width: 100%;
    width: 100%;
    font-size: 14px;
    padding: 14px 20px;
  }

  &:hover {
    background-color: #e9ecef;
    color: #000;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
  }
`;

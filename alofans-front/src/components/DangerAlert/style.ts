import COLORS from '@/constants/colors';
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
  width: ${({ $hasImage }) => ($hasImage ? 'auto' : '340px')};  // Ajuste de largura baseado na imagem
  padding: 24px;
  background-color: #f9f9f9;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-in-out;
  @media ${device.mobile} {
      width: ${({ $hasImage }) => ($hasImage ? 'auto' : 'auto')};  // Ajuste de largura baseado na imagem
      padding: 10px 0px;
    }
`;

export const AlertImage = styled.img`
  width: auto;   /* Ajuste automático da largura */
  max-height: 50px;
  margin-bottom: 16px;
  border-radius: 6px;  /* Opcional, para suavizar a borda da imagem */
`;

export const AlertTitle = styled.h2`
  font-size: 22px;
  font-family: "Montserrat", sans-serif;
  color: #333;
  text-align: center;
  margin: 0 0 14px 0;
`;

export const AlertContent = styled.p`
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  color: ${COLORS.darkBlue};
  text-align: center;
  margin-bottom: 24px;
  span{
    color: ${COLORS.red};
    font-weight: 600;
  }
  @media ${device.mobile} {
    
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const AlertButton = styled.button`
  padding: 12px 20px;
  background-color: #e2e2e2;
  color: #333;
  border: 1px solid #b3b3b3;
  border-radius: 4px;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
    color: #000;
    font-weight: 600;
    transform: scale(1.05);
  }
  @media ${device.mobile} {
    
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${COLORS.green};
  }
`;


export const Label = styled.label`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  display: block;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
`;


export const StyledTextInput = styled.input<{ $multiline?: boolean }>`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid ${COLORS.black};
  background-color: ${COLORS.white};
  color: ${COLORS.darkBlue};
  resize: ${(props) => (props.$multiline ? 'vertical' : 'none')};
  height: ${(props) => (props.$multiline ? 'auto' : '20px')};
  min-height: ${(props) => (props.$multiline ? '100px' : '20px')};
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 15px;
  &:focus {
    border-color: ${COLORS.lightBlue};
    box-shadow: 0px 0px 5px rgba(74, 144, 226, 0.5);
    outline: none;
  }
  @media ${device.mobile} {
    width: 80%;
    padding: 10px;
    font-size: 20px;
    border-radius: 8px;
    border: 1px solid ${COLORS.black};
    background-color: ${COLORS.white};
    color: ${COLORS.darkBlue};
    resize: ${(props) => (props.$multiline ? 'vertical' : 'none')};
    height: ${(props) => (props.$multiline ? 'auto' : '20px')};
    min-height: ${(props) => (props.$multiline ? '100px' : '20px')};
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 15px;
    &:focus {
      border-color: ${COLORS.lightBlue};
      box-shadow: 0px 0px 5px rgba(74, 144, 226, 0.5);
      outline: none;
    }
    
  }
`;

export const ErrorText = styled.span`
  color: ${COLORS.red};
  font-size: 14px;
  margin-bottom: 8px;
  display: block;
`;

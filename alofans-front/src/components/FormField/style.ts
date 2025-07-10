// components/FormField/style.ts
import COLORS from '@/constants/colors';
import FONTS, { FONTSIZES } from '@/constants/fonts';
import { device } from '@/utils/sizeDevices';
import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext';

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div`
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  max-width: 100%;
  position: relative;
`;

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: transparent;
`;

export const StyledTextInput = styled.input<{ $multiline?: boolean } & ThemeProps>`
  width: 100%;
  border-radius: 8px;
  font-size: ${FONTSIZES.label};
  border: 1px solid ${({ theme }) => theme === 'dark' ? COLORS.white[200] : COLORS.black[500]};
  background-color: ${({ theme }) => theme === 'dark' ? COLORS.black[1000] : COLORS.white[100]};
  color: ${({ theme }) => theme === 'dark' ? COLORS.white[500] : COLORS.black[900]};

  &::placeholder {
    color: ${({ theme }) => theme === 'dark' ? COLORS.white[500] : COLORS.black[400]};
  }
  resize: ${(props) => (props.$multiline ? 'vertical' : 'none')};
  height: ${(props) => (props.$multiline ? 'auto' : '50px')};
  min-height: ${(props) => (props.$multiline ? '100px' : '40px')};
  font-family: ${FONTS.montSerrat};
  text-indent: 10px;
  
  &:focus {
    border-color: ${COLORS.secondary};
    box-shadow: ${COLORS.secondary};
    outline: none;
  }
  @media ${device.mobile} {
    padding: 10px 0px;
    font-size: 14px;
      }
`;

export const Label = styled.label<ThemeProps>`
  font-size: 16px;
  color: ${({ theme }) => theme === 'dark' ? COLORS.white[100] : COLORS.black[600]};

  margin-bottom: 6px;
  display: block;
  font-weight: 500;
  font-family: ${FONTS.montSerrat};
`;

export const StyledSelect = styled.select<{ disabled?: boolean }>`
  text-align: center;
  align-items: center;
  width: 97%;
  padding: 12px 20px;
  font-size: larger;
  border-radius: 8px;
  background-color: #ccc; // Cor padrão
  background-color: ${({ color }) => color || '#ccc'}; // Usa a cor passada ou um valor padrão
  color: ${COLORS.white[100]};
  font-family: ${FONTS.montSerrat};
  border: 1px solid ${COLORS.secondary};
  cursor:  'pointer';
  font-size: 16px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;

  &:focus {
    border-color: ${COLORS.secondary};
    box-shadow: ${COLORS.secondary};
    outline: none;
  }

  &:disabled {
    background-color: #f2f2f2;
    cursor: not-allowed;
  }

  option {
    padding: 20px;
    background-color: ${COLORS.black[400]}; /* Fundo escuro para as opções */
    color: ${COLORS.white[100]}; /* Cor do texto branco */
  }

  /* Estilo para o placeholder (opção desabilitada) */
    option[value=""][disabled] {
      color: ${COLORS.white[100]}; 
  }
`;

interface ButtonProps {
  $isDisabledd: boolean; // Use $isDisabledd em vez de disabled
}

export const Button = styled.button<ButtonProps>`
  width: 100%;
  padding: 12px 20px;
  margin-top: 10px;
  background-color: ${(props) =>
    props.$isDisabledd ? COLORS.buttonDisableBackground : COLORS.buttonEnableBackground};
  color: ${(props) =>
    props.$isDisabledd ? COLORS.buttonDisableColor : COLORS.buttonEnableColor};
  border: none;
  border-radius: 6px;
  cursor: ${(props) => (props.$isDisabledd ? 'not-allowed' : 'pointer')};
  font-size: 16px;
  font-weight: bold;
  font-family: ${FONTS.montSerrat};

  &:hover {
    background-color: ${(props) =>
      props.$isDisabledd ? COLORS.buttonDisableBackground : COLORS.purple[500]};
    transform: ${(props) => (props.$isDisabledd ? 'none' : 'scale(1.03)')};
  }

  &:active {
    transform: ${(props) => (props.$isDisabledd ? 'none' : 'scale(0.98)')};
  }
`;


export const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

export const PasswordIcon = styled.img`
  width: 25px;
  height: 25px;
  @media ${device.mobile} {
    width: 25px;
    height: 25px;
      }
`;

export const ErrorText = styled.span<ThemeProps>`
  color: ${({ theme }) => theme === 'dark' ? COLORS.blue[300] : COLORS.red[400]};
  font-size: 14px;
  margin-top: 8px;
  display: block;
`;


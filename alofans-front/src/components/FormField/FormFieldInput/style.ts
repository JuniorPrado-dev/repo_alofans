// components/FormField/style.ts
import styled from 'styled-components';
import COLORS from '@/constants/colors';
import { device } from '@/utils/sizeDevices';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme
import FONTS from '@/constants/fonts';

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  @media ${device.desktop} {
    margin-bottom: 20px;
  }
`;

export const InputContainer = styled.div`
  max-width: 100%;
  position: relative;
`;

interface StyledTextInputProps {
  multiline: boolean;
  theme: Theme;
}

export const StyledTextInput = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== 'multiline',
}).attrs<StyledTextInputProps>(({ multiline }) => ({
  as: multiline ? 'textarea' : 'input',
}))<StyledTextInputProps>`
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.white[700] : COLORS.primary)};
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[900] : COLORS.white[100])};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[1000])};
  resize: ${(props) => (props.multiline ? 'vertical' : 'none')};
  height: ${(props) => (props.multiline ? 'auto' : '10px')};
  min-height: ${(props) => (props.multiline ? '100px' : '50px')};
  font-family: ${FONTS.montSerrat};
  text-indent: 10px;

  &:focus {
    border-color: ${({ theme }) => (theme === 'dark' ? COLORS.secondary : COLORS.secondary)};
    box-shadow: ${({ theme }) => (theme === 'dark' ? COLORS.secondary : COLORS.secondary)};
    outline: none;
  }

  @media ${device.mobile} {
    padding: 10px 0px;
  }

  &::placeholder {
    font-size: 15px;
    color: ${({ theme }) => (theme === 'dark' ? COLORS.gray[300] : COLORS.gray[300])};
  }
`;

export const Label = styled.label<ThemeProps>`
  font-size: 16px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : '#333')};
  margin-bottom: 8px;
  display: block;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
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
  color: ${({ theme }) => (theme === 'dark' ? COLORS.red[300] : COLORS.red[300])};
  font-size: 14px;
  margin-top: 8px;
  display: block;

  @media ${device.mobile} {
    color: ${COLORS.red[400]};
  }
`;

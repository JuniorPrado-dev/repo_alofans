// src/components/UserForm/style.ts
import styled from "styled-components";
import { Form } from "formik";
import COLORS from "@/constants/colors";
import FONTS from "@/constants/fonts";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import { device } from "@/utils/sizeDevices";

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  max-width: 50%;
  width: 320px;
  padding-top: 20px;
  max-width: 100vw;
  transition: background-color 0.3s ease; /* Transição suave para o tema */
  padding-bottom: 14vh;

  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
    max-width: 768px;
    width: 100%;
    padding-top: 20px;
    transition: background-color 0.3s ease; 
    padding-inline: 0px;
    padding-bottom: 14vh;
  } 
`;

export const Title = styled.h1<ThemeProps>`
    font-size: 22px;
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[500])}; /* Texto branco no modo escuro, preto no modo claro */
    margin-bottom: 20px;
    font-weight: 600;
    text-align: center;
    font-family: ${FONTS.montSerrat};
    transition: color 0.3s ease; /* Transição suave para o tema */
`;

export const FormStyled = styled(Form)<ThemeProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;

  &::placeholder {
    font-size: 1px;
  } 

  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    padding-inline: 10px;
    width: 115%;
    gap: 12px;

    &::placeholder {
      font-size: 1px;
    }
  }

`;

export const ErrorText = styled.div`
  color: #d9534f;
  font-size: 14px;
  margin-top: -4px;
  margin-bottom: 8px;
  font-family: ${FONTS.montSerrat};
`;

export const ContainerCheckBox = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 14px;
  justify-content: center;
  margin-bottom: -60px;
`;

export const CheckBox = styled.input`
  width: 35px;
  cursor: pointer;
`;

export const CheckBoxText = styled.input`
  width: 35px;
  cursor: pointer;
`;

export const Link = styled.span<ThemeProps>`
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 8px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.secondary : COLORS.blue[500])};
  transition: color 0.3s ease; /* Transição suave para o tema */

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const TermsContainer = styled.div`
  background-color: red;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  
`;

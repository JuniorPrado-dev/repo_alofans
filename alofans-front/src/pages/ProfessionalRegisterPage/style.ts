// src/pages/ProfessionalRegisterPage/style.ts
import styled from "styled-components";
import { Form } from "formik";
import { device } from "@/utils/sizeDevices";
import COLORS from "@/constants/colors";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import FONTS from "@/constants/fonts";

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[900] : COLORS.white[100])};
  border-radius: 0px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  transition: background-color 0.3s ease;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media ${device.tablet} {
    padding: 0px 0px 0px 0px;
    max-width: 700px;
  }

  @media ${device.desktop} {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[900] : COLORS.white[100])};   
    padding: 48px 32px 48px 32px;
    box-shadow: 0px 8px 24px rgba(0,0,0,0.08);
    justify-content: start;
  }
`;

export const ContainerType = styled.div`
  @media ${device.mobile} {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;

interface ContainerType {
  isDisabled: boolean;
}

export const ButtonType = styled.div<ContainerType>`
  width: 100%;
  padding: 12px 20px;
  cursor: pointer;
  @media ${device.mobile} {
    border-bottom: ${(props) =>
    props.isDisabled ? 'none' : `3px solid ${COLORS.purple.DEFAULT}`};
  }
`;

export const Title = styled.h1<ThemeProps>`
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
  font-family: ${FONTS.montSerrat};
  font-size: 16px;
  transition: color 0.3s ease;

  @media ${device.tablet} {
    font-size: 20px;
    margin-bottom: 28px;
  }
  @media ${device.desktop} {
    font-size: 26px;
    margin-bottom: 36px;
  }
`;

export const FormStyled = styled(Form)<ThemeProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0;

  @media ${device.tablet} {
    gap: 20px;
    padding: 0 16px;
  }
  @media ${device.desktop} {
    gap: 24px;
    padding: 0px 520px;
  }
`;

export const ErrorText = styled.div`
  color: #d9534f;
  font-size: 13px;
  margin-top: -8px;
  margin-bottom: 8px;
  font-family: "Montserrat", sans-serif;
  @media ${device.desktop} {
    font-size: 15px;
    margin-bottom: 12px;
  }
`;

export const ContainerCheckBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const CheckBox = styled.input`
  width: 35px;
  cursor: pointer;
`;

export const Link = styled.span<ThemeProps>`
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 8px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.purple.DEFAULT : COLORS.blue[500])}; /* Cor roxa no modo escuro, azul no modo claro */
  transition: color 0.3s ease; /* Transição suave para o tema */

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
//src/pages/EventsPage/AddEventPage/style.ts
import styled from "styled-components";
import { Form } from "formik";
import { device } from "@/utils/sizeDevices";
import COLORS from "@/constants/colors";
import FONTS from "@/constants/fonts";
import { Theme } from "@/contexts/ThemeContext";
import IMAGES from "@/assets/images";

interface ThemeProps {
  theme: Theme;
}

export const ImageContainer = styled.div`
  display: none;

  @media ${device.desktop} {
    display: block;
    position: fixed;
    left: 0;
    top: 78px;
    width: 50%;
    height: 100vh;
    background-image: url(${IMAGES.group});
    background-size: cover;
    background-position: center;
    z-index: 0;
  }
`;

export const Container = styled.div<ThemeProps>`
  padding-inline: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  margin-top: 0px;
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  padding-bottom: 0vh;
  overflow-y: scroll;
  transition: background-color 0.3s ease;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media ${device.desktop} {
    margin-left: 50%;
    width: 50%;
  }

  @media ${device.mobile} {
    margin-top: -15px;
    margin-left: 0;
    width: 100%;
  }
`;

export const ContainerType = styled.div<ThemeProps>`
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
    width: 450px;
    display: flex;

  @media ${device.mobile} {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

interface ButtonTypeProps {
  isDisabled: boolean;
  theme: Theme;
}

export const ButtonType = styled.div<ButtonTypeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  padding: 12px 35px 12px 0px;
  cursor: pointer;

  @media ${device.mobile} {
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 12px 0px 12px 40px;
    border-bottom: ${({ isDisabled, theme }) =>
      isDisabled ? 'none' : `3px solid ${theme === 'dark' ? COLORS.purple.DEFAULT : COLORS.purple.DEFAULT}`};
  }
`;

export const Title = styled.h1<ThemeProps>`
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; 
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  font-size: 20px;
  transition: color 0.3s ease;
  justify-content: center;

  @media ${device.desktop} {
    margin-top: 40px;
    font-size: 30px;
  }
`;

export const FormStyled = styled(Form)<ThemeProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-inline: 40px;
  padding-bottom: 16vh;
  
  @media ${device.mobile} {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-inline: 0px;
    padding-bottom: none;
  }
`;

export const ErrorText = styled.div<ThemeProps>`
  color: #d9534f;
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 8px;
  font-family: "Montserrat", sans-serif;
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
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
  transition: color 0.3s ease; /* Transição suave para o tema */

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
import styled from "styled-components";
import { Form } from "formik";
import { device } from "@/utils/sizeDevices";
import COLORS from "@/constants/colors";
import FONTS from "@/constants/fonts";
import { Theme } from "@/contexts/ThemeContext";

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  padding-inline: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  margin-top: 10px;
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  padding-bottom: 0vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  @media ${device.mobile} {
    margin-top: -15px;
  }
`;

export const PageWrapper = styled.div<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1<ThemeProps>`
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  font-size: 26px;
  text-align: center;

  @media ${device.mobile} {
    margin-top: 20px;
    font-size: 22px;
  }
`;

export const FormStyled = styled(Form)<ThemeProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-inline: 0px;
  padding-bottom: 16vh;
`;

export const ContainerType = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

interface ButtonTypeProps {
  isDisabled: boolean;
  theme: Theme;
}

export const ButtonType = styled.div<ButtonTypeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  padding: 12px 35px 12px 0px;
  cursor: pointer;
  
  padding-inline: 20px;
  border-bottom: ${({ isDisabled, theme }) =>
    isDisabled ? 'none' : `3px solid ${theme === 'dark' ? COLORS.purple.DEFAULT : COLORS.purple.DEFAULT}`};
`;

export const ErrorText = styled.div<ThemeProps>`
  color: ${({ theme }) => (theme === 'dark' ? COLORS.blue[500] : COLORS.red[500])};
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 8px;
  font-family: ${FONTS.montSerrat};
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

export const PreviewImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Divider = styled.div`
  height: 1px;
  margin: 20px 0;
`;

export const Link = styled.span<ThemeProps>`
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 8px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

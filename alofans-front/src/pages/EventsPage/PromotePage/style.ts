// src/pages/PromoterAlo/style.ts
import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext';
import FONTS from '@/constants/fonts';
import COLORS from '@/constants/colors';
import { device } from "@/utils/sizeDevices";
import IMAGES from "@/assets/images";

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: background-color 0.3s ease;
  padding: 10px 0px;
  overflow-y: scroll;
  position: relative;
  
  /* Oculta a barra de rolagem no Webkit (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Oculta a barra de rolagem para navegadores compatíveis com scrollbar-width */
  scrollbar-width: none; /* Firefox */

  @media ${device.mobile} {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
    margin-top: -15px;
    padding-inline: 16px;
    padding-top: 0px;
  }

  @media ${device.desktop} {
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
    flex-direction: row;
    align-items: stretch;
    padding: 0;
  }
`;

export const Title = styled.h1<ThemeProps>`
  color: ${({ theme }) => (theme === 'dark' ? "#FFF" : "#000" )}; 
  margin-top: 30px;
  margin-bottom: 20px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  text-align: center;
  font-size: 22px;

  @media ${device.desktop} {
    font-size: 26px;
    margin-bottom: 0px;
  }
`;

export const FormContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0px;
  height: 100vh;
  overflow-y: auto;
  gap: 22px;

  /* Oculta a barra de rolagem no Webkit (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Oculta a barra de rolagem para navegadores compatíveis com scrollbar-width */
  scrollbar-width: none; /* Firefox */

  @media ${device.desktop} {
    margin: 0;
    margin-left: auto;
    margin-right: 7%;
    padding: 40px;
    background: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
    align-self: center;
    max-height: 90vh;
    margin-top: 5vh;
    margin-bottom: 5vh;
    gap: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const FormGroup = styled.div<ThemeProps>`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: bold;
  }

  input, select {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
`;

export const Select = styled.select<ThemeProps>`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #000;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; 
  font-size: 16px;
  margin-bottom: 0;
  margin-top: 0;
  &:focus {
    outline: none;
    border-color: ${COLORS.purple.DEFAULT};
  }
`;

export const Label = styled.label<ThemeProps>`
  display: block;
  margin-bottom: 8px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; 
  font-weight: 500;
`;

export const ImageContainer = styled.div`
  display: none;

  @media ${device.desktop} {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 50%;
    height: 100vh;
    background-image: url(${IMAGES.group});
    background-size: cover;
    background-position: center;
    z-index: 0;
  }
`;

export const AddInterlocutorContainer = styled.div`
  margin: 10px 0px 0px 0px;

  @media ${device.desktop} {
    margin: 10px 40px 0px 40px;
  }
`;

export const ButtonContainer = styled.div`
  margin: 10px 0px 0px 0px;

  @media ${device.desktop} {
    margin: 10px 40px 0px 40px;
  }
`;

export const Separator = styled.div<ThemeProps>`
  min-height: 112px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};

  @media ${device.desktop} {
    display: none;
  }
`;

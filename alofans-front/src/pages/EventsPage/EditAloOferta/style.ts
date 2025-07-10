// src/pages/EventsPage/EditAloOferta/style.ts
import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext';
import FONTS from '@/constants/fonts';
import COLORS from '@/constants/colors';
import { device } from '@/utils/sizeDevices';

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  max-height: 100vh;
  padding-bottom: 15vh;
  overflow-y: scroll;
  transition: background-color 0.3s ease;

  &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  
    @media ${device.mobile} {
      margin-top: -15px;
      padding-inline: 16px;
    }
`;

export const Title = styled.h1<ThemeProps>`
  color: ${({ theme }) => (theme === 'dark' ? "#FFF" : "#000" )}; 
  margin-top: 40px;
  margin-bottom: 40px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  font-size: 30px;
  transition: color 0.3s ease;
  justify-content: center;
  text-align: center;

  @media ${device.mobile} {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 22px;
  }
`;

export const Form = styled.form<ThemeProps>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 500px;
  margin: 0 auto;
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

export const ContainerForm = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

export const Select = styled.select<{ theme: Theme }>`
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

export const Label = styled.label<{ theme: Theme }>`
  display: block;
  margin-bottom: 8px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; 
  font-weight: 500;
`;

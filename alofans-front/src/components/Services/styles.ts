// src/components/Services/styles.ts

import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext'; // Importe o tipo Theme
import COLORS from '@/constants/colors'; // Importe as cores
import { device } from '@/utils/sizeDevices';
import FONTS from '@/constants/fonts';

interface ThemeProps {
  theme: Theme;
}

export const ContainerDesktop = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;;
  justify-content: space-between;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[200])};
  padding: 20px 85px;
  width: 100%;
  height: 320px;
  position: relative;
  overflow: hidden;

  @media ${device.mobile} {
    display: none;
  }
`;

export const PrimText = styled.h1<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  font-size: 30px;
  font-weight: 600;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[400] : COLORS.black[800])};

  transition: color 0.3s ease;

  @media ${device.mobile} {
    display: none;
  }
`;

export const SecText = styled.h1<ThemeProps>`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => (theme === 'dark'? COLORS.white[500] : COLORS.black[700])};
  font-family: ${FONTS.montSerrat};
  transition: color 0.3s ease;

  @media ${device.mobile} {
    display: none;
  }
`;

export const GirlImage = styled.img<ThemeProps>`
  margin-bottom: 180px;
  margin-left: 345px;
  position: fixed;
  right: 0;
  bottom: 0;
  height: 50%; /* Ajuste a altura conforme necessário */
  z-index: 0; /* Para ficar na frente da imagem de fundo */
`;

export const Content = styled.div<ThemeProps>`
  width: 100%;
  height: 250px;
  justify-content: center;
  align-items: center;
  display: flex;
  grid-template-columns: repeat(1, 2fr); 
  grid-template-rows: repeat(2, 1fr);
  z-index: 0; /* Para ficar na frente da imagem de fundo */

  gap: 10px;
  margin-top: 30px;

  padding-inline: 14%;
`;

export const Section = styled.div<ThemeProps>`
  margin-inline: 10px;
  width: 150px;
  height: 175px;
  padding: 0px 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 0px;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

export const Icon = styled.img<ThemeProps>`
  border-radius: 100px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[1000] : COLORS.white[400])};
  padding: 12px 12px;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
`;

export const Text = styled.p<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[400] : COLORS.black[700])};
  margin-top: 0;
  text-align: center;
`;

export const ContainerMobile = styled.div<ThemeProps>`
  display: none;

  @media ${device.mobile} {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; /* Fundo escuro ou claro */
    padding: 1rem;
    border-radius: 8px;
  }
`;

export const IconContainer = styled.div<ThemeProps>`
  display: none;

  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const IconText = styled.p<ThemeProps>`
  display: none;

  @media ${device.mobile} {
    display: flex;
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto claro ou escuro */
    text-align: center;
    white-space: pre-line;
  } 
`;

export const StyledLink = styled.a<ThemeProps>`
  display: none;

  @media ${device.mobile} {
    display: flex;
    text-decoration: none; /* Remove underline */
    color: inherit; /* Inherit text color */
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;
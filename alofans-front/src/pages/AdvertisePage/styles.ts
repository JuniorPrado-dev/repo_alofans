// src/pages/AdvertisePage/styles.ts
import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext"; 
import COLORS from "@/constants/colors"; 
import FONTS from "@/constants/fonts";
import { device } from "@/utils/sizeDevices";


interface ThemeProps {
  theme: Theme;
}

export const ContainerBack = styled.div<{ theme: Theme }>`
  @media ${device.desktop} {
    display: none;
  }

  @media ${device.mobile} {
    display: block;
  }

  /* transform: translateX(0%); */
  position: sticky;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0vh;
  margin-bottom: 0px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  `;

export const HeaderBack = styled.header<{ theme: Theme }>`
  display: flex;
  justify-content: space-between; /* Alinha os itens nas extremidades */
  align-items: center; /* Centraliza verticalmente */
  width: 100%;

  background-color: ${COLORS.white[100]}; /* Fundo branco */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4); /* Sombra para destaque */

  `;

export const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  align-items: flex-start; 
  padding-inline: 85px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])}; 
  min-height: 100vh;

  @media ${device.mobile} {
    flex-direction: column;
    padding-inline: 10px; 
    align-items: center;
    overflow-y: auto; /* Permite rolagem vertical */
    height: 100vh; /* Define a altura como 100% da viewport */
  }
`;

export const Header = styled.header<ThemeProps>`
  margin-top: 160px;
  text-align: left;
  margin-bottom: 0px;
  width: 30%;
  height: 100%;

  @media ${device.mobile} {
    margin-top: 20px; /* Reduz a margem superior */
    width: 100%; /* Ocupa toda a largura */
    text-align: center; /* Centraliza o texto */
  }
`;

export const Title = styled.h1<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  font-weight: 600;
  font-size: 28px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};
  margin-bottom: 20px;

  @media ${device.mobile} {
    padding-inline: 30px;
    font-size: 22px; /* Reduz o tamanho da fonte */
    margin-bottom: 10px;
  }
`;

export const ContactInfo = styled.div`
  font-family: ${FONTS.montSerrat};
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${device.mobile} {
    align-items: center; /* Centraliza os itens */
    gap: 10px;
  }  
`;

export const Phone = styled.span<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  font-size: 1.2rem;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : COLORS.gray[500])};

  @media ${device.mobile} {
    font-size: 1rem; /* Reduz o tamanho da fonte */
  } 
`;

export const Email = styled.a<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  font-size: 1.2rem;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.secondary : COLORS.blue[500])}; 
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media ${device.mobile} {
    font-size: 1rem; /* Reduz o tamanho da fonte */
  } 
`;

export const FormContainer = styled.div<ThemeProps>`
  padding: 20px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[900] : COLORS.white[100])}; 
  border-radius: 10px;
  box-shadow: ${({ theme }) => (theme === 'dark' ? "0 4px 8px rgba(250, 250, 250, 0.1)" :  "0 4px 8px rgba(0, 0, 0, 0.1)")};
  width: 60%;

  @media ${device.mobile} {
    width: 100%; /* Ocupa toda a largura */
    margin-top: 20px; /* Adiciona margem superior */
    padding: 15px 30px; /* Reduz o padding */
    margin-bottom: 80px; /* Adiciona margem inferior para rolagem */
  } 
`;

export const FormTitle = styled.p<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  font-size: 1.1rem;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : COLORS.gray[500])}; 
  text-align: center;

  strong {
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; 
    font-weight: 600;
  }

  @media ${device.mobile} {
    font-size: 1rem; /* Reduz o tamanho da fonte */
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.label<ThemeProps>`
  font-size: 1rem;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};

  @media ${device.mobile} {
    font-size: 0.9rem; /* Reduz o tamanho da fonte */
  }
`;

export const Input = styled.input<ThemeProps>`
  padding: 9px;
  border: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.black[700] : COLORS.gray[300])}; /* Borda escura no modo escuro, cinza no modo claro */
  border-radius: 5px;
  font-size: 1rem;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[700] : COLORS.white[100])}; /* Fundo escuro no modo escuro, branco no modo claro */

  &:focus {
    outline: none;
    border-color: ${({ theme }) => (theme === 'dark' ? COLORS.primary[500] : COLORS.blue[500])}; /* Cor primária no modo escuro, azul no modo claro */
  }

  @media ${device.mobile} { /* Adiciona media query para telas menores que 768px */
    padding: 8px; /* Reduz o padding */
    font-size: 0.9rem; /* Reduz o tamanho da fonte */
  }
`;

export const TextArea = styled.textarea<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  padding: 10px;
  border: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.black[700] : COLORS.gray[300])}; /* Borda escura no modo escuro, cinza no modo claro */
  border-radius: 5px;
  font-size: 1rem;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Texto branco no modo escuro, preto no modo claro */
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[700] : COLORS.white[100])}; /* Fundo escuro no modo escuro, branco no modo claro */
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => (theme === 'dark' ? COLORS.primary[500] : COLORS.blue[500])}; /* Cor primária no modo escuro, azul no modo claro */
  }

  @media ${device.mobile} { /* Adiciona media query para telas menores que 768px */
    padding: 8px; /* Reduz o padding */
    font-size: 0.9rem; /* Reduz o tamanho da fonte */
  }
`;

export const SubmitButton = styled.button<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  font-weight: 600;
  padding: 12px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.primary : COLORS.primary)}; /* Cor primária no modo escuro, azul no modo claro */
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.white[100])}; /* Texto branco */
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.primary[600] : COLORS.blue[500])}; /* Cor primária mais escura no modo escuro, azul mais escuro no modo claro */
  }

  @media ${device.mobile} { /* Adiciona media query para telas menores que 768px */
    padding: 10px; /* Reduz o padding */
    font-size: 0.9rem; /* Reduz o tamanho da fonte */
  }
`;
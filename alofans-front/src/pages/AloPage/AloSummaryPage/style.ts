//src/pages/AloPage/AloSummaryPage/style.ts
 
import styled from "styled-components";
import COLORS from "@/constants/colors";
import FONTS, { FONTSIZES } from "@/constants/fonts";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme


interface ThemeProps {
  theme: Theme;
}

export const Separator = styled.div<ThemeProps>`
  height: 60px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  margin-bottom: 0px;
  transition: background-color 0.3s ease;
`;

export const SafeArea = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  padding: 16px;
  margin-top: -15px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* Para rolagem suave no iOS */

  /* Esconde a barra de rolagem no mobile mas mantém a funcionalidade */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  /* Modo Desktop - mantido como estava */
  @media (min-width: 768px) {
    padding: 0px 85px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.gray[100])};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => (theme === 'dark' ? COLORS.gray[500] : COLORS.gray[300])};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => (theme === 'dark' ? COLORS.gray[400] : COLORS.gray[400])};
  }

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) =>
    theme === 'dark' ? `${COLORS.gray[500]} ${COLORS.black[800]}` : `${COLORS.gray[300]} ${COLORS.white[100]}`};
`;

export const KeyboardAvoidingView = styled.div<ThemeProps>`
  margin-top: 0vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  transition: background-color 0.3s ease;
  padding-bottom: 15vh;
  
  @media (min-width: 768px) {
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 15vh;
  }
`;

export const DesktopContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;

  @media (min-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const LeftColumn = styled.div<ThemeProps>`
  @media (min-width: 768px) {
    width: 40%;
  }
`;

export const RightColumn = styled.div<ThemeProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div<ThemeProps>`
  border-radius: 30px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  padding: 20px;
  transition: background-color 0.3s ease;

  @media (min-width: 768px) {
    padding: 0;
    background-color: transparent;
  }
`;

export const ImageContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[700] : COLORS.white[200])};
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  transition: background-color 0.3s ease;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 20px;
    padding: 32px;
    border-radius: 16px;
  }
`;

export const EventImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;

  @media (min-width: 768px) {
    width: 30%;
    height: auto;
  }
`;

export const EventDetails = styled.div<ThemeProps>`
  margin-left: 2vh;
  flex: 1;
  justify-content: center;

  @media (min-width: 768px) {
    margin-left: 0;
    margin-top: 20px;
  }
`;

export const EventName = styled.h2<ThemeProps>`
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])};
  font-size: 20px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  margin-bottom: 8px;
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: 22px;
    margin-bottom: 10px;
  }
`;

export const EventLocation = styled.p<ThemeProps>`
  font-size: 18px;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : "#222222")};
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: ${FONTSIZES.label}px;
  }
`;

export const EventComplement = styled.p<ThemeProps>`
  font-size: ${FONTSIZES.textLarge}px;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : "#222222")};
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: ${FONTSIZES.textLarge}px;
  }
`;

export const EventDate = styled.p<ThemeProps>`
  font-size: ${FONTSIZES.textLarge}px;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : "#222222")};
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: ${FONTSIZES.textLarge}px;
  }
`;

export const EventTime = styled.p<ThemeProps>`
  font-size: ${FONTSIZES.textMedium}px;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : "#222222")};
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: ${FONTSIZES.textMedium}px;
  }
`;

export const Footer = styled.div<ThemeProps>`
  border-radius: 12px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  transition: background-color 0.3s ease;
  margin: 40px auto;
  width: 100%;
  max-width: 800px;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

export const Divider = styled.div<ThemeProps>`
  height: 1px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.gray[400] : COLORS.black[400])};
  margin-bottom: 0px;
  transition: background-color 0.3s ease;
`;

export const PriceContainer = styled.div<ThemeProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const PriceLabel = styled.p<ThemeProps>`
  font-size: ${FONTSIZES.label}px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : "#bf7373")};
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: ${FONTSIZES.label + 1}px;
  }
`;

export const PriceValue = styled.p<ThemeProps>`
  font-size: 16px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.green[400] : "#bf7373")};
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: ${FONTSIZES.label + 1}px;
  }
`;

export const Button = styled.button<ThemeProps>`
  width: 100%;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.purple.DEFAULT : "#9362d9")};
  font-size: ${FONTSIZES.button}px;
  font-weight: bold;
  font-family: ${FONTS.montSerrat};
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.purple[500] : "#7c4dbf")};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 768px) {
    width: auto; /* Largura automática */
    padding: 8px 16px; /* Padding menor */
    background-color: transparent; /* Fundo transparente */
    border: 2px solid ${COLORS.primary}; /* Borda da cor primary */
    color: ${COLORS.primary}; /* Cor do texto igual à borda */
    font-size: ${FONTSIZES.button - 2}px; /* Fonte menor */
    margin: 0 auto; /* Centraliza o botão */
    display: block; /* Garante que o margin auto funcione */

    &:hover {
      background-color: ${COLORS.primary}; /* Fundo primary ao passar o mouse */
      color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])}; /* Cor do texto ao passar o mouse */
    }
  }
`;

export const Text = styled.p<ThemeProps>`
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])};
  font-size: 22px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-inline: 6vh;
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: 30px;
    margin-top: 30px;
    margin-bottom: 40px;
  }
`;

export const Title = styled.h1<ThemeProps>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};
  font-size: 22px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  text-align: center;
  margin-top: -10px;
  padding-bottom: 10px;
  padding-top: 20px;
  margin-bottom: 0px;
  padding-inline: 6vh;

  @media (min-width: 768px) {
    margin-top: 10px;
    padding-bottom: 0px;
    padding-top: 0px;
    margin-bottom: 0px;
  }
`;

// Estilo da descrição (Ex: "Festival de Tecnologia")
export const TextDescriptionMensagem = styled.p<ThemeProps>`
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])};
  font-size: 18px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  text-align: center;
  margin: 20px auto;
  padding: 10px;
  width: 100%;
  max-width: 800px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.purple[500] : COLORS.purple[100])};
  border-radius: 12px;
  box-shadow: 0 4px 16px ${({ theme }) => (theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)')};
  line-height: 1.6;
  transition: all 0.3s ease;
  border: 2px solid ${({ theme }) => (theme === 'dark' ? COLORS.purple[500] : COLORS.purple[300])};

  @media (min-width: 768px) {
    margin-top: 20px;
    font-size: 24px;
    padding: 20px;
    margin-bottom: 40px;
    border-radius: 16px;
    line-height: 1.8;
  }
`;
import COLORS from "@/constants/colors";
import FONTS, { FONTSIZES } from "@/constants/fonts";
import styled from "styled-components";
import { Theme } from "@/contexts/ThemeContext";

interface ThemeProps {
  theme: Theme;
}

export const Separator = styled.div<ThemeProps>`
  margin-top: 60px;
  width: 100%;
  height: 20px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  transition: background-color 0.3s ease;
`;

export const SafeArea = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  padding: 0px 16px;
  margin-top: -15px;
  overflow-y: auto;
  height: 100vh;

  @media (min-width: 768px) {
    padding: 0px 260px;
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
    padding-bottom: 140px;
  }
`;

export const DesktopContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 280px;
    align-items: center;
    justify-content: center;
    margin-bottom: 80px;
  }
`;

export const LeftColumn = styled.div<ThemeProps>`
  @media (min-width: 768px) {
    align-items: flex-start;
    justify-content: flex-start;
    width: 40%;
  }
`;

export const RightColumn = styled.div<ThemeProps>`
  @media (min-width: 768px) {
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;
    width: 30%;
  }
`;

export const Container = styled.div<ThemeProps>`
  border-radius: 0px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  padding: 10px;
  transition: background-color 0.3s ease;
  overflow-y: scroll;

  @media (min-width: 768px) {
    padding: 0;
    background-color: transparent;
  }
`;

export const ImageContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  transition: background-color 0.3s ease;

  @media (min-width: 768px) {
    flex-direction: row;
    margin-bottom: 0;
    gap: 20px;
  }
`;

export const EventImage = styled.img`
  width: 40%;
  height: 40%;
  border-radius: 8px;

  @media (min-width: 768px) {
    width: 100%;
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
    width: 200px;
    
  }
`;

export const EventName = styled.h2<ThemeProps>`
  margin-top: -0.5vh;
  font-size: 18px;
  font-weight: bold;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : "#bf7373")};
  margin-bottom: 0vh;
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: ${FONTSIZES.title + 2}px;
  }
`;

export const EventLocation = styled.p<ThemeProps>`
  font-size: 16px;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : "#222222")};
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: ${FONTSIZES.label + 1}px;
  }
`;

export const EventComplement = styled.p<ThemeProps>`
  font-size: 16px;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : "#222222")};
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: ${FONTSIZES.textLarge + 1}px;
  }
`;

export const EventDate = styled.p<ThemeProps>`
  font-size: 16px;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : "#222222")};
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: ${FONTSIZES.textLarge + 1}px;
  }
`;

export const EventTime = styled.p<ThemeProps>`
  font-size: 16px;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : "#222222")};
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: ${FONTSIZES.textMedium + 1}px;
  }
`;

export const MessageInput = styled.textarea<ThemeProps>`
  width: 100%;
  height: 27vh;
  font-size: 16px;
  font-family: ${FONTS.montSerrat};
  border: 1px solid ${({ theme }) => (theme === 'dark' ? COLORS.gray[500] : "#0F0F0F")};
  border-radius: 8px;
  padding: 10px;
  resize: none;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[900] : COLORS.white[100])};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};

  &::placeholder {
    color: ${({ theme }) => (theme === 'dark' ? COLORS.gray[300] : "#777777")};
  }

  @media (min-width: 768px) {
    height: 180px;
    font-size: 20px;
  }
`;

export const Footer = styled.div<ThemeProps>`
  padding-top: -10vh;
  border-radius: 30px;
  padding: 0px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  transition: background-color 0.3s ease;
  margin-top: 8vh;

  @media (min-width: 768px) {
    padding: 0vh;
    width: 100%;
    margin-top: 0px;
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
  font-size: 16px;
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
    width: auto;
    padding: 8px 16px;
    background-color: transparent;
    border: 2px solid ${COLORS.primary};
    color: ${COLORS.primary};
    font-size: ${FONTSIZES.button - 2}px;
    margin: 0 auto;
    display: block;

    &:hover {
      background-color: ${COLORS.primary};
      color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};
    }
  }
`;

export const Text = styled.p<ThemeProps>`
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[800])};
  font-size: 22px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-inline: 6vh;
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: 30px;
    margin-top: 30px;
    margin-bottom: 40px;
  }
`;

export const ArtistInfoContainer = styled.div<{ theme: Theme }>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[1000] : "#9362d9")};
  font-family: ${FONTS.montSerrat};
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const ArtistName = styled.h3<{ theme: Theme }>`
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.white[100])};
  font-family: ${FONTS.montSerrat};
  margin: 0 0 8px 0;
  font-size: 1.2rem;
`;

export const ArtistTime = styled.p<{ theme: Theme }>`
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.white[200])};
  font-family: ${FONTS.montSerrat};
  margin: 0 0 8px 0;
  font-weight: 500;
  font-size: 1rem;
`;

export const ArtistPrice = styled.p<{ theme: Theme }>`
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.white[200])};
  font-family: ${FONTS.montSerrat};
  margin: 0 0 8px 0;
  font-weight: 500;
  font-size: 1rem;
`;

export const ArtistPromo = styled.p<{ theme: Theme }>`
  color: ${({ theme }) => (theme === 'dark' ? COLORS.green[400] : COLORS.green[200])};
  font-family: ${FONTS.montSerrat};
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
`;
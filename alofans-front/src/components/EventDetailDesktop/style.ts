// src/components/EventDetailDesktop/style.ts

import styled from "styled-components";
import COLORS from "@/constants/colors";
import FONTS from "@/constants/fonts";


interface ThemeProps {
  theme: 'light' | 'dark';
}

export const Container = styled.div<ThemeProps>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => (theme === "dark" ? COLORS.black[1000] : COLORS.white[200])};
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 400px;
  background: linear-gradient(to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0.6) 100%);
  position: relative;
  padding-inline: 190px;
  align-items: center;
  @media (max-width: 1200px) {
    flex-direction: column;
    padding: 40px 20px;
  }
`;

export const EventInfoColumn = styled.div`
  margin-left: 60px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  flex: 1;
  color: white;
  
  @media (max-width: 1200px) {
    margin-left: 0;
    margin-top: 32px;
  }
`;

export const DescriptionRow = styled.div`
  width: 100%;
  margin-top: 32px;
  display: flex;
  flex-direction: row;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex: 2;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
`;

// Mantive o resto do arquivo igual, exceto o TopContainer, que foi removido.
export const Image = styled.img`
  width: 650px;
  height: 300px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
`;

export const InfoContainer = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.h2<ThemeProps>`
  font-size: 30px;
  font-weight: 700;
  font-family: ${FONTS.montSerrat};
  color: white;
  margin: 0;
  line-height: 1.2;
`;

export const TitleDescription = styled.h2<ThemeProps>`
  font-size: 28px;
  font-weight: 700;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[200] : COLORS.black[700])};
  margin: 0;
  margin-bottom: 16px;
  line-height: 1.2;
`;

export const CodeTitle = styled.h2<ThemeProps>`
  font-size: 28px;
  font-weight: 700;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.black[300] : COLORS.white[200])};
  margin: 0;
  margin-bottom: 16px;
  line-height: 1.2;
`;

export const InfoText = styled.p<ThemeProps>`
  font-size: 20px;
  font-family: ${FONTS.montSerrat};
  font-weight: 500;
  color: ${COLORS.white[100]};
  margin: 0;
`;

export const BottomContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const DescriptionContainer = styled.div`
  flex: 1;
`;

export const Text = styled.p<ThemeProps>`
  display: flex;
  gap: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: 2;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === "dark" ? COLORS.white[100] : COLORS.black[900])};
`;

export const CodeText = styled.p<ThemeProps>`
  display: flex;
  gap: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: 2;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === "dark" ? COLORS.black[400] : COLORS.white[100])};
`;

export const BottomRow = styled.div<ThemeProps>`
  padding: 60px 120px;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: start;
  gap: 60px;
  padding-inline: 180px;
  background-color: ${({ theme }) => (theme === "dark" ? COLORS.black[800] : COLORS.white[200])};
  @media (max-width: 1200px) {
    flex-direction: column;
    padding: 40px 20px;
    gap: 40px;
  }
`;
export const ArtistButtonEdit = styled.button<ThemeProps>`
  background-color: transparent;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.purple.DEFAULT)};
  border: 2px solid ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.purple.DEFAULT)};
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  font-family: ${FONTS.montSerrat};
  font-size: 14px;
  margin-top: 10px;

  &:hover {
    background-color: ${COLORS.purple[500]};
  }
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
  max-width: 400px;
  width: 50%;
  @media (max-width: 1200px) {
    align-items: flex-start;
    min-width: unset;
    width: 100%;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 0px;
  width: 100%;
  max-width: 1000px;
`;

export const ArtistsContainer = styled.div<ThemeProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ArtistCard = styled.div<ThemeProps>`
  background: ${({ theme }) => theme === 'dark' ? COLORS.black[1000] : COLORS.white[100]};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme === 'dark' ? COLORS.gray[500] : COLORS.gray[200]};
`;

export const ArtistName = styled.p<ThemeProps>`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme === 'dark' ? COLORS.white[100] : COLORS.black[900]};
  margin-bottom: 8px;
  font-family: ${FONTS.montSerrat};
`;

export const ArtistTime = styled.p<ThemeProps>`
  font-size: 16px;
  color: ${({ theme }) => theme === 'dark' ? COLORS.gray[300] : COLORS.black[500]};
  margin-bottom: 4px;
  font-family: ${FONTS.montSerrat};
`;

export const ArtistInfo = styled.p<ThemeProps>`
  font-size: 16px;
  color: ${COLORS.black[900]};
  margin-bottom: 4px;
  font-family: ${FONTS.montSerrat};
  font-weight: 600;
`;

export const ArtistButton = styled.button<ThemeProps>`
  font-family: ${FONTS.montSerrat};
  background-color: ${COLORS.purple.DEFAULT};
  color: white;
  border: none;
  padding: 6px 24px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  font-size: 18px;
  align-self: flex-start;
  &:hover {
    background-color: ${COLORS.purple[500]};
  }
`;

export const CodeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
`;

export const CopyButton = styled.button<ThemeProps>`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 4px;
  &:hover {
    background-color: ${({ theme }) => theme === 'dark' ? COLORS.gray[500] : COLORS.gray[200]};
  }
`;

export const CopyText = styled.span<ThemeProps>`
  padding-top: 20px;
  font-size: 16px;
  font-family: ${FONTS.montSerrat};
  font-weight: 400;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[500] : COLORS.black[900])};
`;

export const OwnerButton = styled.div`
  display: flex;
  gap: 16px;
  flex: 1;
  width: 100%;
`;

export const ArtistCardWrapper = styled.div<ThemeProps>`
  background: transparent;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 1200px) {
    max-width: 100%;
  }
`;

export const ArtistCardHeader = styled.div<ThemeProps>`
  font-size: 26px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => theme === 'dark' ? COLORS.white[100] : COLORS.black[900]};
  margin-bottom: 8px;
`;

export const Separator = styled.div<ThemeProps>`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.gray[500] : COLORS.black[500])};
  margin: 10px 0;
`;


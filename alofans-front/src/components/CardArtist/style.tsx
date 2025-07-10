// src/components/CardArtist/style.ts
import styled from 'styled-components';
import COLORS from '@/constants/colors';
import FONTS from '@/constants/fonts';
import { Theme } from '@/contexts/ThemeContext';

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  width: 100%;
  margin: 20px 0;
  padding: 0;
`;

export const Title = styled.h3<ThemeProps>`
  font-size: 18px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[500])};
  margin-bottom: 15px;
`;

export const ListContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 8px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[100])};
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => (theme === 'dark' ? COLORS.black[700] : COLORS.gray[100])};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${COLORS.purple.DEFAULT};
    border-radius: 3px;
  }
  scrollbar-width: thin;
  scrollbar-color: ${COLORS.purple.DEFAULT} ${({ theme }) => 
    theme === 'dark' ? COLORS.black[700] : COLORS.gray[100]};
`;

export const Card = styled.div<ThemeProps>`
  background: ${({ theme }) => (theme === 'dark' ? COLORS.black[700] : COLORS.white[100])};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid ${({ theme }) => 
    theme === 'dark' ? COLORS.gray[500] : COLORS.gray[200]};
`;

export const ArtistName = styled.span<ThemeProps>`
  font-weight: 600;
  font-size: 16px;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};
  margin-bottom: 8px;
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
`;

export const InfoLabel = styled.span<ThemeProps>`
  font-size: 16px;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.gray[400] : COLORS.primary)};
  margin-right: 6px;
  min-width: 90px;
  display: inline-block;
`;

export const InfoValue = styled.span<ThemeProps>`
text-align: end;
  font-size: 14px;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};
`;
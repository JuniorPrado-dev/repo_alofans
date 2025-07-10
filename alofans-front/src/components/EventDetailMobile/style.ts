import COLORS from '@/constants/colors';
import FONTS from '@/constants/fonts';
import styled from 'styled-components';
import { Theme } from '@/contexts/ThemeContext';

interface ThemeProps {
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  padding-top: 20px;
  margin-top: -15px;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 30px 0px;
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: scroll;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  padding-bottom: 14vh;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;

export const Title = styled.p<ThemeProps>`
  margin-bottom: 10px;
  margin-top: 40px;
  padding-inline: 16px;
  font-size: 18px;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.black[100] : COLORS.black[900])};
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
  padding-inline: 16px;
`;

export const InfoText = styled.div<ThemeProps>`
  font-size: 14px;
  font-family: ${FONTS.montSerrat};
  font-weight: 500;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[500] : COLORS.black[900])};
`;

export const Text = styled.p<ThemeProps>`
  font-size: 14px;
  font-weight: 400;
  font-family: ${FONTS.montSerrat};
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[500] : COLORS.black[900])};
`;

export const Separator = styled.div<ThemeProps>`
  margin-top: 60px;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[200])};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: auto;
  padding-inline: 16px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div<{ theme: Theme }>`
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])};
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};
  
  h2 {
    font-size: 1.5rem;
    margin: 0;
  }
  
  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.black[900])};
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ArtistsContainer = styled.div<ThemeProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  max-height: 1000px; /* Altura máxima para ativar a rolagem */
  min-height: 420px; /* Altura mínima para evitar colapso */
  overflow-y: auto; /* Habilita rolagem vertical */
  background-color: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.white[300])}; /* Fundo para visibilidade */
  padding: 0px 0px 0px 0px; /* Espaçamento interno para evitar corte de conteúdo */
  padding-inline: 16px;
  /* Estilização básica da barra de rolagem */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => (theme === 'dark' ? COLORS.black[800] : COLORS.gray[200])};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => (theme === 'dark' ? COLORS.gray[500] : COLORS.gray[300])};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => (theme === 'dark' ? COLORS.gray[400] : COLORS.gray[400])};
  }

  /* Para Firefox */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) =>
    theme === 'dark' ? `${COLORS.gray[500]} ${COLORS.black[800]}` : `${COLORS.gray[300]} ${COLORS.white[100]}`};

  /* Garantir que os filhos não sejam comprimidos */
  > * {
    flex-shrink: 0;
  }
`;

export const ArtistCard = styled.div<ThemeProps>`
  padding: 5px 10px 10px 10px;
  background-color: ${({ theme }) => theme === 'dark' ? COLORS.black[1000] : COLORS.white[100]};
  border-bottom: 1px solid ${({ theme }) => theme === 'dark' ? COLORS.black[1000] : COLORS.black[100]};
  font-family: ${FONTS.montSerrat};
  border-radius: 8px;
  margin-bottom: 8px;
  margin-top: 8px;
  &:last-child {
    border-bottom: none;
  }
`;

export const ArtistName = styled.h3<ThemeProps>`
  font-weight: bold;
  color: ${({ theme }) => theme === 'dark' ? COLORS.white[100] : COLORS.purple[300]};
  margin-bottom: 8px;
  font-size: 16px;
  font-family: ${FONTS.montSerrat};
`;

export const ArtistPrice = styled.p<ThemeProps>`
  font-weight: bold;
  color: ${({ theme }) => theme === 'dark' ? COLORS.black[300] : COLORS.white};
  margin-bottom: 4px;
  font-family: ${FONTS.montSerrat};
  font-size: 12px;
  span {
    color: ${({ theme }) => theme === 'dark' ? COLORS.black[300] : COLORS.gray[300]};
    font-size: 12px;
  }
`;

export const ArtistTime = styled.p<ThemeProps>`
  font-weight: 500;
  color: ${({ theme }) => theme === 'dark' ? COLORS.black[100] : COLORS.gray[300]};
  margin-bottom: 4px;
  font-family: ${FONTS.montSerrat};
  font-size: 12px;
`;

export const ArtistInfo = styled.p<ThemeProps>`
  font-weight: 500;
  color: ${({ theme }) => theme === 'dark' ? COLORS.white[100] : COLORS.purple[300]};
  font-family: ${FONTS.montSerrat};
  font-size: 15px; 
  font-weight: 600;
  margin-bottom: 4px;
`;

export const ArtistButton = styled.button<ThemeProps>`
  background-color: ${COLORS.purple.DEFAULT};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  font-family: ${FONTS.montSerrat};
  font-size: 14px;

  &:hover {
    background-color: ${COLORS.purple[500]};
  }
`;

export const ArtistButtonEdit = styled.button<ThemeProps>`
  background-color: transparent;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.purple.DEFAULT)};
  border: 2px solid ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.purple.DEFAULT)};
  padding: 4px 16px;
  border-radius: 4px;
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

export const CodeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  padding-right: 16px;
`;

export const CopyButton = styled.button<ThemeProps>`
  display: flex;
  align-items: start;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? COLORS.gray[500] : COLORS.gray[200])};
  }
`;

export const CopyText = styled.span<ThemeProps>`
  font-size: 16px;
  font-family: ${FONTS.montSerrat};
  font-weight: 400;
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[500] : COLORS.black[900])};
`;

export const OwnerButton = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0px;
  border-radius: 4px;
`;

export const PromoContainer = styled.div<{ theme: Theme }>`
  background-color: ${({ theme }) => 
    theme === 'dark' ? COLORS.purple[100] : COLORS.purple[500]};
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
  width: 100%;
`;

export const PromoInfo = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const PromoLabel = styled.span<{ theme: Theme }>`
  font-size: 18px;
  color: ${({ theme }) => 
    theme === 'dark' ? COLORS.black[900] : COLORS.white[400]};
`;

export const PromoValue = styled.span<{ theme: Theme, available?: boolean }>`
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme, available }) => 
    available 
      ? COLORS.green[400] 
      : theme === 'dark' 
        ? COLORS.black[900] 
        : COLORS.white[100]};
`;

export const DescriptionContainer = styled.div<ThemeProps>`
  width: 100%;
  background-color: ${({ theme }) => theme === 'light' ? COLORS.gray[100] : COLORS.black[800]};

  border-radius: 8px;
  margin-bottom: 40px;
  padding-inline: 26px;
  line-height: 1.8;
`;

export const ContainerCardArtista = styled.div<ThemeProps>`
  display: flex;
  background-color: ${({ theme }) => theme === 'dark' ? COLORS.black[800] : COLORS.white[300]};
  padding-inline: 16px;
  width: 100%;
`;

export const TituloCardArtista = styled.h3<ThemeProps>`
  background-color: ${({ theme }) => theme === 'light' ? COLORS.gray[100] : COLORS.black[100]};
  font-weight: bold;
  color: ${({ theme }) => theme === 'dark' ? COLORS.white[100] : COLORS.purple[300]};
  margin-bottom: 8px;
  font-size: 14px;
  font-family: ${FONTS.montSerrat};
  width: auto;
`;
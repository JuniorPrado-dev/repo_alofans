// src/components/CardArtist/index.tsx
import * as S from "./style";
import { Theme } from "@/contexts/ThemeContext";

interface Artist {
  id: string;
  name: string;
  aloPrice: number;
  startTime: string;
  endTime: string;
}

interface CardArtistProps {
  artists: Artist[];
  theme: Theme;
  onArtistClick?: (artist: Artist) => void; // Adicione esta linha
}

interface CardArtistProps {
  artists: Artist[];
  theme: Theme;
}

export default function CardArtist({ artists, theme, onArtistClick }: CardArtistProps) {
  return (
    <S.Container theme={theme}>
      <S.Title theme={theme}>Artistas Disponíveis</S.Title>
      <S.ListContainer theme={theme}>
        {artists.map((artist) => (
          <S.Card 
            key={artist.id} 
            theme={theme}
            onClick={() => onArtistClick && onArtistClick(artist)}
          >
            {/* ... resto do conteúdo permanece igual */}
          </S.Card>
        ))}
      </S.ListContainer>
    </S.Container>
  );
}
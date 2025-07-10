import React from "react";
import * as S from "./style";
import { useTheme } from "@/contexts/ThemeContext";
import IMAGES from "@/assets/images";

const NoEvent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <S.Container id="NoEvent.Container" theme={theme}>
      <S.Image
        src={
          theme === "dark"
            ? IMAGES.noEventDark
            : IMAGES.noEventLight
        }
        alt="Nenhum evento encontrado"
      />
      <S.Message id="NoEvent.Message" theme={theme}>
        Parece que não há eventos cadastrados para esta região. Que tal sugerir
        um evento ou explorar outras cidades?
      </S.Message>
    </S.Container>
  );
};

export default NoEvent;
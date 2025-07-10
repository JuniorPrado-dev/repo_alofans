// src/components/Profile/item.tsx

import { JSX } from "react";
import * as S from "./style";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import React from "react";

interface Props {
  icon: JSX.Element; // Recebe um ícone como um elemento React
  text: string;
  theme: Theme; // Adicione o tema como prop
}

const ProfileItem = ({ icon, text, theme }: Props): JSX.Element => {
  // Clona o ícone e aplica a cor com base no tema
  const iconWithColor = React.cloneElement(icon, {
    color: theme === 'dark' ? '#9362d9' : undefined, // Preto no tema escuro, cor original no tema claro
  });

  return (
    <S.ItemContainer id="ProfileItem.ItemContainer" theme={theme}> {/* Passe o tema como prop */}
      <S.ItemImage id="ProfileItem.ItemImage" theme={theme}>{iconWithColor}</S.ItemImage> {/* Passe o ícone com a cor ajustada */}
      <S.ItemTitle id="ProfileItem.ItemTitle" theme={theme}>{text}</S.ItemTitle> {/* Passe o tema como prop */}
    </S.ItemContainer>
  );
};

export default ProfileItem;
// src/components/NavBar/NavBarItem/index.tsx

import React from "react";
import * as S from "./styles";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme

interface NavBarItemProps {
  icon: JSX.Element; // Agora o ícone é um elemento JSX
  text: string;
  isActive: boolean;
  theme: Theme; // Adicione o tema como prop
}

const NavBarItem: React.FC<NavBarItemProps> = ({ icon, text, isActive, theme }) => {
  return (
    <S.Container theme={theme}> {/* Passe o tema como prop */}
      <S.IconContainer theme={theme}>{icon}</S.IconContainer> {/* Passe o tema como prop */}
      <S.Text $isActive={isActive} theme={theme}>{text}</S.Text> {/* Passe o tema como prop */}
    </S.Container>
  );
};

export default NavBarItem;
//src/pages/UserRegistrationPage/index.tsx

import * as S from "./styles";
import UserForm from "@/components/UserForm";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import IMAGES from "@/assets/images";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";

export default function UserRegistrationPage() {
  const [isPersonal, setIsPersonal] = useState(true);
  const { theme } = useTheme();

  return (
    <S.Container theme={theme}>
      <HeaderWithBackButton />
      <S.LogoContainer id="UserRegistrationPage.LogoContainer" href="/">
        <S.Logo
          id="UserRegistrationPage.Logo"
          src={IMAGES.logoFull}
          alt="Logo"
        />
      </S.LogoContainer>
      <S.CenterContainer
        id="UserRegistrationPage.CenterContainer"
        theme={theme}
      >
        <S.SelectorContainer
          id="UserRegistrationPage.SelectorContainer"
          theme={theme}
        >
          <S.SelectorButton
            id="UserRegistrationPage.SelectorButton"
            $isSelected={isPersonal}
            onClick={() => setIsPersonal(true)}
            theme={theme}
          >
            Pessoa Física
          </S.SelectorButton>
          <S.SelectorButton
            id="UserRegistrationPage.SelectorButton"
            $isSelected={!isPersonal}
            onClick={() => setIsPersonal(false)}
            theme={theme}
          >
            Pessoa Jurídica
          </S.SelectorButton>
        </S.SelectorContainer>
        <S.MainContent id="UserRegistrationPage.MainContent" theme={theme}>
          <UserForm isPersonal={isPersonal} />
        </S.MainContent>
      </S.CenterContainer>
    </S.Container>
  );
}

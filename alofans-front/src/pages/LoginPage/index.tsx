// src/pages/LoginPage/index.tsx

import * as S from "./style";
import LoginForm from "@/components/LoginForm";
import IMAGES from "@/assets/images";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme
import HeaderWithBackButton from "@/components/HeaderWithBackButton";

export default function LoginPage() {
  const { theme } = useTheme();

  return (
    <>
      <S.Container theme={theme}>
        <HeaderWithBackButton backTo="/" />

        <S.LogoContainer id="LoginPage.LogoContainer" href="/">
          <S.Logo id="LoginPage.Logo" src={IMAGES.logoFull} alt="Logo" />
        </S.LogoContainer>

        <S.Wrapper id="LoginPage.Wrapper">
          <S.ImageContainer />
          <S.FormContainer id="LoginPage.FormContainer" theme={theme}>
            <LoginForm />
          </S.FormContainer>
        </S.Wrapper>
      </S.Container>
    </>
  );
}

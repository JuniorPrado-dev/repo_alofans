import React from "react";
import * as S from "./styles";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import IMAGES from "@/assets/images"; // Importe as imagens

const Error404: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Navega para a página inicial
  };

  const handleContact = () => {
    // Lógica para entrar em contato (pode ser um link ou redirecionamento)
    window.location.href = "contato@alofans.com.br";
  };

  return (
    <S.Container id="Error404.Container" theme={theme}>
      <S.Content id="Error404.Content">
        <S.ErrorCode id="Error404.ErrorCode" theme={theme}>
          ERRO: 404
        </S.ErrorCode>
        <S.Title id="Error404.Title" theme={theme}>
          Ops,
        </S.Title>
        <S.Message id="Error404.Message" theme={theme}>
          Desculpe, mas não encontramos essa página.
        </S.Message>

        <S.ButtonContainer id="Error404.ButtonContainer">
          <S.FilledButton
            id="Error404.FilledButton"
            onClick={handleGoHome}
            theme={theme}
          >
            Voltar para Home
          </S.FilledButton>
          <S.OutlinedButton
            id="Error404.OutlinedButton"
            onClick={handleContact}
            theme={theme}
          >
            Entrar em contato
          </S.OutlinedButton>
        </S.ButtonContainer>
      </S.Content>

      <S.ImageContainer id="Error404.ImageContainer">
        <S.Image src={IMAGES.error404} alt="Erro 404" />
      </S.ImageContainer>
    </S.Container>
  );
};

export default Error404;
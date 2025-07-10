// src/components/BackButton/index.tsx

import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import ICONS from "@/assets/icons";
import IMAGES from "@/assets/images";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme
import { useMediaQuery } from "react-responsive"; // Importe o useMediaQuery
import { goToHome } from "@/routers/Coordinator";

interface Props {
  backTo?: string;
}

const HeaderWithBackButton = ({ backTo }: Props) => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Acesse o tema atual
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Verifica se a tela é mobile (até 767px)

  const handleBackClick = () => {
    if (backTo) {
      navigate(backTo); // Navega para a rota especificada
    } else {
      navigate(-1); // Navega para a rota anterior
    }
  };

  // Renderiza o HeaderWithBackButton apenas no modo mobile
  if (!isMobile) {
    return null; // Não renderiza nada no modo desktop
  }

  return (
    <S.Container id="HeaderWithBackButton.Container"  theme={theme}>
      <S.Content id="HeaderWithBackButton.Content">
        <S.BackArrow onClick={handleBackClick} id="HeaderWithBackButton.BackArrow" src={ICONS.leftArrow} alt="Voltar" theme={theme} />
        <S.Logo id="HeaderWithBackButton.Logo" onClick={()=>goToHome(navigate)} src={IMAGES.logoText} alt="Logo do App" theme={theme} />
      </S.Content>
    </S.Container>
  );
};

export default HeaderWithBackButton;
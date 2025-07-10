//src/components/CheckLogin/index.tsx

import IMAGES from "@/assets/images";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { goToLogin } from "@/routers/Coordinator";
import { useTheme } from "@/contexts/ThemeContext";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";
import HeaderSimple from "../HeaderSimple";


const CheckLogin: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Escolha a imagem com base no tema
  const notLoginImage =
    theme === "dark" ? IMAGES.notLoginDark : IMAGES.notLogin;

  return (
    <div>
      <HeaderWithBackButton backTo='/' />
      <HeaderSimple />
      
      <S.Container id="CheckLogin.Container" theme={theme}>

        <S.Image
          id="CheckLogin.Container"
          src={notLoginImage}
          alt="Usuário não está logado"
          theme={theme}
        />
        <S.Button theme={theme} onClick={() => goToLogin(navigate)}>
          Login
        </S.Button>
      </S.Container>
    </div>
  );
};

export default CheckLogin;

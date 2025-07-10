
import * as S from "./style";
import logo from "../../assets/images/logos/logoLetras.png";
import { useNavigate } from "react-router-dom";
import { goToHome } from "@/routers/Coordinator";

export default function HeaderWeb() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Logo src={logo} onClick={() => goToHome(navigate)} />
    </S.Container>
  );
}
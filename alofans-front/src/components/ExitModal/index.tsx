import Modal from "@/components/Modal";
import * as S from "./styles";
import { goToHome } from "@/routers/Coordinator";
import { useNavigate } from "react-router-dom";
import { userLogout } from "@/services/users";
import { useAppDispatch } from "@/redux/hooks";
import { useTheme } from "@/contexts/ThemeContext";


interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
  title?: string;
  subTitle?: string;
  leftButtonText?: string;
  rightButtonText?: string;
}

const ExitModal = ({
  visible,
  setVisible,
  title = "Oxe! Tá cedo!",
  subTitle = "Vc tem certeza que quer sair?",
  leftButtonText = "SAIR",
  rightButtonText = "CANCELAR",
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { theme } = useTheme(); // Acesse o tema atual

  const handleExit = () => {
    setVisible(false);
    userLogout(dispatch);
    goToHome(navigate);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <S.Container theme={theme}> 
        <S.Title theme={theme}>{title}</S.Title>
        <S.Text theme={theme}>{subTitle}</S.Text> 
        <S.Buttons>
          <S.TextButton theme={theme} onClick={handleExit}>
            {leftButtonText}
          </S.TextButton>
          <S.TextButton theme={theme} onClick={handleCancel}>
            {rightButtonText}
          </S.TextButton>
        </S.Buttons>
      </S.Container>
    </Modal>
  );
};

export default ExitModal;
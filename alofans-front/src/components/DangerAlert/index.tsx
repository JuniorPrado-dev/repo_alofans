/* eslint-disable @typescript-eslint/no-explicit-any */
import * as S from "./style";
import Modal from "../Modal";
import dangerIcon from "@/assets/icons/danger.png";
import { useState } from "react";
interface AlertButton {
  label: string;
  onClick: () => void;
}

interface AlertProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  securityKey: string;
  actionFunction: () => void;
  actionName?: string;
  title?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  content?: string;
  children?: React.ReactNode;
  buttons?: AlertButton[];
  onClose?: () => void;
  imageUrl?: string; // Nova prop opcional para a imagem
}

const DangerAlert: React.FC<AlertProps> = ({
  visible,
  setVisible,
  title,
  content,
  buttons,
  onClose,
  children,
  imageUrl,
  fullWidth,
  fullHeight,
  securityKey,
  actionFunction,
  actionName,
}) => {
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState(false);

  const onChange = (e: any) => {
    setConfirmation(e.target.value);
  };

  const handleSubmit = () => {
    if (confirmation === securityKey) {
      actionFunction();
      setError(false);
      setVisible(false);
      setConfirmation("");
    } else {
      setError(true);
    }
  };
  const handleCancel = () => {
    setError(false);
    setVisible(false);
    setConfirmation("");
  };
  const alertRender = (
    <S.AlertWrapper $hasImage={!!imageUrl}>
      {" "}
      {/* Ajuste condicional baseado na imagem */}
      <S.AlertImage src={imageUrl || dangerIcon} alt="Alert Image" />
      {/* Exibe a imagem, se existir */}
      {title && <S.AlertTitle>{title.toUpperCase()}</S.AlertTitle>}
      {content && <S.AlertContent>{content.toUpperCase()}</S.AlertContent>}
      <S.AlertContent>
        Digite <span>{securityKey}</span> para continuar!
      </S.AlertContent>
      {error && (
        <S.ErrorText>Digite corretamente a palavra de segurança!</S.ErrorText>
      )}
      <S.StyledTextInput 
        value={confirmation} 
        onChange={onChange} 
        multiple={false}/>
      {children && children}
      <S.ButtonContainer>
        {buttons &&
          buttons.map((button, index) => (
            <S.AlertButton key={index} onClick={button.onClick}>
              {button.label.toUpperCase()}
            </S.AlertButton>
          ))}
        <S.AlertButton onClick={handleCancel}>CANCELAR</S.AlertButton>
        <S.AlertButton onClick={handleSubmit}>{actionName?.toUpperCase()}</S.AlertButton>
      </S.ButtonContainer>
    </S.AlertWrapper>
  );

  return (
    <Modal
      fullHeight={fullHeight}
      fullWidth={fullWidth}
      visible={visible}
      setVisible={setVisible}
      children={alertRender}
      onClose={onClose}
    />
  );
};

export default DangerAlert;

import * as S from "./style";
import Modal from "../Modal";

interface AlertProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  title?: string;
  titleStyle?: React.CSSProperties;
  messageStyle?: React.CSSProperties;
  fullWidth?: boolean;
  fullHeight?: boolean;
  content?: string;
  children?: React.ReactNode;
  imageUrl?: string; // Nova prop opcional para a imagem
  buttons?: TypeDataActions[];
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  visible,
  setVisible,
  title,
  titleStyle,
  messageStyle,
  content,
  buttons,
  onClose,
  children,
  imageUrl,
  fullWidth,
  fullHeight=false,
}) => {
  const alertRender = (
    <S.AlertWrapper $hasImage={!!imageUrl}>
      {" "}
      {/* Ajuste condicional baseado na imagem */}
      {imageUrl && <S.AlertImage src={imageUrl} alt="Alert Image" />}{" "}
      {/* Exibe a imagem, se existir */}
      {title && 
      <S.AlertTitle style={titleStyle}>{title.toUpperCase()}</S.AlertTitle>
      }
      {content && 
      <S.AlertContent style={messageStyle}>{content.toUpperCase()}</S.AlertContent>
      }
      {children && children}
      <S.ButtonContainer>
        {buttons &&
          buttons.map((button, index) => (
            <S.AlertButton key={index} onClick={button.onPress}>
              {button.text}
            </S.AlertButton>
          ))}
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

export default Alert;

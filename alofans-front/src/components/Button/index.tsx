import React, { useState } from 'react';
import * as S from "./styles"

interface ButtonProps {
  text: string;
  backgroundColor: string;
  textColor: string;
  onClick: () => void;
  disabled?: boolean;
  border?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  backgroundColor, 
  textColor, 
  onClick, 
  disabled = false,
  border, // Valor padrão
  style,
  type = "button"
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <S.Pressable
      type={type}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
      disabled={disabled}
      isPressed={isPressed}
      backgroundColor={backgroundColor}
      border={border} // Passe a prop border para o componente estilizado
      style={style}
    >
      <S.ButtonText textColor={textColor}>{text}</S.ButtonText>
    </S.Pressable>
  );
};

export default Button;
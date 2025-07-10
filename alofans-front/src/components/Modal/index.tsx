//src/components/Modal/index.tsx

import * as S from "./style";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme

interface ModalProps {
  visible: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  setVisible: (value: boolean) => void;
  children: React.ReactNode;
  onClose?: () => void; // Função opcional a ser executada ao fechar o modal
  theme?: Theme; // Adicione a prop theme
}

export default function Modal({ visible, setVisible, children, onClose, fullWidth, fullHeight, theme }: ModalProps) {
  const { theme: currentTheme } = useTheme(); // Acesse o tema atual
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);

    // Executa a função opcional onClose se ela for passada
    if (onClose) onClose();

    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
    }, 500); // Tempo para o fade-out, deve corresponder ao tempo da animação de saída
  };

  useEffect(() => {
    if (visible) {
      setIsClosing(false);
    }
  }, [visible]);

  if (!visible && !isClosing) return null;

  return (
    <S.Overlay id="Modal.Overlay" onClick={handleClose} $isClosing={isClosing} theme={theme || currentTheme}> {/* Passe o tema como prop */}
      <S.Container
        id="Modal.Container"
        $fullHeight={fullHeight}
        $fullWidth={fullWidth}
        onClick={(e) => e.stopPropagation()}
        $isClosing={isClosing}
        theme={theme || currentTheme} // Passe o tema como prop
      >
        {/* <S.CloseButton id="Modal.CloseButton" onClick={handleClose} theme={theme || currentTheme}>
          ×
        </S.CloseButton> Passe o tema como prop */}
        {children}
      </S.Container>
    </S.Overlay>
  );
}

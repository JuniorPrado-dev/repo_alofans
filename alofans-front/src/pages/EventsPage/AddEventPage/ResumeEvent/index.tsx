import React from "react";
import { ModalOverlay, ModalContainer, Table, Title } from "./style";
import Button from "@/components/Button";
import { useTheme } from "@/contexts/ThemeContext";

interface ResumeEventProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  createEvent: () => void;
}

const ResumeEvent: React.FC<ResumeEventProps> = ({
  isVisible,
  setIsVisible,
  createEvent,
}) => {
  const { theme } = useTheme();

  if (!isVisible) return null;

  return (
    <ModalOverlay>
      <ModalContainer theme={theme}>
        <Table theme={theme}>
          <Title theme={theme}>Confirmação de Responsabilidade</Title>
          <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '20px' }}>
            Ao confirmar, você assume total responsabilidade pelas informações 
            fornecidas e pelo evento criado, comprometendo-se a cumprir com todas 
            as normas e regulamentos aplicáveis.
          </p>
          <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
            Você concorda com estes termos?
          </p>
        </Table>
        <div style={{ width: "100%", display: "flex", gap: "10px" }}>
          <Button 
            text="Cancelar" 
            textColor="#000000" 
            backgroundColor="#FF5533" 
            onClick={() => setIsVisible(false)} 
          />
          <Button 
            text="Confirmar" 
            textColor="#000000" 
            backgroundColor="#AAFFA0" 
            onClick={createEvent} 
          />
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ResumeEvent;
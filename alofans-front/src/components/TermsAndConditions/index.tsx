//src/components/TermsAndConditions/index.tsx
import React from 'react';
import * as S from './style';
import Modal from '../Modal';
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme

interface TermsProps {
  termsContent: Record<string, string>;
  visible: boolean;
  field?: string;
  setVisible: (ent: boolean) => void;
  setAccept?: (field: string, state: boolean) => void;
  theme?: Theme; // Adicione a prop theme
}

const TermsAndConditions: React.FC<TermsProps> = ({ termsContent, setVisible, visible, setAccept, field, theme }) => {
  const { theme: currentTheme } = useTheme(); // Acesse o tema atual

  const handleOnConfirm = () => {
    setAccept && field && setAccept(field, true);
    setVisible(false);
  };

  const content = (
    <S.Container theme={theme || currentTheme}> {/* Passe o tema como prop */}
      {Object.keys(termsContent).map((section) => (
        <div key={section}>
          <S.SectionTitle theme={theme || currentTheme}>{section.replace(/_/g, ' ').toUpperCase()}</S.SectionTitle>
          <S.SectionContent theme={theme || currentTheme}>{termsContent[section]}</S.SectionContent>
        </div>
      ))}
      {setAccept && field && (
        <S.Button theme={theme || currentTheme} onClick={() => handleOnConfirm()}>
          {"Aceitar Termos"}
        </S.Button>
      )}
    </S.Container>
  );

  return (
    <Modal
      children={content}
      visible={visible}
      setVisible={setVisible}
      theme={theme || currentTheme} // Passe o tema como prop
    />
  );
};

export default TermsAndConditions;

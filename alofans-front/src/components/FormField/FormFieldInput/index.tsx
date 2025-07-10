// components/FormField/index.tsx

import React, { useState } from "react";
import * as S from "./style";
import ICONS from "@/assets/icons";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme

interface FormFieldInputProps {
  label?: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string | undefined;
  keyboardType?: React.HTMLInputTypeAttribute;
  secureTextEntry?: boolean;
  multiline?: boolean;
  error?: string;
  touched?: boolean;
  theme: Theme; // Adicione o tema como prop
}

export const FormFieldInput: React.FC<FormFieldInputProps> = ({
  placeholder,
  onChangeText,
  label,
  onBlur,
  value,
  keyboardType = "text",
  secureTextEntry = false,
  multiline = false,
  error,
  touched,
  theme,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <S.Container id="FormFielInput.Container" theme={theme}>
      <S.Label id="FormFielInput.Label" theme={theme}>{label}</S.Label>
      <S.InputContainer id="FormFielInput.InputContainer">
        <S.StyledTextInput
          id="FormFielInput.StyledTextInput"
          placeholder={placeholder}
          onChange={(e: any) => onChangeText(e.target.value)}
          onBlur={onBlur}
          value={value}
          type={
            secureTextEntry && value && !isPasswordVisible
              ? "password"
              : keyboardType
          }
          multiline={multiline}
          theme={theme} // Passe o tema como prop
        />
        {secureTextEntry && (
          <S.ToggleButton
            id="FormFielInput.ToggleButton"
            type="button"
            onClick={() => setPasswordVisible(!isPasswordVisible)}
          >
            <S.PasswordIcon
              id="FormFielInput.PasswordIcon"
              src={
                isPasswordVisible ? ICONS.eye : ICONS.eyeHide
              }
            />
          </S.ToggleButton>
        )}
      </S.InputContainer>
      {error && touched && <S.ErrorText theme={theme}>{error}</S.ErrorText>} {/* Passe o tema como prop */}
    </S.Container>
  );
};
import React, { useState } from "react";
import * as S from "./style";
import ICONS from "@/assets/icons";
import styled from 'styled-components';
import COLORS from "@/constants/colors";
import FONTS from "@/constants/fonts";
import { useTheme } from "@/contexts/ThemeContext";

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
}) => {
  const { theme } = useTheme();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <S.Container>
      <S.Label theme={theme}>{label}</S.Label>
      <S.InputContainer>
        <S.StyledTextInput
          theme={theme}
          placeholder={placeholder}
          onChange={(e: any) => onChangeText(e.target.value)}
          onBlur={onBlur}
          value={value}
          type={
            secureTextEntry && value && !isPasswordVisible
              ? "password"
              : keyboardType
          }
          $multiline={multiline}

        />
        {secureTextEntry && (
          <S.ToggleButton
            type="button"
            onClick={() => setPasswordVisible(!isPasswordVisible)}
          >
            <S.PasswordIcon
              src={
                isPasswordVisible ? ICONS.eye : ICONS.eyeHide
              }
            />
          </S.ToggleButton>
        )}
      </S.InputContainer>
      {error && touched && <S.ErrorText theme={theme}>{error}</S.ErrorText>}
    </S.Container>
  );
};

interface Option {
  id?: string;
  label: string;
  value: string;
}

interface FormFieldSelectProps {
  options: Option[];
  placeholder: string;
  onChange: (value: string) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  value: string | undefined;
  error?: string;
  touched?: boolean;
  color?: string;
}

export const FormFieldSelect: React.FC<FormFieldSelectProps> = ({
  options,
  placeholder,
  onChange,
  onBlur,
  value,
  error,
  touched,
  color,
}) => {
  return (
    <S.Container>
      <S.SelectContainer>
        <S.StyledSelect
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          value={value || ""}
          color={color}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option style={{width:10}} key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </S.StyledSelect>
      </S.SelectContainer>
      {error && touched && <S.ErrorText>{error}</S.ErrorText>}
    </S.Container>
  );
};


interface FormButtonProps {
  isDisabled?: boolean;
  onClick: () => void;
  type?: "button" | "reset" | "submit" | undefined;
  text?: string;
  color?: string;
}

export const FormButton = ({ onClick, text = "Enviar", isDisabled = false, type = "button" }: FormButtonProps) => {
  return (
    <S.Button
      $isDisabledd={isDisabled} // Use $isDisabledd em vez de disabled
      type={type}
      onClick={onClick}
    >
      {text}
    </S.Button>
  );
};

const Button = styled.button<{ color?: string }>`
  display: inline-block;
  width: 100%;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  background-color: #ccc; // Cor padrão
  background-color: ${({ color }) => color || '#ccc'}; // Usa a cor passada ou um valor padrão
  color: ${COLORS.white[100]}; // Cor do texto
  padding: 12px 0px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${({ color }) => color ? `${color}CC` : '#999'}; // Efeito hover com transparência
  }
`;

interface FormButtonSecondaryProps {
  text: string;
  onClick: () => void;
  color?: string; // Adiciona a propriedade de cor
}

export const FormButtonSecondary = ({ text, onClick, color }: FormButtonSecondaryProps) => {
  return (
    <Button onClick={onClick} color={color}>
      {text}
    </Button>
  );
};

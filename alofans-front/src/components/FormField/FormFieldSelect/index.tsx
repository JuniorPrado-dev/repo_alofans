/* eslint-disable @typescript-eslint/no-explicit-any */
// components/FormField/index.tsx

import React from "react";
import * as S from "./style";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme

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
  theme: Theme; // Adicione o tema como prop
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
  theme, // Receba o tema como prop
}) => {
  return (
    <S.Container theme={theme}> {/* Passe o tema como prop */}
      <S.SelectContainer >
        <S.StyledSelect
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          value={value || ""}
          color={color}
          theme={theme} // Passe o tema como prop
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option style={{ width: 10 }} key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </S.StyledSelect>
      </S.SelectContainer>
      {error && touched && <S.ErrorText theme={theme}>{error}</S.ErrorText>} {/* Passe o tema como prop */}
    </S.Container>
  );
};
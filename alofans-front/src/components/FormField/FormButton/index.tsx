// components/FormField/index.tsx

import * as S from "./style";
import styled from 'styled-components';
import COLORS from "@/constants/colors";
import FONTS from "@/constants/fonts";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme
import { device } from "@/utils/sizeDevices";

interface FormButtonProps {
  isDisabled?: boolean;
  onClick: () => void;
  type?: "button" | "reset" | "submit" | undefined;
  text?: string;
  color?: string; // Cor para o tema claro
  darkColor?: string; // Cor para o tema escuro
  theme: Theme; // Adicione o tema como prop
}

export const FormButton = ({
  onClick,
  text = "Enviar",
  isDisabled = false,
  type = "button",
  color = COLORS.green[500], // Cor padrão para o tema claro
  darkColor = COLORS.green[500], // Cor padrão para o tema escuro
  theme, // Receba o tema como prop
}: FormButtonProps) => {
  const buttonColor = theme === 'dark' ? darkColor : color; // Define a cor com base no tema

  return (
    <S.Button
      $isDisabledd={isDisabled} // Use $isDisabledd em vez de disabled
      type={type}
      onClick={onClick}
      theme={theme} // Passe o tema como prop
      color={buttonColor} // Passa a cor correta
    >
      {text}
    </S.Button>
  );
};

const Button = styled.button<{ color?: string; theme: Theme }>`
  display: inline-block;
  width: 100%;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  font-family: ${FONTS.montSerrat};
  background-color: ${({ color }) => color}; // Usa a cor passada
  color: ${({ theme }) => (theme === 'dark' ? COLORS.white[100] : COLORS.white[100])}; // Cor do texto
  padding: 12px 0px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;

  &:hover {
    background-color: ${({ color }) => `${color}CC`}; // Efeito hover com transparência
  }

  @media ${device.desktop} {
    margin-bottom: 20px;
  }
`;

interface FormButtonSecondaryProps {
  text: string;
  onClick: () => void;
  color?: string; // Cor para o tema claro
  darkColor?: string; // Cor para o tema escuro
  theme: Theme; // Adicione o tema como prop
}

export const FormButtonSecondary = ({
  text,
  onClick,
  color = COLORS.purple.DEFAULT, // Cor padrão para o tema claro
  darkColor = COLORS.purple[500], // Cor padrão para o tema escuro
  theme, // Receba o tema como prop
}: FormButtonSecondaryProps) => {
  const buttonColor = theme === 'dark' ? darkColor : color; // Define a cor com base no tema

  return (
    <Button
      onClick={onClick}
      color={buttonColor} // Passa a cor correta
      theme={theme} // Passe o tema como prop
    >
      {text}
    </Button>
  );
};
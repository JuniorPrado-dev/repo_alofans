// src/components/EventType/index.tsx

import { FaYoutube } from "react-icons/fa";
import * as S from "./style";
import { FaLocationDot } from "react-icons/fa6";
import COLORS from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import { device } from '@/utils/sizeDevices';
import { Theme } from "@/contexts/ThemeContext";

interface EventTypeProps {
  isOnline?: boolean;
  isDisabled?: boolean;
  theme: Theme;
}

export default function EventType({
  isOnline = false,
  isDisabled = false,
}: EventTypeProps) {
  const { theme } = useTheme(); // Acesse o tema atual

  const iconSize = window.matchMedia(device.desktop.replace('@media ', '')).matches ? 30 : 20;

  const icon = isOnline ? (
    <FaYoutube
      size={iconSize}
      color={
        isDisabled
          ? theme === 'dark'
            ? 'rgba(255, 255, 255, 0.5)' // Ícone desabilitado no tema escuro
            : 'rgba(0, 0, 0, 0.5)' // Ícone desabilitado no tema claro
          : theme === 'dark'
          ? '#FF0000' // Ícone do YouTube no tema escuro
          : COLORS.red[400] // Ícone do YouTube no tema claro
      }
    />
  ) : (
    <FaLocationDot
      size={iconSize}
      color={
        isDisabled
          ? theme === 'dark'
            ? 'rgba(255, 255, 255, 0.5)' // Ícone desabilitado no tema escuro
            : 'rgba(0, 0, 0, 0.5)' // Ícone desabilitado no tema claro
          : theme === 'dark'
          ? '#1E90FF' // Ícone de localização no tema escuro
          : COLORS.blue[500] // Ícone de localização no tema claro
      }
    />
  );

  return (
    <S.Container id="EventType.Container" theme={theme}> {/* Passe o tema como prop */}
      {icon}
      <S.Label id="EventType.Label" theme={theme} style={{ opacity: isDisabled ? 0.5 : 1 }}> {/* Passe o tema como prop */}
        {isOnline ? "Online" : "Presencial"}
      </S.Label>
    </S.Container>
  );
}
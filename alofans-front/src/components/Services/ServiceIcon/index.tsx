// src/components/Services/ServiceIcon/index.tsx

import SIZES from "@/constants/sizes";
import * as S from "./styles";
import { Theme } from "@/contexts/ThemeContext"; // Importe o tipo Theme

interface Props {
  icon: string;
  text: string;
  theme: Theme; // Adicione a propriedade theme
}

const ServiceIcon = ({ icon, text, theme }: Props) => {
  return (
    <S.IconContainer theme={theme}> {/* Passe o tema como prop */}
      <S.IconImage
        src={icon}
        alt="Serviço"
        height={SIZES.serviceHeight}
        theme={theme} // Passe o tema como prop
      />
      <S.IconText theme={theme}>{text}</S.IconText> {/* Passe o tema como prop */}
    </S.IconContainer>
  );
};

export default ServiceIcon;
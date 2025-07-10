// src/pages/ProfilePage/HelpPage/index.tsx
import HelpFaqs from "@/components/Help/FAQ";
import ScrollView from "@/components/ScrollView";
import * as S from "./styles";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme


const HelpPage = () => {
  const { theme } = useTheme(); // Acesse o tema atual

  return (
    <div>
      <S.Text theme={theme}>AJUDAS & FAQs</S.Text> 
      <S.Container theme={theme}>
        <ScrollView showScrollbar={false}>
          <HelpFaqs />
          <S.Separator theme={theme} />
        </ScrollView>
      </S.Container>
    </div>
  );
};

export default HelpPage;
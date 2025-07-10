// src/pages/ProfilePage/EditPage/index.tsx

import EditProfile from "@/components/EditProfile";
import ScrollView from "@/components/ScrollView";
import * as S from "./styles";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme

const EditPage = () => {
  const { theme } = useTheme(); // Acesse o tema atual
  console.log("edit")
  return (
    <div>
      <S.ContainerUp theme={theme}>
        <S.Text theme={theme}>Editando Perfil</S.Text> {/* Passe o tema como prop */}
        <S.Container theme={theme}> {/* Passe o tema como prop */}
          <S.ProfileContainer>
            <ScrollView showScrollbar={false}>
              <EditProfile />
            </ScrollView>
          </S.ProfileContainer>
        </S.Container>
      </S.ContainerUp>
    </div>
  );
};

export default EditPage;
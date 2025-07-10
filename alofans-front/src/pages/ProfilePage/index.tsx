// src/components/Profile/index.tsx

import { useEffect, useState } from "react";
import * as S from "./style";
import ProfileItem from "./item";
import ExitModal from "@/components/ExitModal";
import {
  FaCreditCard,
  FaUserEdit,
  FaFileContract,
  FaUsers,
  FaQuestionCircle,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  goToProfileWallet,
  goToEditProfile,
  goToProfileTerms,
  goToProfileAbout,
  goToProfileHelp,
  goToProfileDelete,
} from "@/routers/Coordinator";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o useTheme
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import WalletPage from "@/pages/ProfilePage/WalletePage"; // Importe os componentes correspondentes
import EditPage from "@/pages/ProfilePage/EditPage";
import TermsPage from "@/pages/ProfilePage/TermsPage";
import AboutPage from "@/pages/ProfilePage/AboutPage";
import HelpPage from "@/pages/ProfilePage/HelpPage";
import DeletePage from "@/pages/ProfilePage/DeletePage";
import { useMediaQuery } from "react-responsive";
import HeaderSimple from "@/components/HeaderSimple";
import { refreshUserData } from "@/services/users";
import { getCookie } from "@/services/cookies";
import usePermission from "@/hooks/usePermissiion";
import useAuth from "@/hooks/useAuth";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = getCookie("token");
    if (user.name.length < 1 && token) {
      refreshUserData(dispatch);
    }
  }, []);

  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // Estado para controlar o item selecionado
  const navigate = useNavigate();
  const { theme } = useTheme(); // Acesse o tema atual
  const isDesktop = useMediaQuery({ minWidth: 768 }); // Verifica se está no modo desktop

  const handleExit = () => {
    setVisible(true);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item); // Define o item selecionado
  };
  useAuth();

  // Renderiza o componente correspondente ao item selecionado
  const renderContent = () => {
    switch (selectedItem) {
      case "wallet":
        return <WalletPage />;
      case "edit":
        return <EditPage />;
      case "terms":
        return <TermsPage />;
      case "about":
        return <AboutPage />;
      case "help":
        return <HelpPage />;
      case "delete":
        return <DeletePage />;
      default:
        return null;
    }
  };

  return (
    <div>
      <HeaderSimple />
      <S.Container id="ProfilePage.Container" theme={theme}>
        {" "}
        {/* Passe o tema como prop */}
        <ExitModal visible={visible} setVisible={setVisible} />
        {/* Modo Desktop */}
        {isDesktop ? (
          <S.DesktopContainer>
            {/* Menu Vertical à Esquerda */}
            <S.MenuContainer theme={theme}>
              {usePermission(user) && (
                <div onClick={() => handleItemClick("wallet")}>
                  <ProfileItem
                    icon={<FaCreditCard />}
                    text="Gerenciar Finanças"
                    theme={theme}
                  />
                </div>
              )}
              <div onClick={() => handleItemClick("edit")}>
                <ProfileItem
                  icon={<FaUserEdit />}
                  text="Editar Perfil"
                  theme={theme}
                />
              </div>
              <div onClick={() => handleItemClick("terms")}>
                <ProfileItem
                  icon={<FaFileContract />}
                  text="Termos e Condições"
                  theme={theme}
                />
              </div>
              <div onClick={() => handleItemClick("about")}>
                <ProfileItem
                  icon={<FaUsers />}
                  text="Quem Somos"
                  theme={theme}
                />
              </div>
              <div onClick={() => handleItemClick("help")}>
                <ProfileItem
                  icon={<FaQuestionCircle />}
                  text="Ajuda"
                  theme={theme}
                />
              </div>
              <div onClick={() => handleItemClick("delete")}>
                <ProfileItem
                  icon={<FaTrash />}
                  text="Excluir Conta"
                  theme={theme}
                />
              </div>
              <div onClick={handleExit} style={{ cursor: "pointer" }}>
                <ProfileItem
                  icon={<FaSignOutAlt />}
                  text="Sair"
                  theme={theme}
                />
              </div>
            </S.MenuContainer>

            {/* Conteúdo à Direita */}
            <S.ContentContainer theme={theme}>
              {renderContent()}
            </S.ContentContainer>
          </S.DesktopContainer>
        ) : (
          <S.Content id="ProfilePage.Content" theme={theme}>
            {" "}
            {/* Passe o tema como prop */}
            {usePermission(user) && (
              <div onClick={() => goToProfileWallet(navigate)}>
                <ProfileItem
                  icon={<FaCreditCard />}
                  text="Gerenciar Finanças"
                  theme={theme}
                />
              </div>
            )}
            <div onClick={() => goToEditProfile(navigate)}>
              <ProfileItem
                icon={<FaUserEdit />}
                text="Editar Perfil"
                theme={theme}
              />
            </div>
            <div onClick={() => goToProfileTerms(navigate)}>
              <ProfileItem
                icon={<FaFileContract />}
                text="Termos e Condições"
                theme={theme}
              />
            </div>
            <div onClick={() => goToProfileAbout(navigate)}>
              <ProfileItem icon={<FaUsers />} text="Quem Somos" theme={theme} />
            </div>
            <div onClick={() => goToProfileHelp(navigate)}>
              <ProfileItem
                icon={<FaQuestionCircle />}
                text="Ajuda"
                theme={theme}
              />
            </div>
            <div onClick={() => goToProfileDelete(navigate)}>
              <ProfileItem
                icon={<FaTrash />}
                text="Excluir Conta"
                theme={theme}
              />
            </div>
            <div onClick={handleExit} style={{ cursor: "pointer" }}>
              <ProfileItem icon={<FaSignOutAlt />} text="Sair" theme={theme} />
            </div>
            <S.Separator theme={theme} />
          </S.Content>
        )}
      </S.Container>
    </div>
  );
};

export default ProfilePage;

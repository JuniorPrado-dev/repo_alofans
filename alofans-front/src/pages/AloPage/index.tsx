//src/pages/AloPage/index.tsx

import { useEffect, useState } from "react";
import SearchComponent from "@/components/SearchComponent";
import * as S from "./styles";
import { updateListAloClient } from "@/services/alos";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import AloCard from "@/components/AloCard";
import { goToAlosManager, goToEvents } from "@/routers/Coordinator";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useMediaQuery } from "react-responsive";
import AloManager from "./AloManager";
import HeaderSimple from "@/components/HeaderSimple";
import usePermission from "@/hooks/usePermissiion";
import useAuth from "@/hooks/useAuth";

const AloPage = () => {
  const user = useAppSelector((state) => state.user.value);
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<"sent" | "received">("sent"); // Estado para controlar a aba ativa
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const dispatch = useDispatch();
  const navigate = useNavigate();

    useAuth();

  const typeOfUser = {
    client: "CLIENTE",
    professional: "PRODUCER-INTERLOCUTOR",
  };

  const [alos, setAlos] = useState<TypeAloResponse[]>([]);

  const clientAlos = useAppSelector((state) => state.aloSliceClient.value);

  const interlocutorProducerAlos = useAppSelector(
    (state) => state.aloSliceProfessional.value
  );

  const handleSetEvents = (typeUser: string) => {
    if (typeUser === typeOfUser.client) {
      setAlos(clientAlos);
    } else if (typeUser === typeOfUser.professional) {
      setAlos(interlocutorProducerAlos);
    } else {
      setAlos(clientAlos.concat(interlocutorProducerAlos));
    }
  };

  useEffect(() => {
    if (user.role.length > 0) {
      updateListAloClient(dispatch);
    }
  }, [user]);

  useEffect(() => {
    handleSetEvents(typeOfUser.client);
  }, [clientAlos, user]);

  return (
    <div>
      {/* Modo Mobile */}
      {!isDesktop ? (
        <>
          <S.ContainerBack
            id="AloPage.ContainerBack"
            theme={theme}
          ></S.ContainerBack>

          <SearchComponent data={alos} setFilter={setAlos} />

          <S.Container id="AloPage.Container" theme={theme}>
            <S.TopContainer id="AloPage.TopContainer" theme={theme}>
              <S.ButtonSendAlos
                id="AloPage.ButtonSendAlos"
                onClick={() => goToEvents(navigate)}
                theme={theme}
              >
                Mandar um Alô
              </S.ButtonSendAlos>
              {usePermission(user) && (
                <S.ButtonAloManager
                  id="AloPage.ButtonAloManager"
                  onClick={() => goToAlosManager(navigate)}
                  theme={theme}
                >
                  Gerênciar Alôs Recebidos
                </S.ButtonAloManager>
              )}
              <S.Title id="AloPage.Title" theme={theme}>
                Seus Alôs
              </S.Title>
            </S.TopContainer>

            <S.BotContainer id="AloPage.BotContainer" theme={theme}>
              <S.AloListMobile id="AloPage.AloListMobile" theme={theme}>
                {alos &&
                  alos.length > 0 &&
                  alos.map((alo) => (
                    <AloCard
                      key={alo.id}
                      alo={alo}
                      aloList={alos}
                      isFromClient={true}
                    />
                  ))}
              </S.AloListMobile>
              <S.Separator theme={theme} />
            </S.BotContainer>
          </S.Container>
        </>
      ) : (
        /* Modo Desktop */
        <S.DesktopContainer theme={theme}>
          <HeaderSimple />
          <S.TabContainer theme={theme}>
            <S.TabButton
              theme={theme}
              $isActive={activeTab === "sent"}
              onClick={() => setActiveTab("sent")}
            >
              Alôs Enviados
            </S.TabButton>
            <S.TabButton
              theme={theme}
              $isActive={activeTab === "received"}
              onClick={() => setActiveTab("received")}
            >
              Alôs Recebidos
            </S.TabButton>
            <SearchComponent data={alos} setFilter={setAlos} />
          </S.TabContainer>

          {/* Conteúdo das Abas */}
          {activeTab === "sent" ? (
            <div>
              <S.ContentContainer theme={theme}>
                <S.AloListDesktop id="AloPage.AloListDesktop" theme={theme}>
                  {alos &&
                    alos.length > 0 &&
                    alos.map((alo) => (
                      <AloCard
                        key={alo.id}
                        alo={alo}
                        aloList={alos}
                        isFromClient={true}
                      />
                    ))}
                </S.AloListDesktop>
              </S.ContentContainer>
              <S.Separator theme={theme} />
            </div>
          ) : (
            <S.ContentContainer theme={theme}>
              <AloManager />
            </S.ContentContainer>
          )}
        </S.DesktopContainer>
      )}
    </div>
  );
};

export default AloPage;

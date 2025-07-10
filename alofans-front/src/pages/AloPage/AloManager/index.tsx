import { useEffect, useState } from "react";
import * as S from "./style";
import SearchComponent from "@/components/SearchComponent";
import AloCard from "@/components/AloCard";
import { updateListAloProfessional } from "@/services/alos";
import { useTheme } from "@/contexts/ThemeContext";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { EnumAloStatus } from "@/enums/alo";
import { useMediaQuery } from "react-responsive"; // Para detectar o modo desktop

export default function AloManager() {
  const { theme } = useTheme();
  const isDesktop = useMediaQuery({ minWidth: 768 }); // Verifica se está no modo desktop

  const buttons = {
    all: "TODOS",
    finished: "FINALIZADOS",
    cancelled: "RECUSADOS",
    waiting: "AGUARDANDO",
    approved: "APROVADOS",
  };

  const [alos, setAlos] = useState<TypeAloResponse[]>([]);
  const interlocutorProducerAlos = useAppSelector(
    (state) => state.aloSliceProfessional.value
  );
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.value);
  const [buttonActive, setButtonActive] = useState<string>(buttons.all);

  const handleButtonActive = (button: string) => {
    setButtonActive(button);

    switch (button) {
      case buttons.all:
        setAlos(interlocutorProducerAlos);
        break;
      case buttons.finished:
        setAlos(
          interlocutorProducerAlos.filter(
            (alo) => alo.status === EnumAloStatus.FINISHED
          )
        );
        break;
      case buttons.cancelled:
        setAlos(
          interlocutorProducerAlos.filter(
            (alo) => alo.status === EnumAloStatus.REJECTED
          )
        );
        break;
      case buttons.waiting:
        setAlos(
          interlocutorProducerAlos.filter(
            (alo) => alo.status === EnumAloStatus.WAITING
          )
        );
        break;
      case buttons.approved:
        setAlos(
          interlocutorProducerAlos.filter(
            (alo) => alo.status === EnumAloStatus.APPROVED
          )
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setAlos(interlocutorProducerAlos);
  }, [interlocutorProducerAlos]);
  
  useEffect(() => {
    if (user.role.length > 0) {
      updateListAloProfessional(dispatch);
    }
  }, [user]);

  return (
    <S.Container id="AloManager.Container" theme={theme}>
      {!isDesktop ? (
        <>
          <SearchComponent data={alos} setFilter={setAlos} />
          <S.TypeContainer id="AloManager.TypeContainer" theme={theme}>
            <S.ButtonType
              id="AloManager.ButtonType.All"
              onClick={() => handleButtonActive(buttons.all)}
              $isActive={buttonActive === buttons.all}
              theme={theme}
            >
              {buttons.all}
            </S.ButtonType>
            <S.ButtonType
              id="AloManager.ButtonType.Finished"
              onClick={() => handleButtonActive(buttons.finished)}
              $isActive={buttonActive === buttons.finished}
              theme={theme}
            >
              {buttons.finished}
            </S.ButtonType>
            <S.ButtonType
              id="AloManager.ButtonType.Cancelled"
              onClick={() => handleButtonActive(buttons.cancelled)}
              $isActive={buttonActive === buttons.cancelled}
              theme={theme}
            >
              {buttons.cancelled}
            </S.ButtonType>
            <S.ButtonType
              id="AloManager.ButtonType.Waiting"
              onClick={() => handleButtonActive(buttons.waiting)}
              $isActive={buttonActive === buttons.waiting}
              theme={theme}
            >
              {buttons.waiting}
            </S.ButtonType>
            <S.ButtonType
              id="AloManager.ButtonType.Approved"
              onClick={() => handleButtonActive(buttons.approved)}
              $isActive={buttonActive === buttons.approved}
              theme={theme}
            >
              {buttons.approved}
            </S.ButtonType>
          </S.TypeContainer>
        </>
      ) : (
        /* Modo Desktop */
        <>
          <S.TypeContainer id="AloManager.TypeContainer" theme={theme}>
            <S.ButtonType
              id="AloManager.ButtonType.All"
              onClick={() => handleButtonActive(buttons.all)}
              $isActive={buttonActive === buttons.all}
              theme={theme}
            >
              {buttons.all}
            </S.ButtonType>
            <S.ButtonType
              id="AloManager.ButtonType.Finished"
              onClick={() => handleButtonActive(buttons.finished)}
              $isActive={buttonActive === buttons.finished}
              theme={theme}
            >
              {buttons.finished}
            </S.ButtonType>
            <S.ButtonType
              id="AloManager.ButtonType.Cancelled"
              onClick={() => handleButtonActive(buttons.cancelled)}
              $isActive={buttonActive === buttons.cancelled}
              theme={theme}
            >
              {buttons.cancelled}
            </S.ButtonType>
            <S.ButtonType
              id="AloManager.ButtonType.Waiting"
              onClick={() => handleButtonActive(buttons.waiting)}
              $isActive={buttonActive === buttons.waiting}
              theme={theme}
            >
              {buttons.waiting}
            </S.ButtonType>
            <S.ButtonType
              id="AloManager.ButtonType.Approved"
              onClick={() => handleButtonActive(buttons.approved)}
              $isActive={buttonActive === buttons.approved}
              theme={theme}
            >
              {buttons.approved}
            </S.ButtonType>
          </S.TypeContainer>
        </>
      )}

      {/* Lista de Alôs */}
      <S.AloList id="AloManager.AloList" theme={theme} $isDesktop={isDesktop}>
        {alos &&
          alos.length > 0 &&
          alos.map((alo) => (
            <AloCard
              key={alo.id}
              alo={alo}
              aloList={alos}
              isFromClient={false}
            />
          ))}
      </S.AloList>
    </S.Container>
  );
}

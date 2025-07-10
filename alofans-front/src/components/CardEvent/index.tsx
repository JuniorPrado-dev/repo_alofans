// src/components/CardEvent/index.tsx

import * as S from "./style";
import EventType from "../EventType";
import { BASE_URL } from "@/constants/urls";
import { useAppDispatch } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { goToEventDetail } from "@/routers/Coordinator";
import { useTheme } from "@/contexts/ThemeContext";
import IMAGES from "@/assets/images";
import { refreshEventDetail } from "@/services/events";

interface Props {
  event: TypeEventResponse;
}

export default function CardEvent({ event }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Função para capitalizar a primeira letra
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const dataObj = event.date ? new Date(event.date) : null;
  let dataFormatada = '';
  if (dataObj) {
    const diaSemana = dataObj.toLocaleDateString('pt-BR', { weekday: 'long' });
    const dia = dataObj.toLocaleDateString('pt-BR', { day: '2-digit' });
    const mes = dataObj.toLocaleDateString('pt-BR', { month: 'long' });
    const hora = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    dataFormatada = `${capitalizeFirstLetter(diaSemana)}, ${dia} de ${mes} às ${hora}`;
  }

  const handleSelection = async () => {
    const resp = await refreshEventDetail(event.id, dispatch);
    if (resp) {
      goToEventDetail(navigate);
    }
  };

  const cardContent = (
    <S.Container
      id="CardEvent.Container"
      onClick={handleSelection}
      theme={theme}
    >
      <S.Image
        id="CardEvent.Image"
        src={
          event.image_path
            ? `${BASE_URL}${event.image_path}`
            : IMAGES.defaultImageEvent
        }
        alt={event.name}
      />
      <S.ContentContainer>
        <S.Title id="CardEvent.Title" theme={theme}>
          {event.name}
        </S.Title>
        <S.DataContainer id="CardEvent.DataContainer">
          <S.Info id="CardEvent.Info" theme={theme}>
            {`${event.city} - ${event.state}`}
          </S.Info>
          {/* <S.Info id="CardEvent.Info2" theme={theme}>
            {event.street}
          </S.Info> */}
          <S.Info id="CardEvent.Info2" theme={theme}>
            {dataFormatada}
          </S.Info>
          <EventType isOnline={event.is_online} theme={theme} />
        </S.DataContainer>
      </S.ContentContainer>
    </S.Container>
  );

  return (
    <div>
      <S.MobileCardEvent>{cardContent}</S.MobileCardEvent>

      <S.DesktopCardEvent>{cardContent}</S.DesktopCardEvent>
    </div>
  );
}

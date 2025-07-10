import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "../SendAloPage/style";
import Button from "@/components/Button";
import { useAppSelector } from "@/redux/hooks";
import { goToAloSummary } from "@/routers/Coordinator";
import { convertDateTime } from "@/utils/formatedFunctions";
import { useTheme } from "@/contexts/ThemeContext";
import COLORS from "@/constants/colors";
import HeaderSimple from "@/components/HeaderSimple";
import { BASE_URL } from "@/constants/urls";
import IMAGES from "@/assets/images";
import Alert from "@/components/Alert";

const SendAloPage: React.FC = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();

  const location = useLocation();
  const { aloOffer, event } =
    (location.state as TypeStateLocationSendAlo) || {};

  // Dados do evento e cliente
  const client = useAppSelector((selector) => selector.user.value);
  const { date, time } = event
    ? convertDateTime(event.date)
    : { date: "", time: "" };
  const { time: startTime } = event
    ? convertDateTime(aloOffer?.start_offer)
    : { time: "" };
  const { time: endTime } = event
    ? convertDateTime(aloOffer?.end_offer)
    : { time: "" };
  const [dataModal, setDataModal] = useState<TypeDataModal>();
  const [visible, setVisible] = useState(false);

  const handleSendAlo = () => {
    if (!message.trim()) {
      setDataModal({
        title: "Atenção!",
        message: "Por favor, digite uma mensagem de Alô.",
        buttons: [
          {
            text: "Ok!",
            onPress: () => setVisible(false),
          },
        ],
      });
      setVisible(true);
    }
    if (!aloOffer || !event) {
      setDataModal({
        title: "Atenção!",
        message: "Artista ou evento não encontrado",
        buttons: [
          {
            text: "Ok!",
            onPress: () => setVisible(false),
          },
        ],
      });
      setVisible(true);
    }
    const newAlo: TypeAloRequest = {
      client_id: client.id,
      event_id: event.id,
      text_message: message,
      alo_offer_id: aloOffer.id,
    };
    const data = {
      aloOffer: aloOffer,
      aloRequest: newAlo,
    };
    goToAloSummary(navigate, data);
  };

  if (!aloOffer || !event) {
    return (
      <S.SafeArea theme={theme}>
        <HeaderSimple />
        <S.Text theme={theme}>Erro: Artista ou evento não selecionado.</S.Text>
        <Button
          text="Voltar"
          backgroundColor={COLORS.purple.DEFAULT}
          textColor="#FFFFFF"
          onClick={() => navigate(-1)}
        />
      </S.SafeArea>
    );
  }

  const isPromotional = () => aloOffer.free_sample_available > 0;

  return (
    <>
      <HeaderSimple />
      <S.SafeArea id="SendAloPage.SafeArea" theme={theme}>
        <S.Text id="SendAloPage.Text" theme={theme}>
          Criando um Alô
        </S.Text>
        <S.KeyboardAvoidingView
          id="SendAloPage.KeyboardAvoidingView"
          theme={theme}
        >
          {/* Layout para Desktop */}
          <S.DesktopContainer id="SendAloPage.DesktopContainer" theme={theme}>
            {/* Coluna da Esquerda: Imagem e Detalhes do Evento */}
            <S.LeftColumn id="SendAloPage.LeftColumn" theme={theme}>
              <S.ImageContainer id="SendAloPage.ImageContainer" theme={theme}>
                <S.EventImage
                  id="SendAloPage.EventImage"
                  src={
                    event.image_path
                      ? `${BASE_URL}${event.image_path}`
                      : IMAGES.defaultImageEvent
                  }
                  alt="Event"
                />
                <S.EventDetails id="SendAloPage.EventDetails" theme={theme}>
                  <S.EventName id="SendAloPage.EventName" theme={theme}>
                    {event.name}
                  </S.EventName>
                  <S.EventLocation id="SendAloPage.EventLocation" theme={theme}>
                    {event.city}-{event.state}
                  </S.EventLocation>
                  <S.EventComplement
                    id="SendAloPage.EventComplement"
                    theme={theme}
                  >
                    {event.complement || ""}
                  </S.EventComplement>
                  <S.EventDate id="SendAloPage.EventDate" theme={theme}>
                    {date}
                  </S.EventDate>
                  <S.EventTime theme={theme}>{time}</S.EventTime>
                </S.EventDetails>
              </S.ImageContainer>
            </S.LeftColumn>

            {/* Coluna da Direita: Área de Digitação da Mensagem */}
            <S.RightColumn id="SendAloPage.RightColumn" theme={theme}>
              <S.ArtistInfoContainer theme={theme}>
                <S.ArtistName theme={theme}>
                  Artista: {aloOffer.artist.name}
                </S.ArtistName>
                <S.ArtistTime theme={theme}>
                  Horário do Alô: {startTime} - {endTime}
                </S.ArtistTime>
                <S.ArtistPrice theme={theme}>
                  Valor: R$ {aloOffer.alo_cost.toFixed(2)}
                </S.ArtistPrice>
                <S.ArtistPromo theme={theme}>
                  {`Alôs Disponiveis: ${
                    aloOffer.free_sample_available + aloOffer.alos_available
                  }`}
                </S.ArtistPromo>
              </S.ArtistInfoContainer>

              <S.MessageInput
                id="SendAloPage.MessageInput"
                placeholder="Digite sua mensagem de Alô"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                theme={theme}
              />
            </S.RightColumn>
          </S.DesktopContainer>

          {/* Footer com Preço e Botão */}
          <S.Footer id="SendAloPage.Footer" theme={theme}>
            <S.Divider id="SendAloPage.Divider" theme={theme} />
            <S.PriceContainer id="SendAloPage.PriceContainer" theme={theme}>
              <S.PriceLabel id="SendAloPage.PriceLabel" theme={theme}>
                Preço:
              </S.PriceLabel>
              {(isPromotional() && (
                <S.PriceValue id="SendAloPage.PriceValue" theme={theme}>
                  {"Este alô é por nossa conta!"}
                </S.PriceValue>
              )) || (
                <S.PriceValue id="SendAloPage.PriceValue" theme={theme}>
                  R$ {aloOffer.alo_cost.toFixed(2)}
                </S.PriceValue>
              )}
            </S.PriceContainer>

            <Button
              text="Enviar"
              backgroundColor={theme === "dark" ? COLORS.green[500] : "#9362D9"}
              textColor="#FFFFFF"
              onClick={handleSendAlo}
            />
            <S.Separator theme={theme} />
          </S.Footer>
        </S.KeyboardAvoidingView>
        <Alert
          visible={visible}
          setVisible={setVisible}
          title={dataModal?.title}
          content={dataModal?.message}
          buttons={dataModal?.buttons}
        />
      </S.SafeArea>
    </>
  );
};

export default SendAloPage;

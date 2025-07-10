// src/components/EventDetailDesktop/EventDetailDesktop.tsx

import * as S from "./style";
import Button from "@/components/Button";
import COLORS from "@/constants/colors";
import { convertDateTime } from "@/utils/formatedFunctions";
import { TbCalendarMonth } from "react-icons/tb";
import { ImLocation2 } from "react-icons/im";
import { IoIosCopy, IoIosLink } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import {
  goToEditOffer,
  goToEvents,
  goToHome,
  goToPromoteAlo,
} from "@/routers/Coordinator";
import { BASE_URL } from "@/constants/urls";
import { goToSendAlo } from "@/routers/Coordinator";
import { deleteEvent, getSecurityCode } from "@/services/events";
import { useDispatch } from "react-redux";
import { useTheme } from "@/contexts/ThemeContext";
import IMAGES from "@/assets/images";
import React from "react";
import usePermission from "@/hooks/usePermissiion";

export default function EventDetailDesktop() {
  const eventDetail = useAppSelector((selector) => selector.eventDetail.value);
  const navigate = useNavigate();
  const user = useAppSelector((selector) => selector.user.value);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [code, setCode] = React.useState<string | null>(null);

  const handleCopyCode = () => {
    if (code) {
      navigator.clipboard
        .writeText(code)
        .then(() => alert("Código copiado com sucesso!"))
        .catch(() => alert("Erro ao copiar o código."));
    }
  };

  const handleEditEvent = () => {
    navigate("/events/edit");
  };

  React.useEffect(() => {
    const updateCode = async () => {
      if (isEventOwner()) {
        const codeResponse = await getSecurityCode(eventDetail.id);
        if (codeResponse) {
          setCode(codeResponse);
        }
      }
    };
    updateCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePromoteAlo() {
    goToPromoteAlo(navigate);
  }

  function handleArtistSelect(offer: any) {
    const data = {
      aloOffer: offer,
      event: eventDetail,
    };
    goToSendAlo(navigate, data);
  }

  const handleRemoveEvent = async () => {
    const result = await deleteEvent(dispatch, eventDetail.id);
    if (result) {
      alert("Evento removido com sucesso!");
      goToEvents(navigate);
    } else {
      alert("Erro ao remover evento!");
    }
  };

  function isEventOwner() {
    if (!user.role) {
      return false;
    }
    const isOwner = usePermission(user) &&
      user.id === eventDetail.producer?.id;
    return isOwner;
  }

  const handleEditAloOffer = (offer: TypeAloOfferResponse) => {
    const { time: startTime } = convertDateTime(offer?.start_offer);
    const { time: endTime } = convertDateTime(offer?.end_offer);
    const data: TypeStateLocationEditOffer = {
      aloOffer: {
        alo_cost: offer.alo_cost,
        alo_quantity: offer.alo_quantity,
        start_offer: startTime,
        end_offer: endTime,
        artistic_name: offer.artist.name,
        free_sample: offer.free_sample,
        interlocutors: offer?.interlocutors,
      },
      offerId: offer.id,
    };

    goToEditOffer(navigate, data);
  };

  if (eventDetail.name !== "") {
    const { date, time } = convertDateTime(eventDetail.date);
    return (
      <S.Container theme={theme}>
        <S.TopRow>
          <S.Image
            src={
              eventDetail.image_path
                ? `${BASE_URL}${eventDetail.image_path}`
                : IMAGES.defaultImageEvent
            }
          />
          <S.EventInfoColumn>
            <S.Title theme={theme}>{eventDetail.name}</S.Title>
            <div style={{ display: "flex", gap: "24px" }}>
              <S.InfoItem>
                <TbCalendarMonth size={30} color={COLORS.white[100]} />
                <S.InfoText theme={theme}>
                  {date}, {time}
                </S.InfoText>
              </S.InfoItem>
            </div>
            {eventDetail.is_online ? (
              <S.InfoItem>
                <IoIosLink size={30} color={COLORS.white[100]} />
                <Link
                  to={`${eventDetail.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <S.InfoText theme={theme}>{eventDetail.link}</S.InfoText>
                </Link>
              </S.InfoItem>
            ) : (
              <S.InfoItem>
                <ImLocation2 size={50} color={COLORS.white[100]} />
                <S.InfoText theme={theme}>
                  {`${eventDetail.street}${
                    eventDetail.address_number
                      ? `, ${eventDetail.address_number}`
                      : ""
                  }`}
                  {eventDetail.neighborhood && ` - ${eventDetail.neighborhood}`}
                  {`, ${eventDetail.city}/${eventDetail.state}`}
                  {eventDetail.complement && ` (${eventDetail.complement})`}
                </S.InfoText>
              </S.InfoItem>
            )}
            {code && (
              <S.InfoItem
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <S.CodeTitle
                  style={{
                    fontSize: "18px",
                  }}
                  theme={theme}
                >
                  Cod. do evento:{" "}
                  <S.CodeText theme={theme}>
                    {code}
                    <IoIosCopy
                      cursor="pointer"
                      size={30}
                      color={COLORS.purple.DEFAULT}
                      onClick={handleCopyCode}
                    />
                  </S.CodeText>
                </S.CodeTitle>
              </S.InfoItem>
            )}
            <S.ButtonContainer>
              {isEventOwner() ? (
                <>
                  <Button
                    backgroundColor={COLORS.green[500]}
                    text="Ofertar Alô"
                    textColor="white"
                    onClick={handlePromoteAlo}
                    style={{
                      padding: "12px 32px",
                      borderRadius: "8px",
                      flex: 1,
                      minWidth: "200px",
                    }}
                  />
                  <Button
                    backgroundColor={COLORS.blue[500]}
                    text="Editar Evento"
                    textColor="white"
                    onClick={handleEditEvent}
                    style={{
                      padding: "12px 32px",
                      borderRadius: "8px",
                      flex: 1,
                      minWidth: "200px",
                    }}
                  />
                  <Button
                    backgroundColor={COLORS.red[500]}
                    text="Remover Evento"
                    textColor="white"
                    onClick={handleRemoveEvent}
                    style={{
                      padding: "12px 32px",
                      borderRadius: "8px",
                      flex: 1,
                      minWidth: "200px",
                    }}
                  />
                </>
              ) : (
                <Button
                  backgroundColor={COLORS.green[500]}
                  text="Ofertar Alô"
                  textColor="white"
                  onClick={handlePromoteAlo}
                  style={{ padding: "12px 32px", borderRadius: "8px" }}
                />
              )}
            </S.ButtonContainer>
          </S.EventInfoColumn>
        </S.TopRow>

        {/* Linha abaixo: descrição à esquerda, artistas à direita */}
        <S.BottomRow theme={theme}>
          <S.DescriptionContainer>
            <S.TitleDescription theme={theme}>
              Descrição do evento
            </S.TitleDescription>
            <S.Text theme={theme}>{eventDetail.description}</S.Text>
          </S.DescriptionContainer>
          <S.RightColumn>
            <S.ArtistCardWrapper theme={theme}>
              {eventDetail.alo_offers && (
                <S.ArtistCardHeader theme={theme}>
                  Artistas Confirmados
                </S.ArtistCardHeader>
              )}
              <S.ArtistsContainer theme={theme}>
                {eventDetail.alo_offers &&
                  eventDetail.alo_offers.map((offer) => {
                    const { time: startTime } = convertDateTime(
                      offer?.start_offer
                    );
                    const { time: endTime } = convertDateTime(offer?.end_offer);
                    return (
                      <S.ArtistCard key={offer.id} theme={theme}>
                        <div style={{ width: "100%" }}>
                          <S.ArtistName theme={theme}>
                            {offer.artist.name}
                          </S.ArtistName>
                          <S.ArtistTime theme={theme}>
                            {`Período de Alôs: Das ${startTime} às ${endTime}.`}
                          </S.ArtistTime>
                          <S.ArtistInfo theme={theme}>
                            {offer.free_sample_available +
                              offer.alos_available >
                            0
                              ? `${
                                  offer.free_sample_available +
                                  offer.alos_available
                                } ${
                                  offer.free_sample_available +
                                    offer.alos_available >
                                  1
                                    ? "Alôs disponiveis!"
                                    : "Alô disponível"
                                }`
                              : "Acabaram os alôs! Aguarde novas ofertas!"}
                          </S.ArtistInfo>
                        </div>
                        <S.ArtistButton
                          theme={theme}
                          onClick={() => handleArtistSelect(offer)}
                          style={{ width: "100%" }}
                        >
                          Enviar Alô
                        </S.ArtistButton>
                        {offer.artist.id === user.id && (
                          <S.ArtistButtonEdit
                            theme={theme}
                            onClick={() => handleEditAloOffer(offer)}
                          >
                            Editar Oferta do Alô
                          </S.ArtistButtonEdit>
                        )}
                      </S.ArtistCard>
                    );
                  })}
              </S.ArtistsContainer>
            </S.ArtistCardWrapper>
          </S.RightColumn>
        </S.BottomRow>
        <S.Separator theme={theme} />
        <S.Separator theme={theme} />
        <S.Separator theme={theme} />
      </S.Container>
    );
  } else {
    return (
      <S.Container theme={theme}>
        <S.Title theme={theme}>Evento não selecionado...</S.Title>
        <Button
          backgroundColor={COLORS.purple.DEFAULT}
          text="Selecionar Evento!"
          textColor="white"
          onClick={() => {
            goToEvents(navigate);
          }}
        />
        <Button
          backgroundColor={COLORS.purple.DEFAULT}
          text="Voltar para Home!"
          textColor="white"
          onClick={() => {
            goToHome(navigate);
          }}
        />
        <S.Separator theme={theme} />
      </S.Container>
    );
  }
}

import * as S from "./style";
import Button from "@/components/Button";
import COLORS from "@/constants/colors";
import { convertDateTime } from "@/utils/formatedFunctions";
import { TbCalendarMonth, TbClock } from "react-icons/tb";
import { ImLocation2 } from "react-icons/im";
import { IoIosLink, IoIosCopy } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import {
  goToEvents,
  goToHome,
  goToPromoteAlo,
  goToSendAlo,
  goToEditOffer,
} from "@/routers/Coordinator";
import { BASE_URL } from "@/constants/urls";
import { deleteEvent, getSecurityCode } from "@/services/events";
import { useDispatch } from "react-redux";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";
import IMAGES from "@/assets/images";
import FONTS from "@/constants/fonts";
import Alert from "../Alert";
import usePermission from "@/hooks/usePermissiion";

export default function EventDetailMobile() {
  const eventDetail = useAppSelector((selector) => selector.eventDetail.value);
  const navigate = useNavigate();
  const user = useAppSelector((selector) => selector.user.value);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [code, setCode] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState<TypeDataModal>();

  const handleCopyCode = () => {
    setModalVisible(true);
    if (code) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          setDataModal({
            title: "Código copiado com sucesso!",
            buttons: [
              {
                text: "Ok",
                onPress: () => setModalVisible(false),
              },
            ],
          });
        })
        .catch(() => {
          setDataModal({
            title: "Erro ao copiar o código.",
            buttons: [
              {
                text: "Ok",
                onPress: () => setModalVisible(false),
              },
            ],
          });
        });
    }
  };

  const handleEditEvent = () => {
    navigate("/events/edit");
  };

  if (eventDetail.name !== "") {
    const { date, time } = convertDateTime(eventDetail.date);

    const handlePromoteAlo = () => {
      goToPromoteAlo(navigate);
    };

    const handleArtistSelect = (offer: TypeAloOfferResponse) => {
      const data = {
        aloOffer: offer,
        event: eventDetail,
      };
      goToSendAlo(navigate, data);
    };

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

    const handleRemoveEvent = async () => {
      const result = await deleteEvent(dispatch, eventDetail.id);

      if (result) {
        setDataModal({
          title: "Evento removido com sucesso!",
          buttons: [
            {
              text: "Ok",
              onPress: () => {
                setModalVisible(false);
                goToEvents(navigate);
              },
            },
          ],
        });
        setModalVisible(true);
      } else {
        setDataModal({
          title: "Erro ao remover o evento!",
          buttons: [
            {
              text: "Ok",
              onPress: () => {
                setModalVisible(false);
              },
            },
          ],
        });
        setModalVisible(true);
      }
    };

    const isEventOwner = () => {
      if (!user.role) {
        return false;
      }
      const isOwner =
        usePermission(user) && user.id === eventDetail.producer?.id;
      return isOwner;
    };

    useEffect(() => {
      const updateCode = async () => {
        if (isEventOwner()) {
          const codeResponse = await getSecurityCode(eventDetail.id);
          if (codeResponse) {
            setCode(codeResponse);
          }
        }
      };
      updateCode();
    }, []);

    return (
      <S.Container theme={theme}>
        <S.Image
          src={
            eventDetail.image_path
              ? `${BASE_URL}${eventDetail.image_path}`
              : IMAGES.defaultImageEvent
          }
        />
        <S.Title theme={theme}>{eventDetail.name}</S.Title>
        <S.InfoContainer>
          <TbCalendarMonth size={18} color={COLORS.purple.DEFAULT} />
          <S.InfoText theme={theme}>{date}</S.InfoText>
        </S.InfoContainer>
        <S.InfoContainer>
          <TbClock size={18} color={COLORS.purple.DEFAULT} />
          <S.InfoText theme={theme}>{time}</S.InfoText>
        </S.InfoContainer>

        {eventDetail.is_online ? (
          <S.InfoContainer>
            <IoIosLink size={20} color={COLORS.purple.DEFAULT} />
            <Link
              to={`${eventDetail.link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <S.InfoText theme={theme}>{eventDetail.link}</S.InfoText>
            </Link>
          </S.InfoContainer>
        ) : (
          <>
            <S.InfoContainer>
              <ImLocation2 size={30} color={COLORS.purple.DEFAULT} />
              <S.InfoText theme={theme}>
                {`${eventDetail.city} - ${eventDetail.state} - ${eventDetail.street} - Nº ${eventDetail.address_number}`}
                {`-- ${eventDetail.complement} --`}
              </S.InfoText>
            </S.InfoContainer>
          </>
        )}

        {code && (
          <S.CodeContainer>
            <S.Title theme={theme}>
              Cod. do evento: <S.Text theme={theme}>{code}</S.Text>
            </S.Title>
            <S.CopyButton onClick={handleCopyCode} theme={theme}>
              <IoIosCopy size={20} color={COLORS.purple.DEFAULT} />
              <S.CopyText theme={theme}>Copiar</S.CopyText>
            </S.CopyButton>
          </S.CodeContainer>
        )}

        <S.Title theme={theme}>Descrição do evento</S.Title>

        <S.DescriptionContainer theme={theme}>
          <S.Text theme={theme}>{eventDetail.description}</S.Text>
        </S.DescriptionContainer>

        {eventDetail.alo_offers && (
          <S.ContainerCardArtista theme={theme}>
            <div
              style={{
                display: "flex",
                backgroundColor:
                  theme === "dark" ? COLORS.purple[100] : COLORS.black[600],
                paddingInline: "10px", // Alterado de 10px para 16px
                paddingTop: "10px",
                paddingBottom: "10px",
                width: "100%",
                borderStartStartRadius: "10px",
                borderStartEndRadius: "10px",
              }}
            >
              <text
                style={{
                  color:
                    theme === "dark" ? COLORS.black[1000] : COLORS.black[100],
                  fontSize: "16px",
                  fontWeight: "bold",
                  fontFamily: FONTS.montSerrat,
                }}
              >
                Artistas Confirmados:
              </text>
            </div>
          </S.ContainerCardArtista>
        )}
        {eventDetail.alo_offers && (
          <S.ArtistsContainer theme={theme}>
            {eventDetail.alo_offers &&
              eventDetail.alo_offers.map((offer) => {
                const { time: startTime } = convertDateTime(offer?.start_offer);
                const { time: endTime } = convertDateTime(offer?.end_offer);
                return (
                  <S.ArtistCard key={offer.id} theme={theme}>
                    <S.ArtistName theme={theme}>
                      {offer.artist.name}
                    </S.ArtistName>
                    {/* <S.ArtistPrice theme={theme}>
                Valor do Alô: R$ {artist.aloPrice.toFixed(2)}
                </S.ArtistPrice> */}
                    <S.ArtistTime theme={theme}>
                      Início dos alôs: {startTime}
                    </S.ArtistTime>
                    <S.ArtistTime theme={theme}>Fim dos alôs: {endTime}</S.ArtistTime>
                    <S.ArtistInfo theme={theme}>
                      {offer.free_sample_available + offer.alos_available > 0
                        ? `${
                            offer.free_sample_available + offer.alos_available
                          } ${
                            offer.free_sample_available + offer.alos_available >
                            1
                              ? "Alôs disponiveis!"
                              : "Alô disponível"
                          }`
                        : "Acabaram os alôs! Aguarde novas ofertas!"}
                    </S.ArtistInfo>
                    {offer.free_sample_available + offer.alos_available < 1 || (
                      <S.ArtistButton
                        theme={theme}
                        onClick={() => handleArtistSelect(offer)}
                      >
                        Enviar Alô
                      </S.ArtistButton>
                    )}
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
        )}
        <S.ButtonContainer style={{ marginTop: "-10px", marginBottom: "10px" }}>
          <Button
            backgroundColor={COLORS.green[500]}
            text="Ofertar Alô"
            textColor="white"
            onClick={() => handlePromoteAlo()}
            style={{ marginBottom: "0px" }}
          />
          {isEventOwner() && (
            <>
              <S.OwnerButton>
                <Button
                  backgroundColor={COLORS.blue[500]}
                  text="Editar"
                  textColor="white"
                  onClick={() => handleEditEvent()}
                />
                <Button
                  backgroundColor={COLORS.red[500]}
                  text="Remover"
                  textColor="white"
                  onClick={() => handleRemoveEvent()}
                />
              </S.OwnerButton>
            </>
          )}
        </S.ButtonContainer>
        <S.Separator theme={theme} />
        <Alert
          setVisible={setModalVisible}
          visible={modalVisible}
          buttons={dataModal?.buttons}
          title={dataModal?.title}
          content={dataModal?.message}
        />
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
      </S.Container>
    );
  }
}

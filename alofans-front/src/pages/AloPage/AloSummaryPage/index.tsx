//src/pages/AloPage/AloSummaryPage/index.tsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import * as S from "@/pages/AloPage/AloSummaryPage/style";
import Button from "@/components/Button";
import { useAppSelector } from "@/redux/hooks";
import { goToPixPayment } from "@/routers/Coordinator";
import { useTheme } from "@/contexts/ThemeContext";
import HeaderSimple from "@/components/HeaderSimple";
import { convertDateTime } from "@/utils/formatedFunctions";
import COLORS from "@/constants/colors";
import { BASE_URL } from "@/constants/urls";
import IMAGES from "@/assets/images";
import { addAlo } from "@/services/alos";
import Alert from "@/components/Alert";

const AloSummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const [dataModal, setDataModal] = useState<TypeDataModal>();
  const [visibleModal, setVisibleModal] = useState(false);

  const location = useLocation();
  const { aloOffer, aloRequest } =
    (location.state as TypeStateLocationSummary) || {};

  const payment = useSelector((state: RootState) => state.payment.value);
  const event = useAppSelector((selector) => selector.eventDetail.value);
  const dispatch = useDispatch();
  const { theme } = useTheme(); // Acesse o tema atual
  const { date, time } = convertDateTime(event.date);

  console.log({payment});
  


  const handleConfirm = () => {
    if (payment.charge?.pix_code) {
      setDataModal({
        message:
          "Você tem um alô aguardando pagamento! Tá bem pertim de dar certo!",
        buttons: [
          {
            text: "Ok",
            onPress: () => setVisibleModal(false),
          },
        ],
      });
      setVisibleModal(true);
    } else {
      addAlo(dispatch, aloRequest);
    }
    goToPixPayment(navigate);
  };
  const isPromotional = () => aloOffer.free_sample_available > 0;
  return (
    <>
      <HeaderSimple />

      <S.SafeArea id="SendAloPage.SafeArea" theme={theme}>
        <S.Text id="SendAloPage.Text" theme={theme}>
          RESUMO DO ALÔ
        </S.Text>
        <S.KeyboardAvoidingView
          id="SendAloPage.KeyboardAvoidingView"
          theme={theme}
        >
          {/* Layout para Desktop */}
          <S.DesktopContainer id="SendAloPage.DesktopContainer" theme={theme}>
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
          </S.DesktopContainer>

          {/* Mensagem do Alô */}
          <S.TextDescriptionMensagem
            id="AloSummaryPage.TextDescriptionMensagem"
            theme={theme}
          >
            {aloRequest.text_message}
          </S.TextDescriptionMensagem>

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
              text="Confirmar Alô"
              backgroundColor={theme === "dark" ? COLORS.green[500] : COLORS.green[500]}
              textColor="#FFFFFF"
              onClick={handleConfirm}
            />
          </S.Footer>
          <S.Separator theme={theme} />
        </S.KeyboardAvoidingView>
        <Alert
          visible={visibleModal}
          setVisible={setVisibleModal}
          buttons={dataModal?.buttons}
          content={dataModal?.message}
          title={dataModal?.title}
        />
      </S.SafeArea>
    </>
  );
};

export default AloSummaryPage;

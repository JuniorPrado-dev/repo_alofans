// src/pages/AloPage/PixPaymentPage/index.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  cancelPaymentAlo,
  verifyPayment,
} from "@/services/payment";
import LoadingSpinner from "@/components/LoadingSpinner";
import { cleanPayment, setPayment } from "@/redux/slices/paymentSlice";
import Button from "@/components/Button";
import * as S from "./style";
import { goToAlos, goToEvents } from "@/routers/Coordinator";
import { useTheme } from "@/contexts/ThemeContext";
import HeaderSimple from "@/components/HeaderSimple";
import Alert from "@/components/Alert";
import { getCookie } from "@/services/cookies";
import { EnumChargeStatus } from "@/enums/charge";

const PixPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payment = useSelector((state: RootState) => state.payment.value);
  const { theme } = useTheme();

  const [dataModal, setDataModal] = useState<TypeDataModal>();
  const [alertView, setAlertView] = useState(false);

  useEffect(() => {
    if (!payment?.charge?.pix_code) {
      const paymentData = getCookie("payment");
      console.log({paymentData});
      
      if (paymentData) {
        const parsedPayment = JSON.parse(paymentData);
        dispatch(setPayment(parsedPayment));
      }
    }
  }, []);

  useEffect(() => {
    if (payment.charge?.product_id && payment.charge?.status === EnumChargeStatus.ACTIVE) {
      verifyPayment(dispatch, payment.charge?.product_id);
    }
  }, [payment]);

  useEffect(() => {
    if (payment.type && !payment.charge) {
      setDataModal({
        title: "Parabéns!",
        message: "Você ganhou um de nossos alôs promocionais!",
        buttons: [
          {
            text: "Ok",
            onPress: () => {
              setAlertView(false);
              dispatch(cleanPayment())
              goToAlos(navigate);
            },
          },
        ],
      });
      setAlertView(true);
    }
  }, [payment]);

  const handleCopyCode = async () => {
    if (payment.charge?.pix_code) {
      await navigator.clipboard.writeText(payment.charge?.pix_code);
      setDataModal({
        title: "Código Copiado!",
        message: "Agora basta realizar o pagamento!",
        buttons: [
          {
            text: "Ok",
            onPress: () => {
              setAlertView(false);
            },
          },
        ],
      });
      setAlertView(true);
    } else {
      setDataModal({
        title: "Erro!",
        message: "Erro ao copiar código!",
        buttons: [
          {
            text: "Ok",
            onPress: () => {
              setAlertView(false);
            },
          },
        ],
      });
      setAlertView(true);
    }
  };

  const handleConfirmPayment = async () => {
    const isPaymented = await verifyPayment(dispatch, payment.charge?.product_id || "");
    if (isPaymented?.status === EnumChargeStatus.PAID) {
      setDataModal({
        title: "Parabéns!",
        message: "Pagamento realizado com sucesso!",
        buttons: [
          {
            text: "Ok",
            onPress: () => {
              setAlertView(false);
              goToAlos(navigate);
            },
          },
        ],
      });
      setAlertView(true);
      goToEvents(navigate);
    } else if (isPaymented?.status === EnumChargeStatus.EXPIRED) {
      setDataModal({
        title: "Que pena!",
        message: "Pagamento não realizado! Não deixe de mandar alôs!",
        buttons: [
          {
            text: "Ok",
            onPress: () => {
              setAlertView(false);
              goToAlos(navigate);
            },
          },
        ],
      });
      setAlertView(true);
      goToEvents(navigate);
    } else {
      setDataModal({
        title: "Aguardando Pagamento!",
        message: "Pagamento não confirmado! Verifique se o pagamento foi efetuado e tente mais tarde!",
        buttons: [
          {
            text: "Ok",
            onPress: () => {
              setAlertView(false);
            },
          },
        ],
      });
      setAlertView(true);
    }
  };
  console.log({payment});
  
  const handleCancelPayment = async () => {
    console.log("PAGAMENRT:  ",payment);
    
    setDataModal({
      title: "Ôxe!",
      message: "Ôxe! Não acredito! Você realmente deseja cancelar seu alô?",
      buttons: [
        {
          text: "Manter Alô",
          onPress: () => {
            setAlertView(false);
          },
        },
        {
          text: "Cancelar Alô",
          onPress: () => {
            setAlertView(false);
            cancelPaymentAlo(payment?.charge?.product_id||"", dispatch);
            goToAlos(navigate);
          },
        },
      ],
    });
    setAlertView(true);
  };

  return (
    <>
      <HeaderSimple />
      <S.KeyboardAvoidingView>
        <S.SafeArea theme={theme}>
          <S.ScrollView>
            <S.Container theme={theme}>
              <S.Title theme={theme}>PAGUE COM PIX</S.Title>
              {payment && payment.charge?.pix_code && payment.charge?.pix_qr_code ? (
                <>
                  <S.ContainerPix>
                    <S.PixImage src={payment.charge?.pix_qr_code} alt="QR Code Pix" />
                    <S.CodeContainer theme={theme}>
                      <S.CodeLabel theme={theme}>Código Pix:</S.CodeLabel>
                      <S.CodeText theme={theme}>{payment.charge?.pix_code}</S.CodeText>
                    </S.CodeContainer>
                  </S.ContainerPix>
                  <S.ButtonContainer theme={theme}>
                    <Button
                      text="Copiar Código! 🤑"
                      onClick={handleCopyCode}
                      textColor="#FFFF"
                      backgroundColor="#9362D9"
                    />
                  </S.ButtonContainer>
                  <S.ButtonContainer theme={theme}>
                    <Button
                      text="Já Paguei! 😄"
                      onClick={handleConfirmPayment}
                      textColor="#9362D9"
                      backgroundColor="#9FFF79"
                    />
                  </S.ButtonContainer>
                  <S.ButtonContainer theme={theme}>
                    <Button
                      text="Cancelar Alô! 😟"
                      onClick={handleCancelPayment}
                      textColor="#FFFF"
                      backgroundColor="#FF5829"
                    />
                  </S.ButtonContainer>
                </>
              ) : (
                <LoadingSpinner />
              )}
              <Alert
                visible={alertView}
                setVisible={setAlertView}
                buttons={dataModal?.buttons}
                title={dataModal?.title}
                content={dataModal?.message}
              />
            </S.Container>
          </S.ScrollView>
        </S.SafeArea>
      </S.KeyboardAvoidingView>
    </>
  );
};

export default PixPaymentPage;

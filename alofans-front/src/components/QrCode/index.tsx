// import { cancelCharge, verifyPayment } from "@/services/payment";
// import Modal from "../Modal";
// import * as S from "./style";
// import paymentIcons from "@/assets/icons/payment";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { ChargeStatus } from "@/utils/enums";
// import { useEffect, useState } from "react";
// import { addProfessionalWallet, coinGetValue } from "@/services/coins";

// interface QrCodeProps {
//   image: string;
//   code: string;
//   visible: boolean;
//   setVisible: (value: boolean) => void;
// }

// const QrCode: React.FC<QrCodeProps> = ({
//   image,
//   code,
//   visible,
//   setVisible,
// }) => {
//   const copyCodeAlert = () => {
//     alert("Código copiado com sucesso!");
//     navigator.clipboard.writeText(code);
//   };

//   const dispatch = useAppDispatch();
//   const [errorText, setErrorText] = useState("");
//   const charge = useAppSelector((state) => state.charge.value);
//   const professional = useAppSelector((state) => state.professional.value);
//   const [coinsValue, setCoinValue] = useState(0);
//   useEffect(() => {
//     const update = async () => {
//       const newValue = await coinGetValue();
//       if (newValue) {
//         setCoinValue(newValue);
//       }
//     };

//     update();
//   }, []);

//   useEffect(() => {
//     if (charge.value > 0 && charge.status === ChargeStatus.ACTIVE) {
//       setVisible(true);
//     } else {
//       setVisible(false);
//       handleCheckPaymentStatus();
//     }
//   }, []);

//   const handleCheckPaymentStatus = async () => {
//     if (charge.correlationID.length > 0) {
//       const resultVerify = await verifyPayment(charge.correlationID, dispatch);

//       if (resultVerify) {
//         switch (resultVerify) {
//           case ChargeStatus.PAID:
//             setVisible(false);
//             setErrorText("");
//             addProfessionalWallet(
//               dispatch,
//               professional.id ? professional.id : "Realize o login",
//               charge.value / 100 / coinsValue
//             );
//             break;

//           case ChargeStatus.EXPIRED:
//             setVisible(false);
//             setErrorText("");
//             break;

//           case ChargeStatus.ACTIVE:
//             setVisible(true);
//             setErrorText(
//               "Pagamento não indentificado! 😧 Tente novamente mais tarde!"
//             );
//             break;

//           default:
//             setVisible(true);
//             setErrorText("");
//         }
//       }
//     }
//   };

//   const handleCancelPurchase = () => {
//     setVisible(false);
//     dispatch(cancelCharge(charge.correlationID));
//     alert("Compra cancelada!");
//   };

//   //handleCheckPaymentStatus()
//   const render = (
//     <S.Container>
//       <S.TextContainer>
//         <S.Header>Realize o pagamento R$ {charge.value / 100},00</S.Header>
//         <S.Body>
//           Escaneie o QR Code ou copie o código para realizar o pagamento
//         </S.Body>
//       </S.TextContainer>
//       <S.ImageContainer>
//         <S.Image src={image} />
//       </S.ImageContainer>
//       <S.CodeContainer>
//         <S.Code>{code}</S.Code>
//         <S.Button src={paymentIcons.copy} onClick={copyCodeAlert} />
//       </S.CodeContainer>
//       {errorText.length > 0 && <S.ErrorText>{errorText}</S.ErrorText>}
//       <S.ButtonContainer>
//         <S.ButtonCancel onClick={handleCancelPurchase}>
//           Cancelar Compra
//         </S.ButtonCancel>
//         <S.ButtonConfirm $isDisabledd={false} onClick={handleCheckPaymentStatus}>
//           Já paguei
//         </S.ButtonConfirm>
//       </S.ButtonContainer>
//     </S.Container>
//   );

//   return (
//     <Modal
//       visible={visible}
//       setVisible={setVisible}
//       onClose={() => setVisible(false)}
//       children={render}
//     />
//   );
// };

// export default QrCode;

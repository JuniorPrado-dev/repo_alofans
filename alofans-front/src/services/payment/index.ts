import { cleanPayment } from "@/redux/slices/paymentSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { setSubAccount } from "@/redux/slices/subAccountSlice";
import requestDelete from "../functionsRequest/requestDelete";
import requestGet from "../functionsRequest/requestGet";
import ENDPOINTS from "@/utils/endPoints";
import { getCookie } from "../cookies";
import { EnumProductType } from "@/enums/payment";
import { EnumChargeStatus } from "@/enums/charge";

export const cancelPaymentAlo = async (productId: string, dispatch: Dispatch) => {
  const cancelPayment = async () => {
    dispatch(cleanPayment());
    const token = getCookie("token");
    const response = await requestDelete(ENDPOINTS.payment.cancelPayment(EnumProductType.ALO, productId), token);

    if (response && response.status === 200) {
      dispatch(cleanPayment())
    }
  }
  cancelPayment();
};

// export const cleanPaymentAlo = async (dispatch: Dispatch) => {
//   const clean = async () => {
//     removeCookie("payment");
//     dispatch(cleanPayment());
//   };
//   clean();
// };
/** 
 * verifica status e atualiza redux
 * retorna verdadeiro se pago ou cancelado  */
export const verifyPayment = async (dispatch: Dispatch, productId: string) => {
  const verify = async () => {
    const token = getCookie("token")
    const response = await requestGet(ENDPOINTS.payment.getCharge(productId),token);
    console.log("DADOS: ", response);
    
    if (response.status && response.status === 200) {
      const paymentData: TypePayment = {
        type:"Payment",
        charge:{
          product_id: response.data.product_id,
          pix_code: response.data.pix_code,
          pix_qr_code: response.data.pix_qr_code,
          status: response.data.status
        }
      }
      
      if (paymentData && paymentData.charge?.status !== EnumChargeStatus.ACTIVE) {
        dispatch(cleanPayment());
        return paymentData.charge
      }
    } else {
      console.log("Payment not found!")
      dispatch(cleanPayment());
      return null
    }
  };
  return verify();
};

export const getWallet = (dispath: Dispatch) => {
  const get = async () => {
    try {
      const token = getCookie("token");
      const response = await requestGet(ENDPOINTS.payment.getWallet, token);
      if (response.status && response.status === 200) {
        dispath(setSubAccount(response.data))
        return response.data;
      } else {
        console.log("Error on Balance: ", response);
        return null;
      }
    } catch (err) {
      console.log("Error on Balance: ", err);
      return null;
    }
  };
  return get();
};

export const makeWithDraw = () => {
  const get = async () => {
    try {
      const token = getCookie("token");
      const response = await requestGet(ENDPOINTS.payment.makeWithdraw, token);
      if (response.status && response.status === 200) {
        return {
          title: "Transferência realizada com sucesso!",
          detail: "Transferência realizada com sucesso! Acesse sua conta bancária para verificar o saldo!",
        };
      } else {
        return {
          title: "Ops! Algo deu errado!",
          detail: "Parece que seu saldo não é suficiente para realizar o saque!",
        };
      }
    } catch (err) {
      console.log("Error on Saque: ", err);
      return null;
    }
  };
  return get();
};
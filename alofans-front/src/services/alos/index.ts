import { setListAloClient } from "@/redux/slices/AloSliceClient";
import { setListAloProfessional } from "@/redux/slices/AloSliceProfessional";
import { setEventDetail } from "@/redux/slices/eventDetailSlice";
import ENDPOINTS from "@/utils/endPoints";
import { getCookie, setCookie } from "../cookies";
import requestGet from "../functionsRequest/requestGet";
import requestPut from "../functionsRequest/requestPut";
import requestPost from "../functionsRequest/requestPost";
import { setPayment } from "@/redux/slices/paymentSlice";

export const addAlo = (
  dispatch: any,
  newAlo: TypeAloRequest
) => {
  const fetchPayment = async () => {
    const token = getCookie("token")
    const response = await requestPost(ENDPOINTS.alos.add, newAlo, token);
    
    if (response.status && response.status === 200) {
      const paymentData: TypePayment =
        response.data.charge ? {
          type: "Payment",
          charge: {
            product_id: response.data.charge.product_id,
            pix_code: response.data.charge.pix_code,
            pix_qr_code: response.data.charge.pix_qr_code,
            status: response.data.charge.status
          }
        } : {
          type:"Payment",
          charge:null
        };

      if (paymentData.charge && paymentData.charge.pix_code) {
        const aloPayment = JSON.stringify(paymentData);
        setCookie({ key: "payment", value: aloPayment });
      }
      dispatch(setPayment(paymentData));
    } else {
      console.log("ERRO_ON_PAYMENT: ", response);
    }
  };
  fetchPayment();
};

export const updateListAloClient = (dispatch: any) => {
  const fetchEventList = async () => {
    try {
      const token = getCookie("token")
      const response = await requestGet(ENDPOINTS.alos.getClientAlos, token);
      if (response.status === 200) {
        dispatch(setListAloClient(response.data));
      } else {
        console.error("Failed to fetch client alos:", response);
      }
    } catch (e) {
      console.error("ERROR_ON_UPDATE_ALOS_FROM_CLIENT:", e);
    }
  };
  fetchEventList();
};

export const updateListAloProfessional = (dispatch: any) => {
  const fetchEventList = async () => {
    try {
      const token = getCookie("token")
      const response = await requestGet(ENDPOINTS.alos.getProfessionalAlos, token);
      if (response.status === 200) {
        dispatch(setListAloProfessional(response.data));
      } else {
        console.error("Failed to fetch producer/interlocutor alos:", response);
      }
    } catch (e) {
      console.error("ERROR_ON_UPDATE_ALOS_FROM_PROD_INTER:", e);
    }
  };
  fetchEventList();
};

export const updateStatusAlo = (
  alo_id: string,
  newStatus: string,
  dispatch: any
) => {
  const updateAlo = async () => {
    try {
      const token = getCookie("token")
      const response = await requestPut(ENDPOINTS.alos.updateStatus(alo_id, newStatus),
        {}, token
      );
      if (response.status === 200) {
        updateListAloProfessional(dispatch)
      } else {
        console.log(response);
      }
    } catch (e) {
      console.error("ERROR_ON_UPDATE_STATUS_ALO:", e);
    }
  };
  updateAlo();
};

export const addAloOfferRequest = (dispatch: any, aloOffer: TypeAloOfferRequest): Promise<TypeReturnRequest | null> => {
  const token = getCookie("token")
  const addAlo = async () => {
    try {
      const response = await requestPost(ENDPOINTS.aloOffers.add, aloOffer, token);
      if (response.status === 200) {
        dispatch(setEventDetail(response.data))
        return {
          status: 200,
          data: "Oferta de alôs cadastrada com sucesso!",
        }
      } else {
        console.log(response);
        return {
          status: response.status,
          data: response.data,
        }
      }
    } catch (e) {
      console.error("ERROR_ON_ADD_ALO_REQUEST:", e);
      return null
    }
  };
  return addAlo();
};
export const editAloOfferRequest = (dispatch: any, offerId: string, aloOffer: TypeAloOfferEdit): Promise<TypeReturnRequest | null> => {
  const token = getCookie("token")
  const addAlo = async () => {
    try {
      const response = await requestPut(ENDPOINTS.aloOffers.update(offerId), aloOffer, token);
      if (response.status === 200) {
        dispatch(setEventDetail(response.data))
        return {
          status: 200,
          data: "Oferta de alôs editada com sucesso!",
        }
      } else {
        console.log(response);
        return {
          status: response.status,
          data: response.data,
        }
      }
    } catch (e) {
      console.error("ERROR_ON_ADD_ALO_REQUEST:", e);
      return null
    }
  };
  return addAlo();
};

export const getVerifyInterlocutor = (cpf_cnpj: string): any => {
  const token = getCookie("token")
  const verify = async () => {
    try {
      const response = await requestGet(ENDPOINTS.interlocutors.verify(cpf_cnpj), token);
      if (response.status === 200) {
        const interlocutor: TypeInterlocutor = {
          id: response.data.id,
          percent: 0,
          name: response.data.name
        }
        return interlocutor
      } else {
        return null
      }
    } catch (e) {
      console.error("ERROR_ON_VERIFY_INTERLOCUTOR:", e);
      return null
    }
  };
  return verify();
};

export const getAloById = (aloId: string) => {
  const getAlo = async () => {
    try {
      const aloResponse = await requestGet(ENDPOINTS.alos.get(aloId));
      if (aloResponse.status === 200) {
        const alo: TypeAloResponse[] = aloResponse.data;
        return alo[0];
      } else {
        console.error("ERROR_ON_GET_ALO_STATUS:", aloResponse);
        return null;
      }
    } catch (e) {
      console.error("ERROR_ON_GET_ALO_STATUS:", e);
      return null;
    }
  };
  return getAlo();
};
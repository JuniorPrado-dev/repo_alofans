import { setListAloClient } from "@/redux/slices/AloSliceClient";
import { setListAloProdInter } from "@/redux/slices/AloSliceProdInter";
import {
  cleanAloToRequest,
  setAloToRequest,
} from "@/redux/slices/AloSliceRequest";
import useRequestGet from "@/services/useRequestGet";
import useRequestPost from "@/services/useRequestPost";
import useRequestPut from "@/services/useRequestPut";

export const updateListAloClient = (dispatch: any, idClient: string) => {
  const fetchEventList = async () => {
    try {
      const response = await useRequestGet(`/alo/client?client_id=${idClient}`);
      if (response.status === "success") {
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
export const updateListAloProdInter = (dispatch: any, idClient: string) => {
  const fetchEventList = async () => {
    try {
      const response = await useRequestGet(
        `/alo/producer-interlocutor?client_id=${idClient}`
      );
      if (response.status === "success") {
        
        dispatch(setListAloProdInter(response.data));
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
  alos: any[],
  id: string,
  newStatus: string,
  dispatch: any
) => {
  const updateAlo = async () => {
    try {
      const response = await useRequestPut(
        `/alo/update?alo_id=${id}&status=${newStatus}`,
        {}
      );
      
      if (response.status === "success") {
        const update = alos.map((alo) =>
          alo.id === id ? { ...alo, status: newStatus } : alo
      );
    
        dispatch(setListAloProdInter(update));
        alert(response.data.detail);
      } else {
        alert(response);
      }
    } catch (e) {
      console.error("ERROR_ON_UPDATE_STATUS_ALO:", e);
    }
  };
  updateAlo();
};

export const setAloRequest = (dispatch: any, alo: TypeAloRequest) => {
  dispatch(setAloToRequest(alo));
};

export const cleanAloRequest = (dispatch: any) => {
  dispatch(cleanAloToRequest());
};

export const addAloRequest = (dispatch: any, alo: TypeAloRequest) => {
  const addAlo = async () => {
    try {
      const response = await useRequestPost("/alo/add", alo);
      if (response.status === "success") {
        updateListAloClient(dispatch, alo.client_id);
        updateListAloProdInter(dispatch, alo.client_id);
        cleanAloToRequest(dispatch);
        alert("Agora sim! Alô enviado!");
      } else {
        alert(response);
      }
    } catch (e) {
      console.error("ERROR_ON_ADD_ALO_REQUEST:", e);
    }
  };
  addAlo();
};

export const getAloState = (aloId: string) => {
  const getAloStatus = async () => {
    try {
      const aloResponse = await useRequestGet(`/alo?alo_id=${aloId}`);
      if (aloResponse.status === "success") {
        const alo: TypeAloResponse = aloResponse.data;
        return alo.status.toLowerCase();
      } else {
        console.error("ERROR_ON_GET_ALO_STATUS:", aloResponse);
        return "aguardando_pagamento";
      }
    } catch (e) {
      console.error("ERROR_ON_GET_ALO_STATUS:", e);
      return "aguardando_pagamento";
    }
  };
  return getAloStatus();
};
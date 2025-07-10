import { useEffect } from 'react';
import { Dispatch } from 'redux';
import { NavigateFunction } from 'react-router-dom';
import { goToPixPayment } from "@/routers/Coordinator";
import { getCookie, removeCookie } from "@/services/cookies";

const useChargeVerify = (dispatch: Dispatch, navigate: NavigateFunction) => {
  useEffect(() => {
    const paymentToken = getCookie("payment");
    if (paymentToken) {
      const payment:TypePayment = JSON.parse(paymentToken);
      if (payment.charge?.pix_code){
        goToPixPayment(navigate);
      }
    } else {
      removeCookie("payment");
    }
  }, [dispatch, navigate]);
};

export default useChargeVerify;

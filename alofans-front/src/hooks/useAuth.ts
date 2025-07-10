import { useEffect } from 'react';
import { goToWithoutAuthorization } from "@/routers/Coordinator";
import { getCookie, removeCookie } from "@/services/cookies";
import { refreshUserData, userLogout } from '@/services/users';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      refreshUserData(dispatch);
    } else {
      goToWithoutAuthorization(navigate);
      removeCookie("token");
      userLogout(dispatch);
    }
  }, [dispatch, navigate]);
};

export default useAuth;


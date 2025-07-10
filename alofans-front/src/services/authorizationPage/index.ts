/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import { goToLogin } from "@/routers/Coordinator"
import { getCookie, removeCookie } from "@/services/cookies"
import { isTokenValid } from "@/services/token"
import { NavigateFunction } from 'react-router-dom';
import { refreshUserData, userLogout } from '../users';

const authorizationPage = (dispatch:Dispatch, navigate:NavigateFunction) => {
    const token = getCookie("token")
    if (token && isTokenValid(token)) {
        refreshUserData(dispatch)
    } else {
        alert("Faça Login para ter acesso!")
        goToLogin(navigate)
        removeCookie("token")
        userLogout(dispatch)
        console.log("Error_GET_Token: Inexistente ou invalido")
    }
}
export default authorizationPage;
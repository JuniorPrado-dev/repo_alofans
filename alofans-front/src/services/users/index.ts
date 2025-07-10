
import { Dispatch } from "redux";
import requestPost from "../functionsRequest/requestPost";
import { getCookie, removeCookie, setCookie } from "../cookies";
import { decodeToken } from "../token";
import { googleLogout } from "@react-oauth/google";
import requestGet from "../functionsRequest/requestGet";
import requestPut from "../functionsRequest/requestPut";
import requestDelete from "../functionsRequest/requestDelete";
import { login, logout } from "@/redux/slices/userSlice";
import ENDPOINTS from "@/utils/endPoints";


export const userRegistration = (dataRegistration: TypeUserForm, googleId?: string) => {
    const register = async () => {
        try {
            const newUser: TypeUserRequest = {
                name: dataRegistration.name,
                email: dataRegistration.email,
                password: dataRegistration.password,
                phone: dataRegistration.phone,
                google_id: googleId || ""
            }
            const response = await requestPost(ENDPOINTS.users.add, newUser)
            if (response.status && response.status === 200) {
                setCookie({ key: "token", value: response.data.access_token })
                return {
                    status: response.status,
                    detail: "Faça já seus alôs!"
                }
            } else {
                console.log("Error_Resister", response)
                return {
                    status: 400,
                    detail: response.data
                }
            }
        } catch (error) {
            console.log("Error_Resister", error)
            return {
                status: 400,
                detail: "Falha Ao Cadastrar!\nTente Novamente mais tarde!"
            }
        }
    }
    return register();
};

export const userLogin = (dataLogin: TypeLoginRequest) => {
    const makeLogin = async () => {
        try {
            const response = await requestPost(ENDPOINTS.users.login, dataLogin)
            if (response.status && response.status === 200) {
                setCookie({ key: "token", value: response.data.access_token })
                return {
                    status: response.status,
                    detail: "Bem vindo ao AlôFans!"
                }
            } else {
                console.log("Error_Login", response)
                return {
                    status: 400,
                    detail: response.data
                }
            }
        } catch (error) {
            console.log("Error_Login", error)
            return {
                status: 400,
                detail: "Falha no login!\nTente Novamente mais tarde!"
            }
        }
    }
    return makeLogin();
}
// Falta implemantar !!! ----
// export const userGoogleAuth = (accessToken: string) => {
//     const googleAuth = async () => {
//         try {
//             const response = await requestGet(`/user/google-auth?access_token=${accessToken}`)
//             if (response.status && response.status === 200) {
//                 const userInfo: TypeUserGoogleAuthResponse = response.data
//                 return userInfo
//             } else {
//                 console.log("Error_GOOGLE_AUTH", response)
//                 return null
//             }
//         } catch (error) {
//             console.log("Error_GOOGLE_AUTH", error)
//             return null
//         }
//     }
//     return googleAuth();
// }

export const refreshUserData = (dispatch: Dispatch) => {
    const refresh = async () => {
        try {
            const token = getCookie("token")
            if (token && token.length > 0) {
                const dataToken = decodeToken(token)
                if (dataToken === null) {
                    return
                }
                console.count("get user")
                const response = await requestGet(ENDPOINTS.users.get, token)
                if (response.status && response.status === 200) {
                    const user: TypeUserResponse = response.data
                    dispatch(login(user))
                }
                else {
                    console.log("Error_Update", response)
                }
            } else {
                removeCookie("token")
                googleLogout()
                console.log("Error_GET_Token: Inesistente ou invalido")
            }
        } catch (error) {
            console.log("Error_refreshUserData", error)
        }
    }
    refresh();
}

export const userLogout = (dispatch: Dispatch) => {
    const makeLogout = async () => {
        try {
            dispatch(logout());
            googleLogout();
        } catch (err: any) {
            console.log("ERROR_Logout: ", err)
        }
    };
    makeLogout();
};


export const userRegisterProfessional = (userData: TypePromoteToProfessionalRequest , dispatch: Dispatch) => {
    const token = getCookie("token")
    const update = async () => {
        try {
            const response = await requestPut(ENDPOINTS.users.promoteToProfessional,
                userData,token)
            if (response.status && response.status === 200) {
                setCookie({ key: "token", value: response.data.access_token })
                refreshUserData(dispatch)
                return {
                    status: response.status,
                    detail: "Todos os dados foram atualizados!"
                }
            } else {
                console.log("Error_Resister", response)
                return {
                    status: response.status,
                    detail: response.data
                }
            }
        } catch (error) {
            console.log("Error_Resister", error)
            return {
                status: 400,
                detail: "Falha Ao Cadastrar!\nTente Novamente mais tarde!"
            }
        }
    }
    return update();
};

export const userUpdateProfile = ( profileUpdate: TypeUserUpdate, dispatch: Dispatch) => {
    const token = getCookie("token")
    const update = async () => {
        try {
            const response = await requestPut(`/user`, profileUpdate, token)
            if (response.status && response.status === 200) {
                setCookie({ key: "token", value: response.data.access_token })
                refreshUserData(dispatch)
                return {
                    status: response.status,
                    detail: response.data
                }
            } else {
                console.log("Error_Resister", response)
                return {
                    status: 400,
                    detail: response.data
                }
            }
        } catch (error) {
            console.log("Error_Resister", error)
            return {
                status: 400,
                detail: "Falha Ao Cadastrar!\nTente Novamente mais tarde!"
            }
        }
    }
    return update();
};

export const userResetPassword = (email: string) => {
    const reset = async () => {
        try {
            const response = await requestPut(ENDPOINTS.users.passwordReset(email), {})
            if (response.status && response.status === 200) {
                return {
                    status: response.status,
                    detail: response.data.detail
                }
            } else {
                console.log("Error_Reset", response)
                return {
                    status: response.status,
                    detail: response.data
                }
            }
        } catch (error) {
            console.log("Error_Reset", error)
            return {
                status: 400,
                detail: "Falha ao enviar e-mail!\nTente Novamente mais tarde!"
            }
        }
    }
    return reset();
};

export const userDeleteAccount = ( dispatch: Dispatch) => {
    const token = getCookie("token")
    const deleteAccount = async () => {
        try {
            const response = await requestDelete(ENDPOINTS.users.delete, token)
            if (response.status && response.status === 200) {
                removeCookie("token")
                userLogout(dispatch);
                return {
                    status: "Conta deletada!",
                    detail: "Sua conta foi deletada com sucesso!"
                }
            } else {
                console.log("Error_Delete", response)
                return {
                    status: response.status,
                    detail: response
                }
            }
        } catch (error) {
            console.log("Error_Delete", error)
            return {
                status: 400,
                detail: "Falha ao deletar conta!\nTente Novamente mais tarde!"
            }
        }
    }
    return deleteAccount();
}

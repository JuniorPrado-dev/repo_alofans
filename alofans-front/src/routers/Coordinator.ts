import { NavigateFunction } from 'react-router-dom';

/////////////////////////////////// HOME //////////////////////////////////
export const goToHome=(navigate:NavigateFunction)=>{
    navigate(`/`)
}
export const goToLogin=(navigate:NavigateFunction)=>{
    navigate(`/login`)
}
export const goToRegister=(navigate:NavigateFunction)=>{
    navigate(`/register`)
}
export const goToRegisterProfessional=(navigate:NavigateFunction)=>{
    navigate(`/register/professional`)
}
export const goToResetPassword=(navigate:NavigateFunction)=>{
    navigate(`/reset-password`)
}
export const goToWithoutAuthorization=(navigate:NavigateFunction)=>{
    navigate(`/withoutAuthorization`)
}
/////////////////////////////////// EVENT //////////////////////////////////
export const goToEvents=(navigate:NavigateFunction)=>{
    navigate(`/events`)
}
export const goToEventsMobile=(navigate:NavigateFunction)=>{
    navigate(`/eventsmobile`)
}
export const goToEventDetail=(navigate:NavigateFunction)=>{
    navigate(`/events/detail`)
}
export const goToAddEvent=(navigate:NavigateFunction)=>{
    navigate(`/events/add`)
}
/////////////////////////////////// ALO  ///////////////////////////////////
export const goToAlos=(navigate:NavigateFunction)=>{
    navigate(`/alos`)
}
export const goToAlosManager=(navigate:NavigateFunction)=>{
    navigate(`/alos/manager`)
}

export const goToSendAlo=(navigate:NavigateFunction, data: TypeStateLocationSendAlo)=>{
    navigate("/alos/sendalo", {state: data})
}

export const goToEditOffer=(navigate:NavigateFunction, data: TypeStateLocationEditOffer)=>{
    navigate("/alos/edit-offer", {state: data})
}

export const goToPromoteAlo=(navigate:NavigateFunction)=>{
    navigate(`/alos/promote-alo`)
}

/**
 * Navega para a p gina de resumo de al , que   apresentada ap s o usu rio
 * enviar uma solicita o de al .
 *
 * @param navigate Fun o que serve para navegar entre as rotas
 */
export const goToAloSummary=(navigate:NavigateFunction,data:TypeStateLocationSummary)=>{
    navigate(`/alos/alo-summary`,{state: data})
}

export const goToPixPayment=(navigate:NavigateFunction)=>{
    navigate(`/alos/pix-payment`)
}
//////////////////////////////// PROFILE //////////////////////////////////
export const goToProfile=(navigate:NavigateFunction)=>{
    navigate(`/profile`)
}

export const goToProfileWallet=(navigate:NavigateFunction)=>{
    navigate(`/profile/wallet`)
}
export const goToEditProfile=(navigate:NavigateFunction)=>{
    navigate(`/profile/edit`)
}
export const goToProfileTerms=(navigate:NavigateFunction)=>{
    navigate(`/profile/terms`)
}
export const goToProfileAbout=(navigate:NavigateFunction)=>{
    navigate(`/profile/about`)
}
export const goToProfileHelp=(navigate:NavigateFunction)=>{
    navigate(`/profile/help`)
}
export const goToProfileDelete=(navigate:NavigateFunction)=>{
    navigate(`/profile/delete`)
}
export const goToProfileExit=(navigate:NavigateFunction)=>{
    navigate(`/profile/exit`)
}
export const goToAdvertisePage=(navigate:NavigateFunction)=>{
    navigate(`/advertise`)
}
export const goToPrivacyPolicy=(navigate:NavigateFunction)=>{
    navigate(`/privacy-policy`)
}
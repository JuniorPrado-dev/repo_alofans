// import { useGoogleLogin } from "@react-oauth/google";
// import * as S from "./style";
// import { userGoogleAuth, userLogin } from "@/services/users";
// import googleIcon from "@/assets/icons/google.png"
// interface TypeDataModal {
//   status: string;
//   detail: string;
// }

// interface GoogleLoginButtonProps {
//   setIsVisibleOnSubmit: (value: boolean) => void;
//   setDataModal: (data: TypeDataModal) => void;
// }

// export default function GoogleLoginButton({
//   setIsVisibleOnSubmit,
//   setDataModal,
// }: GoogleLoginButtonProps) {
//   const login = useGoogleLogin({
//     onSuccess: async (response) => {
//       try {
//         const resApi = await userGoogleAuth(response.access_token)
//         if (resApi) {
//           const response = await userLogin({email: resApi.email, google_id: resApi.sub,image_path:resApi.picture});
//           if (response && response.status) {
//             setIsVisibleOnSubmit(true);
//             setDataModal({
//               status: response.status,
//               detail: response.detail,
//             });
//           }
//         }
//       } catch (err) {
//         console.log("ERROR_LOGIN_GOOGLE: ", err);
//       }
//     },
//   });

//   return (
//     <S.Container onClick={() => login()}>
//       <S.Label>
//         {'Login com Google '}
//         <S.LogoGoogle src={googleIcon}/>
//       </S.Label>
//     </S.Container>
//   );
// }

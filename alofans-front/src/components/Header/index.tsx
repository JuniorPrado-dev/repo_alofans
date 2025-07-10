// import * as S from "./style";
// import logo from "@/assets/images/logo-horizontal.png";
// import menuIcon from "@/assets/images/icons/menu.png";
// import menuBackIcon from "@/assets/images/icons/menu-back.png";
// import userIcon from "@/assets/images/icons/user-icon.svg";
// import { useNavigate } from "react-router-dom";
// import {
//   goToDashBoard,
//   goToHome,
//   goToLogin,
//   goToSingUp,
// } from "@/routers/Coordinator";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { userLogout } from "@/services/users";
// import { changeMenuState } from "@/redux/slices/menuStateSlice";

// interface PropsHeader {
//   isHomer?: boolean;
//   isDashboard?: boolean;
// }
// export default function Header({
//   isHomer = false,
//   isDashboard = false,
// }: PropsHeader) {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => state.user.value);
//   const visibleMenu = useAppSelector((state) => state.menuState.value.visible);
//   return (
//     <S.Container>
//       <S.Logo src={logo} onClick={() => goToHome(navigate)} />
//       <>
//         <S.Credentials>
//           {isHomer && user && user.name ? (
//             <>
//               <S.Button onClick={() => goToDashBoard(navigate)}>
//                 Entrar
//               </S.Button>
//               <S.Button
//                 onClick={() => {
//                   userLogout(dispatch);
//                 }}
//               >
//                 Sair
//               </S.Button>
//             </>
//           ) : (
//             isHomer && (
//               <>
//                 <S.Button onClick={() => goToLogin(navigate)}>Login</S.Button>
//                 <S.Button onClick={() => goToSingUp(navigate)} register={true}>
//                   Cadastro{" "}
//                 </S.Button>
//               </>
//             )
//           )}
//           {user && user.name && (
//             <S.UserName>{`${user.name.split(" ", 2)[0]} ${
//               user.name.split(" ", 2)[1]
//             }`}</S.UserName>
//           )}
//           <>
//             {user && user.image_path ? (
//               <S.UserImage src={user.image_path} />
//             ) : (
//               <S.UserIcon src={userIcon} />
//             )}
//           </>
//         </S.Credentials>
//         <S.CredentialsMobile>
//           {isDashboard && (
//             <S.MenuButton
//               src={visibleMenu?menuBackIcon:menuIcon}
//               onClick={() => dispatch(changeMenuState())}
//             />
//           )}
//           {isHomer && user && user.name ? (
//             <>
//               <S.Button onClick={() => goToDashBoard(navigate)}>
//                 Entrar
//               </S.Button>
//               <S.Button
//                 onClick={() => {
//                   userLogout(dispatch);
//                 }}
//               >
//                 Sair
//               </S.Button>
//             </>
//           ) : (
//             isHomer && (
//               <>
//                 <S.Button onClick={() => goToLogin(navigate)}>Login</S.Button>
//                 <S.Button onClick={() => goToSingUp(navigate)} register={true}>
//                   Cadastro{" "}
//                 </S.Button>
//               </>
//             )
//           )}
//           <S.UserContainer>
//             <>
//               {isDashboard && user && user.image_path ? (
//                 <S.UserImage src={user.image_path} />
//               ) : (
//                 <S.UserIcon src={userIcon} />
//               )}
//             </>
//             {user && user.name && isDashboard && (
//               <S.UserName>{`${user.name.split(" ", 2)[0]} ${
//                 user.name.split(" ", 2)[1]
//               }`}</S.UserName>
//             )}
//           </S.UserContainer>
//         </S.CredentialsMobile>
//       </>
//     </S.Container>
//   );
// }

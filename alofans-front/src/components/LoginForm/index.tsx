//src/components/LoginForm/index.tsx

import * as S from "./style";
import { Formik } from "formik";
import { validationLoginForm } from "@/utils/validationSchemas";
import { FormButton } from "@/components/FormField/FormButton";
import { FormFieldInput } from "@/components/FormField/FormFieldInput";
import { useState } from "react";
import { refreshUserData, userLogin } from "@/services/users";
import Alert from "../Alert";
import {
  goToEvents,
  goToHome,
  goToRegister,
  goToResetPassword,
} from "@/routers/Coordinator";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTheme } from "@/contexts/ThemeContext";
import COLORS from "@/constants/colors";
// import { GoogleLogin } from "@react-oauth/google";
// import { decodeToken } from "@/services/token";

// Interface para os valores do formulário
interface LoginFormValues {
  google_id: string;
  email: string;
  password: string;
}

function LoginForm() {
  const initialValues: LoginFormValues = {
    google_id: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVisibleOnSubmit, setIsVisibleOnSubmit] = useState(false);
  const [dataModal, setDataModal] = useState<TypeDataModal>();
  const { theme } = useTheme(); // Acesse o tema atual

  // Aplicando o tipo LoginFormValues à função handleSubmit
  const handleSubmit = async (values: LoginFormValues) => {
    const response = await userLogin(values);

    if (response && response.status === 200) {
      refreshUserData(dispatch);

      setIsVisibleOnSubmit(true);
      setDataModal({
        title: "Agora sim!",
        message: "Já está logado, agora é só fazer seu Alô!",
        buttons: [
          {
            text: "Página Inicial",
            onPress: () => {
              setIsVisibleOnSubmit(false);
              goToHome(navigate);
            },
          },
          {
            text: "Mandar alô",
            onPress: () => {
              setIsVisibleOnSubmit(false);
              goToEvents(navigate);
            },
          },
        ],
      });
      setIsVisibleOnSubmit(true);
    } else {
      setDataModal({
        title: "Erro ao Logar!",
        message: response.detail,
        buttons: [
          {
            text: "ok",
            onPress: () => {
              setIsVisibleOnSubmit(false);
            },
          },
        ],
      });
      setIsVisibleOnSubmit(true);
    }
  };
  // // Login / Register with google
  // const handleLoginWithGoogle = async (credentials: string) => {
    
  //   const userData: TypeDataGoogleUser | null = decodeToken (credentials)
     
  //   const response = await userLogin({
  //     google_id:userData?.sub,
  //     email: userData?.email,
  //     name: userData?.name,
  //     image_path: userData?.picture
  //   });

  //   if (response && response.status === 200) {
  //     refreshUserData(dispatch);

  //     setIsVisibleOnSubmit(true);
  //     setDataModal({
  //       title: "Agora sim!",
  //       message: "Já está logado, agora é só fazer seu Alô!",
  //       buttons: [
  //         {
  //           text: "Página Inicial",
  //           onPress: () => {
  //             setIsVisibleOnSubmit(false);
  //             goToHome(navigate);
  //           },
  //         },
  //         {
  //           text: "Mandar alô",
  //           onPress: () => {
  //             setIsVisibleOnSubmit(false);
  //             goToEvents(navigate);
  //           },
  //         },
  //       ],
  //     });
  //     setIsVisibleOnSubmit(true);
  //   } else {
  //     setDataModal({
  //       title: "Erro ao Logar!",
  //       message: response.detail,
  //       buttons: [
  //         {
  //           text: "ok",
  //           onPress: () => {
  //             setIsVisibleOnSubmit(false);
  //           },
  //         },
  //       ],
  //     });
  //     setIsVisibleOnSubmit(true);
  //   }
  // };

  return (
    <S.Container id="LoginForm.Container" theme={theme}>
      <Alert
        visible={isVisibleOnSubmit}
        setVisible={setIsVisibleOnSubmit}
        title={dataModal?.title}
        content={dataModal?.message}
        buttons={dataModal?.buttons}
      />
      <S.MidContainer id="LoginForm.MidContainer">
        <S.Title id="LoginForm.Title" theme={theme}>
          Login
        </S.Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationLoginForm}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            values,
            errors,
            touched,
          }) => (
            <S.FormStyled id="LoginForm.FormStyled" theme={theme}>
              <S.ContainerInput id="LoginForm.ContainerInput">
                <FormFieldInput
                  label="Email"
                  placeholder="Email cadastrado..."
                  keyboardType="email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  theme={theme}
                />
              </S.ContainerInput>

              <div style={{ height: "10px" }}></div>

              <FormFieldInput
                label="Senha"
                placeholder="Senha cadastrada..."
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                error={errors.password}
                touched={touched.password}
                theme={theme}
              />

              <div style={{ height: "40px" }} id="LoginForm.SpaceButton"></div>

              <S.ContainerButton id="LoginForm.SpaceButton">
                <FormButton
                  isDisabled={!isValid}
                  onClick={() => handleSubmit()}
                  text="Entrar"
                  theme={theme}
                />

                <FormButton
                  onClick={() => goToRegister(navigate)}
                  text="Cadastrar"
                  theme={theme}
                />

                <div
                  style={{ height: "10px" }}
                  id="LoginForm.SpaceButton"
                ></div>

                <link rel="stylesheet" />
                <span
                  className=""
                  id="LoginForm.SpaceButton"
                  style={{
                    cursor: "pointer",
                    marginTop: "20px",
                    
                    fontWeight: "500",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "14px",
                    textAlign: "center",
                    color:
                      theme === "dark" ? COLORS.white[100] : COLORS.black[800],
                  }}
                  onClick={() => goToResetPassword(navigate)}
                >
                  Esqueci a senha
                </span>
                {/* <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    if (credentialResponse.credential){
                      handleLoginWithGoogle(credentialResponse.credential)
                    }
                  }}
                  onError={() => {
                    setDataModal({
                      title: "Erro ao Logar!",
                      message: "Verifique sua conta Google!",
                      buttons: [
                        {
                          text: "ok",
                          onPress: () => {
                            setIsVisibleOnSubmit(false);
                          },
                        },
                      ],
                    });
                    setIsVisibleOnSubmit(true);
                  }}
                /> */}
              </S.ContainerButton>
            </S.FormStyled>
          )}
        </Formik>
      </S.MidContainer>
    </S.Container>
  );
}

export default LoginForm;

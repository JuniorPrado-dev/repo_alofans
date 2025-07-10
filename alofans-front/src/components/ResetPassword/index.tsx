//src/components/ResetPassword/index.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import Alert from "../Alert";
import { userResetPassword } from "@/services/users";
import { goToLogin } from "@/routers/Coordinator";
import { useTheme } from "@/contexts/ThemeContext";

const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Acesse o tema atual

  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isVisibleOnSubmit, setIsVisibleOnSubmit] = useState(false);
  const [dataModal, setDataModal] = useState<TypeDataModal>();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await userResetPassword(email);

      if (response && response.status === 200) {
        setDataModal({
          title: "Verifique seu email",
          message: response.detail,
          buttons: [
            {
              text: "Ok",
              onPress() {
                goToLogin(navigate);
                setIsVisibleOnSubmit(true);
              },
            },
          ],
        });
        setIsVisibleOnSubmit(true);
    }else{
          setDataModal({
            title: "Algo deu errado!",
            message: response.detail,
            buttons: [
              {
                text: "Ok",
                onPress() {
                  goToLogin(navigate);
                  setIsVisibleOnSubmit(true);
                },
              },
            ],
          });
          setIsVisibleOnSubmit(true);

      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(isValidEmail(value));
  };

  return (
    <S.Container id="ResetPassword.Container" theme={theme}>
      <Alert
        visible={isVisibleOnSubmit}
        setVisible={setIsVisibleOnSubmit}
        title={dataModal?.title}
        content={dataModal?.message}
        buttons={dataModal?.buttons}
      />
      <S.TopContainer id="ResetPassword.TopContainer">
        <S.MainTopic id="ResetPassword.MainTopic" theme={theme}>
          Esqueci a Senha
        </S.MainTopic>
        <S.Info id="ResetPassword.Info" theme={theme}>
          Por favor, digite seu e-mail cadastrado para redefinir sua senha.
        </S.Info>{" "}
        {/* Passe o tema como prop */}
      </S.TopContainer>

      <S.EmailContainer id="ResetPassword.EmailContainer">
        <S.SubTopic id="ResetPassword.SubTopic" theme={theme}>
          Seu E-mail:
        </S.SubTopic>{" "}
        {/* Passe o tema como prop */}
        <S.Input
          id="ResetPassword.Input"
          required
          type="email"
          placeholder="exemplo@gmail.com"
          value={email}
          onChange={handleChange}
          theme={theme} // Passe o tema como prop
        />
      </S.EmailContainer>

      <S.BottomContainer id="ResetPassword.BottomContainer">
        <S.Button
          id="ResetPassword.Button"
          $isActive={isValid}
          onClick={handleSubmit}
          theme={theme}
        >
          Redefinir senha
        </S.Button>
      </S.BottomContainer>
    </S.Container>
  );
};

export default ResetPassword;

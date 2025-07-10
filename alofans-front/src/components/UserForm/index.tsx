/* eslint-disable @typescript-eslint/no-explicit-any */
//src/components/UserForm/index.tsx
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as S from "./style";
import { FormButton } from "@/components/FormField/FormButton";
import { FormFieldInput } from "@/components/FormField/FormFieldInput";
import { validationUserForm } from "@/utils/validationSchemas";
import { formatPhoneNumber } from "@/utils/formatedFunctions";
import TermsAndConditions from "../TermsAndConditions";
import term from "@/data/termAccept.json";
import { refreshUserData, userRegistration } from "@/services/users";
import Alert from "../Alert";
import { goToEvents, goToHome } from "@/routers/Coordinator";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAppDispatch } from "@/redux/hooks";

interface Props {
  isPersonal: boolean;
}

const UserForm: React.FC<Props> = ({ isPersonal = true }) => {
  const initialValues: TypeUserForm = {
    name: "",
    email: "",
    password: "",
    checkPassword: "",
    phone: "",
    termsAccepted: false,
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleOnSubmit, setIsVisibleOnSubmit] = useState(false);
  const [dataModal, setDataModal] = useState<TypeDataModal>();
  const [isFormValid, setIsFormValid] = useState(false);
  const { theme } = useTheme(); // Acesse o tema atual

  const handleSubmit = async (values: TypeUserForm) => {
    const response = await userRegistration(values);

    if (response && response.status === 200) {
      refreshUserData(dispatch);

      setIsVisibleOnSubmit(true);
      setDataModal({
        title: "Agora sim!",
        message: "Já está cadastrado e logado, agora é só fazer seu Alô!",
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
        title: "Erro ao Registrar-se!",
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

  return (
    <S.Container id="UserForm.Container" theme={theme}>
      {" "}
      {/* Passe o tema como prop */}
      <Alert
        visible={isVisibleOnSubmit}
        setVisible={setIsVisibleOnSubmit}
        title={dataModal?.title}
        content={dataModal?.message}
        buttons={dataModal?.buttons}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationUserForm}
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
          setFieldValue,
        }) => {
          useEffect(() => {
            const allFieldsFilled = Object.values(values).every(
              (value) => value !== ""
            );
            setIsFormValid(isValid && allFieldsFilled);
          }, [values, isValid]);

          return (
            <S.FormStyled id="UserForm.FormStyled" theme={theme}>
              <FormFieldInput
                label=""
                placeholder={isPersonal ? "Nome Completo" : "Nome da Empresa"}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                error={errors.name}
                touched={touched.name}
                theme={theme}
              />
              <FormFieldInput
                label=""
                placeholder="email"
                keyboardType="email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                error={errors.email}
                touched={touched.email}
                theme={theme}
              />
              <FormFieldInput
                label=""
                placeholder="Senha"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                error={errors.password}
                touched={touched.password}
                theme={theme}
              />
              <FormFieldInput
                label=""
                placeholder="Confirmação de Senha"
                secureTextEntry
                onChangeText={handleChange("checkPassword")}
                onBlur={handleBlur("checkPassword")}
                value={values.checkPassword}
                error={errors.checkPassword}
                touched={touched.checkPassword}
                theme={theme}
              />
              <FormFieldInput
                label=""
                placeholder="Telefone (WhatsApp)"
                onBlur={handleBlur("phone")}
                onChangeText={(value: string) =>
                  setFieldValue("phone", formatPhoneNumber(value))
                }
                value={values.phone}
                error={errors.phone}
                touched={touched.phone}
                theme={theme}
              />
              <S.ContainerCheckBox id="UserForm.Container">
                <S.CheckBox
                  id="UserForm.Container"
                  type="checkbox"
                  name="termsAccepted"
                  checked={values.termsAccepted}
                  onChange={() =>
                    setFieldValue("termsAccepted", !values.termsAccepted)
                  }
                />
                <p>
                  <S.Link
                    id="UserForm.Link"
                    onClick={() => setIsVisible(true)}
                    theme={theme}
                  >
                    {"Aceito os Termos de Serviço"}
                  </S.Link>
                </p>
              </S.ContainerCheckBox>
              {touched.termsAccepted && errors.termsAccepted && (
                <S.ErrorText>{errors.termsAccepted}</S.ErrorText>
              )}
              <div style={{ height: "4vh" }}></div>
              <FormButton
                isDisabled={!isFormValid}
                onClick={handleSubmit}
                text="Cadastrar"
                theme={theme}
              />
              <TermsAndConditions
                setVisible={setIsVisible}
                visible={isVisible}
                termsContent={term.resumo}
                setAccept={setFieldValue}
                field="termsAccepted"
                theme={theme}
              />
            </S.FormStyled>
          );
        }}
      </Formik>
    </S.Container>
  );
};

export default UserForm;

/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/ProfessionalRegisterPage/index.tsx
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as S from "./style";
import term from "@/data/termAccept.json";
import { goToAddEvent, goToEvents, goToHome, goToLogin } from "@/routers/Coordinator";
import { useNavigate } from "react-router-dom";
import Alert from "@/components/Alert";
import { FormButton } from "@/components/FormField/FormButton";
import { FormFieldInput } from "@/components/FormField/FormFieldInput";
import { FormFieldSelect } from "@/components/FormField/FormFieldSelect";
import {
  formatCpfCnpj,
  formatPhoneNumber,
  formatpix_keyByType,
} from "@/utils/formatedFunctions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";
import { refreshUserData, userRegisterProfessional } from "@/services/users";
import TermsAndConditions from "@/components/TermsAndConditions";
import { validationSchemaProf } from "@/utils/validationSchemas";
import { useTheme } from "@/contexts/ThemeContext";
import HeaderSimple from "@/components/HeaderSimple";
import { getCookie } from "@/services/cookies";

const ProfessionalRegisterPage = () => {
  const user = useAppSelector((state) => state.user.value);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    refreshUserData(dispatch);
  }, []);

  const { theme } = useTheme(); // Acesse o tema atual

  const [pix_key, setpix_key] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<TypeDataModal>({
    title: "",
    message: "",
    buttons: [],
  });

  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (values: any) => {
    const token = getCookie("token");
    const professionalData: TypePromoteToProfessionalRequest = {
      cpf_cnpj: values.cpf_cnpj,
      pix_key_type: values.pix_key_type,
      pix_key: values.pix_key,
      phone: values.phone,
      push_token: token || "",
    };

    try {
      const data = await userRegisterProfessional(professionalData, dispatch);
      if (data.status === 200) {
        setDataModal({
          title: "Agora você é um Profissonal",
          fullHeight: true,
          message: data.detail,
          titleStyle: { 
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '24px',
            fontWeight: '600',
            color: '#2C3E50'
          },
          messageStyle: { 
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '16px',
            lineHeight: '1.5',
            color: '#34495E'
          },
          buttons: [
            {
              text: "Página Inicial",
              onPress: () => {
                setAlertVisible(false);
                goToHome(navigate);
              },
              style: { 
                fontFamily: 'Montserrat, sans-serif',
                backgroundColor: '#4CAF50',
                color: '#FFFFFF',
                fontWeight: '500'
              }
            },
            {
              text: "Ver Eventos",
              onPress: () => {
                setAlertVisible(false);
                goToEvents(navigate);
              },
              style: { 
                fontFamily: 'Montserrat, sans-serif',
                backgroundColor: '#2196F3',
                color: '#FFFFFF',
                fontWeight: '500'
              }
            },
            {
              text: "Adicionar Evento",
              onPress: () => {
                setAlertVisible(false);
                goToAddEvent(navigate);
              },
              style: { 
                fontFamily: 'Montserrat, sans-serif',
                backgroundColor: '#FF9800',
                color: '#FFFFFF',
                fontWeight: '500'
              }
            },
          ],
        });
        setAlertVisible(true);
      } else {
        setDataModal({
          title: "Algo deu errado",
          message: data.detail,
          buttons: [
            {
              text: "OK",
              onPress: () => {
                setAlertVisible(false);
              },
            },
          ],
        });
        setAlertVisible(true);
      }
    } catch (error) {
      setDataModal({
        title: "Algo deu errado",
        message: "Erro ao atualizar o cadastro. Tente novamente.",
        buttons: [
          {
            text: "OK",
            onPress: () => {
              setAlertVisible(false);
            },
          },
        ],
      });
      setAlertVisible(true);
    }
  };

  const handlepix_keyChange = (pix_key: string, setFieldValue: any) => {
    setpix_key(pix_key);
    setFieldValue("pix_key_type", pix_key);
  };

  const pix_keys = [
    { value: "CPF", label: "CPF" },
    { value: "CNPJ", label: "CNPJ" },
    { value: "EMAIL", label: "E-MAIL" },
    { value: "PHONE", label: "TELEFONE" },
    { value: "RANDOM", label: "ALEATÓRIO" },
  ];

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        if (!user.name) {
          setDataModal({
            title: "Algo deu errado",
            message:
              "Acesso Restrito! Você precisa está locado para ser um profissional.",
            buttons: [
              {
                text: "Fazer login",
                onPress: () => goToLogin(navigate),
              },
            ],
          });
          setAlertVisible(true);
        }
        if (user.name && user.role.toLowerCase() === "professional") {
          setDataModal({
            title: "Algo deu errado",
            message: "Você já é um Professional.",
            buttons: [
              {
                text: "Ir para início",
                onPress: () => {
                  goToHome(navigate);
                  setAlertVisible(false);
                },
              },
            ],
          });
          setAlertVisible(true);
        }
      } catch (error) {
        console.error("Erro ao verificar o papel do usuário", error);
      }
    };
    checkUserRole();
  }, []);

  return (
    <>
      <HeaderSimple />
      <S.Container id="professionalRegister.Container" theme={theme}>
        <HeaderWithBackButton />
        <S.Title id="professionalRegister.Title" theme={theme}>
          Cadastro de Profissional
        </S.Title>
        <Formik
          initialValues={{
            cpf_cnpj: "",
            pix_key: "",
            phone: "",
            pix_key_type: "",
            termsAccepted: false,
          }}
          validationSchema={validationSchemaProf}
          onSubmit={handleSubmit}
        >
          {({
            handleBlur,
            handleSubmit,
            isValid,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <S.FormStyled id="professionalRegister.FormStyled" theme={theme}>
              <Alert
                setVisible={setAlertVisible}
                visible={alertVisible}
                title={dataModal.title}
                content={dataModal.message}
                buttons={dataModal.buttons}
                onClose={() => goToEvents(navigate)}
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
              <FormFieldInput
                placeholder="CPF/CNPJ do Profissional"
                onChangeText={(text) =>
                  setFieldValue("cpf_cnpj", formatCpfCnpj(text))
                }
                onBlur={handleBlur("cpf_cnpj")}
                value={values.cpf_cnpj}
                error={errors.cpf_cnpj}
                touched={touched.cpf_cnpj}
                keyboardType="numeric"
                theme={theme}
              />
              <FormFieldSelect
                options={pix_keys}
                placeholder="Selecione tipo de chave pix"
                onChange={(value) => handlepix_keyChange(value, setFieldValue)}
                onBlur={handleBlur("pix_key_type")}
                value={values.pix_key_type}
                error={errors.pix_key_type}
                touched={touched.pix_key_type}
                theme={theme}
              />
              {pix_key && (
                <>
                  <FormFieldInput
                    placeholder="Coloque a sua Chave Pix de acordo com o tipo escolhido"
                    onChangeText={(text) =>
                      setFieldValue(
                        "pix_key",
                        formatpix_keyByType(values.pix_key_type, text)
                      )
                    }
                    onBlur={handleBlur("interlocutor_pix_key")}
                    value={values.pix_key}
                    error={errors.pix_key}
                    touched={touched.pix_key}
                    theme={theme}
                  />
                  <S.ContainerCheckBox id="professionalRegister.ContainerCheckBox">
                    <S.CheckBox
                      id="professionalRegister.CheckBox"
                      type="checkbox"
                      name="termsAccepted"
                      checked={values.termsAccepted}
                      onChange={() =>
                        setFieldValue("termsAccepted", !values.termsAccepted)
                      }
                    />
                    <p>
                      {""}
                      <S.Link theme={theme} onClick={() => setIsVisible(true)}>
                        {"Termos de Serviço"}
                      </S.Link>
                    </p>
                  </S.ContainerCheckBox>
                  {touched.termsAccepted && errors.termsAccepted && (
                    <S.ErrorText>{errors.termsAccepted}</S.ErrorText>
                  )}
                  <TermsAndConditions
                    setVisible={setIsVisible}
                    visible={isVisible}
                    termsContent={term.resumo}
                    setAccept={setFieldValue}
                    field="termsAccepted"
                    theme={theme}
                  />
                  <FormButton
                    isDisabled={!isValid || !values}
                    onClick={handleSubmit}
                    text="Tornar-se um Profissional"
                    theme={theme}
                  />
                </>
              )}
            </S.FormStyled>
          )}
        </Formik>
      </S.Container>
    </>
  );
};

export default ProfessionalRegisterPage;

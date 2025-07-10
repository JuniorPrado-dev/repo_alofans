import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as S from "./style";
import Button from "@/components/Button";
import COLORS from "@/constants/colors";
import {
  formatCpfCnpj,
  formatCurrency,
  formatTime,
  parseCurrency,
} from "@/utils/formatedFunctions";
import { useTheme } from "@/contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FormFieldInput } from "@/components/FormField";
import { FaTrash } from "react-icons/fa";
import { addAloOfferRequest, getVerifyInterlocutor } from "@/services/alos";
import { validationSchemaOfferForm } from "@/utils/validationSchemas";
import Alert from "@/components/Alert";
import calcularDistribuicaoFinanceira from "@/utils/calculateValuesAlo";
import FinanceSummary from "@/components/FinanceSummary";
import {
  goToEventDetail,
  goToLogin,
  goToRegisterProfessional,
} from "@/routers/Coordinator";
import { useNavigate } from "react-router-dom";
import FONTS from "@/constants/fonts";
import usePermission from "@/hooks/usePermissiion";

interface TypeAloOfferForm {
  event_code: string;
  alo_cost: number;
  alo_quantity: number;
  start_offer: string;
  end_offer: string;
  interlocutors: TypeInterlocutor[];
  free_sample: number;
  artistic_name: string;
}

const PromoteAlo = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.value);
  const event = useAppSelector((state) => state.eventDetail.value);
  const [currentCpfInput, setCurrentCpfInput] = useState("");
  const [currentPercentInput, setCurrentPercentInput] = useState("");
  const [currentInterlocutor, setCurrentInterlocutor] =
    useState<TypeInterlocutor | null>(null);
  const [showInterlocutorModal, setShowInterlocutorModal] = useState(false);
  const [displayValue, setDisplayValue] = useState("0,00");
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState<TypeDataModal>();
  const initialValues: TypeAloOfferForm = {
    artistic_name: "",
    free_sample: 0,
    event_code: "",
    alo_cost: 0,
    alo_quantity: 0,
    start_offer: "",
    end_offer: "",
    interlocutors: [],
  };
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        if (!user.name) {
          setDataModal({
            onClose:()=>{navigate(-1)},
            title: "Faça seu Login!",
            message:
            "Acesso Restrito! Você precisa estar logado para criar eventos.",
            buttons: [
              {
                text: "Fazer login",
                onPress: () => goToLogin(navigate),
              },
            ],
          });
          setModalVisible(true);
        } else {
          setModalVisible(false);
        }
        if (
          user.name &&
          !usePermission(user)
        ) {
          setDataModal({
            onClose:()=>{navigate(-1)},
            title: "Não perca tempo!",
            message:
              "Acesso Restrito! Você precisa ser um Profissional para criar eventos.",
            titleStyle: { fontFamily: 'Montserrat, sans-serif' },
            messageStyle: { fontFamily: 'Montserrat, sans-serif' },
            buttons: [
              {
                text: "Cadastrar-se como Profissional",
                onPress: () => goToRegisterProfessional(navigate),
                style: { fontFamily: 'Montserrat, sans-serif' },
              },
            ],
          });
          setModalVisible(true);
        }
      } catch (error) {
        console.error("Erro ao verificar o papel do usuário", error);
      }
    };
    checkUserRole();
  }, [user]);

  const handleAddInterlocutor = () => {
    setCurrentCpfInput("");
    setCurrentPercentInput("");
    setCurrentInterlocutor(null);
    setShowInterlocutorModal(true);
  };

  const handleRemoveInterlocutor = (
    index: number,
    setFieldValue: any,
    values: TypeAloOfferForm
  ) => {
    const newInterlocutors = [...values.interlocutors];
    newInterlocutors.splice(index, 1);
    setFieldValue("interlocutors", newInterlocutors);
  };

  const handleVerifyCpfCnpj = async () => {
    const interlocutor: TypeInterlocutor | null = await getVerifyInterlocutor(
      currentCpfInput
    );

    if (interlocutor) {
      setCurrentInterlocutor(interlocutor);
    } else {
      setDataModal({
        title: "Não encontrado!",
        message:
          "Não foi encontrado nenhum interlocutor no sistema com esse CPF",
        buttons: [
          {
            text: "Ok",
            onPress: () => {
              setModalVisible(false);
            },
          },
        ],
      });
      setModalVisible(true);
    }
  };

  const handleAddInterlocutorToForm = (
    setFieldValue: any,
    values: TypeAloOfferForm
  ) => {
    if (
      !currentInterlocutor ||
      !currentPercentInput ||
      isNaN(Number(currentPercentInput))
    ) {
      setDataModal({
        title: "Campos incompletos!",
        message: "Por favor, preencha todos os campos corretamente!",
        buttons: [
          {
            text: "Ok",
            onPress: () => {
              setModalVisible(false);
            },
          },
        ],
      });
      setModalVisible(true);
      return;
    }

    const percent = Number(currentPercentInput);
    const totalPercent =
      values.interlocutors.reduce((sum, i) => sum + i.percent, 0) +
      percent / 100;

    if (totalPercent > 1) {
      setDataModal({
        title: "Valor não permetido!",
        message: "A porcentagen dos interlocutores não pode ultrapassar 100 %!",
        buttons: [
          {
            text: "Ok",
            onPress: () => {
              setModalVisible(false);
            },
          },
        ],
      });
      setModalVisible(true);
      return;
    }

    const newInterlocutor: TypeInterlocutor = {
      id: currentInterlocutor.id,
      name: currentInterlocutor.name,
      percent: Number(currentPercentInput) / 100,
    };

    const existingIndex = values.interlocutors
      ? values.interlocutors.findIndex((i) => i.id === newInterlocutor.id)
      : -1;

    if (user.id === newInterlocutor.id) {
      setDataModal({
        title: "Você já é o artista do evento!",
        buttons: [
          {
            text: "Ok",
            onPress: () => {
              setModalVisible(false);
            },
          },
        ],
      });
      setModalVisible(true);
      return;
    }

    if (existingIndex !== -1) {
      setDataModal({
        title: "Interlocutor já adicionado!",
        message: "Este interlocutor já foi adicionado à lista.",
        buttons: [
          {
            text: "Ok",
            onPress: () => {
              setModalVisible(false);
            },
          },
        ],
      });
      setModalVisible(true);
      return;
    }

    setFieldValue("interlocutors", [...values.interlocutors, newInterlocutor]);
    setShowInterlocutorModal(false);
    setCurrentCpfInput("");
    setCurrentPercentInput("");
    setCurrentInterlocutor(null);
  };

  const handleMakeOffer = async (values: TypeAloOfferForm) => {
    const offer: TypeAloOfferRequest = {
      event_code: values.event_code,
      alo_cost: values.alo_cost,
      alo_quantity: values.alo_quantity,
      artist_id: user.id,
      artistic_name: values.artistic_name,
      end_offer: event.date.split(" ")[0] + " " + values.end_offer,
      start_offer: event.date.split(" ")[0] + " " + values.start_offer,
      event_id: event.id,
      free_sample: values.free_sample,
      interlocutors: values.interlocutors,
    };

    const resp = await addAloOfferRequest(dispatch, offer);
    if (resp?.status === 200) {
      setDataModal({
        title: "Oferta Cadastrada com sucesso!",
        buttons: [
          {
            text: "Ok",
            onPress() {
              goToEventDetail(navigate);
              setModalVisible(false);
            },
          },
        ],
      });
    } else {
      setDataModal({
        title: "Algo deu errado!",
        message: resp?.data,
        buttons: [
          {
            text: "Ok",
            onPress() {
              setModalVisible(false);
            },
          },
        ],
      });
    }
  };

  const onSubmitWithModal = (values: TypeAloOfferForm) => {
    const valuesOffer = calcularDistribuicaoFinanceira(
      values.interlocutors,
      parseCurrency(String(values.alo_cost)),
      values.alo_quantity
    );

    setDataModal({
      title: "Resumo da Oferta",
      buttons: [
        { text: "Cancelar", onPress: () => setModalVisible(false) },
        {
          text: "Confirmar",
          onPress: () => {
            handleMakeOffer(values);
          },
        },
      ],
      fullHeight: true,
      children: <FinanceSummary resultado={valuesOffer} />,
    });

    setModalVisible(true);
  };
  return (
    <>
      <S.Container theme={theme}>
        <S.ImageContainer />
        <S.FormContainer theme={theme}>
          <S.Title theme={theme}>Ofertar Alô</S.Title>

          <Formik
          initialValues={initialValues}
          validationSchema={validationSchemaOfferForm}
          onSubmit={onSubmitWithModal}
        >
          {({
            values,
            handleBlur,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
          }) => (
            <S.Form onSubmit={handleSubmit}>
              <S.FormContainer theme={theme}>
                <FormFieldInput
                  label="Código do evento"
                  placeholder="Fornecido pelo responsável do evento"
                  onChangeText={(text) => {
                    setFieldValue("event_code", text);
                  }}
                  onBlur={handleBlur("event_code")}
                  value={values.event_code || ""}
                  error={errors.event_code}
                  touched={touched.event_code}
                  
                />

                <FormFieldInput
                  label="Nome Artístico"
                  placeholder="Digite seu nome artístico"
                  onChangeText={(text) => {
                    setFieldValue("artistic_name", text);
                  }}
                  onBlur={handleBlur("artist.name")}
                  value={values.artistic_name || ""}
                  error={errors.artistic_name}
                  touched={touched.artistic_name}
                  
                />

                <FormFieldInput
                  label="Valor do Alô"
                  placeholder="Coloque o valor que o cliente terá que pagar"
                  onChangeText={(text) => {
                    // Remove qualquer coisa que não for número
                    const cleaned = text.replace(/\D/g, "");

                    // Converte para número real com centavos
                    const formatted = formatCurrency(cleaned);

                    setDisplayValue(formatted);

                    const numeric = parseCurrency(formatted);
                    setFieldValue("alo_cost", numeric);
                  }}
                  onBlur={handleBlur("alo_cost")}
                  value={displayValue}
                  error={errors.alo_cost}
                  touched={touched.alo_cost}
                  keyboardType="numeric"
                  
                />

                <FormFieldInput
                  label="Quantidade de Alôs pagos (obrigatório)"
                  placeholder="Digite a quantidade de alôs que serão cobrados."
                  onChangeText={(text) =>
                    setFieldValue(
                      "alo_quantity",
                      Number(text.replace(/[^0-9]/g, ""))
                    )
                  }
                  onBlur={handleBlur("alo_quantity")}
                  value={values.alo_quantity?.toString() || ""}
                  keyboardType="numeric"
                  error={errors.alo_quantity}
                  touched={touched.alo_quantity}
                  
                />

                <FormFieldInput
                  label="Quantidade de Alôs Gratuitos (opcional)"
                  placeholder="Digite a quantidade de alôs gratuitos"
                  onChangeText={(text) =>
                    setFieldValue(
                      "free_sample",
                      Number(text.replace(/[^0-9]/g, ""))
                    )
                  }
                  onBlur={handleBlur("free_sample")}
                  value={values.free_sample?.toString() || ""}
                  keyboardType="numeric"
                  error={errors.free_sample}
                  touched={touched.free_sample}
                  
                />

                <FormFieldInput
                  label="Início dos anúncios (HH:mm)"
                  placeholder="Quando você ininiciará os anuncios dos alôs"
                  onChangeText={(text) => {
                    const formatted = formatTime(text);
                    setFieldValue("start_offer", formatted);
                  }}
                  onBlur={handleBlur("start_offer")}
                  value={values.start_offer}
                  keyboardType="numeric"
                  error={errors.start_offer}
                  touched={touched.start_offer}
                  
                />

                <FormFieldInput
                  label="Término dos anúncios (HH:mm)"
                  placeholder="Quando você encerrará os anuncios dos alôs"
                  onChangeText={(text) => {
                    const formatted = formatTime(text);
                    setFieldValue("end_offer", formatted);
                  }}
                  onBlur={handleBlur("end_offer")}
                  value={values.end_offer}
                  keyboardType="numeric"
                  error={errors.end_offer}
                  touched={touched.end_offer}
                  
                />
              </S.FormContainer>

              
                <S.ButtonContainer>
                <Button
                  text="Adicionar Interlocutor"
                  onClick={handleAddInterlocutor}
                  backgroundColor={COLORS.purple.DEFAULT}
                  textColor="white"
                />
                </S.ButtonContainer>
                {values.interlocutors.length > 0 && (
                  <div
                    style={{
                      marginTop: "32px",
                      padding: "10px 10px",
                      backgroundColor:
                        theme === "dark"
                          ? COLORS.black[800]
                          : COLORS.white[100],
                      borderRadius: "10px",
                      boxShadow:
                        theme === "dark"
                          ? "0 2px 8px rgba(0,0,0,0.8)"
                          : "0 2px 8px rgba(40,40,40,0.08)",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "16px",
                        fontFamily: FONTS.montSerrat,
                        color:
                          theme === "dark"
                            ? COLORS.white[100]
                            : COLORS.black[900],
                        marginBottom: "15px",
                      }}
                    >
                      Interlocutores Adicionados
                    </h3>

                    {values.interlocutors.map((interlocutor, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: "1px",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "6px 10px",
                          marginBottom: "12px",
                          backgroundColor:
                            theme === "dark"
                              ? COLORS.black[1000]
                              : COLORS.white[200],
                          borderRadius: "10px",
                          border: `1px solid ${
                            theme === "dark"
                              ? COLORS.black[800]
                              : COLORS.purple[100]
                          }`,
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: "16px",
                              fontFamily: FONTS.montSerrat,
                              color:
                                theme === "dark"
                                  ? COLORS.white[100]
                                  : COLORS.black[900],
                              marginBottom: "2px",
                            }}
                          >
                            <strong>{interlocutor.name}</strong>
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              fontFamily: FONTS.montSerrat,
                              color:
                                theme === "dark"
                                  ? COLORS.white[100]
                                  : COLORS.black[900],
                            }}
                          >
                            Percentual: {interlocutor.percent * 100}%
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleRemoveInterlocutor(
                              index,
                              setFieldValue,
                              values
                            )
                          }
                          style={{
                            backgroundColor: COLORS.red[500],
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            padding: "10px 8px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          aria-label="Remover interlocutor"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    ))}

                    <p
                      style={{
                        fontFamily: FONTS.montSerrat,
                        color:
                          theme === "dark"
                            ? COLORS.white[100]
                            : COLORS.black[900],
                        marginTop: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      Total de Percentual:{" "}
                      {values.interlocutors.reduce(
                        (sum, i) => sum + i.percent * 100,
                        0
                      )}
                      %
                    </p>
                  </div>
                )}
              

              {showInterlocutorModal && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? COLORS.black[700]
                          : COLORS.white[100],
                      padding: "20px",
                      borderRadius: "8px",
                      width: "80%",
                      maxWidth: "400px",
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: FONTS.montSerrat,
                        fontSize: "18px",
                        color:
                          theme === "dark"
                            ? COLORS.white[100]
                            : COLORS.black[900],
                        marginBottom: "15px",
                      }}
                    >
                      Adicionar Interlocutor
                    </h2>

                    {!currentInterlocutor ? (
                      <>
                        <FormFieldInput
                          label="CPF do Interlocutor"
                          placeholder="Digite o CPF"
                          onChangeText={(text) => {
                            const formatted = formatCpfCnpj(text);
                            setCurrentCpfInput(formatted);
                          }}
                          value={currentCpfInput}
                          keyboardType="numeric"
                          
                          onBlur={() => {}}
                        />

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: "24px",
                            gap: "16px",
                          }}
                        >
                          <Button
                            text="Cancelar"
                            onClick={() => setShowInterlocutorModal(false)}
                            backgroundColor={COLORS.red[500]}
                            textColor="white"
                          />
                          <Button
                            text="Verificar CPF"
                            onClick={handleVerifyCpfCnpj}
                            backgroundColor={COLORS.blue[500]}
                            textColor="white"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <p
                          style={{
                            fontSize: "16px",
                            color:
                              theme === "dark"
                                ? COLORS.white[100]
                                : COLORS.black[900],
                            marginBottom: "10px",
                          }}
                        >
                          Nome: <strong>{currentInterlocutor.name}</strong>
                        </p>

                        <FormFieldInput
                          label="Percentual do Interlocutor (%)"
                          placeholder="Digite o percentual"
                          onChangeText={(e) => {
                            setCurrentPercentInput(e.replace(/[^0-9]/g, ""));
                          }}
                          value={currentPercentInput}
                          keyboardType="numeric"
                          onBlur={() => {}}
                          
                        />

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "32px",
                            gap: "16px",
                          }}
                        >
                          <Button
                            text="Cancelar"
                            onClick={() => {
                              setShowInterlocutorModal(false);
                              setCurrentInterlocutor(null);
                            }}
                            backgroundColor={COLORS.red[500]}
                            textColor="white"
                          />
                          <Button
                            text="Adicionar"
                            onClick={() =>
                              handleAddInterlocutorToForm(setFieldValue, values)
                            }
                            backgroundColor={COLORS.green[500]}
                            textColor="white"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
              {/*<p>{`${Object.keys(errors)}`}</p>*/}
              <S.ButtonContainer>
              <Button
                style={{ marginBottom: "0px" }}
                text="Confirmar Oferta"
                backgroundColor={COLORS.green[500]}
                textColor="white"
                onClick={handleSubmit}
              />
              </S.ButtonContainer>
            </S.Form>
          )}
        </Formik>
        <S.Separator ></S.Separator>
        </S.FormContainer>
        <Alert
          visible={modalVisible}
          setVisible={setModalVisible}
          buttons={dataModal?.buttons}
          fullHeight={dataModal?.fullHeight}
          title={dataModal?.title}
          content={dataModal?.message}
          children={dataModal?.children}
          onClose={dataModal?.onClose}
        />
      </S.Container>
      <S.Separator ></S.Separator>
    </>
  );
};

export default PromoteAlo;

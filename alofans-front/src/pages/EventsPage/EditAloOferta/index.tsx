import { useState } from "react";
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
import {
  getVerifyInterlocutor,
  editAloOfferRequest,
} from "@/services/alos";
import { validationSchemaEditOfferForm } from "@/utils/validationSchemas";
import Alert from "@/components/Alert";
import calcularDistribuicaoFinanceira from "@/utils/calculateValuesAlo";
import FinanceSummary from "@/components/FinanceSummary";
import { goToEventDetail } from "@/routers/Coordinator";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderSimple from "@/components/HeaderSimple";
import FONTS from "@/constants/fonts";

interface TypeAloOfferForm {
  alo_cost: number;
  alo_quantity: number;
  start_offer: string;
  end_offer: string;
  interlocutors: TypeInterlocutor[];
  free_sample: number;
  artistic_name: string;
}

const EditAloOferta = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { offerId, aloOffer } =
    (location.state as TypeStateLocationEditOffer) || {};
  // Access the user from redux store
  const event = useAppSelector((state) => state.eventDetail.value);
  const user = useAppSelector((state) => state.user.value);
  const [currentCpfInput, setCurrentCpfInput] = useState("");
  const [currentPercentInput, setCurrentPercentInput] = useState("");
  const [currentInterlocutor, setCurrentInterlocutor] =
    useState<TypeInterlocutor | null>(null);
  const [showInterlocutorModal, setShowInterlocutorModal] = useState(false);
  const [displayValue, setDisplayValue] = useState(() => {
  if (aloOffer.alo_cost != null) {
    // converte número para string de centavos, ex: 10.1 -> "1010"
    const cents = Math.round(Number(aloOffer.alo_cost) * 100).toString();
    return formatCurrency(cents);
  } else {
    return "0,00";
  }
});

  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState<TypeDataModal>();
 
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
        message: "Por favor, preencha todos os campos corretamente",
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
    const totalPercent = values.interlocutors ?
      values.interlocutors.reduce((sum, i) => sum + i.percent, 0) + percent/100: percent/100;
    console.log({totalPercent});
    
    if (totalPercent > 1) {
      setDataModal({
        title: "Valor não permitido!",
        message:
          "A soma total dos percentuais não pode exceder 100%. Ajuste os valores.",
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


    const existingIndex = values.interlocutors ? values.interlocutors.findIndex(
      (i) => i.id === newInterlocutor.id
    ):null;
    
    if (existingIndex || existingIndex === 0) {
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
    
    if (user.id === newInterlocutor.id ) {
      setDataModal({
        title: "Você já o artista do evento!",
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

    const newInterlocutors = values.interlocutors? [...values.interlocutors, newInterlocutor] : [newInterlocutor];
    setFieldValue("interlocutors", newInterlocutors);
    setShowInterlocutorModal(false);
    setCurrentInterlocutor(null);
    setCurrentPercentInput("");
  };

  const handleUpdateOffer = async (values: TypeAloOfferForm) => {
    // Format the data as required by the API
    const offerRequestData: TypeAloOfferEdit = {
      alo_cost: values.alo_cost,
      alo_quantity: values.alo_quantity,
      free_sample: values.free_sample,
      artistic_name: values.artistic_name,
      end_offer: event.date.split(" ")[0] + " " + values.end_offer,
      start_offer: event.date.split(" ")[0] + " " + values.start_offer,
      interlocutors: values.interlocutors,
    };

    try {
      const result = await editAloOfferRequest(
        dispatch,
        offerId,
        offerRequestData
      );
      if (result?.status === 200) {
        setDataModal({
          title: "Sucesso!",
          message: "Oferta atualizada com sucesso!",
          buttons: [
            {
              text: "Ok",
              onPress: () => {
                setModalVisible(false);
                goToEventDetail(navigate);
              },
            },
          ],
        });
        setModalVisible(true);
      } else {
        setDataModal({
          title: "Erro!",
          message: "Não foi possível atualizar a oferta. Tente novamente.",
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
    } catch (error) {
      setDataModal({
        title: "Erro!",
        message: "Não foi possível atualizar a oferta. Tente novamente.",
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

  const onSubmitWithModal = (values: TypeAloOfferForm) => {
    const valuesOffer = calcularDistribuicaoFinanceira(
      values.interlocutors,
      parseCurrency(String(values.alo_cost)),
      values.alo_quantity
    );

    setDataModal({
      title: "Resumo financeiro",
      message: "",
      children: <FinanceSummary resultado={valuesOffer} />,
      buttons: [
        {
          text: "Confirmar",
          onPress: () => {
            setModalVisible(false);
            handleUpdateOffer(values);
          },
        },
        {
          text: "Cancelar",
          onPress: () => {
            setModalVisible(false);
          },
        },
      ],
    });
    setModalVisible(true);
  };

  // if (isLoading) {
  //   return (
  //     <S.Container theme={theme}>
  //       <HeaderSimple />
  //       <S.Title theme={theme}>Carregando dados da oferta...</S.Title>
  //     </S.Container>
  //   );
  // }

  return (
    <>
      <HeaderSimple />
      <S.Container theme={theme}>
        <S.Title theme={theme}>Editar Oferta do Alô</S.Title>
        <Formik
          initialValues={aloOffer as TypeAloOfferForm}
          validationSchema={validationSchemaEditOfferForm}
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
              <S.ContainerForm theme={theme}>
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
                  placeholder="Valor do Alô"
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
                  placeholder="Digite a quantidade"
                  onChangeText={(text) =>
                    setFieldValue("alo_quantity", Number(text))
                  }
                  onBlur={handleBlur("alo_quantity")}
                  value={values.alo_quantity?.toString() || ""}
                  keyboardType="numeric"
                  error={errors.alo_quantity}
                  touched={touched.alo_quantity}
                />

                <FormFieldInput
                  label="Quantidade de Alôs Promocionais (opcional)"
                  placeholder="Digite a quantidade"
                  onChangeText={(text) =>
                    setFieldValue("free_sample", Number(text))
                  }
                  onBlur={handleBlur("free_sample")}
                  value={values.free_sample?.toString() || ""}
                  keyboardType="numeric"
                  error={errors.free_sample}
                  touched={touched.free_sample}
                />

                <FormFieldInput
                  label="Hora de Início (HH:mm)"
                  placeholder="Ex: 14:30"
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
                  label="Hora de Término (HH:mm)"
                  placeholder="Ex: 16:00"
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
              </S.ContainerForm>

              <div style={{ margin: "2px 0 0 0" }}>
                <Button
                  text="Adicionar Interlocutor"
                  onClick={handleAddInterlocutor}
                  backgroundColor={COLORS.purple.DEFAULT}
                  textColor="white"
                />

                {values.interlocutors && values.interlocutors.length > 0 && (
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
              </div>

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
                            setCurrentPercentInput(e);
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
                   {/* <p>{`${Object.keys(errors)}`}</p> */}
              <Button
                style={{ marginBottom: "0px" }}
                text="Atualizar Oferta"
                backgroundColor={COLORS.green[500]}
                textColor="white"
                onClick={handleSubmit}
              />
            </S.Form>
            
          )}
        </Formik>
        <Alert
          visible={modalVisible}
          setVisible={setModalVisible}
          buttons={dataModal?.buttons}
          title={dataModal?.title}
          content={dataModal?.message}
          children={dataModal?.children}
        />
        <div style={{ height: "15vh" }}></div>
      </S.Container>
    </>
  );
};

export default EditAloOferta;

/* eslint-disable @typescript-eslint/no-explicit-any */
//src/pages/EventsPage/AddEventPage/index.tsx
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as S from "./style";
import {
  goToEvents,
  goToLogin,
  goToRegisterProfessional,
} from "@/routers/Coordinator";
import { useNavigate } from "react-router-dom";
import Alert from "@/components/Alert";
import { FormButton } from "@/components/FormField/FormButton"
import { FormButtonSecondary } from "@/components/FormField/FormButton"
import { FormFieldInput } from "@/components/FormField/FormFieldInput"
import { FormFieldSelect } from "@/components/FormField/FormFieldSelect"
import EventType from "@/components/EventType";
import {
  convertDateFormatToDB,
  formatDate,
  formatTime,
} from "@/utils/formatedFunctions";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import { BASE_URL } from "@/constants/urls";
import { dataLocals } from "@/data/locations.json";
import ResumeEvent from "./ResumeEvent";
import { initialValuesEvent, validationSchemaEvents } from "@/utils/validationSchemas";
import COLORS from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import HeaderSimple from "@/components/HeaderSimple";
import { getCookie } from "@/services/cookies";
import usePermission from "@/hooks/usePermissiion";


const AddEvent = () => {
  const user = useAppSelector((state) => state.user.value);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [type, setType] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [resumeVisible, setResumeVisible] = useState<boolean>(false);
  const [estadoSigla, setEstadoSigla] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [dataModal, setDataModal] = useState<TypeDataModal>({
    title: "",
    message: "",
    titleStyle: {},
    messageStyle: {},
    buttons: [],
  });

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        if (!user.name) {
          setDataModal({
            title: "Faça seu Login!",
            message: "Acesso Restrito! Você precisa estar logado para criar eventos.",
            buttons: [
              {
                text: "Fazer login",
                onPress: () => goToLogin(navigate),
              },
            ],
          });
          setAlertVisible(true);
        } else {
          setAlertVisible(false);
        }
        if (!usePermission(user)) {
          setDataModal({
            title: "Não perca tempo!",
            message: "Acesso Restrito! Você precisa ser um Profissional para criar eventos.",
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
          setAlertVisible(true);
        }
      } catch (error) {
        console.error("Erro ao verificar o papel do usuário", error);
      }
    };
    checkUserRole();
  }, [user]);

  // Função para lidar com a seleção de imagem
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const image = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          image.src = e.target.result as string;

          image.onload = () => {
            const targetAspectRatio = 4 / 3;
            const originalAspectRatio = image.width / image.height;

            let cropWidth, cropHeight, offsetX, offsetY;

            if (originalAspectRatio > targetAspectRatio) {
              cropHeight = image.height;
              cropWidth = cropHeight * targetAspectRatio;
              offsetX = (image.width - cropWidth) / 2;
              offsetY = 0;
            } else {
              cropWidth = image.width;
              cropHeight = cropWidth / targetAspectRatio;
              offsetX = 0;
              offsetY = (image.height - cropHeight) / 2;
            }

            const canvas = document.createElement("canvas");
            canvas.width = 800;
            canvas.height = 600;

            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(
                image,
                offsetX, offsetY,
                cropWidth, cropHeight,
                0, 0,
                canvas.width, canvas.height
              );

              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    const croppedFile = new File([blob], file.name, {
                      type: file.type,
                      lastModified: Date.now(),
                    });

                    setFieldValue("file", croppedFile);
                    setImage(croppedFile); // Atualiza o estado da imagem
                    setPreviewURL(URL.createObjectURL(croppedFile)); // Atualiza a pré-visualização
                  }
                },
                file.type,
                1
              );
            }
          };
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSelectImage = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleSubmit = async () => {
    setResumeVisible(true);
  };

  const handleCreateEvent = async (values: any) => {
    const eventData: TypeEventRequest = {
      name: values.name,
      description: values.description,
      date: `${convertDateFormatToDB(values.date)} ${values.start_time}`,
      is_online: values.is_online,
      link: values.link,
      state: values.state,
      city: values.city,
      neighborhood: values.neighborhood,
      street: values.street,
      complement: values.complement,
      address_number: values.address_number,
      producer_id: user.id,
    };

    const form = new FormData();

    form.append("event_data", JSON.stringify(eventData));
    if (image) {
      form.append("image", image); // Adiciona a imagem ao FormData
    }

    try {
      const token = getCookie("token");
      axios.post(`${BASE_URL}/event`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${token}`
        },
      }).then(() => {
        setDataModal({
          title: "Evento cadastrado com sucesso",
          message: "Acompanhe já seu evento.",
          buttons: [
            {
              text: "Página de eventos",
              onPress: () => goToEvents(navigate),
            },
          ],
        });
        setImage(null); // Limpa a imagem selecionada
        setPreviewURL(null); // Limpa a pré-visualização
        setAlertVisible(true);
      }).catch((error: any) => {
        setDataModal({
          title: "Erro ao cadastrar evento.",
          message: `${error.message}`,
          buttons: [
            {
              text: "Página de eventos",
              onPress: () => goToEvents(navigate),
            },
          ],
        });
        setImage(null); // Limpa a imagem selecionada
        setPreviewURL(null); // Limpa a pré-visualização
        setAlertVisible(true);

      });


    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.detail) {
        console.log(error);
      } else {
        console.log("Erro ao enviar o formulário.");
      }
    }
  };

  const estados = dataLocals.map((estado) => ({
    text: estado.estado,
    value: estado.sigla,
  }));

  const handleStateCityChange = (sigla: string, setFieldValue: any) => {
    setEstadoSigla(sigla);
    setFieldValue("state", sigla);
    setFieldValue("city", "");
  };

  const estadoSelecionado = dataLocals.find(
    (estado) => estado.sigla === estadoSigla
  );

  const cidades = estadoSelecionado
    ? estadoSelecionado.cidades.map((cidade) => ({
      text: cidade,
      value: cidade,
    }))
    : [];

  return (
    <div>
      <HeaderSimple />
      <S.ImageContainer />
      <S.Container id="AddEvent.Container" theme={theme}>
        <S.Title id="AddEvent.Title" theme={theme}>Novo Evento</S.Title>
        <Formik
          initialValues={initialValuesEvent}
          validationSchema={validationSchemaEvents}
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
          }) => (
            
            <S.FormStyled id="AddEvent.FormStyled" theme={theme}>
              <Alert
                setVisible={setAlertVisible}
                visible={alertVisible}
                title={dataModal.title}
                buttons={dataModal.buttons}
                onClose={() => goToEvents(navigate)}
              />
              <ResumeEvent
                createEvent={() => {
                  handleCreateEvent(values);
                  setResumeVisible(false);
                }}
                isVisible={resumeVisible}
                setIsVisible={setResumeVisible}
              />
              <S.ContainerType id="AddEvent.ContainerType">
                  <S.ButtonType
                    id="AddEvent.ButtonType"
                    onClick={() => {
                      setFieldValue("is_online", true);
                      setFieldValue("is_in_person", false);
                      setType("online");
                    }}
                    isDisabled={type?.toLocaleLowerCase() !== "online"}
                    theme={theme}
                  >
                    <EventType
                      isOnline
                      isDisabled={type?.toLocaleLowerCase() !== "online"}
                      theme={theme}
                    />
                  </S.ButtonType>
                <S.ButtonType
                  onClick={() => {
                    setFieldValue("is_online", false);
                    setFieldValue("is_in_person", true);
                    setType("presencial");
                  }}
                  isDisabled={type?.toLocaleLowerCase() !== "presencial"}
                  theme={theme}
                >
                  <EventType
                    isDisabled={type?.toLocaleLowerCase() !== "presencial"}
                    theme={theme}
                  />
                </S.ButtonType>
              </S.ContainerType>
              {type && (
                <>
                  <FormFieldInput
                    placeholder="Nome do Evento"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    error={errors.name}
                    touched={touched.name}
                    theme={theme}
                  />
                  <FormFieldInput
                    placeholder="Descrição do Evento"
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                    error={errors.description}
                    touched={touched.description}
                    multiline={true}
                    theme={theme}
                  />
                  {previewURL && (
                    <div>
                      <img
                        src={previewURL}
                        alt="Pré-visualização"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>
                  )}
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(event) => handleImageChange(event, setFieldValue)}
                  />
                  <FormButtonSecondary
                    onClick={handleSelectImage}
                    text={image ? "Alterar Imagem" : "Selecione uma Imagem"}
                    color={COLORS.secondary}
                    theme={theme}
                  />
                  <FormFieldInput
                    placeholder="Data do Evento"
                    onChangeText={(text) =>
                      setFieldValue("date", formatDate(text))
                    }
                    onBlur={handleBlur("date")}
                    value={values.date}
                    error={errors.date}
                    touched={touched.date}
                    theme={theme}
                  />
                  <FormFieldInput
                    placeholder="Hora do Evento"
                    onChangeText={(text) =>
                      setFieldValue("start_time", formatTime(text))
                    }
                    onBlur={handleBlur("start_time")}
                    value={values.start_time}
                    error={errors.start_time}
                    touched={touched.start_time}
                    theme={theme}
                  />
                  <FormFieldSelect
                    options={estados.map((state)=>{ return {label:state.text, value:state.value}})}
                    placeholder="Selecione o Estado"
                    onChange={(value) =>
                      handleStateCityChange(value, setFieldValue)
                    }
                    onBlur={handleBlur("state")}
                    value={values.state}
                    error={errors.state}
                    touched={touched.state}
                    color={COLORS.black[900]}
                    theme={theme}

                  />
                  <FormFieldSelect
                    options={cidades.map((city)=>{ return {label:city.text, value:city.value}})}
                    placeholder="Selecione a Cidade"
                    onChange={(value) => setFieldValue("city", value)}
                    onBlur={handleBlur("city")}
                    value={values.city}
                    error={errors.city}
                    touched={touched.city}
                    color={COLORS.black[900]}
                    theme={theme}
                  />
                  {type?.toLocaleLowerCase() === "presencial" ? (
                    <>
                      <FormFieldInput
                        placeholder="Rua"
                        onChangeText={handleChange("street")}
                        onBlur={handleBlur("street")}
                        value={values.street}
                        error={errors.street}
                        touched={touched.street}
                        theme={theme}
                      />
                      <FormFieldInput
                        placeholder="Numero"
                        onChangeText={handleChange("address_number")}
                        onBlur={handleBlur("address_number")}
                        value={values.address_number}
                        error={errors.address_number}
                        keyboardType="number"
                        touched={touched.address_number}
                        theme={theme}
                      />
                      <FormFieldInput
                        placeholder="Bairro"
                        onChangeText={handleChange("neighborhood")}
                        onBlur={handleBlur("neighborhood")}
                        value={values.neighborhood}
                        error={errors.neighborhood}
                        touched={touched.neighborhood}
                        theme={theme}
                      />
                      <FormFieldInput
                        placeholder="Complemento"
                        onChangeText={handleChange("complement")}
                        onBlur={handleBlur("complement")}
                        value={values.complement}
                        error={errors.complement}
                        touched={touched.complement}
                        theme={theme}
                      />
                    </>
                    
                  ) : (
                    <FormFieldInput
                      placeholder="Link"
                      onChangeText={handleChange("link")}
                      onBlur={handleBlur("link")}
                      value={values.link}
                      error={errors.link}
                      touched={touched.link}
                      theme={theme}
                    />
                  )}
                  <FormButton
                    isDisabled={!isValid || !values}
                    onClick={handleSubmit}
                    text="Cadastrar Novo Evento"
                    theme={theme}
                  />
                  <div style={{ height: "20px" }}></div>
                </>
              )}
            </S.FormStyled>
          )}
        </Formik>
        <div style={{ height: "500px" }}></div>
      </S.Container>
    </div>
  );
};

export default AddEvent;
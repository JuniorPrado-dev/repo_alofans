import { useEffect, useState } from "react";
import {
  PageWrapper,
  ContentWrapper,
  Title,
  FormWrapper,
  EventTypeSelectorWrapper,
  EventTypeOption,
  PreviewImage,
  HiddenInput,
  Divider,
} from "./EventEditDesktop.styles";
import { Formik } from "formik";
import {
  goToEvents,
  goToLogin,
  goToRegisterProfessional,
} from "@/routers/Coordinator";
import { useNavigate } from "react-router-dom";
import Alert from "@/components/Alert";
import { FormButton } from "@/components/FormField/FormButton";
import { FormButtonSecondary } from "@/components/FormField/FormButton";
import { FormFieldInput } from "@/components/FormField/FormFieldInput";
import { FormFieldSelect } from "@/components/FormField/FormFieldSelect";
import EventType from "@/components/EventType";
import {
  convertDateFormatToDB,
  convertDateTime,
  formatDate,
  formatTime,
} from "@/utils/formatedFunctions";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import { BASE_URL } from "@/constants/urls";
import { dataLocals } from "@/data/locations.json";
import ResumeEvent from "@/pages/EventsPage/AddEventPage/ResumeEvent";
import { initialValuesEvent, validationSchemaEvents } from "@/utils/validationSchemas";
import COLORS from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";
import ENDPOINTS from "@/utils/endPoints";
import { getCookie } from "@/services/cookies";
import usePermission from "@/hooks/usePermissiion";

const EventEditDesktop = () => {
  const user = useAppSelector((state) => state.user.value);
  const eventDetail = useAppSelector((state) => state.eventDetail.value);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [type, setType] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [resumeVisible, setResumeVisible] = useState<boolean>(false);
  const [estadoSigla, setEstadoSigla] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState(initialValuesEvent);
  const [dataModal, setDataModal] = useState<TypeDataModal>();

  useEffect(() => {
    
    const checkUserRoleAndFetchEvent = async () => {
      try {
        if (!user.name) {
          setDataModal({
            title: "error",
            message: "Acesso Restrito! Você precisa estar logado para editar eventos.",
            buttons: [
              {
                text: "Fazer login",
                onPress: () => goToLogin(navigate),
              },
            ],
          });
          setAlertVisible(true);
          return;
        }
        if (!usePermission(user)) {
          setDataModal({
            title: "error",
            message: "Acesso Restrito! Você precisa ser um Profissional para editar eventos.",
            buttons: [
              {
                text: "Cadastrar-se como Profissional",
                onPress: () => goToRegisterProfessional(navigate),
              },
            ],
          });
          setAlertVisible(true);
          return;
        }
        const {date, time} = convertDateTime(eventDetail.date)
        setInitialValues({
            name: eventDetail.name,
            description: eventDetail.description,
            date: formatDate(date),
            start_time: formatTime(time),
            is_online: eventDetail.is_online,
            is_in_person: !eventDetail.is_online, // Adicione esta linha
            link: eventDetail.link || "",
            state: eventDetail.state || "",
            city: eventDetail.city || "",
            neighborhood: eventDetail.neighborhood || "",
            street: eventDetail.street || "",
            complement: eventDetail.complement || "",
            address_number: eventDetail.address_number || "",
            file: null,
          });
        setType(eventDetail.is_online?"online":"presencial");
        setEstadoSigla(eventDetail.state || "");
        setPreviewURL(eventDetail.image_path ? `${BASE_URL}${eventDetail.image_path}` : null);
      } catch (error) {
        console.error("Erro ao carregar evento", error);
        setDataModal({
          title: "error",
          message: "Erro ao carregar os dados do evento.",
          buttons: [
            {
              text: "Voltar",
              onPress: () => goToEvents(navigate),
            },
          ],
        });
        setAlertVisible(true);
      }
    };
    checkUserRoleAndFetchEvent();
  }, [user, eventDetail, navigate]);


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
                offsetX,
                offsetY,
                cropWidth,
                cropHeight,
                0,
                0,
                canvas.width,
                canvas.height
              );

              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    const croppedFile = new File([blob], file.name, {
                      type: file.type,
                      lastModified: Date.now(),
                    });

                    setFieldValue("file", croppedFile);
                    setImage(croppedFile);
                    setPreviewURL(URL.createObjectURL(croppedFile));
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


  const handleUpdateEvent = async (values: any) => {
    const eventData = {
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
      form.append("image", image);
    }

    try {
      const token = getCookie("token");
      await axios.put(ENDPOINTS.events.update(eventDetail.id), form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setDataModal({
        message: "Evento atualizado com sucesso.",
        buttons: [
          {
            text: "Página de eventos",
            onPress: () => goToEvents(navigate),
          },
        ],
      });
      setImage(null);
      setPreviewURL(null);
      setAlertVisible(true);
    } catch (error: any) {
      console.error("Erro ao atualizar evento", error);
      setDataModal({
        title: "error",
        message: `Erro ao atualizar evento: ${error.message}`,
        buttons: [
          {
            text: "Voltar",
            onPress: () => goToEvents(navigate),
          },
        ],
      });
      setImage(null);
      setPreviewURL(null);
      setAlertVisible(true);
    }
  };

  const estados = dataLocals.map((estado) => ({
    label: estado.estado,
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
        label: cidade,
        value: cidade,
      }))
    : [];

  return (
    <PageWrapper theme={theme}>
      {dataModal && alertVisible && (
        <Alert
          setVisible={setAlertVisible}
          visible={alertVisible}
          content={dataModal.message}
          title={dataModal.title}
          buttons={dataModal.buttons}
          onClose={() => setAlertVisible(false)}
        />
      )}
      <ContentWrapper theme={theme}>
        <Title theme={theme}>Editar Evento</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemaEvents}
          onSubmit={handleUpdateEvent}
          validateOnMount
        >
          {({
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            isValid,
            values,
            setFieldValue,
          }) => (
            <FormWrapper theme={theme}>
              <ResumeEvent
                createEvent={() => {
                  handleUpdateEvent(values);
                }}
                isVisible={resumeVisible}
                setIsVisible={setResumeVisible}
              />
              <EventTypeSelectorWrapper>
                <EventTypeOption
                  onClick={() => {
                    setFieldValue("is_online", true);
                    setFieldValue("is_in_person", false);
                    setType("online");
                  }}
                  isDisabled={type?.toLowerCase() !== "online"}
                  theme={theme}
                >
                  <EventType
                    isOnline
                    isDisabled={type?.toLowerCase() !== "online"}
                    theme={theme}
                  />
                </EventTypeOption>
                <EventTypeOption
                  onClick={() => {
                    setFieldValue("is_online", false);
                    setFieldValue("is_in_person", true);
                    setType("presencial");
                  }}
                  isDisabled={type?.toLowerCase() !== "presencial"}
                  theme={theme}
                >
                  <EventType
                    isDisabled={type?.toLowerCase() !== "presencial"}
                    theme={theme}
                  />
                </EventTypeOption>
              </EventTypeSelectorWrapper>
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
                      <PreviewImage
                        src={previewURL}
                        alt="Pré-visualização"
                      />
                    </div>
                  )}
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    ref={HiddenInput}
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
                    options={estados}
                    placeholder="Selecione o Estado"
                    onChange={(value) =>
                      handleStateCityChange(value, setFieldValue)
                    }
                    onBlur={handleBlur("state")}
                    value={values.state}
                    error={errors.state}
                    touched={touched.state}
                    color={COLORS.secondary}
                    theme={theme}
                  />
                  <FormFieldSelect
                    options={cidades}
                    placeholder="Selecione a Cidade"
                    onChange={(value) => setFieldValue("city", value)}
                    onBlur={handleBlur("city")}
                    value={values.city}
                    error={errors.city}
                    touched={touched.city}
                    color={COLORS.secondary}
                    theme={theme}
                  />
                  {type?.toLowerCase() === "presencial" ? (
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
                    onClick={() => handleSubmit()}
                    text="Atualizar Evento"
                    theme={theme}
                  />
                  <Divider />
                  <div style={{ height: "100px" }}></div>
                </>
              )}
            </FormWrapper>
          )}
        </Formik>
        <div style={{ height: "500px" }}></div>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default EventEditDesktop;